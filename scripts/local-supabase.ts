import { strict as assert } from "node:assert";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  assertCommandPassed,
  assertLocalSupabaseStack,
  type CommandEnvironment,
  createCommandRunner,
  ensureOwnedLoopbackNetwork,
  localNetworkName,
  type CommandResult,
  type CommandRunner,
  type MonotonicClock,
  type ValidatedDockerTarget,
  validateLocalDockerTarget,
  waitForLocalSupabaseStack,
} from "./local-docker.ts";

export type LocalSupabaseMode = "reset" | "start" | "status" | "stop";
export type LifecycleOperation = "reset" | "start";

type SafeLogger = Readonly<{
  error: (message: string) => void;
  log: (message: string) => void;
}>;

export type LocalSupabaseDependencies = Readonly<{
  clock?: MonotonicClock;
  environment?: CommandEnvironment;
  logger?: SafeLogger;
  runCommand?: CommandRunner;
}>;

type LifecycleError = Error & { cleanupFailure?: Error };

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lifecycleTimeoutMilliseconds = 180_000;
const statusTimeoutMilliseconds = 30_000;
const stopTimeoutMilliseconds = 60_000;

function runSupabase(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  args: readonly string[],
  label: string,
  timeoutMilliseconds: number,
): CommandResult {
  const pnpmEntry = target.environment.npm_execpath;

  assert(pnpmEntry, "Bu komut pnpm package script üzerinden çalıştırılmalıdır.");

  return runCommand(
    process.execPath,
    [pnpmEntry, "exec", "supabase", ...args],
    label,
    {
      environment: target.environment,
      timeoutMilliseconds,
    },
  );
}

function attachCleanupFailure(primary: Error, cleanupFailure: Error): void {
  // Cleanup tanısı ayrı tutulur; böylece operasyonun ilk güvenlik hatası stack ve kimliğini korur.
  Object.defineProperty(primary, "cleanupFailure", {
    configurable: true,
    enumerable: false,
    value: cleanupFailure,
    writable: false,
  });
}

export function getLifecycleCleanupFailure(error: Error): Error | undefined {
  return (error as LifecycleError).cleanupFailure;
}

export function throwAfterLifecycleCleanup(
  operation: LifecycleOperation,
  originalError: unknown,
  cleanup: () => CommandResult,
  logger: Pick<SafeLogger, "error"> = console,
): never {
  const primaryError =
    originalError instanceof Error
      ? originalError
      : new Error(`Supabase local ${operation} lifecycle başarısız oldu.`);
  let cleanupFailure: Error | undefined;

  try {
    const result = cleanup();

    if (result.timedOut) {
      cleanupFailure = new Error(
        `Supabase local ${operation} lifecycle cleanup zaman aşımına uğradı.`,
      );
    } else if (result.launchFailed) {
      cleanupFailure = new Error(
        `Supabase local ${operation} lifecycle cleanup başlatılamadı.`,
      );
    } else if (result.status !== 0) {
      cleanupFailure = new Error(
        `Supabase local ${operation} lifecycle cleanup başarısız oldu (exit ${result.status}).`,
      );
    }
  } catch {
    cleanupFailure = new Error(
      `Supabase local ${operation} lifecycle cleanup başlatılamadı.`,
    );
  }

  if (cleanupFailure) {
    attachCleanupFailure(primaryError, cleanupFailure);
    // Child çıktısı yazdırılmaz; yalnız operasyon etiketiyle güvenli ikincil tanı sağlanır.
    logger.error(cleanupFailure.message);
  }

  throw primaryError;
}

function stopAfterUnsafeLifecycle(
  operation: LifecycleOperation,
  error: unknown,
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
  logger: SafeLogger,
): never {
  return throwAfterLifecycleCleanup(
    operation,
    error,
    () =>
      runSupabase(
        runCommand,
        target,
        ["stop"],
        `Supabase local ${operation} cleanup`,
        stopTimeoutMilliseconds,
      ),
    logger,
  );
}

export function runLocalSupabase(
  mode: LocalSupabaseMode,
  dependencies: LocalSupabaseDependencies = {},
): void {
  const runCommand =
    dependencies.runCommand ?? createCommandRunner(workspaceRoot);
  const parentEnvironment = dependencies.environment ?? process.env;
  const logger = dependencies.logger ?? console;
  const target = validateLocalDockerTarget(runCommand, parentEnvironment);
  const readinessOptions = dependencies.clock
    ? { clock: dependencies.clock }
    : undefined;

  if (mode === "reset") {
    ensureOwnedLoopbackNetwork(runCommand, target);
    waitForLocalSupabaseStack(runCommand, target, readinessOptions);

    try {
      const result = runSupabase(
        runCommand,
        target,
        ["db", "reset", "--local", "--network-id", localNetworkName],
        "Supabase local reset",
        lifecycleTimeoutMilliseconds,
      );

      assertCommandPassed(result, "Supabase local reset");
      // Exit code seed aşamasının gerçekten çalıştığını kanıtlamadığı için güvenli sabit çıktı aranır.
      assert.match(
        `${result.stdout}\n${result.stderr}`,
        /Seeding data from supabase[/\\]seed\.sql/u,
      );
      waitForLocalSupabaseStack(runCommand, target, readinessOptions);
    } catch (error) {
      stopAfterUnsafeLifecycle(
        "reset",
        error,
        runCommand,
        target,
        logger,
      );
    }

    logger.log("Supabase local database reset completed with migrations and seed.");
    return;
  }

  if (mode === "start") {
    ensureOwnedLoopbackNetwork(runCommand, target);

    try {
      const result = runSupabase(
        runCommand,
        target,
        ["start", "--network-id", localNetworkName],
        "Supabase local start",
        lifecycleTimeoutMilliseconds,
      );

      // Başlangıç çıktısındaki local development keys terminal ve log sızıntısına karşı bastırılır.
      assertCommandPassed(result, "Supabase local start");
      waitForLocalSupabaseStack(runCommand, target, readinessOptions);
    } catch (error) {
      stopAfterUnsafeLifecycle(
        "start",
        error,
        runCommand,
        target,
        logger,
      );
    }

    logger.log("Supabase local stack started on loopback-only bindings.");
    return;
  }

  if (mode === "status") {
    const result = runSupabase(
      runCommand,
      target,
      ["status", "--output", "json"],
      "Supabase local status",
      statusTimeoutMilliseconds,
    );

    // JSON durum çıktısı local anahtarlar içerdiği için yalnız readiness sonucu yayınlanır.
    assertCommandPassed(result, "Supabase local status");
    assertLocalSupabaseStack(runCommand, target);
    logger.log("Supabase local stack is ready; sensitive status values suppressed.");
    return;
  }

  const result = runSupabase(
    runCommand,
    target,
    ["stop"],
    "Supabase local stop",
    stopTimeoutMilliseconds,
  );

  assertCommandPassed(result, "Supabase local stop");
  logger.log("Supabase local stack stopped.");
}

const entryPoint = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href
  : undefined;

if (entryPoint === import.meta.url) {
  const mode = process.argv[2];

  assert(
    mode === "reset" ||
      mode === "start" ||
      mode === "status" ||
      mode === "stop",
    "Mode must be `reset`, `start`, `status` or `stop`.",
  );
  runLocalSupabase(mode);
}
