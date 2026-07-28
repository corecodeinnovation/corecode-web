type CaseStudy = {
  repo: string;
  area: string;
  description: string;
  stack: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  featured?: boolean;
};

const caseStudies: CaseStudy[] = [
  {
    repo: "core-dashboard",
    area: "Full-stack / Tiempo real",
    description:
      "Panel de control de infraestructura con WebSockets: estado de contenedores en vivo, streaming de logs, métricas históricas y alertas. Sin iniciar sesión se navega como visitante de solo lectura.",
    stack: "Next.js · NestJS · Socket.IO · PostgreSQL",
    github: "https://github.com/corecodeinnovation/core-dashboard",
    demo: "https://dashboard.corecodeinnovation.com",
    demoLabel: "Ver dashboard en vivo",
    featured: true,
  },
  {
    repo: "homelab-infra",
    area: "DevOps / Redes",
    description:
      "Infraestructura como código del homelab: Traefik con TLS, monitoreo con Prometheus y Grafana, VPN WireGuard y stacks segmentados por servicio.",
    stack: "Docker Compose · Traefik · Prometheus · Grafana",
    github: "https://github.com/corecodeinnovation/homelab-infra",
  },
  {
    repo: "cci-auth-service",
    area: "Backend / Seguridad",
    description:
      "Servicio de identidad reutilizable: JWT con refresh tokens, verificación de email, roles y rate limiting. Da autenticación al resto del ecosistema.",
    stack: "NestJS · PostgreSQL · Prisma · Redis",
    github: "https://github.com/corecodeinnovation/cci-auth-service",
  },
  {
    repo: "ops-notify-bot",
    area: "Bots / Automatización",
    description:
      "Bot de Telegram que recibe alertas de infraestructura — deploys, incidentes, contenedores caídos — y responde comandos de estado en tiempo real.",
    stack: "Node.js · TypeScript · grammY · Express",
    github: "https://github.com/corecodeinnovation/ops-notify-bot",
  },
  {
    repo: "netprobe-cli",
    area: "Redes",
    description:
      "Toolkit de diagnóstico de red por línea de comandos: port scanner, ping sweep de subredes, DNS lookup y export a JSON/CSV.",
    stack: "Python · Typer · Rich · pytest",
    github: "https://github.com/corecodeinnovation/netprobe-cli",
  },
  {
    repo: "taskforge",
    area: "Backend / Distribuido",
    description:
      "Procesamiento asíncrono con colas: workers escalables, reintentos con backoff, dead letter queue y ciclo de estados consultable por API.",
    stack: "NestJS · BullMQ · Redis · PostgreSQL",
    github: "https://github.com/corecodeinnovation/taskforge",
  },
  {
    repo: "gql-core",
    area: "Backend / API design",
    description:
      "API GraphQL de referencia: paginación cursor-based, subscriptions en vivo, DataLoader contra N+1 y tipado end-to-end.",
    stack: "Apollo · NestJS · Prisma · GraphQL Codegen",
    github: "https://github.com/corecodeinnovation/gql-core",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div
      className={`flex h-full flex-col gap-3 rounded-cci border bg-cci-surface p-6 transition-colors hover:bg-cci-surface-2 ${
        study.featured ? "border-cci-orange/40 hover:border-cci-orange/60" : "border-cci-line hover:border-cci-slate-600"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-cci-text">{study.repo}</h3>
        {study.demo && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-cci-success/30 bg-cci-success/10 px-2.5 py-0.5 font-mono text-[11px] text-cci-success">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-cci-success" />
            en vivo
          </span>
        )}
        {!study.demo && !study.github && (
          <span className="shrink-0 rounded-full border border-cci-line px-2.5 py-0.5 font-mono text-[11px] text-cci-slate">
            en desarrollo
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-cci-slate">{study.area}</p>
      <p className="text-sm leading-relaxed text-cci-muted">{study.description}</p>
      <p className="mt-auto font-mono text-xs text-cci-slate">{study.stack}</p>

      {(study.demo || study.github) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {study.demo && (
            <a
              href={study.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-cci bg-cci-orange px-3 py-1.5 text-xs font-semibold text-cci-ink transition-colors hover:bg-cci-orange-600"
            >
              {study.demoLabel ?? "Ver en vivo"} ↗
            </a>
          )}
          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-cci border border-cci-line px-3 py-1.5 text-xs font-semibold text-cci-muted transition-colors hover:border-cci-slate-600 hover:text-cci-text"
            >
              Código ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-titulo" className="border-b border-cci-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="portfolio-titulo" className="font-display text-3xl font-semibold sm:text-4xl">
          Un ecosistema, no proyectos sueltos
        </h2>
        <p className="mt-4 max-w-2xl text-cci-muted">
          No solo lo decimos: operamos nuestra propia plataforma 24/7 con las mismas prácticas que
          aplicamos a cada proyecto — despliegue automatizado, monitoreo en tiempo real y alertas
          al instante. El dashboard está en vivo: puedes navegarlo como visitante ahora mismo, sin
          pedir acceso. Cada pieza es además código abierto que puedes revisar.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.repo} className={study.featured ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
