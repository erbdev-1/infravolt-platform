import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type FixtureKind = "client" | "server";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const verificationRoot = join(
  workspaceRoot,
  ".next",
  "server-boundary-verification",
);
const nextCli = join(
  workspaceRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

function writeFixture(kind: FixtureKind): string {
  const fixtureRoot = join(verificationRoot, kind);
  const appRoot = join(fixtureRoot, "app");
  const serverImport =
    '../../../../src/config/env/server.ts';

  mkdirSync(appRoot, { recursive: true });
  writeFileSync(
    join(fixtureRoot, "package.json"),
    JSON.stringify({ private: true }, null, 2),
  );
  writeFileSync(
    join(fixtureRoot, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          allowImportingTsExtensions: true,
          isolatedModules: true,
          jsx: "react-jsx",
          lib: ["dom", "dom.iterable", "esnext"],
          module: "esnext",
          moduleResolution: "bundler",
          noEmit: true,
          strict: true,
          target: "ES2017",
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      },
      null,
      2,
    ),
  );
  writeFileSync(
    join(appRoot, "layout.tsx"),
    [
      'import type { ReactNode } from "react";',
      "",
      "export default function RootLayout({ children }: { children: ReactNode }) {",
      '  return <html lang="en-GB"><body>{children}</body></html>;',
      "}",
      "",
    ].join("\n"),
  );

  const clientDirective = kind === "client" ? '"use client";\n\n' : "";
  writeFileSync(
    join(appRoot, "page.tsx"),
    [
      clientDirective +
        `import { parseServerEnvironment } from "${serverImport}";`,
      "",
      "export default function Page() {",
      "  parseServerEnvironment({});",
      `  return <main><h1>${kind} boundary fixture</h1></main>;`,
      "}",
      "",
    ].join("\n"),
  );

  return fixtureRoot;
}

function buildFixture(kind: FixtureKind): ReturnType<typeof spawnSync> {
  const fixtureRoot = writeFixture(kind);

  return spawnSync(process.execPath, [nextCli, "build"], {
    cwd: fixtureRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
    timeout: 120_000,
  });
}

rmSync(verificationRoot, { force: true, recursive: true });

try {
  const serverBuild = buildFixture("server");

  if (serverBuild.status !== 0) {
    throw new Error("Server Component import verification failed unexpectedly.");
  }

  console.log("PASS: Server Component can import server-only configuration.");

  const clientBuild = buildFixture("client");
  const clientOutput = `${clientBuild.stdout ?? ""}\n${clientBuild.stderr ?? ""}`;

  if (
    clientBuild.status === 0 ||
    !/cannot be imported from a Client Component module/u.test(clientOutput)
  ) {
    throw new Error("Client Component import was not rejected by server-only.");
  }

  console.log("PASS: Client Component import of server-only configuration is rejected.");
} finally {
  rmSync(verificationRoot, { force: true, recursive: true });
}
