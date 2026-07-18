import { strict as assert } from "node:assert";
import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

import type { ReactNode } from "react";

type ErrorBoundaryFixtureProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

type SafeStateComponent = (
  props: Partial<ErrorBoundaryFixtureProps>,
) => ReactNode;

type CompiledSafeState = Readonly<{
  component: SafeStateComponent;
  sourceFile: ts.SourceFile;
}>;

type Check = Readonly<{
  name: string;
  run: () => void | Promise<void>;
}>;

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const verificationRoot = join(
  workspaceRoot,
  ".next",
  "safe-state-verification",
);
const scriptPath = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);

const safeStatePaths = Object.freeze({
  loading: join(workspaceRoot, "src", "app", "loading.tsx"),
  notFound: join(workspaceRoot, "src", "app", "not-found.tsx"),
  routeError: join(workspaceRoot, "src", "app", "error.tsx"),
  globalError: join(workspaceRoot, "src", "app", "global-error.tsx"),
});

function isSafeStateModule(
  value: unknown,
): value is Readonly<{ default: SafeStateComponent }> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const defaultExport = Object.getOwnPropertyDescriptor(value, "default");

  return defaultExport !== undefined && typeof defaultExport.value === "function";
}

function isReactDomServerModule(
  value: unknown,
): value is Readonly<{
  renderToStaticMarkup: (node: ReactNode) => string;
}> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const renderer = Object.getOwnPropertyDescriptor(
    value,
    "renderToStaticMarkup",
  );

  return renderer !== undefined && typeof renderer.value === "function";
}

function compileSafeState(id: string, sourcePath: string): CompiledSafeState {
  const source = readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(
    sourcePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
    reportDiagnostics: true,
  });
  const errors = (output.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );

  assert.equal(errors.length, 0, `${id} transpile diagnostics`);

  mkdirSync(verificationRoot, { recursive: true });
  const outputPath = join(verificationRoot, `${id}.cjs`);

  // Gerçek route dosyalarını geçici çıktıya derlemek, uygulama route'larını değiştirmeden render davranışını sınar.
  writeFileSync(outputPath, output.outputText);

  const loadedModule: unknown = require(outputPath);

  assert(isSafeStateModule(loadedModule), `${id} default export`);

  return Object.freeze({
    component: loadedModule.default,
    sourceFile,
  });
}

function hasUseClientDirective(sourceFile: ts.SourceFile): boolean {
  const firstStatement = sourceFile.statements[0];

  return (
    firstStatement !== undefined &&
    ts.isExpressionStatement(firstStatement) &&
    ts.isStringLiteral(firstStatement.expression) &&
    firstStatement.expression.text === "use client"
  );
}

function renderSafeState(
  safeState: CompiledSafeState,
  props: Partial<ErrorBoundaryFixtureProps> = {},
): string {
  const reactDomServer: unknown = require("react-dom/server");

  assert(isReactDomServerModule(reactDomServer));

  return reactDomServer.renderToStaticMarkup(safeState.component(props));
}

function countElements(markup: string, element: string): number {
  return [...markup.matchAll(new RegExp(`<${element}(?:\\s|>)`, "gu"))].length;
}

function assertSingleHeadingAndMain(markup: string): void {
  assert.equal(countElements(markup, "main"), 1);
  assert.equal(countElements(markup, "h1"), 1);
}

function assertResetButton(sourceFile: ts.SourceFile): void {
  let validResetButtonCount = 0;

  function visit(node: ts.Node): void {
    if (
      ts.isJsxElement(node) &&
      ts.isIdentifier(node.openingElement.tagName) &&
      node.openingElement.tagName.text === "button"
    ) {
      const attributes = node.openingElement.attributes.properties;
      const typeAttribute = attributes.find(
        (attribute) =>
          ts.isJsxAttribute(attribute) &&
          ts.isIdentifier(attribute.name) &&
          attribute.name.text === "type",
      );
      const onClickAttribute = attributes.find(
        (attribute) =>
          ts.isJsxAttribute(attribute) &&
          ts.isIdentifier(attribute.name) &&
          attribute.name.text === "onClick",
      );
      const hasButtonType =
        typeAttribute !== undefined &&
        ts.isJsxAttribute(typeAttribute) &&
        typeAttribute.initializer !== undefined &&
        ts.isStringLiteral(typeAttribute.initializer) &&
        typeAttribute.initializer.text === "button";
      const usesReset =
        onClickAttribute !== undefined &&
        ts.isJsxAttribute(onClickAttribute) &&
        onClickAttribute.initializer !== undefined &&
        ts.isJsxExpression(onClickAttribute.initializer) &&
        onClickAttribute.initializer.expression !== undefined &&
        ts.isIdentifier(onClickAttribute.initializer.expression) &&
        onClickAttribute.initializer.expression.text === "reset";

      if (hasButtonType && usesReset) {
        validResetButtonCount += 1;
      }
    }

    ts.forEachChild(node, visit);
  }

  // Statik HTML event handler'ı kaldırdığı için AST kontrolü yanlış pozitif bir retry sonucu oluşmasını engeller.
  visit(sourceFile);
  assert.equal(validResetButtonCount, 1);
}

