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
      name: "Electrical infrastructure systems for demanding projects.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Product Systems" }).first(),
  ).toHaveAttribute("href", "#product-systems");
  await expect(
    page.getByText("Official UK Representative").first(),
  ).toBeVisible();
  await expect(page.locator("#product-systems a.product-card")).toHaveCount(6);
  await expect(page.locator("#industries article")).toHaveCount(8);

  const disclosureLink = page.getByRole("link", {
    name: /View official Gersan disclosures/u,
  });
  await expect(disclosureLink).toHaveAttribute("target", "_blank");
  await expect(disclosureLink).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    page.locator('#product-systems a.product-card[href^="/products/"]'),
  ).toHaveCount(6);
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
      name: "Системи електричної інфраструктури для складних проєктів.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Оглянути системи продукції" }).first(),
  ).toHaveAttribute("href", "#product-systems");
  await expect(page.getByText("Official UK Representative")).toHaveCount(0);
  await expect(page.locator("#product-systems a.product-card")).toHaveCount(6);
  await expect(page.locator("#industries article")).toHaveCount(8);
  await expect(page.locator("main")).not.toContainText(
    /\b(?:exclusive distributor|officially authorised distributor|certified partner|russia|kaliningrad|GOST|EAC|UKCA|RoHS)\b|дистриб|росі|калінінград/iu,
  );
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
