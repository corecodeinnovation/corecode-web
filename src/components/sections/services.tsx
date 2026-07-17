const services = [
  {
    glyph: "</>",
    title: "Desarrollo web",
    description:
      "Aplicaciones web completas: frontends rápidos y accesibles, backends sólidos y APIs REST o GraphQL.",
    stack: "React · Next.js · Node.js · NestJS",
  },
  {
    glyph: "app",
    title: "Apps móviles",
    description:
      "Aplicaciones cross-platform con base de código única y experiencia nativa en iOS y Android.",
    stack: "React Native · TypeScript",
  },
  {
    glyph: "ai",
    title: "IA / ML",
    description:
      "Integración de modelos de lenguaje, pipelines de ML y automatización inteligente sobre tus datos.",
    stack: "Python · FastAPI · LLM pipelines",
  },
  {
    glyph: ">_",
    title: "DevOps & Cloud",
    description:
      "Containerización, CI/CD y despliegues reproducibles para que el software llegue a producción sin fricción.",
    stack: "Docker · GitHub Actions · AWS/GCP",
  },
  {
    glyph: "{}",
    title: "Automatizaciones & bots",
    description:
      "Bots de Telegram, Discord y WhatsApp, webhooks y scripts que eliminan trabajo manual repetitivo.",
    stack: "Webhooks · grammY · Scripts",
  },
  {
    glyph: "net",
    title: "Redes",
    description:
      "Arquitectura de red, VPNs y seguridad para proyectos que necesitan una base conectada y protegida.",
    stack: "VPN · Seguridad · Diagnóstico",
  },
];

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="border-b border-cci-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm text-cci-orange">{"// servicios"}</p>
        <h2 id="servicios-titulo" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Qué construimos
        </h2>
        <p className="mt-4 max-w-2xl text-cci-muted">
          Seis áreas, un mismo estándar: código tipado, contenedores desde el día uno y entregas
          medibles.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col gap-3 rounded-cci border border-cci-line bg-cci-surface p-6 transition-colors hover:border-cci-slate-600"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-cci bg-cci-surface-2 font-mono text-sm text-cci-slate"
              >
                {service.glyph}
              </span>
              <h3 className="font-display text-lg font-semibold">{service.title}</h3>
              <p className="text-sm leading-relaxed text-cci-muted">{service.description}</p>
              <p className="mt-auto font-mono text-xs text-cci-slate-600">{service.stack}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
