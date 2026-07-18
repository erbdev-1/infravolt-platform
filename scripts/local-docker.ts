import { strict as assert } from "node:assert";

export type CommandResult = Readonly<{
  status: number;
  stderr: string;
  stdout: string;
}>;

export type CommandRunner = (
  executable: string,
  args: readonly string[],
  label: string,
) => CommandResult;

type DockerContextInspection = Readonly<{
  Endpoints?: Readonly<{
    docker?: Readonly<{ Host?: unknown }>;
  }>;
}>;

export type DockerNetworkInspection = Readonly<{
  Containers?: Readonly<Record<string, Readonly<{ Name?: unknown }>>> | null;
  Driver?: unknown;
  Labels?: Readonly<Record<string, string>> | null;
  Name?: unknown;
  Options?: Readonly<Record<string, string>> | null;
}>;

export type DockerContainerInspection = Readonly<{
  Config?: Readonly<{
    Labels?: Readonly<Record<string, string>> | null;
  }>;
  Name?: unknown;
  NetworkSettings?: Readonly<{
    Networks?: Readonly<Record<string, unknown>> | null;
    Ports?: Readonly<
      Record<
        string,
        readonly Readonly<{ HostIp?: unknown; HostPort?: unknown }>[] | null
      >
    > | null;
  }>;
  State?: Readonly<{
    Health?: Readonly<{ Status?: unknown }>;
    Restarting?: unknown;
    Running?: unknown;
    Status?: unknown;
  }>;
}>;

export const localNetworkName = "infravolt-local";
export const expectedSupabaseContainers = Object.freeze([
  "supabase_auth_infravolt",
  "supabase_db_infravolt",
  "supabase_inbucket_infravolt",
  "supabase_kong_infravolt",
  "supabase_pg_meta_infravolt",
  "supabase_realtime_infravolt",
  "supabase_rest_infravolt",
  "supabase_storage_infravolt",
  "supabase_studio_infravolt",
]);

const loopbackOption = "com.docker.network.bridge.host_binding_ipv4";
const networkOwnerLabel = "com.infravolt.owner";
const networkOwner = "local-supabase-foundation";
const projectLabel = "com.supabase.cli.project";

function assertCommandPassed(result: CommandResult, label: string): void {
  assert.equal(result.status, 0, `${label} başarısız oldu (exit ${result.status}).`);
}

function parseJson<T>(value: string, label: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    // Ham Docker çıktısı credential içerebileceği için parse hatasında yalnız güvenli etiket raporlanır.
    throw new Error(`${label} geçerli JSON döndürmedi.`);
  }
}

function inspectDockerContext(
  runCommand: CommandRunner,
  contextName: string,
): string {
  const result = runCommand(
    "docker",
    ["context", "inspect", contextName],
    "Docker context inspection",
  );

  assertCommandPassed(result, "Docker context inspection");
  const contexts = parseJson<readonly DockerContextInspection[]>(
    result.stdout,
    "Docker context inspection",
  );

  assert.equal(contexts.length, 1, "Exactly one Docker context must resolve.");
  const endpoint = contexts[0]?.Endpoints?.docker?.Host;

  if (typeof endpoint !== "string") {
    throw new Error("Docker context endpoint is missing.");
  }

  return endpoint;
}

function resolveDockerEndpoint(runCommand: CommandRunner): string {
  const explicitContext = process.env.DOCKER_CONTEXT?.trim();

  // Docker'ın kendi önceliği korunur; DOCKER_CONTEXT varsa DOCKER_HOST etkisizdir.
  if (explicitContext) {
    return inspectDockerContext(runCommand, explicitContext);
  }

  const explicitHost = process.env.DOCKER_HOST?.trim();

  if (explicitHost) {
    return explicitHost;
  }

  const currentContext = runCommand(
    "docker",
    ["context", "show"],
    "Docker context selection",
  );

  assertCommandPassed(currentContext, "Docker context selection");
  const contextName = currentContext.stdout.trim();

  assert(contextName, "Docker context is missing.");
  return inspectDockerContext(runCommand, contextName);
}

export function assertLocalDockerEndpoint(endpoint: string): void {
  const isLocalNamedPipe =
    /^npipe:\/{4}\.\/pipe\/(?:dockerDesktopLinuxEngine|docker_engine)$/u.test(
      endpoint,
    );
  const isLocalUnixSocket = /^unix:\/{3}[^\r\n]*docker\.sock$/u.test(endpoint);

  assert(
    isLocalNamedPipe || isLocalUnixSocket,
    "Docker endpoint must use a local named pipe or Unix socket.",
  );
}

export function assertLocalDockerEngine(runCommand: CommandRunner): void {
  assertLocalDockerEndpoint(resolveDockerEndpoint(runCommand));
  const engine = runCommand(
    "docker",
    ["info", "--format", "{{.OSType}}"],
    "Docker engine",
  );

  assertCommandPassed(engine, "Docker engine");
  assert.equal(engine.stdout.trim(), "linux", "Docker engine must use Linux containers.");
}

function readNetworkInspection(runCommand: CommandRunner): DockerNetworkInspection {
  const result = runCommand(
    "docker",
    ["network", "inspect", localNetworkName],
    "Local Docker network inspection",
  );

  assertCommandPassed(result, "Local Docker network inspection");
  const networks = parseJson<readonly DockerNetworkInspection[]>(
    result.stdout,
    "Local Docker network inspection",
  );

  assert.equal(networks.length, 1, "Exactly one InfraVolt local network must resolve.");
  return networks[0];
}

