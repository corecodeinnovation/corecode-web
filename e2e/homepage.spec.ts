import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("muestra el hero y navega a cada sección por anchor", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Del núcleo del código al producto terminado",
    );

    const headerNav = page.getByRole("navigation", { name: "Navegación principal" });
    await headerNav.getByRole("link", { name: "Servicios" }).click();
    await expect(page).toHaveURL(/#servicios$/);
    await expect(page.getByRole("heading", { name: "Qué construimos" })).toBeVisible();

    await headerNav.getByRole("link", { name: "Portfolio" }).click();
    await expect(page).toHaveURL(/#portfolio$/);
    await expect(page.getByRole("heading", { name: /Un ecosistema/ })).toBeVisible();
  });

  test("el skip link salta al contenido principal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
  });

  test("el header enlaza al blog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  });
});
