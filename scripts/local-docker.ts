import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { performance } from "node:perf_hooks";

export type CommandResult = Readonly<{
  launchFailed: boolean;
  status: number;
  stderr: string;
  stdout: string;
  timedOut: boolean;
}>;

export type CommandEnvironment = Readonly<Record<string, string | undefined>>;

export type CommandOptions = Readonly<{
  environment: CommandEnvironment;
  timeoutMilliseconds: number;
}>;

export type CommandRunner = (
  executable: string,
  args: readonly string[],
  label: string,
  options: CommandOptions,
) => CommandResult;

export type ValidatedDockerTarget = Readonly<{
  endpoint: string;
  environment: CommandEnvironment;
}>;

export type MonotonicClock = Readonly<{
  now: () => number;
  sleep: (milliseconds: number) => void;
}>;

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

type ReadinessDeadline = Readonly<{
  clock: MonotonicClock;
  expiresAt: number;
}>;

export type ReadinessOptions = Readonly<{
  clock?: MonotonicClock;
  maxAttempts?: number;
  pollIntervalMilliseconds?: number;
  timeoutMilliseconds?: number;
}>;

export type TransientReadinessCode =
  | "container-missing"
  | "health-starting"
  | "not-yet-running";

type ContainerReadinessState =
  | Readonly<{ kind: "health-missing-allowed" }>
  | Readonly<{ kind: "healthy" }>
  | Readonly<{ kind: "starting" }>
  | Readonly<{ kind: "unhealthy" }>
  | Readonly<{ kind: "not-yet-running" }>;

export class TransientReadinessError extends Error {
  readonly code: TransientReadinessCode;

  constructor(code: TransientReadinessCode, message: string) {
    super(message);
    this.name = "TransientReadinessError";
    this.code = code;
  }
}

export class CommandTimeoutError extends Error {
  constructor(label: string) {
    super(`${label} zaman aşımına uğradı.`);
    this.name = "CommandTimeoutError";
  }
}

export class ReadinessDeadlineError extends Error {
  constructor() {
    super("Local Supabase readiness deadline aşıldı.");
    this.name = "ReadinessDeadlineError";
  }
}

export class ReadinessAttemptLimitError extends Error {
  constructor() {
    super("Local Supabase readiness deneme sınırına ulaştı.");
    this.name = "ReadinessAttemptLimitError";
  }
}

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

export const approvedUnixDockerEndpoints = Object.freeze([
  "unix:///var/run/docker.sock",
  "unix:///run/docker.sock",
]);

const defaultDockerCommandTimeoutMilliseconds = 10_000;
const defaultReadinessTimeoutMilliseconds = 30_000;
const defaultPollIntervalMilliseconds = 1_000;
const defaultMaxAttempts = 100;
const loopbackOption = "com.docker.network.bridge.host_binding_ipv4";
const networkOwnerLabel = "com.infravolt.owner";
const networkOwner = "local-supabase-foundation";
const projectLabel = "com.supabase.cli.project";
const containersWithoutHealthChecks = new Set(["supabase_rest_infravolt"]);
const dockerSelectionVariables = new Set([
  "DOCKER_CONTEXT",
  "DOCKER_HOST",
  "DOCKER_TLS",
  "DOCKER_TLS_VERIFY",
  "DOCKER_CERT_PATH",
]);

const systemClock: MonotonicClock = Object.freeze({
  now: () => performance.now(),
  sleep: (milliseconds) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
  },
});

export function createCommandRunner(workspaceRoot: string): CommandRunner {
  return (executable, args, _label, options) => {
    assert(
      Number.isFinite(options.timeoutMilliseconds) &&
        options.timeoutMilliseconds > 0,
      "Command timeout must be a positive finite duration.",
    );

    const result = spawnSync(executable, args, {
      cwd: workspaceRoot,
      encoding: "utf8",
      env: options.environment as NodeJS.ProcessEnv,
      maxBuffer: 40 * 1024 * 1024,
      shell: false,
      timeout: Math.max(1, Math.floor(options.timeoutMilliseconds)),
    });
    const errorCode = (result.error as NodeJS.ErrnoException | undefined)?.code;

    return Object.freeze({
      launchFailed: result.error !== undefined && errorCode !== "ETIMEDOUT",
      status: result.status ?? -1,
      stderr: result.stderr ?? "",
      stdout: result.stdout ?? "",
      timedOut: errorCode === "ETIMEDOUT",
    });
  };
}

export function assertCommandPassed(result: CommandResult, label: string): void {
  if (result.timedOut) {
    throw new CommandTimeoutError(label);
  }

  assert(!result.launchFailed, `${label} süreci başlatılamadı.`);
  assert.equal(result.status, 0, `${label} başarısız oldu (exit ${result.status}).`);
}

