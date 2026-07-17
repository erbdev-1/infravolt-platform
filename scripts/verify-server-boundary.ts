import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type Fixture = Readonly<{
  id: string;
  client: boolean;
  imports: readonly string[];
  statements: readonly string[];
}>;

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

const environmentImport = "../../../../src/config/env/server.ts";
const correlationImport =
  "../../../../src/lib/observability/correlation-id.ts";
const logContextImport =
  "../../../../src/lib/observability/log-context.ts";
const marketServerImport = "../../../../src/modules/markets/server.ts";

const serverFixture: Fixture = {
  id: "server",
  client: false,
  imports: [
    `import { parseServerEnvironment } from "${environmentImport}";`,
    `import { createCorrelationId } from "${correlationImport}";`,
    `import { createSafeLogContext } from "${logContextImport}";`,
    `import { createMarketResolver } from "${marketServerImport}";`,
  ],
  statements: [
    "parseServerEnvironment({});",
    "createSafeLogContext(createCorrelationId());",
    "void createMarketResolver;",
  ],
};

const clientFixtures: readonly Fixture[] = [
  {
    id: "client-environment",
    client: true,
    imports: [
      `import { parseServerEnvironment } from "${environmentImport}";`,
    ],
    statements: ["void parseServerEnvironment;"],
  },
  {
    id: "client-correlation",
    client: true,
    imports: [`import { createCorrelationId } from "${correlationImport}";`],
    statements: ["void createCorrelationId;"],
  },
  {
    id: "client-log-context",
    client: true,
    imports: [`import { createSafeLogContext } from "${logContextImport}";`],
    statements: ["void createSafeLogContext;"],
  },
  {
    id: "client-market-server",
    client: true,
    imports: [`import { createMarketResolver } from "${marketServerImport}";`],
    statements: ["void createMarketResolver;"],
  },
];

function writeFixture(fixture: Fixture): string {
  const fixtureRoot = join(verificationRoot, fixture.id);
  const appRoot = join(fixtureRoot, "app");

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

  const clientDirective = fixture.client ? ['"use client";', ""] : [];
  writeFileSync(
    join(appRoot, "page.tsx"),
    [
      ...clientDirective,
      ...fixture.imports,
      "",
      "export default function Page() {",
      ...fixture.statements.map((statement) => `  ${statement}`),
      `  return <main><h1>${fixture.id} boundary fixture</h1></main>;`,
      "}",
      "",
    ].join("\n"),
  );

  return fixtureRoot;
}

function buildFixture(fixture: Fixture): ReturnType<typeof spawnSync> {
  const fixtureRoot = writeFixture(fixture);

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
  const serverBuild = buildFixture(serverFixture);

  if (serverBuild.status !== 0) {
    throw new Error("Server Component import verification failed unexpectedly.");
  }

  console.log("PASS: Server Component can import all server-only modules.");

  for (const fixture of clientFixtures) {
    const clientBuild = buildFixture(fixture);
    const clientOutput = `${clientBuild.stdout ?? ""}\n${clientBuild.stderr ?? ""}`;

    if (
      clientBuild.status === 0 ||
      !/cannot be imported from a Client Component module/u.test(clientOutput)
    ) {
      throw new Error(
        `Client Component import was not rejected for fixture: ${fixture.id}`,
      );
    }

    console.log(`PASS: ${fixture.id} import is rejected in Client Components.`);
  }
} finally {
  rmSync(verificationRoot, { force: true, recursive: true });
}