function assertTypedBoundaryContract(sourceFile: ts.SourceFile): void {
  const typeAliases = sourceFile.statements.filter(ts.isTypeAliasDeclaration);
  const contract = typeAliases.find(
    (declaration) =>
      ts.isTypeReferenceNode(declaration.type) &&
      declaration.type.typeName.getText(sourceFile) === "Readonly",
  );

  assert(contract !== undefined);
  assert(ts.isTypeReferenceNode(contract.type));
  const readonlyArgument = contract.type.typeArguments?.[0];

  assert(readonlyArgument !== undefined);
  assert(ts.isTypeLiteralNode(readonlyArgument));

  const errorProperty = readonlyArgument.members.find(
    (member) =>
      ts.isPropertySignature(member) && member.name.getText(sourceFile) === "error",
  );
  const resetProperty = readonlyArgument.members.find(
    (member) =>
      ts.isPropertySignature(member) && member.name.getText(sourceFile) === "reset",
  );

  assert(errorProperty !== undefined && ts.isPropertySignature(errorProperty));
  assert(errorProperty.type !== undefined);
  assert.notEqual(errorProperty.type.kind, ts.SyntaxKind.AnyKeyword);
  assert(resetProperty !== undefined && ts.isPropertySignature(resetProperty));
  assert(resetProperty.type !== undefined);
  assert(ts.isFunctionTypeNode(resetProperty.type));
  assert.equal(resetProperty.type.parameters.length, 0);
  assert.equal(resetProperty.type.type.kind, ts.SyntaxKind.VoidKeyword);
}

function assertNoUnsafeClientImports(sourceFile: ts.SourceFile): void {
  const imports = sourceFile.statements.filter(ts.isImportDeclaration);

  assert.equal(imports.length, 0);
}

async function withProcessEnvironment(
  values: Readonly<Record<string, string | undefined>>,
  run: () => void | Promise<void>,
): Promise<void> {
  const previousValues = Object.fromEntries(
    Object.keys(values).map((variable) => [variable, process.env[variable]]),
  );

  for (const [variable, value] of Object.entries(values)) {
    if (value === undefined) {
      delete process.env[variable];
    } else {
      process.env[variable] = value;
    }
  }

  try {
    await run();
  } finally {
    // Fixture ortamının sonraki regresyon kontrollerine sızmasını önler.
    for (const [variable, value] of Object.entries(previousValues)) {
      if (value === undefined) {
        delete process.env[variable];
      } else {
        process.env[variable] = value;
      }
    }
  }
}

async function runMarketBoundaryVerification(): Promise<void> {
  const [{ NextRequest }, { proxy }, { createMarketResolver }] =
    await Promise.all([
      import("next/server.js"),
      import("../src/proxy.ts"),
      import("../src/modules/markets/server.ts"),
    ]);

  const resolver = createMarketResolver({
    publicSiteUrls: {
      uk: new URL("https://uk.example.test"),
      ua: new URL("https://ua.example.test"),
    },
  });

  assert.equal(resolver.resolve("uk.example.test").context.locale, "en-GB");
  assert.equal(resolver.resolve("ua.example.test").context.locale, "uk-UA");
  console.log("PASS: trusted UK and UA market resolution remains unchanged");

  await withProcessEnvironment(
    {
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL_UK: "https://infravolt.co.uk",
      NEXT_PUBLIC_SITE_URL_UA: "https://ua.example.test",
    },
    async () => {
      const rejectedHost = "private-unknown-host.example.test";
      const rejectedQuery = "private-query-fixture";
      const request = new NextRequest(
        `https://${rejectedHost}/?value=${rejectedQuery}`,
        { headers: { host: rejectedHost } },
      );
      const response = proxy(request);
      const body = await response.text();

      assert.equal(response.status, 404);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(body, "Not Found");
      assert(!body.includes(rejectedHost));
      assert(!body.includes(rejectedQuery));
    },
  );
  console.log("PASS: unknown production host remains a redacted no-store 404");
}

