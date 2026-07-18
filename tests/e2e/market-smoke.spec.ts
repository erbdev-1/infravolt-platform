import { expect, test } from "./fixtures/test";

test("@uk public root renders the UK market foundation safely", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(
    page.getByRole("heading", { level: 1, name: "InfraVolt" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText(
    "Engineering foundation for the UK and Ukraine application.",
  );
  browserDiagnostics.assertClean();
});

test("@ua public root renders the Ukraine market foundation safely", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "uk-UA");
  await expect(
    page.getByRole("heading", { level: 1, name: "InfraVolt" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toContainText(
    "Engineering foundation for the UK and Ukraine application.",
  );
  browserDiagnostics.assertClean();
});

test("@unknown an untrusted host is rejected without application data", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(404);
  await expect(page.getByText("Not Found", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading")).toHaveCount(0);
  // Chromium ana document 404'ünü console error olarak bildirir; negatif test yalnız bu tek beklenen olayı kabul eder.
  expect(browserDiagnostics.snapshot()).toEqual({
    consoleErrorCount: 1,
    pageErrorCount: 0,
    unexpectedNetworkCount: 0,
  });
});
