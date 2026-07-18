import { strict as assert } from "node:assert";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertCommandPassed,
  assertLocalSupabaseStack,
  createCommandRunner,
  localNetworkName,
  type CommandRunner,
  type ValidatedDockerTarget,
  validateLocalDockerTarget,
} from "./local-docker.ts";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedTypesPath = join(
  workspaceRoot,
  "src",
  "types",
  "database.generated.ts",
);
const generatedHeader =
  "// Bu dosya yerel Supabase şemasından üretilir; elle değiştirmek yerine `pnpm db:types` çalıştırın.\n\n";

type Mode = "check" | "write";

/**
 * Satır sonu kodlaması ve terminal newline sayısının sahte drift üretmesini önler.
 * Satır içi whitespace veya şema içeriği değişmediği için semantik farklar görünür kalır.
 */
function normalizeGeneratedTypes(value: string): string {
  const normalized = value.replace(/\r\n/gu, "\n");

  return `${normalized.replace(/\n+$/u, "")}\n`;
}

/**
 * Yerel CLI'ı repository'nin pnpm çalıştırıcısıyla çağırır.
 * `npm_execpath` kullanımı, Windows `.cmd` çözümlemesine shell açmadan uyumluluk sağlar.
 */
function generateLocalTypes(
  runCommand: CommandRunner,
  target: ValidatedDockerTarget,
): string {
  const pnpmEntry = target.environment.npm_execpath;

  assert(pnpmEntry, "Bu komut pnpm package script üzerinden çalıştırılmalıdır.");
  // Doğrulanmış endpoint child environment'a sabitlenerek type üretiminde context yarışını engeller.
  assertLocalSupabaseStack(runCommand, target);
  const result = runCommand(
    process.execPath,
    [
      pnpmEntry,
      "exec",
      "supabase",
      "gen",
      "types",
      "typescript",
      "--local",
      "--network-id",
      localNetworkName,
    ],
    "Yerel database type üretimi",
    {
      environment: target.environment,
      timeoutMilliseconds: 120_000,
    },
  );

  // CLI hata çıktısı bağlantı bilgisi içerebileceği için yalnız güvenli durum bilgisi raporlanır.
  assertCommandPassed(result, "Yerel database type üretimi");
  assert(result.stdout.length > 0, "Yerel database type çıktısı boş olamaz.");

  return normalizeGeneratedTypes(`${generatedHeader}${result.stdout}`);
}

/**
 * Üretilen tipi kalıcı dosyaya yazar veya geçici kopyayla drift kontrolü yapar.
 * Check modu committed dosyayı değiştirmez ve geçici veriyi her durumda temizler.
 */
function run(mode: Mode): void {
  const runCommand = createCommandRunner(workspaceRoot);
  const target = validateLocalDockerTarget(runCommand, process.env);
  const generatedTypes = generateLocalTypes(runCommand, target);

  if (mode === "write") {
    writeFileSync(generatedTypesPath, generatedTypes, "utf8");
    console.log("Database types generated: src/types/database.generated.ts");
    return;
  }

  const temporaryRoot = mkdtempSync(join(tmpdir(), "infravolt-db-types-"));
  const temporaryPath = join(temporaryRoot, "database.generated.ts");
  let comparisonError: unknown;

  try {
    writeFileSync(temporaryPath, generatedTypes, "utf8");
    const committedTypes = normalizeGeneratedTypes(
      readFileSync(generatedTypesPath, "utf8"),
    );
    const temporaryTypes = normalizeGeneratedTypes(
      readFileSync(temporaryPath, "utf8"),
    );

    assert.equal(
      temporaryTypes,
      committedTypes,
      "Generated database types drifted; run `pnpm db:types`.",
    );
    console.log("Database type drift check passed.");
  } catch (error) {
    comparisonError = error;
  }

  try {
    // Başarısız karşılaştırmada da şema çıktısının geçici diskte kalmasını engeller.
    rmSync(temporaryRoot, { force: true, recursive: true });
  } catch {
    if (comparisonError !== undefined) {
      // Cleanup sorunu asıl drift veya okuma hatasını değiştirmeden ayrıca görünür kılınır.
      console.error("Database type geçici dizini temizlenemedi; asıl doğrulama hatası korunuyor.");
    } else {
      throw new Error("Database type geçici dizini temizlenemedi.");
    }
  }

  if (comparisonError !== undefined) {
    throw comparisonError;
  }
}

const mode = process.argv[2];

assert(mode === "write" || mode === "check", "Mode must be `write` or `check`.");
run(mode);
