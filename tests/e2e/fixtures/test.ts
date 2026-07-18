import {
  expect,
  test as base,
  type Page,
  type TestInfo,
} from "@playwright/test";

import { TEST_SERVER_PORT } from "../../helpers/test-environment";

const ALLOWED_LOCAL_HOSTS = new Set([
  "uk.infravolt.localhost",
  "ua.infravolt.localhost",
  "unknown.infravolt.localhost",
]);

function isAllowedTestUrl(url: URL, protocol: "http:" | "ws:"): boolean {
  return (
    url.protocol === protocol &&
    url.port === String(TEST_SERVER_PORT) &&
    ALLOWED_LOCAL_HOSTS.has(url.hostname)
  );
}

type BrowserDiagnosticSnapshot = Readonly<{
  consoleErrorCount: number;
  pageErrorCount: number;
  unexpectedNetworkCount: number;
}>;

type BrowserDiagnostics = Readonly<{
  assertClean: () => void;
  snapshot: () => BrowserDiagnosticSnapshot;
}>;

async function monitorBrowser(page: Page): Promise<BrowserDiagnostics> {
  let consoleErrorCount = 0;
  let pageErrorCount = 0;
  let unexpectedNetworkCount = 0;

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrorCount += 1;
    }
  });
  page.on("pageerror", () => {
    pageErrorCount += 1;
  });

  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    const isLocalHttpRequest = isAllowedTestUrl(url, "http:");

    if (isLocalHttpRequest) {
      await route.continue();
      return;
    }

    // E2E smoke yalnız yerel foundation sunucusuna erişebilir; beklenmeyen dış istek fail-safe biçimde kesilir.
    unexpectedNetworkCount += 1;
    await route.abort("blockedbyclient");
  });

  await page.routeWebSocket("**/*", async (webSocket) => {
    const url = new URL(webSocket.url());

    if (isAllowedTestUrl(url, "ws:")) {
      webSocket.connectToServer();
      return;
    }

    // HTTP allowlist'i aşabilecek dış WebSocket kanalı da aynı yerel güven sınırında kapatılır.
    unexpectedNetworkCount += 1;
    await webSocket.close({ code: 1008, reason: "Non-local WebSocket blocked" });
  });

  const snapshot = (): BrowserDiagnosticSnapshot => ({
    consoleErrorCount,
    pageErrorCount,
    unexpectedNetworkCount,
  });

  return {
    snapshot,
    assertClean(): void {
      const diagnostics = snapshot();

      expect(
        diagnostics.consoleErrorCount,
        "Unexpected browser console errors",
      ).toBe(0);
      expect(diagnostics.pageErrorCount, "Unexpected page errors").toBe(0);
      expect(
        diagnostics.unexpectedNetworkCount,
        "Unexpected non-local browser requests",
      ).toBe(0);
    },
  };
}

async function attachSafeDiagnostics(
  diagnostics: BrowserDiagnostics,
  testInfo: TestInfo,
): Promise<void> {
  // Ham console veya URL değerleri yerine yalnız sayıları kaydetmek artifact üzerinden hassas veri sızıntısını önler.
  await testInfo.attach("browser-diagnostics", {
    body: Buffer.from(JSON.stringify(diagnostics.snapshot())),
    contentType: "application/json",
  });
}

export const test = base.extend<{
  browserDiagnostics: BrowserDiagnostics;
}>({
  browserDiagnostics: async ({ page }, provide) => {
    const diagnostics = await monitorBrowser(page);

    await provide(diagnostics);
  },
});

test.afterEach(async ({ browserDiagnostics }, testInfo) => {
  await attachSafeDiagnostics(browserDiagnostics, testInfo);
});

export { expect };
