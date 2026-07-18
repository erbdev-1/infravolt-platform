import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type CommandResult = Readonly<{
  status: number;
  stdout: string;
  stderr: string;
}>;

type Check = Readonly<{
  name: string;
  run: () => void;
}>;

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const supabaseRoot = join(workspaceRoot, "supabase");
const migrationsRoot = join(supabaseRoot, "migrations");
const generatedTypesPath = join(
  workspaceRoot,
  "src",
  "types",
  "database.generated.ts",
);
const expectedCliVersion = "2.109.1";
// UTC timestamp ve snake_case concern dışındaki adlar migration sırasını belirsizleştirebilir.
const migrationNamePattern = /^\d{14}_[a-z0-9]+(?:_[a-z0-9]+)*\.sql$/u;

/**
 * Alt süreci shell açmadan çalıştırır ve çıktıyı yalnız assertion amacıyla bellekte tutar.
 * Çağıran kod güvenli bir desen doğrulamadan stdout/stderr değerlerini yazdırmamalıdır.
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
    stdout: result.stdout,
    stderr: result.stderr,
  });
}

/**
 * Repository'nin pnpm çalıştırıcısını kullanarak komut çağırır.
 * Bu yol global CLI veya Windows'a özgü PATH varsayımı oluşmasını önler.
 */
function runPnpm(args: readonly string[], label: string): CommandResult {
  const pnpmEntry = process.env.npm_execpath;

  assert(pnpmEntry, "Bu doğrulama pnpm package script üzerinden çalıştırılmalıdır.");

  return runCommand(process.execPath, [pnpmEntry, ...args], label);
}

/**
 * CLI hata çıktısında yerel anahtar veya bağlantı metni bulunabileceği için başarısızlığı yalnız etiket ve exit code ile raporlar.
 */
function assertCommandPassed(result: CommandResult, label: string): void {
  assert.equal(
    result.status,
    0,
    `${label} başarısız oldu (exit ${result.status}).`,
  );
}

/** Proje-local Supabase binary'sini pnpm üzerinden ve global CLI'a düşmeden çağırır. */
function runSupabase(args: readonly string[], label: string): CommandResult {
  return runPnpm(["exec", "supabase", ...args], label);
}

/**
 * Local Postgres container'ını isim sözleşmesiyle tekil olarak bulur.
 * Birden fazla eşleşme, yanlış projede sorgu çalıştırma riskine karşı fail-safe kabul edilir.
 */
function findDatabaseContainer(): string {
  const result = runCommand(
    "docker",
    [
      "ps",
      "--filter",
      "name=^supabase_db_infravolt$",
      "--format",
      "{{.ID}}",
    ],
    "Database container discovery",
  );

  assertCommandPassed(result, "Database container discovery");
  const matches = result.stdout.trim().split(/\r?\n/gu).filter(Boolean);

  assert.equal(matches.length, 1, "Exactly one InfraVolt database container must run.");
  assert.match(matches[0], /^[a-f0-9]{12,64}$/u);

  return matches[0];
}

/**
 * Container içindeki local psql ile yalnız sabit doğrulama SQL'i çalıştırır.
 * Bağlantı URL'si veya database parolası süreç argümanlarına ve çıktıya girmez.
 */
function queryDatabase(sql: string): string {
  const containerId = findDatabaseContainer();
  const result = runCommand(
    "docker",
    [
      "exec",
      containerId,
      "psql",
      "--no-psqlrc",
      "-U",
      "postgres",
      "-d",
      "postgres",
      "-Atq",
      "-v",
      "ON_ERROR_STOP=1",
      "-c",
      sql,
    ],
    "Local database query",
  );

  assertCommandPassed(result, "Local database query");
  return result.stdout.trim();
}

/** Yayınlanan local portların tüm ağ arayüzleri yerine yalnız loopback'e bağlı olduğunu doğrular. */
function assertLocalBindings(): void {
  const result = runCommand(
    "docker",
    ["ps", "--filter", "name=_infravolt$", "--format", "{{.Names}}|{{.Ports}}"],
    "Local container binding inspection",
  );

  assertCommandPassed(result, "Local container binding inspection");
  const expectedContainers = [
    "supabase_auth_infravolt",
    "supabase_db_infravolt",
    "supabase_inbucket_infravolt",
    "supabase_kong_infravolt",
    "supabase_pg_meta_infravolt",
    "supabase_realtime_infravolt",
    "supabase_rest_infravolt",
    "supabase_storage_infravolt",
    "supabase_studio_infravolt",
  ];

  for (const container of expectedContainers) {
    assert(result.stdout.includes(`${container}|`), `Expected local container is not running: ${container}`);
  }

  assert(!/(?:unhealthy|restarting|exited)/iu.test(result.stdout));
  assert(!/(?:0\.0\.0\.0|\[::\]|:::):?\d/u.test(result.stdout));
}

