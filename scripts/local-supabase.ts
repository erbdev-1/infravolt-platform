import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertLocalDockerEngine,
  assertLocalSupabaseStack,
  ensureOwnedLoopbackNetwork,
  localNetworkName,
  type CommandResult,
  waitForLocalSupabaseStack,
} from "./local-docker.ts";

type Mode = "reset" | "start" | "status" | "stop";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Alt süreç çıktısını bellekte tutar; local CLI anahtarlarını terminale taşımamak için stdio miras alınmaz.
 */
function runCommand(
  executable: string,
  args: readonly string[],
  label: string,
): CommandResult {
  const result = spawnSync(executable, args, {
    cwd: workspaceRoot,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 40 * 1024 * 1024,
    shell: false,
  });

  assert.equal(result.error, undefined, `${label} süreci başlatılamadı.`);

  return Object.freeze({
    status: result.status ?? -1,
    stderr: result.stderr,
    stdout: result.stdout,
  });
}

/**
 * Proje-local CLI kullanımını garanti eder ve global executable çözümlemesini devre dışı bırakır.
 */
function runSupabase(args: readonly string[]): CommandResult {
  const pnpmEntry = process.env.npm_execpath;

  assert(pnpmEntry, "Bu komut pnpm package script üzerinden çalıştırılmalıdır.");

  return runCommand(
    process.execPath,
    [pnpmEntry, "exec", "supabase", ...args],
    "Supabase CLI",
  );
}

function stopAfterUnsafeLifecycle(error: unknown): never {
  try {
    const cleanup = runSupabase(["stop"]);

    if (cleanup.status !== 0) {
      console.error("Güvensiz local startup cleanup tamamlanamadı; asıl sınır hatası korunuyor.");
    }
  } catch {
    // Cleanup başlatılamasa bile ilk network, binding veya health hatası değiştirilmez.
    console.error("Güvensiz local startup cleanup başlatılamadı; asıl sınır hatası korunuyor.");
  }

  throw error;
}

/**
 * Local stack lifecycle komutlarını güvenli ağ ve redacted çıktı sözleşmesi altında yürütür.
 * Bu wrapper development ve ileride CI tarafından aynı davranışla çağrılabilir.
 */
function run(mode: Mode): void {
  // `--local` cloud projesini engeller; bu ek sınır Docker daemon'un da bu makinede olduğunu kanıtlar.
  assertLocalDockerEngine(runCommand);

  if (mode === "reset") {
    ensureOwnedLoopbackNetwork(runCommand);
    waitForLocalSupabaseStack(runCommand);
    const result = runSupabase([
      "db",
      "reset",
      "--local",
      "--network-id",
      localNetworkName,
    ]);

    assert.equal(
      result.status,
      0,
      `Supabase local reset failed (exit ${result.status}).`,
    );
    // Exit code tek başına seed aşamasının gerçekten çalıştığını kanıtlamadığı için güvenli sabit çıktı aranır.
    assert.match(
      `${result.stdout}\n${result.stderr}`,
      /Seeding data from supabase[/\\]seed\.sql/u,
    );
    try {
      waitForLocalSupabaseStack(runCommand);
    } catch (error) {
      stopAfterUnsafeLifecycle(error);
    }
    console.log("Supabase local database reset completed with migrations and seed.");
    return;
  }

  if (mode === "start") {
    ensureOwnedLoopbackNetwork(runCommand);
    const result = runSupabase(["start", "--network-id", localNetworkName]);

    // Başlangıç çıktısındaki local development keys gereksiz terminal ve log sızıntısına karşı bastırılır.
    assert.equal(
      result.status,
      0,
      `Supabase local start failed (exit ${result.status}).`,
    );
    try {
      waitForLocalSupabaseStack(runCommand);
    } catch (error) {
      stopAfterUnsafeLifecycle(error);
    }
    console.log("Supabase local stack started on loopback-only bindings.");
    return;
  }

  if (mode === "status") {
    const result = runSupabase(["status", "--output", "json"]);

    // JSON durum çıktısı local anahtarlar içerdiği için yalnız readiness sonucu yayınlanır.
    assert.equal(
      result.status,
      0,
      `Supabase local status failed (exit ${result.status}).`,
    );
    assertLocalSupabaseStack(runCommand);
    console.log("Supabase local stack is ready; sensitive status values suppressed.");
    return;
  }

  const result = runSupabase(["stop"]);

  assert.equal(
    result.status,
    0,
    `Supabase local stop failed (exit ${result.status}).`,
  );
  console.log("Supabase local stack stopped.");
}

const mode = process.argv[2];

assert(
  mode === "reset" || mode === "start" || mode === "status" || mode === "stop",
  "Mode must be `reset`, `start`, `status` or `stop`.",
);
run(mode);
