import { spawnSync } from "node:child_process";
import {
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import { createSafeTestProcessEnvironment } from "../tests/helpers/test-environment.ts";

const root = process.cwd();
const proofRoot = path.join(root, "test-results", "artifact-proof");
const fixtureDirectory = path.join(proofRoot, "specs");
const outputDirectory = path.join(proofRoot, "output");
const configPath = path.join(proofRoot, "playwright.config.ts");
const fixturePath = path.join(
  fixtureDirectory,
  "intentional-artifact-failure.spec.ts",
);
const playwrightCli = path.join(
  root,
  "node_modules",
  "@playwright",
  "test",
  "cli.js",
);

const configSource = `
import { defineConfig, devices } from "@playwright/test";
import { createSafeTestProcessEnvironment, LOCAL_TEST_URLS, TEST_SERVER_PORT } from "../../tests/helpers/test-environment";

export default defineConfig({
  testDir: "./specs",
  outputDir: "./output",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  reporter: [["line"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: LOCAL_TEST_URLS.uk,
    locale: "en-GB",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    serviceWorkers: "block",
  },
  webServer: {
    command: \`pnpm dev --hostname 127.0.0.1 --port \${TEST_SERVER_PORT}\`,
    url: LOCAL_TEST_URLS.uk,
    reuseExistingServer: false,
    timeout: 60_000,
    stdout: "pipe",
    stderr: "pipe",
    env: createSafeTestProcessEnvironment(),
  },
});
`;

const fixtureSource = `
import { expect, test } from "../../../tests/e2e/fixtures/test";

test("expected artifact assertion failure", async ({ browserDiagnostics, page }) => {
  await page.goto("/");
  browserDiagnostics.assertClean();
  await expect(
    page.getByRole("heading", { name: "EXPECTED_ARTIFACT_ASSERTION" }),
  ).toBeVisible();
});
`;

const forbiddenArtifactPatterns = [
  {
    name: "private-key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  },
  {
    name: "bearer-token",
    pattern: /\bBearer\s+[A-Za-z0-9._~+/=-]{16,}/u,
  },
  {
    name: "jwt",
    pattern:
      /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/u,
  },
  {
    name: "production-key",
    pattern: /\b(?:sk|rk|pk)_(?:live|prod)_[A-Za-z0-9_-]{12,}\b/u,
  },
  {
    name: "email",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu,
  },
] as const;

function decodeTextArtifact(content: Buffer): string | undefined {
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

function findForbiddenSensitiveText(content: Buffer): string | undefined {
  const text = decodeTextArtifact(content);

  if (text === undefined) {
    return undefined;
  }

  return forbiddenArtifactPatterns.find(({ pattern }) => pattern.test(text))
    ?.name;
}

function describeTraceMatch(content: Buffer): string | undefined {
  const text = decodeTextArtifact(content);

  if (text === undefined) {
    return undefined;
  }

  const lines = text.split(/\r?\n/u);

  for (const [index, line] of lines.entries()) {
    let parsedEvent: object | undefined;
    let eventType = "unknown";

    try {
      const event: unknown = JSON.parse(line);

      if (typeof event === "object" && event !== null) {
        parsedEvent = event;
        const type = Reflect.get(event, "type");
        eventType = typeof type === "string" ? type : eventType;
      }
    } catch {
      eventType = "non-json";
    }

    // Screencast frame base64 görüntü verisidir; metin deseni uygulamak rastgele binary yanlış pozitif üretir.
    if (parsedEvent && eventType === "screencast-frame") {
      continue;
    }

    const forbiddenPattern = forbiddenArtifactPatterns.find(({ pattern }) =>
      pattern.test(line),
    );

    if (!forbiddenPattern) {
      continue;
    }

    return `${forbiddenPattern.name}, event=${eventType}, line=${index + 1}`;
  }

  return undefined;
}

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function isSafeBrowserDiagnostic(content: Buffer): boolean {
  try {
    const value: unknown = JSON.parse(content.toString("utf8"));

    return (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).sort().join(",") ===
        "consoleErrorCount,pageErrorCount,unexpectedNetworkCount" &&
      Object.values(value).every(
        (count) => typeof count === "number" && count === 0,
      )
    );
  } catch {
    return false;
  }
}

function readArchiveEntry(archive: string, entry: string): Buffer {
  const result = spawnSync("tar", ["-xOf", archive, entry], {
    encoding: "buffer",
    env: createSafeTestProcessEnvironment(),
    maxBuffer: 25 * 1024 * 1024,
    shell: false,
    timeout: 15_000,
  });

  if (result.error || result.status !== 0 || !result.stdout) {
    throw new Error("Trace archive could not be inspected safely");
  }

  return Buffer.from(result.stdout);
}

function listArchiveEntries(archive: string): readonly string[] {
  const result = spawnSync("tar", ["-tf", archive], {
    encoding: "utf8",
    env: createSafeTestProcessEnvironment(),
    maxBuffer: 2 * 1024 * 1024,
    shell: false,
    timeout: 15_000,
  });

  if (result.error || result.status !== 0) {
    throw new Error("Trace archive index could not be inspected safely");
  }

  return result.stdout
    .split(/\r?\n/u)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function readDiagnosticAttachments(traceFile: string): readonly Buffer[] {
  const events = readArchiveEntry(traceFile, "test.trace")
    .toString("utf8")
    .split(/\r?\n/u)
    .filter(Boolean);
  const diagnostics: Buffer[] = [];

  for (const eventText of events) {
    const event: unknown = JSON.parse(eventText);

    if (typeof event !== "object" || event === null) {
      continue;
    }

    const attachments = Reflect.get(event, "attachments");

    if (!Array.isArray(attachments)) {
      continue;
    }

    for (const attachment of attachments) {
      if (typeof attachment !== "object" || attachment === null) {
        continue;
      }

      const name = Reflect.get(attachment, "name");
      const sha1 = Reflect.get(attachment, "sha1");

      if (name === "browser-diagnostics" && typeof sha1 === "string") {
        diagnostics.push(
          readArchiveEntry(traceFile, `resources/${path.basename(sha1)}`),
        );
      }
    }
  }

  return diagnostics;
}

async function verifyArtifacts(): Promise<void> {
  await rm(proofRoot, { force: true, recursive: true });
  await mkdir(fixtureDirectory, { recursive: true });
  await writeFile(configPath, configSource.trimStart(), "utf8");
  await writeFile(fixturePath, fixtureSource.trimStart(), "utf8");

  const result = spawnSync(
    process.execPath,
    [playwrightCli, "test", "--config", configPath],
    {
      cwd: root,
      encoding: "utf8",
      env: createSafeTestProcessEnvironment(),
      maxBuffer: 2 * 1024 * 1024,
      shell: false,
      timeout: 120_000,
    },
  );

  if (result.error) {
    throw new Error("Artifact verification child process could not complete");
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;

  // Negatif kanıt yalnız hedeflenen görünür-heading assertion nedeniyle başarısız olursa geçerlidir.
  if (
    result.status !== 1 ||
    !output.includes("EXPECTED_ARTIFACT_ASSERTION") ||
    !output.includes("toBeVisible")
  ) {
    throw new Error("Artifact fixture did not fail for the expected assertion");
  }

  const files = await collectFiles(outputDirectory);
  const traceFiles = files.filter((file) => path.basename(file) === "trace.zip");
  const screenshots = files.filter((file) => file.endsWith(".png"));
  const diagnosticAttachments = traceFiles.flatMap((traceFile) =>
    readDiagnosticAttachments(traceFile),
  );

  if (
    traceFiles.length !== 1 ||
    screenshots.length !== 1 ||
    diagnosticAttachments.length !== 1 ||
    !diagnosticAttachments.every(isSafeBrowserDiagnostic)
  ) {
    throw new Error(
      `Expected artifact counts were not produced: trace=${traceFiles.length}, screenshot=${screenshots.length}, diagnostics=${diagnosticAttachments.length}`,
    );
  }

  if (files.length > 20) {
    throw new Error("Artifact file count exceeded the bounded policy");
  }

  let totalBytes = 0;

  for (const file of files) {
    const fileStat = await stat(file);
    totalBytes += fileStat.size;

    if (fileStat.size > 25 * 1024 * 1024) {
      throw new Error("An artifact exceeded the per-file size policy");
    }

    const content = await readFile(file);

    const forbiddenPattern = findForbiddenSensitiveText(content);

    if (forbiddenPattern) {
      throw new Error(
        `An artifact matched a forbidden sensitive-data pattern: ${forbiddenPattern}`,
      );
    }
  }

  for (const traceFile of traceFiles) {
    for (const entry of listArchiveEntries(traceFile)) {
      const content = readArchiveEntry(traceFile, entry);
      const forbiddenPattern = entry.endsWith(".trace")
        ? describeTraceMatch(content)
        : findForbiddenSensitiveText(content);

      if (forbiddenPattern) {
        throw new Error(
          `A trace entry matched a forbidden sensitive-data pattern: ${forbiddenPattern} in ${path.basename(entry)}`,
        );
      }
    }
  }

  if (totalBytes > 50 * 1024 * 1024) {
    throw new Error("Artifact output exceeded the total size policy");
  }

  console.log(
    "Test artifact verification passed: expected assertion produced bounded trace, screenshot and safe diagnostics.",
  );
}

let primaryFailure: Error | undefined;

try {
  await verifyArtifacts();
} catch (error) {
  primaryFailure =
    error instanceof Error ? error : new Error("Unknown artifact verification failure");
}

try {
  // Fixture ve failure artifact'ları commit edilebilir çalışma ağacına taşınmadan her sonuçta temizlenir.
  await rm(proofRoot, { force: true, recursive: true });
} catch (error) {
  const cleanupFailure =
    error instanceof Error ? error : new Error("Unknown artifact cleanup failure");

  if (primaryFailure) {
    console.error("Artifact cleanup also failed after the primary verification failure.");
  } else {
    primaryFailure = cleanupFailure;
  }
}

if (primaryFailure) {
  throw primaryFailure;
}