/** Zorunlu local dosyaları, migration adlarını ve remote-link yokluğunu birlikte doğrular. */
function assertRepositoryFoundation(): void {
  const requiredPaths = [
    join(supabaseRoot, "config.toml"),
    migrationsRoot,
    join(supabaseRoot, "seed.sql"),
    generatedTypesPath,
  ];

  for (const requiredPath of requiredPaths) {
    assert(existsSync(requiredPath), `Required foundation path is missing: ${requiredPath}`);
  }

  const migrations = readdirSync(migrationsRoot).filter((name) => name.endsWith(".sql"));

  assert(migrations.length > 0, "At least one migration is required.");
  assert(migrations.every((name) => migrationNamePattern.test(name)));
  assert(migrations.some((name) => name.endsWith("_foundation_schemas.sql")));

  const config = readFileSync(join(supabaseRoot, "config.toml"), "utf8");

  assert.match(config, /project_id\s*=\s*"infravolt"/u);
  assert.match(config, /schemas\s*=\s*\["public", "graphql_public"\]/u);
  assert(!/project_ref|access_token|postgres(?:ql)?:\/\//iu.test(config));
  assert(!existsSync(join(supabaseRoot, ".temp", "project-ref")));
}

/** Çalışan CLI sürümünün exact package pin'iyle aynı olduğunu doğrular. */
function assertPinnedCli(): void {
  const packageJson = JSON.parse(
    readFileSync(join(workspaceRoot, "package.json"), "utf8"),
  ) as { devDependencies?: Record<string, string> };

  assert.equal(packageJson.devDependencies?.supabase, expectedCliVersion);

  const result = runSupabase(["--version"], "Supabase CLI version");

  assertCommandPassed(result, "Supabase CLI version");
  assert.equal(result.stdout.trim(), expectedCliVersion);
}

/** Local Supabase'in ihtiyaç duyduğu erişilebilir Linux container engine sınırını doğrular. */
function assertDockerReady(): void {
  const result = runCommand("docker", ["info", "--format", "{{.OSType}}"], "Docker engine");

  assertCommandPassed(result, "Docker engine");
  assert.equal(result.stdout.trim(), "linux");
}

/**
 * Reset çıktısındaki sabit seed aşamasını doğrular; yalnız exit code kontrolü seed'in atlanmasını gizleyebilirdi.
 */
function resetAndAssertSeed(): void {
  const result = runPnpm(["db:reset"], "Local database reset");

  assertCommandPassed(result, "Local database reset");
  assert.match(
    result.stdout,
    /Supabase local database reset completed with migrations and seed\./u,
  );
}

/** INF-06 public/private sınırını effective PostgreSQL privileges üzerinden ölçer. */
function assertSchemasAndGrants(): void {
  assert.equal(
    queryDatabase(`
      select
        to_regnamespace('public') is not null,
        to_regnamespace('private') is not null,
        has_schema_privilege('anon', 'public', 'usage'),
        has_schema_privilege('authenticated', 'public', 'usage'),
        not has_schema_privilege('anon', 'public', 'create'),
        not has_schema_privilege('authenticated', 'public', 'create'),
        not has_schema_privilege('anon', 'private', 'usage'),
        not has_schema_privilege('authenticated', 'private', 'usage'),
        has_schema_privilege('service_role', 'private', 'usage'),
        not has_schema_privilege('service_role', 'private', 'create');
    `),
    "t|t|t|t|t|t|t|t|t|t",
  );
}

/**
 * Geçici nesnelerle varsayılan grant davranışını sınar ve transaction'ı rollback eder.
 * Böylece test kalıntısı bırakmadan gelecekteki nesnelerin browser rollerine açılmadığı kanıtlanır.
 */
function assertDefaultPrivileges(): void {
  assert.equal(
    queryDatabase(`
      begin;
      create table public._infravolt_verify_public (id integer);
      create table private._infravolt_verify_private (id integer);
      create sequence public._infravolt_verify_sequence;
      create function public._infravolt_verify_function()
        returns integer language sql as 'select 1';
      select
        not has_table_privilege('anon', 'public._infravolt_verify_public', 'select'),
        not has_table_privilege('authenticated', 'public._infravolt_verify_public', 'select'),
        not has_table_privilege('service_role', 'public._infravolt_verify_public', 'select'),
        not has_table_privilege('anon', 'private._infravolt_verify_private', 'select'),
        not has_sequence_privilege('anon', 'public._infravolt_verify_sequence', 'usage'),
        not has_function_privilege('anon', 'public._infravolt_verify_function()', 'execute');
      rollback;
    `),
    "t|t|t|t|t|t",
  );
}

/** Fresh type çıktısının committed sözleşmeyle aynı ve uygulama DTO'larından bağımsız olduğunu doğrular. */
function assertTypeDrift(): void {
  const result = runPnpm(["db:types:check"], "Database type drift check");

  assertCommandPassed(result, "Database type drift check");
  const generatedTypes = readFileSync(generatedTypesPath, "utf8");

  assert.match(generatedTypes, /^\/\/ Bu dosya yerel Supabase şemasından üretilir;/u);
  assert.match(generatedTypes, /export type Database/u);
  assert(!/ApplicationDto|BusinessDto|hand[- ]written/iu.test(generatedTypes));
}

/** Foundation dosyalarında gerçek credential ve production endpoint biçimlerini reddeder. */
function assertNoRepositoryCredentials(): void {
  const paths = [
    join(workspaceRoot, "package.json"),
    join(workspaceRoot, "pnpm-lock.yaml"),
    join(workspaceRoot, "scripts", "database-types.ts"),
    join(workspaceRoot, "scripts", "local-supabase.ts"),
    join(workspaceRoot, "scripts", "verify-database-foundation.ts"),
    generatedTypesPath,
    join(supabaseRoot, "config.toml"),
    join(supabaseRoot, "README.md"),
    join(supabaseRoot, "seed.sql"),
    ...readdirSync(migrationsRoot).map((name) => join(migrationsRoot, name)),
  ];
  const content = paths.map((path) => readFileSync(path, "utf8")).join("\n");

  // Yalnız gerçek değer biçimleri aranır; güvenlik dokümantasyonundaki değişken adları yanlış pozitif sayılmaz.
  assert(!/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/u.test(content));
  assert(!/sb_(?:secret|publishable)_[A-Za-z0-9_-]{20,}/u.test(content));
  assert(!/postgres(?:ql)?:\/\/[^\s"']+:[^\s"']+@/iu.test(content));
  assert(!/supabase\.co|infravolt\.co\.uk|infravolt\.com\.ua/iu.test(content));
}

/** Restart sonrasında redacted status ile temel schema sorgusunun birlikte çalıştığını doğrular. */
function assertPostRestartSmoke(): void {
  const status = runPnpm(["db:status"], "Supabase local status");

  assertCommandPassed(status, "Supabase local status");
  assert.equal(
    queryDatabase(
      "select current_database() = 'postgres' and to_regnamespace('public') is not null and to_regnamespace('private') is not null;",
    ),
    "t",
  );
}

const checks: readonly Check[] = [
  { name: "repository foundation", run: assertRepositoryFoundation },
  { name: "exact local CLI pin", run: assertPinnedCli },
  { name: "Docker Linux engine", run: assertDockerReady },
];

let verificationSucceeded = false;

try {
  for (const check of checks) {
    check.run();
    console.log(`PASS ${check.name}`);
  }

  const start = runPnpm(["db:start"], "Supabase local start");
  assertCommandPassed(start, "Supabase local start");
  assertLocalBindings();
  console.log("PASS local stack start and loopback bindings");

  // İki temiz reset, migration ve seed sonucunun önceki local duruma bağlı olmadığını kanıtlar.
  resetAndAssertSeed();
  assertSchemasAndGrants();
  assertDefaultPrivileges();
  resetAndAssertSeed();
  assertSchemasAndGrants();
  assertDefaultPrivileges();
  console.log("PASS repeatable reset, seed, schemas, grants and default privileges");

  assertTypeDrift();
  assertNoRepositoryCredentials();
  console.log("PASS generated types and local-only security scan");

  const stop = runPnpm(["db:stop"], "Supabase local stop");
  assertCommandPassed(stop, "Supabase local stop");
  const restart = runPnpm(["db:start"], "Supabase local restart");
  assertCommandPassed(restart, "Supabase local restart");
  assertLocalBindings();
  assertPostRestartSmoke();
  console.log("PASS stop, restart, status and post-restart smoke query");

  verificationSucceeded = true;
  console.log("Database foundation verification passed (18 controls).");
} finally {
  if (!verificationSucceeded) {
    // Yarım kalan doğrulama local container bırakmasın; cleanup hatası asıl güvenli hatayı maskelemez.
    runPnpm(["db:stop"], "Supabase failure cleanup");
  }
}