function parseJson<T>(value: string, label: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    // Ham child çıktısı credential içerebileceği için parse hatasında yalnız güvenli etiket raporlanır.
    throw new Error(`${label} geçerli JSON döndürmedi.`);
  }
}

function snapshotEnvironment(
  environment: CommandEnvironment,
): CommandEnvironment {
  return Object.freeze({ ...environment });
}

export function normalizeLocalDockerEndpoint(endpoint: string): string {
  // Socket biçimi tek başına yerellik kanıtı değildir; yalnız dokümante edilen doğrudan daemon yolları kabul edilir.
  const candidate = endpoint.trim();
  const namedPipe = candidate.match(
    /^npipe:\/{4}\.\/pipe\/(dockerDesktopLinuxEngine|docker_engine)$/iu,
  );

  if (namedPipe) {
    return namedPipe[1].toLowerCase() === "docker_engine"
      ? "npipe:////./pipe/docker_engine"
      : "npipe:////./pipe/dockerDesktopLinuxEngine";
  }

  if (approvedUnixDockerEndpoints.includes(candidate)) {
    return candidate;
  }

  const rootlessSocket = candidate.match(
    /^unix:\/\/\/run\/user\/(0|[1-9]\d*)\/docker\.sock$/u,
  );

  if (rootlessSocket) {
    return candidate;
  }

  const desktopSocket = candidate.match(
    /^unix:\/\/\/(Users|home)\/([A-Za-z0-9._-]+)\/\.docker\/(run|desktop)\/docker\.sock$/u,
  );

  if (
    desktopSocket &&
    desktopSocket[2] !== "." &&
    desktopSocket[2] !== ".."
  ) {
    return candidate;
  }

  throw new Error("Docker endpoint approved local socket allowlist içinde değil.");
}

export function createPinnedDockerEnvironment(
  parentEnvironment: CommandEnvironment,
  endpoint: string,
): CommandEnvironment {
  const environment: Record<string, string | undefined> = {};

  // Windows ortam anahtarları case-insensitive olduğu için tüm casing varyantları kopyalama sırasında elenir.
  for (const [key, value] of Object.entries(parentEnvironment)) {
    if (!dockerSelectionVariables.has(key.toUpperCase())) {
      environment[key] = value;
    }
  }

  environment.DOCKER_HOST = endpoint;
  return Object.freeze(environment);
}

