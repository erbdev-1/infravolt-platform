import { strict as assert } from "node:assert";
import {
  CommandTimeoutError,
  type CommandOptions,
  type CommandResult,
  type CommandRunner,
  type DockerContainerInspection,
  type DockerNetworkInspection,
  expectedSupabaseContainers,
  localNetworkName,
  normalizeLocalDockerEndpoint,
  type MonotonicClock,
  type ValidatedDockerTarget,
  validateLocalDockerTarget,
  waitForLocalSupabaseStack,
} from "./local-docker.ts";
import {
  getLifecycleCleanupFailure,
  runLocalSupabase,
  throwAfterLifecycleCleanup,
  type LifecycleOperation,
} from "./local-supabase.ts";

type RecordedCall = Readonly<{
  args: readonly string[];
  executable: string;
  label: string;
  options: CommandOptions;
}>;

function commandResult(
  overrides: Partial<CommandResult> = {},
): CommandResult {
  return Object.freeze({
    launchFailed: false,
    status: 0,
    stderr: "",
    stdout: "",
    timedOut: false,
    ...overrides,
  });
}

function ownedNetwork(complete = true): DockerNetworkInspection {
  return {
    Containers: complete
      ? Object.fromEntries(
          expectedSupabaseContainers.map((name, index) => [
            String(index),
            { Name: name },
          ]),
        )
      : {},
    Driver: "bridge",
    Labels: { "com.infravolt.owner": "local-supabase-foundation" },
    Name: localNetworkName,
    Options: {
      "com.docker.network.bridge.host_binding_ipv4": "127.0.0.1",
    },
  };
}

function healthyContainers(): readonly DockerContainerInspection[] {
  return expectedSupabaseContainers.map((name) => ({
    Config: { Labels: { "com.supabase.cli.project": "infravolt" } },
    Name: `/${name}`,
    NetworkSettings: {
      Networks: { [localNetworkName]: {} },
      Ports: { "5432/tcp": [{ HostIp: "127.0.0.1", HostPort: "54322" }] },
    },
    State: {
      ...(name === "supabase_rest_infravolt"
        ? {}
        : { Health: { Status: "healthy" } }),
      Restarting: false,
      Running: true,
      Status: "running",
    },
  }));
}

function replaceContainer(
  containers: readonly DockerContainerInspection[],
  name: string,
  update: (container: DockerContainerInspection) => DockerContainerInspection,
): readonly DockerContainerInspection[] {
  return containers.map((container) =>
    container.Name === `/${name}` ? update(container) : container,
  );
}

function fakeClock(): MonotonicClock & { advance: (milliseconds: number) => void } {
  let current = 0;

  return Object.freeze({
    advance: (milliseconds: number) => {
      current += milliseconds;
    },
    now: () => current,
    sleep: (milliseconds: number) => {
      current += milliseconds;
    },
  });
}

function stackRunner(
  inspections: readonly (readonly DockerContainerInspection[])[],
  options: Readonly<{
    clock?: ReturnType<typeof fakeClock>;
    foreignNameCollision?: boolean;
    foreignNetwork?: boolean;
    missingDiscoveryAttempts?: number;
  }> = {},
): Readonly<{ calls: readonly RecordedCall[]; run: CommandRunner }> {
  const calls: RecordedCall[] = [];
  let inspectionIndex = 0;
  let discoveryCount = 0;
  let discoveredNames: readonly string[] = expectedSupabaseContainers;

  const run: CommandRunner = (executable, args, label, commandOptions) => {
    calls.push({ args, executable, label, options: commandOptions });
    options.clock?.advance(5);

    if (args[0] === "network" && args[1] === "inspect") {
      const network = ownedNetwork(true);

      if (options.foreignNetwork) {
        return commandResult({
          stdout: JSON.stringify([
            {
              ...network,
              Containers: {
                ...network.Containers,
                foreign: { Name: "unrelated_container" },
              },
            },
          ]),
        });
      }

      return commandResult({ stdout: JSON.stringify([network]) });
    }

    if (args[0] === "ps" && args[1] === "-a") {
      if (args.includes("--filter")) {
        discoveryCount += 1;
        discoveredNames =
          discoveryCount <= (options.missingDiscoveryAttempts ?? 0)
            ? expectedSupabaseContainers.slice(0, -1)
            : expectedSupabaseContainers;
      }

      if (!args.includes("--filter") && options.foreignNameCollision) {
        return commandResult({
          stdout: expectedSupabaseContainers.join("\n"),
        });
      }

      return commandResult({ stdout: discoveredNames.join("\n") });
    }

    if (args[0] === "inspect") {
      const inspection =
        inspections[Math.min(inspectionIndex, inspections.length - 1)];

      inspectionIndex += 1;
      return commandResult({ stdout: JSON.stringify(inspection) });
    }

    throw new Error(`Unexpected fixture command: ${executable} ${args.join(" ")}`);
  };

  return { calls, run };
}

