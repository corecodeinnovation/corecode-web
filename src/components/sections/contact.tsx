"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputClasses =
  "w-full rounded-cci border border-cci-line bg-cci-surface-2 px-4 py-3 text-sm text-cci-text placeholder:text-cci-slate-600 focus:border-cci-slate-600 focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" aria-labelledby="contacto-titulo">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="contacto-titulo" className="font-display text-3xl font-semibold sm:text-4xl">
              Hablemos
            </h2>
            <p className="mt-4 max-w-md text-cci-muted">
              ¿Tienes un proyecto en mente o quieres conversar sobre una idea? Escríbenos y te
              respondemos a la brevedad.
            </p>
            <p className="mt-6 font-mono text-xs text-cci-slate-600">
              El mensaje llega directo a nuestro sistema de notificaciones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm text-cci-muted">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className={inputClasses}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm text-cci-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  className={inputClasses}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm text-cci-muted">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={2000}
                rows={5}
                className={inputClasses}
                placeholder="Cuéntanos de tu proyecto"
              />
            </div>

            {/* Honeypot anti-spam: oculto para humanos, los bots lo rellenan */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-company">Empresa</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-cci bg-cci-orange px-5 py-3 text-sm font-semibold text-cci-ink transition-colors hover:bg-cci-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Enviar mensaje"}
              </button>
              <p role="status" aria-live="polite" className="text-sm">
                {status === "ok" && (
                  <span className="text-cci-success">Mensaje enviado. Gracias por escribir.</span>
                )}
                {status === "error" && (
                  <span className="text-cci-danger">
                    No se pudo enviar. Intenta de nuevo en unos minutos.
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