export function assertOwnedNetworkMetadata(
  network: DockerNetworkInspection,
  requireCompleteStack: boolean,
): void {
  assert.equal(network.Name, localNetworkName);
  assert.equal(network.Driver, "bridge");
  assert.equal(network.Options?.[loopbackOption], "127.0.0.1");
  assert.equal(network.Labels?.[networkOwnerLabel], networkOwner);

  const connectedNames = Object.values(network.Containers ?? {}).map(
    (container) => container.Name,
  );

  assert(
    connectedNames.every(
      (name) =>
        typeof name === "string" && expectedSupabaseContainers.includes(name),
    ),
    "InfraVolt local network contains an unexpected container.",
  );

  if (requireCompleteStack) {
    assert.deepEqual(
      [...connectedNames].sort(),
      [...expectedSupabaseContainers].sort(),
      "InfraVolt local network must contain the complete expected stack.",
    );
  }
}

export function assertOwnedLoopbackNetwork(
  runCommand: CommandRunner,
  requireCompleteStack: boolean,
): void {
  assertOwnedNetworkMetadata(readNetworkInspection(runCommand), requireCompleteStack);
}

export function ensureOwnedLoopbackNetwork(runCommand: CommandRunner): void {
  const listed = runCommand(
    "docker",
    [
      "network",
      "ls",
      "--filter",
      `name=^${localNetworkName}$`,
      "--format",
      "{{.Name}}",
    ],
    "Local Docker network discovery",
  );

  assertCommandPassed(listed, "Local Docker network discovery");
  const names = listed.stdout.trim().split(/\r?\n/gu).filter(Boolean);

  if (names.length > 0) {
    assert.deepEqual(names, [localNetworkName]);
    assertOwnedLoopbackNetwork(runCommand, false);
    return;
  }

  const created = runCommand(
    "docker",
    [
      "network",
      "create",
      "--driver",
      "bridge",
      "--label",
      `${networkOwnerLabel}=${networkOwner}`,
      "--opt",
      `${loopbackOption}=127.0.0.1`,
      localNetworkName,
    ],
    "Local Docker network creation",
  );

  assertCommandPassed(created, "Local Docker network creation");
  assertOwnedLoopbackNetwork(runCommand, false);
}

export function assertSupabaseContainerMetadata(
  containers: readonly DockerContainerInspection[],
): void {
  assert.equal(
    containers.length,
    expectedSupabaseContainers.length,
    "The complete InfraVolt local stack must be present.",
  );

  const inspectedNames = containers.map((container) => {
    const inspectedName = container.Name;

    if (typeof inspectedName !== "string") {
      throw new Error("Container name is missing.");
    }

    const name = inspectedName.replace(/^\//u, "");

    assert(expectedSupabaseContainers.includes(name), `Unexpected local container: ${name}`);
    assert.equal(container.Config?.Labels?.[projectLabel], "infravolt");
    assert.equal(container.State?.Running, true, `${name} is not running.`);
    assert.equal(container.State?.Restarting, false, `${name} is restarting.`);
    assert.equal(container.State?.Status, "running", `${name} is not ready.`);

    if (container.State?.Health !== undefined) {
      assert.equal(container.State.Health.Status, "healthy", `${name} is unhealthy.`);
    }

    assert.deepEqual(
      Object.keys(container.NetworkSettings?.Networks ?? {}),
      [localNetworkName],
      `${name} is attached to an unexpected Docker network.`,
    );

    for (const bindings of Object.values(container.NetworkSettings?.Ports ?? {})) {
      for (const binding of bindings ?? []) {
        assert(
          binding.HostIp === "127.0.0.1" || binding.HostIp === "::1",
          `${name} has a non-loopback published port.`,
        );
      }
    }

    return name;
  });

  assert.deepEqual(
    [...inspectedNames].sort(),
    [...expectedSupabaseContainers].sort(),
  );
}

export function assertLocalSupabaseStack(runCommand: CommandRunner): void {
  const result = runCommand(
    "docker",
    ["inspect", ...expectedSupabaseContainers],
    "Local Supabase container inspection",
  );

  assertCommandPassed(result, "Local Supabase container inspection");
  // Inspect çıktısı local anahtarlar içerebildiği için parse edilir ancak hiçbir zaman terminale yazılmaz.
  const containers = parseJson<readonly DockerContainerInspection[]>(
    result.stdout,
    "Local Supabase container inspection",
  );

  assertSupabaseContainerMetadata(containers);
  assertOwnedLoopbackNetwork(runCommand, true);
}

export function waitForLocalSupabaseStack(
  runCommand: CommandRunner,
  attempts = 30,
  intervalMilliseconds = 1_000,
): void {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      assertLocalSupabaseStack(runCommand);
      return;
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      // Supabase restart sonrası health geçişi gecikebilir; sınırlı retry kalıcı arızayı gizlemeden yarış durumunu emer.
      Atomics.wait(
        new Int32Array(new SharedArrayBuffer(4)),
        0,
        0,
        intervalMilliseconds,
      );
    }
  }

  throw lastError;
}
