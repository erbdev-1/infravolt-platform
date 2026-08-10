import { strict as assert } from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type PackageManifest = Readonly<{
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  engines?: Readonly<{ node?: string }>;
  packageManager?: string;
  private?: boolean;
  scripts?: Record<string, string>;
}>;

const root = process.cwd();
const packageJson = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
) as PackageManifest;
const lockfile = readFileSync(join(root, "pnpm-lock.yaml"), "utf8");
const workspacePolicy = readFileSync(
  join(root, "pnpm-workspace.yaml"),
  "utf8",
).replace(/\r\n/gu, "\n");
const exactVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;
const lifecycleScripts = ["preinstall", "install", "postinstall", "prepare"];

assert.equal(packageJson.private, true);
assert.equal(packageJson.engines?.node, "24.x");
assert.equal(packageJson.packageManager, "pnpm@11.13.0");
assert.match(lockfile, /^lockfileVersion: '9\.0'$/mu);

const directPackages = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

for (const [name, version] of Object.entries(directPackages)) {
  assert(
    exactVersionPattern.test(version),
    `Direct dependency must use an exact version: ${name}`,
  );
}

for (const scriptName of lifecycleScripts) {
  assert(
    packageJson.scripts?.[scriptName] === undefined,
    `Repository lifecycle script is not approved: ${scriptName}`,
  );
}

// pnpm build-script allowlist'i yalnız önceden incelenmiş iki native pakette sabit kalmalıdır.
assert.equal(
  workspacePolicy,
  [
    "overrides:",
    '  "eslint-plugin-import@2.32.0>minimatch": "10.2.5"',
    '  "eslint-plugin-jsx-a11y@6.10.2>minimatch": "10.2.5"',
    '  "eslint-plugin-react@7.37.5>minimatch": "10.2.5"',
    '  "minimatch@10.2.5>brace-expansion": "5.0.9"',
    '  "next@16.2.11>postcss": "8.5.18"',
    '  "next@16.2.11>sharp": "0.35.0"',
    '  "jsdom>undici": "7.29.0"',
    '  "nanoid": "3.3.17"',
    "",
    "peerDependencyRules:",
    "  allowedVersions:",
    '    "eslint-plugin-import@2.32.0>eslint": "10.8.0"',
    '    "eslint-plugin-jsx-a11y@6.10.2>eslint": "10.8.0"',
    '    "eslint-plugin-react@7.37.5>eslint": "10.8.0"',
    "",
    "allowBuilds:",
    "  sharp@0.35.0: true",
    "  unrs-resolver@1.12.2: true",
    "",
  ].join("\n"),
);
assert(!existsSync(join(root, "package-lock.json")));
assert(!existsSync(join(root, "yarn.lock")));

console.log(
  `Dependency policy verification passed: ${Object.keys(directPackages).length} exact direct packages and two approved build scripts.`,
);
