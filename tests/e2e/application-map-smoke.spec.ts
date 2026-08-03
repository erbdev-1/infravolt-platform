import { expect, test } from "./fixtures/test";

test("@uk Data Centre Application Map loads and supports zone and hotspot selection", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/application-map");

  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: "Data Centre Application Map" }),
  ).toBeVisible();

  const zoneNav = page.getByRole("navigation", { name: "Data Centre zones" });

  await expect(zoneNav.getByRole("button")).toHaveCount(8);

  await zoneNav.getByRole("button", { name: "Main Electrical Room" }).click();

  const hotspot = page.getByRole("button", {
    name: "Busbar Systems, overhead distribution run",
  });

  await expect(hotspot).toBeVisible();
  await hotspot.click();

  const dialog = page.getByRole("dialog", { name: "Busbar Systems" });

  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Used here for")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  browserDiagnostics.assertClean();
});

test("@ua Data Centre Application Map loads with localized content", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/application-map");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "uk-UA");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Карта застосувань центру обробки даних",
    }),
  ).toBeVisible();

  browserDiagnostics.assertClean();
});

test("@uk Data Centre Application Map has no page-level horizontal overflow on mobile", async ({
  browserDiagnostics,
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });

  const response = await page.goto("/application-map");

  expect(response?.status()).toBe(200);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);

  browserDiagnostics.assertClean();
});