function target(): ValidatedDockerTarget {
  return Object.freeze({
    endpoint: "unix:///var/run/docker.sock",
    environment: Object.freeze({
      DOCKER_HOST: "unix:///var/run/docker.sock",
      npm_execpath: "fixture-pnpm.cjs",
    }),
  });
}

function assertEndpointAllowlist(): void {
  const approved = [
    "npipe:////./pipe/dockerDesktopLinuxEngine",
    "npipe:////./pipe/docker_engine",
    "unix:///var/run/docker.sock",
    "unix:///run/docker.sock",
    "unix:///run/user/1000/docker.sock",
    "unix:///home/developer/.docker/run/docker.sock",
    "unix:///Users/developer/.docker/desktop/docker.sock",
  ];
  const rejected = [
    "tcp://127.0.0.1:2375",
    "tcp://docker.example.test:2376",
    "ssh://docker.example.test",
    "unix:///tmp/forwarded-docker.sock",
    "unix:///var/run/../forwarded-docker.sock",
    "unix:///home/../.docker/run/docker.sock",
    "unix://relative/docker.sock",
    "unix:///home/developer/proxy/docker.sock",
    "./docker.sock",
    "npipe:////./pipe/custom-engine",
    "malformed",
  ];

  for (const endpoint of approved) {
    assert.doesNotThrow(() => normalizeLocalDockerEndpoint(endpoint));
  }

  for (const endpoint of rejected) {
    assert.throws(() => normalizeLocalDockerEndpoint(endpoint));
  }
}

function assertPinnedTargetSelection(): void {
  const calls: RecordedCall[] = [];
  const parent: Record<string, string | undefined> = {
    DOCKER_CONTEXT: "approved-context",
    DOCKER_HOST: "tcp://ignored.example.test:2376",
    DOCKER_TLS_VERIFY: "1",
    npm_execpath: "fixture-pnpm.cjs",
  };
  const run: CommandRunner = (executable, args, label, options) => {
    calls.push({ args, executable, label, options });

    if (args[0] === "context" && args[1] === "inspect") {
      return commandResult({
        stdout: JSON.stringify([
          {
            Endpoints: {
              docker: { Host: "npipe:////./pipe/dockerDesktopLinuxEngine" },
            },
          },
        ]),
      });
    }

    if (args[0] === "info") {
      return commandResult({ stdout: "linux\n" });
    }

    throw new Error(`Unexpected target fixture command: ${executable} ${args.join(" ")}`);
  };
  const validated = validateLocalDockerTarget(run, parent);

  // Doğrulama sonrası parent seçimini değiştirmek, dondurulmuş child hedefini yönlendirememelidir.
  parent.DOCKER_CONTEXT = "mutated-context";
  parent.DOCKER_HOST = "tcp://mutated.example.test:2376";

  assert.equal(
    validated.endpoint,
    "npipe:////./pipe/dockerDesktopLinuxEngine",
  );
  assert.equal(validated.environment.DOCKER_HOST, validated.endpoint);
  assert.equal(validated.environment.DOCKER_CONTEXT, undefined);
  assert.equal(validated.environment.DOCKER_TLS_VERIFY, undefined);
  assert(Object.isFrozen(validated));
  assert(Object.isFrozen(validated.environment));
  assert.equal(calls.at(-1)?.options.environment, validated.environment);
}

