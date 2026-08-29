import { strict as assert } from "node:assert";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Mapping = Record<string, unknown>;
type YamlModule = Readonly<{
  load: (source: string) => unknown;
}>;

const require = createRequire(import.meta.url);
const { load } = require("js-yaml") as YamlModule;
const workflowPath = join(process.cwd(), ".github", "workflows", "ci.yml");
const source = readFileSync(workflowPath, "utf8");
const workflow = asMapping(load(source), "workflow");
const expectedActions = new Map<string, string>([
  [
    "actions/checkout",
    "de0fac2e4500dabe0009e67214ff5f5447ce83dd",
  ],
  [
    "actions/setup-node",
    "48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e",
  ],
  [
    "pnpm/action-setup",
    "d15e628ca66d93ee5f352c71671a7bc6a97af5c9",
  ],
  [
    "actions/upload-artifact",
    "043fb46d1a93c77aae656e7c1c64a875d1fc6a0a",
  ],
] as const);

function asMapping(value: unknown, label: string): Mapping {
  assert(
    typeof value === "object" && value !== null && !Array.isArray(value),
    `${label} must be a mapping.`,
  );

  return value as Mapping;
}

function asArray(value: unknown, label: string): readonly unknown[] {
  assert(Array.isArray(value), `${label} must be an array.`);
  return value;
}

function assertMainTrigger(value: unknown, label: string): void {
  const trigger = asMapping(value, label);
  assert.deepEqual(trigger.branches, ["main"]);
}

function jobSteps(job: Mapping, label: string): readonly Mapping[] {
  return asArray(job.steps, `${label}.steps`).map((step, index) =>
    asMapping(step, `${label}.steps[${index}]`),
  );
}

function commandSequence(steps: readonly Mapping[]): string {
  return steps
    .map((step) => step.run)
    .filter((run): run is string => typeof run === "string")
    .join("\n");
}

function assertOrderedCommands(
  commands: string,
  required: readonly string[],
): void {
  let previousIndex = -1;

  for (const command of required) {
    const index = commands.indexOf(command, previousIndex + 1);
    assert(index > previousIndex, `CI command is missing or out of order: ${command}`);
    previousIndex = index;
  }
}

function findRunStep(steps: readonly Mapping[], command: string): Mapping {
  const step = steps.find((candidate) => candidate.run === command);
  assert(step, `CI step is missing: ${command}`);
  return step;
}

const triggers = asMapping(workflow.on, "on");
assert.deepEqual(Object.keys(triggers).sort(), ["pull_request", "push"]);
assertMainTrigger(triggers.pull_request, "on.pull_request");
assertMainTrigger(triggers.push, "on.push");
assert(!source.includes("pull_request_target"));
assert(!source.includes("secrets."));

const permissions = asMapping(workflow.permissions, "permissions");
assert.deepEqual(permissions, { contents: "read" });
const concurrency = asMapping(workflow.concurrency, "concurrency");
assert.equal(
  concurrency.group,
  "ci-${{ github.workflow }}-${{ github.ref }}",
);
assert.equal(concurrency["cancel-in-progress"], true);

const environment = asMapping(workflow.env, "env");
assert.equal(environment.NODE_VERSION, "24.18.0");
assert.equal(environment.PNPM_VERSION, "11.13.0");
assert.equal(environment.NEXT_TELEMETRY_DISABLED, "1");

const jobs = asMapping(workflow.jobs, "jobs");
assert.deepEqual(Object.keys(jobs).sort(), [
  "browser-smoke",
  "database",
  "quality",
]);
const quality = asMapping(jobs.quality, "jobs.quality");
const browser = asMapping(jobs["browser-smoke"], "jobs.browser-smoke");
const database = asMapping(jobs.database, "jobs.database");

for (const [name, job, maximumMinutes] of [
  ["quality", quality, 20],
  ["browser-smoke", browser, 20],
  ["database", database, 25],
] as const) {
  assert.equal(job["runs-on"], "ubuntu-24.04");
  assert.equal(job["timeout-minutes"], maximumMinutes);
  assert(job["timeout-minutes"] <= 25, `${name} timeout is not bounded.`);
}

