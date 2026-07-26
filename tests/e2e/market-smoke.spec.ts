import { expect, test } from "./fixtures/test";

async function expectValidPageAnchors(page: import("@playwright/test").Page) {
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll(
    (links) =>
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
      name: "Electrical infrastructure systems for projects that cannot afford uncertainty.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discuss a project" }).first(),
  ).toHaveAttribute("href", "#contact");
  await expect(page.locator("main")).not.toContainText(
    /distributor|officially authorised|exclusive|certified partner|russia|kaliningrad|дистриб|росі|калінінград/iu,
  );
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
      name: "Системи електричної інфраструктури для проєктів, у яких невизначеність неприпустима.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Обговорити проєкт" }).first(),
  ).toHaveAttribute("href", "#contact");
  await expect(page.locator("main")).not.toContainText(
    /distributor|officially authorised|exclusive|certified partner|russia|kaliningrad|дистриб|росі|калінінград/iu,
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