function assertPinnedChildEnvironment(): void {
  const calls: RecordedCall[] = [];
  const environment: Record<string, string | undefined> = {
    DOCKER_HOST: "unix:///var/run/docker.sock",
    DOCKER_CONTEXT: "",
    npm_execpath: "fixture-pnpm.cjs",
  };
  const containers = healthyContainers();
  const expectedEndpoint = environment.DOCKER_HOST;
  const run: CommandRunner = (executable, args, label, options) => {
    calls.push({ args, executable, label, options });

    if (executable === "docker" && args[0] === "info") {
      // Engine doğrulamasından hemen sonra yapılan değişiklik TOCTOU yarışını fixture içinde zorlar.
      environment.DOCKER_HOST = "tcp://mutated.example.test:2376";
      environment.DOCKER_CONTEXT = "mutated-context";
      return commandResult({ stdout: "linux\n" });
    }

    if (executable === process.execPath) {
      return commandResult({ stdout: "{}" });
    }

    if (args[0] === "network" && args[1] === "inspect") {
      return commandResult({ stdout: JSON.stringify([ownedNetwork(true)]) });
    }

    if (args[0] === "ps" && args[1] === "-a") {
      return commandResult({ stdout: expectedSupabaseContainers.join("\n") });
    }

    if (args[0] === "inspect") {
      return commandResult({ stdout: JSON.stringify(containers) });
    }

    throw new Error(`Unexpected child fixture command: ${executable} ${args.join(" ")}`);
  };

  runLocalSupabase("status", {
    environment,
    logger: { error: () => undefined, log: () => undefined },
    runCommand: run,
  });

  const pinnedCalls = calls.filter(
    (call) => !(call.executable === "docker" && call.args[0] === "context"),
  );

  assert(pinnedCalls.length > 1);
  for (const call of pinnedCalls) {
    assert.equal(call.options.environment.DOCKER_HOST, expectedEndpoint);
    assert.equal(call.options.environment.DOCKER_CONTEXT, undefined);
  }
}

function assertTypedReadinessPolicy(): void {
  const healthy = healthyContainers();
  const starting = replaceContainer(
    healthy,
    "supabase_auth_infravolt",
    (container) => ({
      ...container,
      State: { ...container.State, Health: { Status: "starting" } },
    }),
  );
  const created = replaceContainer(
    healthy,
    "supabase_auth_infravolt",
    (container) => ({
      ...container,
      State: { Restarting: false, Running: false, Status: "created" },
    }),
  );

  for (const inspections of [[starting, healthy], [created, healthy]]) {
    const clock = fakeClock();
    const fixture = stackRunner(inspections, { clock });

    assert.doesNotThrow(() =>
      waitForLocalSupabaseStack(fixture.run, target(), {
        clock,
        pollIntervalMilliseconds: 10,
        timeoutMilliseconds: 500,
      }),
    );
  }

  const missingClock = fakeClock();
  const missing = stackRunner([healthy], {
    clock: missingClock,
    missingDiscoveryAttempts: 1,
  });

  assert.doesNotThrow(() =>
    waitForLocalSupabaseStack(missing.run, target(), {
      clock: missingClock,
      pollIntervalMilliseconds: 10,
      timeoutMilliseconds: 500,
    }),
  );

  const terminalCases = [
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      State: { ...container.State, Health: { Status: "unhealthy" } },
    })),
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      State: { ...container.State, Health: { Status: "malformed" } },
    })),
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      State: { Restarting: false, Running: true, Status: "running" },
    })),
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      Config: { Labels: { "com.supabase.cli.project": "foreign" } },
    })),
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      NetworkSettings: {
        Networks: { foreign: {} },
        Ports: container.NetworkSettings?.Ports,
      },
    })),
    replaceContainer(healthy, "supabase_auth_infravolt", (container) => ({
      ...container,
      NetworkSettings: {
        Networks: { [localNetworkName]: {} },
        Ports: { "5432/tcp": [{ HostIp: "0.0.0.0", HostPort: "54322" }] },
      },
    })),
  ];

  for (const containers of terminalCases) {
    const clock = fakeClock();
    const fixture = stackRunner([containers], { clock });

    assert.throws(() =>
      waitForLocalSupabaseStack(fixture.run, target(), {
        clock,
        pollIntervalMilliseconds: 10,
        timeoutMilliseconds: 500,
      }),
    );
    assert.equal(
      fixture.calls.filter((call) => call.args[0] === "inspect").length,
      1,
    );
  }

  const foreignClock = fakeClock();
  const foreign = stackRunner([healthy], {
    clock: foreignClock,
    foreignNetwork: true,
  });

  assert.throws(() =>
    waitForLocalSupabaseStack(foreign.run, target(), {
      clock: foreignClock,
      pollIntervalMilliseconds: 10,
      timeoutMilliseconds: 500,
    }),
  );
  assert.equal(foreign.calls.length, 1);

  const collisionClock = fakeClock();
  const collision = stackRunner([healthy], {
    clock: collisionClock,
    foreignNameCollision: true,
    missingDiscoveryAttempts: 1,
  });

  assert.throws(() =>
    waitForLocalSupabaseStack(collision.run, target(), {
      clock: collisionClock,
      pollIntervalMilliseconds: 10,
      timeoutMilliseconds: 500,
    }),
  );
  assert.equal(collision.calls.length, 3);

  // REST image'ında healthcheck bulunmaması açık istisnadır; diğer tüm eksikler terminal hatadır.
  assert.doesNotThrow(() => {
    const clock = fakeClock();
    waitForLocalSupabaseStack(stackRunner([healthy], { clock }).run, target(), {
      clock,
      timeoutMilliseconds: 500,
    });
  });
}