function inspectDockerContext(
  runCommand: CommandRunner,
  environment: CommandEnvironment,
  contextName: string,
): string {
  const result = runCommand(
    "docker",
    ["context", "inspect", contextName],
    "Docker context inspection",
    {
      environment,
      timeoutMilliseconds: defaultDockerCommandTimeoutMilliseconds,
    },
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

function readEnvironmentValue(
  environment: CommandEnvironment,
  expectedName: string,
): string | undefined {
  const entry = Object.entries(environment).find(
    ([name]) => name.toUpperCase() === expectedName,
  );
  const value = entry?.[1]?.trim();

  return value || undefined;
}

function resolveDockerEndpoint(
  runCommand: CommandRunner,
  environment: CommandEnvironment,
): string {
  const explicitContext = readEnvironmentValue(environment, "DOCKER_CONTEXT");

  // Docker'ın kendi önceliği korunur; DOCKER_CONTEXT varsa DOCKER_HOST seçimi etkisizdir.
  if (explicitContext) {
    return inspectDockerContext(runCommand, environment, explicitContext);
  }

  const explicitHost = readEnvironmentValue(environment, "DOCKER_HOST");

  if (explicitHost) {
    return explicitHost;
  }

  const currentContext = runCommand(
    "docker",
    ["context", "show"],
    "Docker context selection",
    {
      environment,
      timeoutMilliseconds: defaultDockerCommandTimeoutMilliseconds,
    },
  );

  assertCommandPassed(currentContext, "Docker context selection");
  const contextName = currentContext.stdout.trim();

  assert(contextName, "Docker context is missing.");
  return inspectDockerContext(runCommand, environment, contextName);
}

export function validateLocalDockerTarget(
  runCommand: CommandRunner,
  parentEnvironment: CommandEnvironment,
): ValidatedDockerTarget {
  // Seçim bir kez snapshot edilir; doğrulama sonrası context veya parent env değişikliği child hedefini etkileyemez.
  const bootstrapEnvironment = snapshotEnvironment(parentEnvironment);
  const endpoint = normalizeLocalDockerEndpoint(
    resolveDockerEndpoint(runCommand, bootstrapEnvironment),
  );
  const environment = createPinnedDockerEnvironment(
    bootstrapEnvironment,
    endpoint,
  );
  const engine = runCommand(
    "docker",
    ["info", "--format", "{{.OSType}}"],
    "Docker engine",
    {
      environment,
      timeoutMilliseconds: defaultDockerCommandTimeoutMilliseconds,
    },
  );

  assertCommandPassed(engine, "Docker engine");
  assert.equal(engine.stdout.trim(), "linux", "Docker engine must use Linux containers.");

  return Object.freeze({ endpoint, environment });
}

function remainingDeadlineMilliseconds(deadline: ReadinessDeadline): number {
  const remaining = Math.floor(deadline.expiresAt - deadline.clock.now());

  if (remaining < 1) {
    throw new ReadinessDeadlineError();
  }

  return remaining;
}

function commandTimeout(
  deadline: ReadinessDeadline | undefined,
): number {
  // Her Docker child hem kendi üst sınırına hem de kalan monotonic bütçeye tabidir.
  return deadline
    ? Math.min(
        defaultDockerCommandTimeoutMilliseconds,
        remainingDeadlineMilliseconds(deadline),
      )
    : defaultDockerCommandTimeoutMilliseconds;
}

function runDocker(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  args: readonly string[],
  label: string,
  deadline?: ReadinessDeadline,
): CommandResult {
  return runCommand("docker", args, label, {
    environment: target.environment,
    timeoutMilliseconds: commandTimeout(deadline),
  });
}

function readNetworkInspection(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  deadline?: ReadinessDeadline,
): DockerNetworkInspection {
  const result = runDocker(
    runCommand,
    target,
    ["network", "inspect", localNetworkName],
    "Local Docker network inspection",
    deadline,
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
  target: ValidatedDockerTarget,
  requireCompleteStack: boolean,
  deadline?: ReadinessDeadline,
): void {
  assertOwnedNetworkMetadata(
    readNetworkInspection(runCommand, target, deadline),
    requireCompleteStack,
  );
}

export function ensureOwnedLoopbackNetwork(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
): void {
  const listed = runDocker(
    runCommand,
    target,
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
    assertOwnedLoopbackNetwork(runCommand, target, false);
    return;
  }

  const created = runDocker(
    runCommand,
    target,
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
  assertOwnedLoopbackNetwork(runCommand, target, false);
}

function assertContainerSecurityMetadata(
  container: DockerContainerInspection,
  name: string,
): void {
  assert.equal(container.Config?.Labels?.[projectLabel], "infravolt");
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
}

// Yalnız açık convergence durumları transient tipe dönüşür; bilinmeyen metadata retry ile gizlenmez.
function classifyContainerReadiness(
  container: DockerContainerInspection,
  name: string,
): ContainerReadinessState {
  const status = container.State?.Status;
  const restarting = container.State?.Restarting;
  const running = container.State?.Running;

  if (
    running !== true &&
    (status === "created" || status === "restarting" || restarting === true)
  ) {
    return { kind: "not-yet-running" };
  }

  assert.equal(running, true, `${name} is not running.`);
  assert.equal(restarting, false, `${name} is restarting.`);
  assert.equal(status, "running", `${name} is not ready.`);

  const health = container.State?.Health;

  if (health === undefined) {
    assert(
      containersWithoutHealthChecks.has(name),
      `${name} is missing its required health check.`,
    );
    return { kind: "health-missing-allowed" };
  }

  if (health.Status === "starting") {
    return { kind: "starting" };
  }

  if (health.Status === "healthy") {
    return { kind: "healthy" };
  }

  if (health.Status === "unhealthy") {
    return { kind: "unhealthy" };
  }

  throw new Error(`${name} has malformed health status metadata.`);
}

function assertContainerReadiness(
  container: DockerContainerInspection,
  name: string,
): void {
  const readiness = classifyContainerReadiness(container, name);

  if (
    readiness.kind === "healthy" ||
    readiness.kind === "health-missing-allowed"
  ) {
    return;
  }

  if (readiness.kind === "starting") {
    throw new TransientReadinessError(
      "health-starting",
      `${name} health kontrolü henüz hazır değil.`,
    );
  }

  if (readiness.kind === "not-yet-running") {
    throw new TransientReadinessError(
      "not-yet-running",
      `${name} henüz çalışır durumda değil.`,
    );
  }

  assert.fail(`${name} is unhealthy.`);
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
    // Ownership, network ve binding hataları readiness retry'sinden önce terminal olarak değerlendirilir.
    assertContainerSecurityMetadata(container, name);
    assertContainerReadiness(container, name);

    return name;
  });

  assert.deepEqual(
    [...inspectedNames].sort(),
    [...expectedSupabaseContainers].sort(),
  );
}

function inspectExpectedContainerNames(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  deadline?: ReadinessDeadline,
): void {
  const result = runDocker(
    runCommand,
    target,
    [
      "ps",
      "-a",
      "--filter",
      `label=${projectLabel}=infravolt`,
      "--format",
      "{{.Names}}",
    ],
    "Local Supabase container discovery",
    deadline,
  );

  assertCommandPassed(result, "Local Supabase container discovery");
  const names = result.stdout.trim().split(/\r?\n/gu).filter(Boolean);
  const unexpected = names.filter(
    (name) => !expectedSupabaseContainers.includes(name),
  );

  assert.equal(unexpected.length, 0, "Unexpected InfraVolt project container exists.");

  if (expectedSupabaseContainers.some((name) => !names.includes(name))) {
    const allContainers = runDocker(
      runCommand,
      target,
      ["ps", "-a", "--format", "{{.Names}}"],
      "Local Docker container name collision inspection",
      deadline,
    );

    assertCommandPassed(
      allContainers,
      "Local Docker container name collision inspection",
    );
    const allNames = allContainers.stdout.trim().split(/\r?\n/gu).filter(Boolean);
    const foreignCollisions = allNames.filter(
      (name) => expectedSupabaseContainers.includes(name) && !names.includes(name),
    );

    assert.equal(
      foreignCollisions.length,
      0,
      "Expected local container name is owned by a foreign project.",
    );
    throw new TransientReadinessError(
      "container-missing",
      "Expected local container is not present yet.",
    );
  }
}

export function assertLocalSupabaseStack(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  deadline?: ReadinessDeadline,
): void {
  // Foreign network üyeleri, eksik container convergence durumundan önce terminal olarak reddedilir.
  assertOwnedLoopbackNetwork(runCommand, target, false, deadline);
  inspectExpectedContainerNames(runCommand, target, deadline);
  const result = runDocker(
    runCommand,
    target,
    ["inspect", ...expectedSupabaseContainers],
    "Local Supabase container inspection",
    deadline,
  );

  if (
    result.status !== 0 &&
    /(?:No such object|No such container)/iu.test(result.stderr)
  ) {
    throw new TransientReadinessError(
      "container-missing",
      "Expected local container is not present yet.",
    );
  }

  assertCommandPassed(result, "Local Supabase container inspection");
  // Inspect çıktısı local anahtarlar içerebildiği için parse edilir ancak hiçbir zaman terminale yazılmaz.
  const containers = parseJson<readonly DockerContainerInspection[]>(
    result.stdout,
    "Local Supabase container inspection",
  );

  assertSupabaseContainerMetadata(containers);
  assertOwnedLoopbackNetwork(runCommand, target, true, deadline);
}

export function waitForLocalSupabaseStack(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  options: ReadinessOptions = {},
): void {
  const clock = options.clock ?? systemClock;
  const timeoutMilliseconds =
    options.timeoutMilliseconds ?? defaultReadinessTimeoutMilliseconds;
  const pollIntervalMilliseconds =
    options.pollIntervalMilliseconds ?? defaultPollIntervalMilliseconds;
  const maxAttempts = options.maxAttempts ?? defaultMaxAttempts;

  assert(
    Number.isFinite(timeoutMilliseconds) && timeoutMilliseconds > 0,
    "Readiness timeout must be a positive finite duration.",
  );
  assert(
    Number.isFinite(pollIntervalMilliseconds) && pollIntervalMilliseconds >= 0,
    "Readiness poll interval must be finite and non-negative.",
  );
  assert(Number.isInteger(maxAttempts) && maxAttempts > 0);

  const deadline: ReadinessDeadline = Object.freeze({
    clock,
    expiresAt: clock.now() + timeoutMilliseconds,
  });
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    remainingDeadlineMilliseconds(deadline);

    try {
      assertLocalSupabaseStack(runCommand, target, deadline);
      return;
    } catch (error) {
      if (!(error instanceof TransientReadinessError)) {
        throw error;
      }

    }

    const remaining = remainingDeadlineMilliseconds(deadline);
    const sleepMilliseconds = Math.min(pollIntervalMilliseconds, remaining);

    if (sleepMilliseconds > 0) {
      // Monotonic kalan süreyle sınırlı uyku, sistem saati değişse de deadline'ın aşılmasını önler.
      clock.sleep(sleepMilliseconds);
    }
  }

  throw new ReadinessAttemptLimitError();
}
