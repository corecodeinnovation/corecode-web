type CaseStudy = {
  repo: string;
  area: string;
  description: string;
  stack: string;
  github?: string;
};

const caseStudies: CaseStudy[] = [
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
      "Bot de Telegram que recibe webhooks del homelab — deploys, alertas, contenedores caídos — y responde comandos de estado en tiempo real.",
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
  },
  {
    repo: "gql-core",
    area: "Backend / API design",
    description:
      "API GraphQL de referencia: paginación cursor-based, subscriptions en vivo, DataLoader contra N+1 y tipado end-to-end.",
    stack: "Apollo · NestJS · Prisma · GraphQL Codegen",
  },
  {
    repo: "core-dashboard",
    area: "Full-stack / Tiempo real",
    description:
      "Panel de control del homelab con WebSockets: estado de contenedores en vivo, streaming de logs, métricas históricas y alertas.",
    stack: "Next.js · NestJS · Socket.IO · PostgreSQL",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-cci-text">
          {study.repo}
          {study.github && (
            <span aria-hidden="true" className="ml-2 text-cci-slate-600 transition-colors group-hover:text-cci-orange">
              ↗
            </span>
          )}
        </h3>
        {!study.github && (
          <span className="shrink-0 rounded-full border border-cci-line px-2.5 py-0.5 font-mono text-[11px] text-cci-slate-600">
            en desarrollo
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-cci-slate">{study.area}</p>
      <p className="text-sm leading-relaxed text-cci-muted">{study.description}</p>
      <p className="mt-auto font-mono text-xs text-cci-slate-600">{study.stack}</p>
    </>
  );

  const cardClasses =
    "flex h-full flex-col gap-3 rounded-cci border border-cci-line bg-cci-surface p-6 transition-colors";

  if (study.github) {
    return (
      <a
        href={study.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${study.repo} en GitHub`}
        className={`group ${cardClasses} hover:border-cci-slate-600 hover:bg-cci-surface-2`}
      >
        {body}
      </a>
    );
  }

  return <div className={cardClasses}>{body}</div>;
}

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-titulo" className="border-b border-cci-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm text-cci-orange">{"// portfolio"}</p>
        <h2 id="portfolio-titulo" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Un ecosistema, no proyectos sueltos
        </h2>
        <p className="mt-4 max-w-2xl text-cci-muted">
          Los repos del homelab de CCI se conectan entre sí: la infraestructura despliega, el bot
          alerta, el servicio de auth da identidad y el dashboard lo monitorea todo en vivo.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.repo}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