function assertMonotonicDeadline(): void {
  const healthy = healthyContainers();
  const timeoutClock = fakeClock();
  const timeoutValues: number[] = [];
  const timedOutRunner: CommandRunner = (_executable, _args, _label, options) => {
    timeoutValues.push(options.timeoutMilliseconds);
    timeoutClock.advance(options.timeoutMilliseconds);
    return commandResult({ status: -1, timedOut: true });
  };

  let timeoutError: unknown;

  try {
    waitForLocalSupabaseStack(timedOutRunner, target(), {
      clock: timeoutClock,
      timeoutMilliseconds: 250,
    });
  } catch (error) {
    timeoutError = error;
  }

  assert(
    timeoutError instanceof CommandTimeoutError,
    "Hanging child must fail with the typed command timeout.",
  );
  assert.match(timeoutError.message, /zaman aşımına uğradı/u);
  assert.doesNotMatch(timeoutError.message, /docker\.sock|tcp:|npipe:/iu);
  assert.deepEqual(timeoutValues, [250]);
  assert.equal(timeoutClock.now(), 250);

  const longBudgetClock = fakeClock();
  const longBudgetValues: number[] = [];
  const longBudgetRunner: CommandRunner = (
    _executable,
    _args,
    _label,
    options,
  ) => {
    longBudgetValues.push(options.timeoutMilliseconds);
    return commandResult({ status: -1, timedOut: true });
  };

  assert.throws(
    () =>
      waitForLocalSupabaseStack(longBudgetRunner, target(), {
        clock: longBudgetClock,
        timeoutMilliseconds: 25_000,
      }),
    CommandTimeoutError,
  );
  assert.deepEqual(longBudgetValues, [10_000]);

  const budgetClock = fakeClock();
  const fixture = stackRunner([healthy], { clock: budgetClock });

  waitForLocalSupabaseStack(fixture.run, target(), {
    clock: budgetClock,
    pollIntervalMilliseconds: 0,
    timeoutMilliseconds: 500,
  });
  const budgets = fixture.calls.map((call) => call.options.timeoutMilliseconds);

  assert(budgetClock.now() < 500);
  assert(budgets.every((value) => value > 0 && value <= 500));
  assert(budgets.every((value, index) => index === 0 || value < budgets[index - 1]));
}

function assertLifecycleCleanupDiagnostics(): void {
  const operations: readonly LifecycleOperation[] = ["start", "reset"];

  for (const operation of operations) {
    for (const cleanupResult of [commandResult(), commandResult({ status: 7 })]) {
      const original = new Error(`${operation} primary failure`);
      const messages: string[] = [];
      let thrown: unknown;

      try {
        throwAfterLifecycleCleanup(operation, original, () => cleanupResult, {
          error: (message) => messages.push(message),
        });
      } catch (error) {
        thrown = error;
      }

      assert.equal(thrown, original);
      const secondary = getLifecycleCleanupFailure(original);

      if (cleanupResult.status === 0) {
        assert.equal(secondary, undefined);
        assert.deepEqual(messages, []);
      } else {
        assert(secondary);
        assert.match(secondary.message, new RegExp(operation, "u"));
        assert.equal(messages.length, 1);
      }
    }

    const original = new Error(`${operation} thrown cleanup primary`);

    assert.throws(
      () =>
        throwAfterLifecycleCleanup(
          operation,
          original,
          () => {
            throw new Error("fixture cleanup detail");
          },
          { error: () => undefined },
        ),
      (error) => error === original,
    );
    const cleanupFailure = getLifecycleCleanupFailure(original)?.message ?? "";

    assert.match(cleanupFailure, new RegExp(operation, "u"));
    assert.doesNotMatch(cleanupFailure, /fixture cleanup detail/u);
  }
}

const checks = [
  ["Docker endpoint allowlist", assertEndpointAllowlist],
  ["immutable pinned Docker target", assertPinnedTargetSelection],
  ["Docker and Supabase child environment pinning", assertPinnedChildEnvironment],
  ["typed readiness policy", assertTypedReadinessPolicy],
  ["monotonic readiness deadline", assertMonotonicDeadline],
  ["lifecycle cleanup diagnostics", assertLifecycleCleanupDiagnostics],
] as const;

for (const [name, check] of checks) {
  check();
  console.log(`PASS ${name}`);
}

console.log("Local Docker boundary verification passed.");
