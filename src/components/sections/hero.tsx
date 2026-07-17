import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-cci-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Del núcleo del código al producto terminado
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-cci-muted">
            En Core Code Innovation diseñamos y construimos software completo: aplicaciones web y
            móviles, integraciones de IA, infraestructura DevOps, automatizaciones y redes.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="rounded-cci bg-cci-orange px-5 py-3 text-sm font-semibold text-cci-ink transition-colors hover:bg-cci-orange-600"
            >
              Hablemos de tu proyecto
            </Link>
            <Link
              href="/#portfolio"
              className="rounded-cci border border-cci-line px-5 py-3 text-sm font-semibold text-cci-text transition-colors hover:border-cci-slate-600 hover:bg-cci-surface"
            >
              Ver portfolio
            </Link>
          </div>

          <p className="font-mono text-xs text-cci-slate-600">
            TypeScript · Python · Next.js · NestJS · Docker
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src="/brand/cci-logo-dark.png"
            alt="Logo de Core Code Innovation: cubo fragmentado junto al wordmark"
            width={954}
            height={535}
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
