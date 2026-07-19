import { NextResponse } from "next/server";

const LIMITS = { name: 100, email: 200, message: 2000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

function validate(body: unknown): ContactBody | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, email, message, company } = body as Record<string, unknown>;
  if (typeof name !== "string" || name.trim().length === 0 || name.length > LIMITS.name) {
    return null;
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email) || email.length > LIMITS.email) {
    return null;
  }
  if (
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > LIMITS.message
  ) {
    return null;
  }
  return { name: name.trim(), email, message: message.trim(), company: String(company ?? "") };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const data = validate(body);
  if (!data) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  // Honeypot: los humanos no ven este campo; si viene lleno es un bot.
  // Se responde ok para no darle señal al spammer.
  if (data.company !== "") {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.NOTIFY_WEBHOOK_URL;
  const webhookSecret = process.env.NOTIFY_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("contact: NOTIFY_WEBHOOK_URL o NOTIFY_WEBHOOK_SECRET sin configurar");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-webhook-secret": webhookSecret,
      },
      body: JSON.stringify({
        type: "contact",
        name: data.name,
        email: data.email,
        message: data.message,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`contact: webhook respondió ${response.status}`);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }
  } catch (err) {
    console.error("contact: fallo al notificar", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
