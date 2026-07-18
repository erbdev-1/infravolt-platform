import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type Mode = "reset" | "start" | "status" | "stop";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const networkName = "infravolt-local";
const loopbackOption = "com.docker.network.bridge.host_binding_ipv4";

type CommandResult = Readonly<{
  status: number;
  stderr: string;
  stdout: string;
}>;

/**
 * Alt süreç çıktısını bellekte tutar; local CLI anahtarlarını terminale taşımamak için stdio miras alınmaz.
 */
function runCommand(executable: string, args: readonly string[]): CommandResult {
  const result = spawnSync(executable, args, {
    cwd: workspaceRoot,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 40 * 1024 * 1024,
    shell: false,
  });

  assert.equal(result.error, undefined, "Local Supabase süreci başlatılamadı.");

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

  return runCommand(process.execPath, [pnpmEntry, "exec", "supabase", ...args]);
}

/**
 * Docker ağını official local-security önerisine uygun loopback bind seçeneğiyle doğrular veya oluşturur.
 * Aynı isimde güvensiz bir ağ varsa otomatik değiştirmek yerine fail-safe davranır.
 */
function ensureLoopbackNetwork(): void {
  const inspected = runCommand("docker", [
    "network",
    "inspect",
    networkName,
    "--format",
    `{{.Driver}}|{{index .Options "${loopbackOption}"}}`,
  ]);

  if (inspected.status === 0) {
    assert.equal(
      inspected.stdout.trim(),
      "bridge|127.0.0.1",
      `Docker network ${networkName} is not loopback-only.`,
    );
    return;
  }

  const created = runCommand("docker", [
    "network",
    "create",
    "--driver",
    "bridge",
    "--opt",
    `${loopbackOption}=127.0.0.1`,
    networkName,
  ]);

  assert.equal(
    created.status,
    0,
    `Loopback-only Docker network could not be created (exit ${created.status}).`,
  );
}

/**
 * Local stack lifecycle komutlarını güvenli ağ ve redacted çıktı sözleşmesi altında yürütür.
 * Bu wrapper development ve ileride CI tarafından aynı davranışla çağrılabilir.
 */
function run(mode: Mode): void {
  if (mode === "reset") {
    ensureLoopbackNetwork();
    const result = runSupabase([
      "db",
      "reset",
      "--local",
      "--network-id",
      networkName,
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
    console.log("Supabase local database reset completed with migrations and seed.");
    return;
  }

  if (mode === "start") {
    ensureLoopbackNetwork();
    const result = runSupabase(["start", "--network-id", networkName]);

    // Başlangıç çıktısındaki local development keys gereksiz terminal ve log sızıntısına karşı bastırılır.
    assert.equal(
      result.status,
      0,
      `Supabase local start failed (exit ${result.status}).`,
    );
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
