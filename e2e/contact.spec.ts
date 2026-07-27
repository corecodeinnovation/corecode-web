import { expect, test } from "@playwright/test";

test.describe("Formulario de contacto", () => {
  test("exige nombre, email y mensaje antes de enviar", async ({ page }) => {
    await page.goto("/#contacto");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    // El submit nativo no dispara si un required está vacío: seguimos en la página.
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.getByLabel("Nombre")).toBeVisible();
  });

  test("envía y muestra el mensaje de éxito", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );

    await page.goto("/#contacto");
    await page.getByLabel("Nombre").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Mensaje").fill("Quiero hablar de un proyecto.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText("Mensaje enviado. Gracias por escribir.")).toBeVisible();
  });

  test("muestra error si el envío falla", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ error: "upstream_error" }) }),
    );

    await page.goto("/#contacto");
    await page.getByLabel("Nombre").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByLabel("Mensaje").fill("Quiero hablar de un proyecto.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();

    await expect(page.getByText("No se pudo enviar. Intenta de nuevo en unos minutos.")).toBeVisible();
  });
});
