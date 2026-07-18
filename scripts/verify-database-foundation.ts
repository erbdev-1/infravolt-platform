import { strict as assert } from "node:assert";
import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertCommandPassed,
  assertLocalSupabaseStack,
  createCommandRunner,
  type CommandResult,
  type ValidatedDockerTarget,
  validateLocalDockerTarget,
} from "./local-docker.ts";

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
const databaseRoles = Object.freeze(["anon", "authenticated", "service_role"]);
const applicationSchemas = Object.freeze(["public", "private"]);
const schemaPrivileges = Object.freeze(["usage", "create"]);
const tablePrivileges = Object.freeze([
  "select",
  "insert",
  "update",
  "delete",
  "truncate",
  "references",
  "trigger",
]);
const sequencePrivileges = Object.freeze(["usage", "select", "update"]);
const functionPrivileges = Object.freeze(["execute"]);
const defaultPrivilegeOwner = "postgres";
const runCommand = createCommandRunner(workspaceRoot);
let dockerTarget: ValidatedDockerTarget | undefined;

/** Endpoint doğrulaması tamamlanmadan hiçbir lifecycle veya database child komutunun çalışmasını engeller. */
function requireDockerTarget(): ValidatedDockerTarget {
  assert(dockerTarget, "Docker target must be validated before use.");
  return dockerTarget;
}

/**
 * Repository'nin pnpm çalıştırıcısını kullanarak komut çağırır.
 * Bu yol global CLI veya Windows'a özgü PATH varsayımı oluşmasını önler.
 */
function runPnpm(
  args: readonly string[],
  label: string,
  timeoutMilliseconds = 180_000,
): CommandResult {
  const target = requireDockerTarget();
  const pnpmEntry = target.environment.npm_execpath;

  assert(pnpmEntry, "Bu doğrulama pnpm package script üzerinden çalıştırılmalıdır.");

  return runCommand(process.execPath, [pnpmEntry, ...args], label, {
    environment: target.environment,
    timeoutMilliseconds,
  });
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
    {
      environment: requireDockerTarget().environment,
      timeoutMilliseconds: 10_000,
    },
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
    {
      environment: requireDockerTarget().environment,
      timeoutMilliseconds: 30_000,
    },
  );

  assertCommandPassed(result, "Local database query");
  return result.stdout.trim();
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

/** Docker seçimlerinin local endpoint ve Linux engine sınırında kaldığını doğrular. */
function assertDockerReady(): void {
  dockerTarget = validateLocalDockerTarget(runCommand, process.env);
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
  const checks = applicationSchemas.flatMap((schema) => [
    `to_regnamespace('${schema}') is not null`,
    ...databaseRoles.flatMap((role) =>
      schemaPrivileges.map((privilege) => {
        const expected =
          privilege === "usage" &&
          (schema === "public" || role === "service_role");

        return `${expected ? "" : "not "}has_schema_privilege('${role}', '${schema}', '${privilege}')`;
      }),
    ),
  ]);

  assert.equal(
    queryDatabase(`
      select ${checks.join(",\n        ")};
    `),
    checks.map(() => "t").join("|"),
  );
}

function assertPrivilegeMatrixCompleteness(): void {
  // Sabit beklenen kümeler, yeni bir düzenlemenin privilege boyutunu sessizce daraltmasını engeller.
  assert.deepEqual(databaseRoles, ["anon", "authenticated", "service_role"]);
  assert.deepEqual(applicationSchemas, ["public", "private"]);
  assert.deepEqual(schemaPrivileges, ["usage", "create"]);
  assert.deepEqual(tablePrivileges, [
    "select",
    "insert",
    "update",
    "delete",
    "truncate",
    "references",
    "trigger",
  ]);
  assert.deepEqual(sequencePrivileges, ["usage", "select", "update"]);
  assert.deepEqual(functionPrivileges, ["execute"]);
  assert.equal(defaultPrivilegeOwner, "postgres");
  assert.equal(
    applicationSchemas.length * databaseRoles.length * schemaPrivileges.length,
    12,
  );
  assert.equal(
    applicationSchemas.length *
      databaseRoles.length *
      (tablePrivileges.length +
        sequencePrivileges.length +
        functionPrivileges.length),
    66,
  );
}

/**
 * Geçici nesnelerle varsayılan grant davranışını sınar ve transaction'ı rollback eder.
 * Böylece test kalıntısı bırakmadan gelecekteki nesnelerin browser rollerine açılmadığı kanıtlanır.
 */
