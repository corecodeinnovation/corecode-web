import Link from "next/link";
import { preload } from "react-dom";

const LOGO_SRCSET = "/brand/cci-logo-dark-480.webp 480w, /brand/cci-logo-dark.webp 960w";
const LOGO_SIZES = "(min-width: 1024px) 40vw, 90vw";

export function Hero() {
  preload("/brand/cci-logo-dark.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: LOGO_SRCSET,
    imageSizes: LOGO_SIZES,
  });

  return (
    <section className="border-b border-cci-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Del núcleo del código al producto terminado
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-cci-muted">
            Convertimos ideas en productos en producción: rápido de lanzar, sólido para crecer. De
            la arquitectura al deploy, un solo equipo responsable de que funcione.
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

          <p className="font-mono text-xs text-cci-slate">
            TypeScript · Python · Next.js · NestJS · Docker
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Variantes WebP pre-generadas: el sitio es 100% estático, sin optimizador runtime */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/cci-logo-dark.webp"
            srcSet={LOGO_SRCSET}
            sizes={LOGO_SIZES}
            alt="Logo de Core Code Innovation: cubo fragmentado junto al wordmark"
            width={960}
            height={538}
            fetchPriority="high"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
