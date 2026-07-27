import { expect, test } from "@playwright/test";

test.describe("Blog", () => {
  test("lista posts y navega al detalle", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Blog", level: 1 })).toBeVisible();

    const firstPost = page.getByRole("link", { name: /Cómo está construido este sitio/ });
    await expect(firstPost).toBeVisible();
    await firstPost.click();

    await expect(page).toHaveURL(/\/blog\/como-esta-construido-este-sitio$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Cómo está construido este sitio",
    );
    await page.getByRole("link", { name: "← Blog" }).click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test("un slug inexistente responde 404", async ({ page }) => {
    const response = await page.goto("/blog/no-existe-este-post");
    expect(response?.status()).toBe(404);
  });
});