function assertDefaultPrivileges(): void {
  assertPrivilegeMatrixCompleteness();
  const privilegeChecks = applicationSchemas.flatMap((schema) => [
    ...databaseRoles.flatMap((role) =>
      tablePrivileges.map(
        (privilege) =>
          `not has_table_privilege('${role}', '${schema}._infravolt_verify_table', '${privilege}')`,
      ),
    ),
    ...databaseRoles.flatMap((role) =>
      sequencePrivileges.map(
        (privilege) =>
          `not has_sequence_privilege('${role}', '${schema}._infravolt_verify_sequence', '${privilege}')`,
      ),
    ),
    ...databaseRoles.flatMap((role) =>
      functionPrivileges.map(
        (privilege) =>
          `not has_function_privilege('${role}', '${schema}._infravolt_verify_function()', '${privilege}')`,
      ),
    ),
  ]);
  const ownerChecks = applicationSchemas.flatMap((schema) => [
    `(select pg_get_userbyid(c.relowner) from pg_class c where c.oid = '${schema}._infravolt_verify_table'::regclass) = '${defaultPrivilegeOwner}'`,
    `(select pg_get_userbyid(c.relowner) from pg_class c where c.oid = '${schema}._infravolt_verify_sequence'::regclass) = '${defaultPrivilegeOwner}'`,
    `(select pg_get_userbyid(p.proowner) from pg_proc p where p.oid = '${schema}._infravolt_verify_function()'::regprocedure) = '${defaultPrivilegeOwner}'`,
  ]);
  const checks = [
    `current_user = '${defaultPrivilegeOwner}'`,
    ...ownerChecks,
    ...privilegeChecks,
  ];

  assert.equal(
    queryDatabase(`
      begin;
      create table public._infravolt_verify_table (id integer);
      create table private._infravolt_verify_table (id integer);
      create sequence public._infravolt_verify_sequence;
      create sequence private._infravolt_verify_sequence;
      create function public._infravolt_verify_function()
        returns integer language sql as 'select 1';
      create function private._infravolt_verify_function()
        returns integer language sql as 'select 1';
      select ${checks.join(",\n        ")};
      rollback;
    `),
    checks.map(() => "t").join("|"),
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

/** Tüm tracked repository metninde gerçek credential biçimlerini, local foundation'da remote endpointleri reddeder. */
function assertNoRepositoryCredentials(): void {
  const tracked = runCommand(
    "git",
    ["ls-files", "-z"],
    "Tracked repository inventory",
    {
      environment: requireDockerTarget().environment,
      timeoutMilliseconds: 10_000,
    },
  );

  assertCommandPassed(tracked, "Tracked repository inventory");
  const trackedPaths = tracked.stdout.split("\0").filter(Boolean);
  const trackedContent = trackedPaths
    .map((path) => readFileSync(join(workspaceRoot, path), "utf8"))
    .join("\n");

  // Yalnız gerçek değer biçimleri aranır; değişken adları ve güvenlik açıklamaları yanlış pozitif sayılmaz.
  assert(!/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/u.test(trackedContent));
  assert(!/sb_(?:secret|publishable)_[A-Za-z0-9_-]{20,}/u.test(trackedContent));
  assert(!/postgres(?:ql)?:\/\/[^\s"']+:[^\s"']+@/iu.test(trackedContent));

  const localFoundationPaths = [
    join(workspaceRoot, "scripts", "database-types.ts"),
    join(workspaceRoot, "scripts", "local-docker.ts"),
    join(workspaceRoot, "scripts", "local-supabase.ts"),
    join(workspaceRoot, "scripts", "verify-database-foundation.ts"),
    generatedTypesPath,
    join(supabaseRoot, "config.toml"),
    join(supabaseRoot, "README.md"),
    join(supabaseRoot, "seed.sql"),
    ...readdirSync(migrationsRoot).map((name) => join(migrationsRoot, name)),
  ];
  const localFoundationContent = localFoundationPaths
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert(!/supabase\.co|infravolt\.co\.uk|infravolt\.com\.ua/iu.test(localFoundationContent));
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
  { name: "Docker Linux engine and pinned endpoint", run: assertDockerReady },
  { name: "repository foundation", run: assertRepositoryFoundation },
  { name: "exact local CLI pin", run: assertPinnedCli },
];

let verificationSucceeded = false;
let verificationError: unknown;

try {
  for (const check of checks) {
    check.run();
    console.log(`PASS ${check.name}`);
  }

  const start = runPnpm(["db:start"], "Supabase local start");
  assertCommandPassed(start, "Supabase local start");
  assertLocalSupabaseStack(runCommand, requireDockerTarget());
  console.log("PASS local stack ownership, health, network and loopback bindings");

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
  assertLocalSupabaseStack(runCommand, requireDockerTarget());
  assertPostRestartSmoke();
  console.log("PASS stop, restart, status and post-restart smoke query");

  verificationSucceeded = true;
  console.log("Database foundation verification passed (18 controls).");
} catch (error) {
  verificationError = error;
} finally {
  if (!verificationSucceeded) {
    try {
      const cleanup = runPnpm(["db:stop"], "Supabase failure cleanup");

      if (cleanup.status !== 0) {
        console.error("Supabase failure cleanup tamamlanamadı; asıl doğrulama hatası korunuyor.");
      }
    } catch {
      // Cleanup başlatılamasa bile ilk güvenlik veya doğrulama hatası değiştirilmez.
      console.error("Supabase failure cleanup başlatılamadı; asıl doğrulama hatası korunuyor.");
    }
  }
}

if (verificationError !== undefined) {
  throw verificationError;
}
