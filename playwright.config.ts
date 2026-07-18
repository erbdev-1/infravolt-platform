import { defineConfig, devices } from "@playwright/test";

import {
  createSafeTestProcessEnvironment,
  LOCAL_TEST_URLS,
  TEST_SERVER_PORT,
} from "./tests/helpers/test-environment";

const chromium = {
  ...devices["Desktop Chrome"],
  trace: "retain-on-failure" as const,
  screenshot: "only-on-failure" as const,
  video: "off" as const,
  serviceWorkers: "block" as const,
};

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [["line"]],
  outputDir: "test-results/playwright",
  use: {
    actionTimeout: 5_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: "chromium-uk",
      grep: /@uk/u,
      use: {
        ...chromium,
        baseURL: LOCAL_TEST_URLS.uk,
        locale: "en-GB",
      },
    },
    {
      name: "chromium-ua",
      grep: /@ua/u,
      use: {
        ...chromium,
        baseURL: LOCAL_TEST_URLS.ua,
        locale: "uk-UA",
      },
    },
    {
      name: "chromium-unknown-host",
      grep: /@unknown/u,
      use: {
        ...chromium,
        baseURL: LOCAL_TEST_URLS.unknown,
        locale: "en-GB",
      },
    },
  ],
  webServer: {
    command: `pnpm dev --hostname 127.0.0.1 --port ${TEST_SERVER_PORT}`,
    url: LOCAL_TEST_URLS.uk,
    reuseExistingServer: false,
    timeout: 60_000,
    stdout: "pipe",
    stderr: "pipe",
    env: createSafeTestProcessEnvironment(),
  },
});