function verifyMarketBoundaryChild(): void {
  // React render ve server-only modüller farklı export koşulları istediği için market kontrolü izole child process'te çalışır.
  const result = spawnSync(
    process.execPath,
    [
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "--conditions=react-server",
      "--experimental-strip-types",
      scriptPath,
      "--market-boundary",
    ],
    {
      cwd: workspaceRoot,
      encoding: "utf8",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      timeout: 120_000,
    },
  );

  assert.equal(result.status, 0, "market boundary child verification");
  assert.match(
    result.stdout ?? "",
    /PASS: trusted UK and UA market resolution remains unchanged/u,
  );
  assert.match(
    result.stdout ?? "",
    /PASS: unknown production host remains a redacted no-store 404/u,
  );
}

async function runSafeStateVerification(): Promise<void> {
  rmSync(verificationRoot, { force: true, recursive: true });

  try {
    const loading = compileSafeState("loading", safeStatePaths.loading);
    const notFound = compileSafeState("not-found", safeStatePaths.notFound);
    const routeError = compileSafeState("error", safeStatePaths.routeError);
    const globalError = compileSafeState(
      "global-error",
      safeStatePaths.globalError,
    );
    const secretFixture = "private-error-fixture-value";
    const digestFixture = "private-digest-fixture-value";
    const stackFixture = "private-stack-fixture-value";
    const fixtureError = Object.assign(new Error(secretFixture), {
      cause: "private-cause-fixture-value",
      digest: digestFixture,
    });

    fixtureError.stack = stackFixture;

    const errorProps = {
      error: fixtureError,
      reset: () => undefined,
    } as const satisfies ErrorBoundaryFixtureProps;

    const checks: readonly Check[] = [
    {
      name: "loading state is server-safe and exposes one accessible status",
      run: () => {
        const markup = renderSafeState(loading);

        assert(!hasUseClientDirective(loading.sourceFile));
        assertSingleHeadingAndMain(markup);
        assert.match(markup, /<main[^>]*aria-busy="true"/u);
        assert.equal(countElements(markup, "p"), 1);
        assert.match(markup, /<p role="status">[^<]+<\/p>/u);
      },
    },
    {
      name: "not-found state is server-safe with one safe recovery link",
      run: () => {
        const markup = renderSafeState(notFound);

        assert(!hasUseClientDirective(notFound.sourceFile));
        assertSingleHeadingAndMain(markup);
        assert.equal(countElements(markup, "a"), 1);
        // React attribute sırasını garanti etmediği için recovery hedefi sıra-bağımsız doğrulanır.
        assert.match(
          markup,
          /<a(?=[^>]*\shref="\/")[^>]*>Return to the homepage<\/a>/u,
        );
      },
    },
    {
      name: "route error is a typed client boundary with a bounded retry",
      run: () => {
        const markup = renderSafeState(routeError, errorProps);

        assert(hasUseClientDirective(routeError.sourceFile));
        assertTypedBoundaryContract(routeError.sourceFile);
        assertNoUnsafeClientImports(routeError.sourceFile);
        assertResetButton(routeError.sourceFile);
        assertSingleHeadingAndMain(markup);
        assert.match(markup, /<button type="button">Try again<\/button>/u);
      },
    },
    {
      name: "global error is a typed client boundary that owns html and body",
      run: () => {
        const markup = renderSafeState(globalError, errorProps);

        assert(hasUseClientDirective(globalError.sourceFile));
        assertTypedBoundaryContract(globalError.sourceFile);
        assertNoUnsafeClientImports(globalError.sourceFile);
        assertResetButton(globalError.sourceFile);
        assert.equal(countElements(markup, "html"), 1);
        assert.equal(countElements(markup, "body"), 1);
        assertSingleHeadingAndMain(markup);
        assert.match(markup, /<html lang="en-GB">/u);
        assert.match(markup, /<button type="button">Try again<\/button>/u);
      },
    },
    {
      name: "error states redact message, stack, cause and digest fixtures",
      run: () => {
        const markup = [
          renderSafeState(routeError, errorProps),
          renderSafeState(globalError, errorProps),
        ].join("\n");

        // Tüm hassas fixture değerlerini birlikte kontrol etmek kısmi redaction'ın gözden kaçmasını önler.
        for (const forbiddenValue of [
          secretFixture,
          digestFixture,
          stackFixture,
          fixtureError.cause,
        ]) {
          assert(!markup.includes(forbiddenValue));
        }
      },
    },
      {
        name: "market and unknown-host regressions pass in the server condition",
        run: verifyMarketBoundaryChild,
      },
    ];

    for (const check of checks) {
      await check.run();
      console.log(`PASS: ${check.name}`);
    }

    console.log(`Safe-state verification passed (${checks.length} checks).`);
  } finally {
    // Başarısız kontrolde de geçici çıktıyı silerek doğrulama tekrarlarını deterministik tutar.
    rmSync(verificationRoot, { force: true, recursive: true });
  }
}

if (process.argv.includes("--market-boundary")) {
  await runMarketBoundaryVerification();
} else {
  await runSafeStateVerification();
}
