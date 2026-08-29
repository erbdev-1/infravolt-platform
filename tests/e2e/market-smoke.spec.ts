import { expect, test } from "./fixtures/test";

async function expectValidPageAnchors(page: import("@playwright/test").Page) {
  const missingTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter(
          (href): href is string =>
            href !== null && document.querySelector(href) === null,
        ),
    );

  expect(missingTargets).toEqual([]);
}

test("@uk public root renders the UK market homepage safely", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Electrical infrastructure systems for demanding projects",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Product Systems" }).first(),
  ).toHaveAttribute("href", "#product-systems");
  // Two instances exist on the page: a header badge (only shown at very wide
  // desktop widths, hidden at this test's 1280px viewport by design) and a
  // footer brand descriptor (always rendered). `.last()` targets the footer
  // instance so this assertion doesn't depend on the header's breakpoint.
  await expect(
    page.getByText("Official UK Representative").last(),
  ).toBeVisible();
  await expect(page.locator("#product-systems a.product-card")).toHaveCount(6);
  await expect(page.locator("#industries article")).toHaveCount(8);

  // Hero six-badge overview + value strip and the Technical Resources
  // Preview section are the credibility/final-section content actually
  // rendered on the current homepage (the manufacturer/disclosures block
  // this test used to check was removed in the hero/product-systems
  // redesign).
  await expect(
    page.locator(".hero").getByRole("link", { name: "Explore Busbar Systems" }),
  ).toHaveAttribute("href", "#product-systems");
  await expect(page.getByText("Six Product Groups")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Project-ready technical documentation",
    }),
  ).toBeVisible();
  // 5, not 6: EV Charging Systems routes to an external partner site
  // (g-charge.com.tr), not an internal /products/ page.
  await expect(
    page.locator('#product-systems a.product-card[href^="/products/"]'),
  ).toHaveCount(5);
  await expectValidPageAnchors(page);
  browserDiagnostics.assertClean();
});

test("@ua public root renders the Ukraine market homepage safely", async ({
  browserDiagnostics,
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "uk-UA");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Системи електричної інфраструктури для складних проєктів",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Оглянути системи" }).first(),
  ).toHaveAttribute("href", "#product-systems");
  await expect(page.getByText("Official UK Representative")).toHaveCount(0);
  await expect(page.locator("#product-systems a.product-card")).toHaveCount(6);
  await expect(page.locator("#industries article")).toHaveCount(8);
  const main = page.locator("main");

  await expect(main).not.toContainText(/\b(?:GOST|EAC|UKCA|RoHS)\b/u);

  const mainText = ((await main.textContent()) ?? "").toLocaleLowerCase(
    "uk-UA",
  );

  const forbiddenClaims = [
    "exclusive distributor",
    "officially authorised distributor",
    "certified partner",
    "russia",
    "kaliningrad",
    "ексклюзивний дистриб’ютор",
    "ексклюзивний дистриб'ютор",
    "офіційний дистриб’ютор",
    "офіційний дистриб'ютор",
    "сертифікований партнер",
    "росія",
    "росії",
    "російський",
    "російська",
    "калінінград",
  ];

  for (const forbiddenClaim of forbiddenClaims) {
    expect(mainText).not.toContain(forbiddenClaim.toLocaleLowerCase("uk-UA"));
  }
  await expectValidPageAnchors(page);
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
