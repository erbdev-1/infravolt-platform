import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type CredentialPattern = Readonly<{
  name: string;
  pattern: RegExp;
}>;

const root = process.cwd();
const patterns: readonly CredentialPattern[] = [
  {
    name: "private-key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  },
  {
    name: "github-token",
    pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/u,
  },
  {
    name: "aws-access-key",
    pattern: /\bAKIA[A-Z0-9]{16}\b/u,
  },
  {
    name: "production-key",
    pattern: /\b(?:sk|rk)_(?:live|prod)_[A-Za-z0-9_-]{12,}\b/u,
  },
  {
    name: "supabase-key",
    pattern: /\bsb_(?:secret|publishable)_[A-Za-z0-9_-]{20,}\b/u,
  },
  {
    name: "jwt",
    pattern:
      /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/u,
  },
] as const;
const historyPattern = [
  "-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----",
  "gh[pousr]_[A-Za-z0-9]{20,}",
  "AKIA[A-Z0-9]{16}",
  "(sk|rk)_(live|prod)_[A-Za-z0-9_-]{12,}",
  "sb_(secret|publishable)_[A-Za-z0-9_-]{20,}",
  "eyJ[A-Za-z0-9_-]{10,}\\.[A-Za-z0-9_-]{10,}\\.[A-Za-z0-9_-]{10,}",
].join("|");

function runGit(
  args: readonly string[],
  acceptedStatuses: readonly number[] = [0],
): string {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    shell: false,
    timeout: 120_000,
  });

  if (
    result.error ||
    result.status === null ||
    !acceptedStatuses.includes(result.status)
  ) {
    throw new Error("Credential scan could not inspect the repository safely.");
  }

  return result.stdout;
}

function decodeText(content: Buffer): string | undefined {
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(content);

    if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(text)) {
      return undefined;
    }

    return text;
  } catch {
    return undefined;
  }
}

function findCredentialPattern(text: string): string | undefined {
  return patterns.find(({ pattern }) => pattern.test(text))?.name;
}

// Fixture çalışma anında birleştirilir; detector kanıtı repository'ye token biçimli değer eklemez.
const syntheticDetectionFixture = `gh${"p_"}${"A".repeat(36)}`;
assert.equal(
  findCredentialPattern(syntheticDetectionFixture),
  "github-token",
  "Synthetic credential fixture must be detected.",
);
assert.equal(findCredentialPattern("NEXT_PUBLIC_SUPABASE_URL="), undefined);

const inventory = runGit([
  "ls-files",
  "--cached",
  "--others",
  "--exclude-standard",
  "-z",
])
  .split("\0")
  .filter(Boolean);
let textFileCount = 0;

for (const relativePath of inventory) {
  const text = decodeText(readFileSync(join(root, relativePath)));

  if (text === undefined) {
    continue;
  }

  textFileCount += 1;
  const match = findCredentialPattern(text);

  if (match) {
    // Değer yazdırılmaz; yalnız pattern sınıfı ve repository yolu remediation için yeterlidir.
    throw new Error(
      `Credential pattern ${match} detected in repository file ${relativePath}.`,
    );
  }
}

const commits = runGit(["rev-list", "--all"]).split(/\r?\n/gu).filter(Boolean);

for (const commit of commits) {
  const commitMessage = runGit([
    "show",
    "--no-patch",
    "--format=%B",
    commit,
  ]);

  if (findCredentialPattern(commitMessage)) {
    // Commit mesajı taranır ancak eşleşen değer hiçbir zaman verification çıktısına eklenmez.
    throw new Error(
      `Credential pattern detected in repository history metadata at commit ${commit}.`,
    );
  }

  const matches = runGit(
    // `-e`, private-key patterninin başındaki tirelerin option olarak yorumlanmasını engeller.
    ["grep", "-I", "-l", "-E", "-e", historyPattern, commit, "--"],
    [0, 1],
  )
    .split(/\r?\n/gu)
    .filter(Boolean);

  if (matches.length > 0) {
    // Commit içeriği ve eşleşen değer log'a taşınmaz; history remediation rotation gerektirir.
    throw new Error(
      `Credential pattern detected in repository history at commit ${commit}.`,
    );
  }
}

console.log(
  `Credential verification passed: synthetic detector fixture, ${textFileCount} repository text files and ${commits.length} commit trees checked without printing values.`,
);
