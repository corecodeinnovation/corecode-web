import { POST } from "./route";

const ENV = { NOTIFY_WEBHOOK_URL: "http://ops-notify-bot:3001/webhook", NOTIFY_WEBHOOK_SECRET: "s3cr3t" };

function req(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Hola, quiero hablar de un proyecto.",
    company: "",
    ...overrides,
  };
}

describe("POST /api/contact", () => {
  const originalEnv = process.env;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    process.env = { ...originalEnv, ...ENV };
    fetchMock = jest.fn().mockResolvedValue(new Response(null, { status: 200 }));
    global.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("responde 400 si el body no es JSON válido", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", { method: "POST", body: "{no-json" }),
    );
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid_json" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["nombre vacío", validBody({ name: "  " })],
    ["email sin @", validBody({ email: "no-es-email" })],
    ["mensaje vacío", validBody({ message: "" })],
    ["nombre demasiado largo", validBody({ name: "a".repeat(101) })],
    ["mensaje demasiado largo", validBody({ message: "a".repeat(2001) })],
  ])("responde 400 invalid_payload: %s", async (_case, body) => {
    const response = await POST(req(body));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid_payload" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("el honeypot lleno responde ok sin notificar (no delata al bot)", async () => {
    const response = await POST(req(validBody({ company: "Acme Inc" })));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("responde 503 si falta configurar el webhook", async () => {
    delete process.env.NOTIFY_WEBHOOK_URL;
    const response = await POST(req(validBody()));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("notifica al webhook con el secret y responde ok", async () => {
    const response = await POST(req(validBody()));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      ENV.NOTIFY_WEBHOOK_URL,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "x-webhook-secret": ENV.NOTIFY_WEBHOOK_SECRET }),
      }),
    );
    const sentBody = JSON.parse((fetchMock.mock.calls[0]![1] as RequestInit).body as string);
    expect(sentBody).toEqual({
      type: "contact",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hola, quiero hablar de un proyecto.",
    });
  });

  it("responde 502 si el webhook responde con error", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));
    const response = await POST(req(validBody()));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "upstream_error" });
  });

  it("responde 502 si la llamada al webhook lanza (timeout/red)", async () => {
    fetchMock.mockRejectedValue(new Error("timeout"));
    const response = await POST(req(validBody()));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "upstream_error" });
  });
});
