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

  // The zone strip is interactive as soon as it's in the DOM, but this is a
  // large client component — under Next dev-mode compilation plus this
  // fixture's own request interception (see fixtures/test.ts), hydration can
  // still be finishing a moment after the DOM/network response looks
  // "loaded". Waiting for the network to settle before the first
  // interaction avoids a click landing before React has attached its event
  // handlers (a real timing gap in dev mode, not a production-user scenario
  // — production hydrates far faster).
  await page.waitForLoadState("networkidle");

  const zoneNav = page.getByRole("navigation", { name: "Data Centre zones" });

  // Previous + Next controls, plus one thumbnail per zone (8) plus Overview.
  await expect(zoneNav.getByRole("button")).toHaveCount(11);

  const zoneButton = zoneNav.getByRole("button", {
    name: "Main Electrical / UPS Room",
  });

  await zoneButton.click();

  // Assert the zone strip itself registered the selection before asserting
  // on the scene — if this ever regresses again, it fails here with an
  // unambiguous "the zone never activated" message instead of surfacing
  // three steps later as "hotspot not found".
  await expect(zoneButton).toHaveAttribute("aria-current", "true");
  await expect(
    page.getByRole("heading", { level: 1, name: "Main Electrical / UPS Room" }),
  ).toBeVisible();

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