assert.equal(browser.needs, "quality");
assert.equal(database.needs, "quality");
assert.equal(asMapping(database.env, "jobs.database.env").DOCKER_HOST, "unix:///var/run/docker.sock");

const allSteps = Object.entries(jobs).flatMap(([name, value]) =>
  jobSteps(asMapping(value, `jobs.${name}`), `jobs.${name}`),
);

for (const step of allSteps) {
  if (typeof step.uses !== "string") {
    continue;
  }

  const match = step.uses.match(/^([^@]+)@([a-f0-9]{40})$/u);
  assert(match, `Action must be pinned to an immutable SHA: ${step.uses}`);
  const expectedSha = expectedActions.get(match[1]);
  assert(expectedSha, `Unapproved action is used: ${match[1]}`);
  assert.equal(match[2], expectedSha);
}

const qualitySteps = jobSteps(quality, "jobs.quality");
const qualityCommands = commandSequence(qualitySteps);
assertOrderedCommands(qualityCommands, [
  "node --version",
  "pnpm --version",
  "pnpm install --frozen-lockfile",
  "pnpm verify:ci-workflow",
  "pnpm verify:dependencies",
  "pnpm audit --audit-level high",
  "pnpm verify:credentials",
  "pnpm verify:env",
  "pnpm verify:server-boundary",
  "pnpm verify:common-contracts",
  "pnpm verify:market",
  "pnpm verify:features",
  "pnpm verify:safe-states",
  "pnpm verify:database-boundary",
  "pnpm typecheck",
  "pnpm lint",
  "pnpm test",
  "pnpm build",
]);

const buildEnvironment = asMapping(
  findRunStep(qualitySteps, "pnpm build").env,
  "production build env",
);
assert.deepEqual(buildEnvironment, {
  NEXT_PUBLIC_SITE_URL_UA: "https://ua.infravolt.localhost:3000",
  NEXT_PUBLIC_SITE_URL_UK: "https://uk.infravolt.localhost:3000",
});

const qualityCheckout = qualitySteps.find(
  (step) =>
    step.uses ===
    "actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd",
);
assert(qualityCheckout, "Quality checkout step is missing.");
assert.deepEqual(asMapping(qualityCheckout.with, "quality checkout inputs"), {
  "fetch-depth": 0,
  "persist-credentials": false,
});

const browserSteps = jobSteps(browser, "jobs.browser-smoke");
assertOrderedCommands(commandSequence(browserSteps), [
  "pnpm install --frozen-lockfile",
  "pnpm exec playwright install --with-deps chromium",
  "pnpm verify:test-artifacts",
  "pnpm test:e2e:smoke",
]);
const uploadStep = browserSteps.find(
  (step) =>
    step.uses ===
    "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a",
);
assert(uploadStep, "Bounded Playwright failure upload is missing.");
assert.equal(uploadStep.if, "failure()");
const uploadInputs = asMapping(uploadStep.with, "artifact upload inputs");
assert.equal(uploadInputs["retention-days"], 3);
assert.equal(uploadInputs["if-no-files-found"], "ignore");
assert.equal(
  uploadInputs.path,
  [
    "test-results/playwright/**/*.zip",
    "test-results/playwright/**/*.png",
    "test-results/playwright/**/*.json",
    "",
  ].join("\n"),
);

const databaseSteps = jobSteps(database, "jobs.database");
assertOrderedCommands(commandSequence(databaseSteps), [
  "pnpm install --frozen-lockfile",
  "pnpm db:verify",
  "pnpm db:stop",
]);
assert.equal(findRunStep(databaseSteps, "pnpm db:stop").if, "always()");

for (const [action, sha] of expectedActions) {
  assert(
    source.includes(`${action}@${sha}`),
    `Pinned action reference is missing: ${action}`,
  );
}

console.log(
  "CI workflow verification passed: YAML parsed, triggers/permissions/actions/jobs/commands/cache inputs and bounded failure handling match WP-08.",
);
