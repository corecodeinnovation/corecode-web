import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Quiénes somos en Core Code Innovation: un estudio técnico que construye y opera su propia infraestructura en producción, no solo tutoriales.",
};

const stats = [
  { value: "8", label: "años de experiencia full-stack" },
  { value: "8", label: "repos operando como un solo ecosistema" },
  { value: "24/7", label: "en producción real, sobre este mismo homelab" },
];

const principles = [
  {
    title: "Código abierto y auditable",
    description:
      "Todo el ecosistema que ves en el portfolio es público. Nada de demos aisladas: puedes leer el código exacto que corre en producción.",
  },
  {
    title: "Docker-first",
    description:
      "Cada servicio se levanta con un comando. Si no corre reproducible en un contenedor, no está terminado.",
  },
  {
    title: "Tests y CI de verdad",
    description:
      "Unitarios y end-to-end en cada repo que lo amerita, corridos en cada push — no solo en el README, en el pipeline.",
  },
  {
    title: "Un solo sistema de diseño",
    description:
      "Los mismos tokens de marca en todos los frontends. Ningún color inventado por pantalla, dark-first en todo el ecosistema.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Sobre Core Code Innovation</h1>
      <p className="mt-4 text-lg leading-relaxed text-cci-muted">
        Un estudio técnico que construye software a medida — y que primero se lo exige a sí mismo,
        operando su propia infraestructura en producción.
      </p>

      <div className="mt-10 flex flex-col gap-6 text-cci-muted sm:text-lg">
        <p>
          Core Code Innovation nace de una pregunta simple: ¿qué tan lejos se puede llevar el
          conocimiento de un desarrollador full-stack si se aplica con la disciplina de producción
          real? Con 8 años de experiencia construyendo software, montamos este homelab para
          profundizar en DevOps — no a punta de tutoriales, sino operando infraestructura real, con
          los mismos riesgos y responsabilidades que cualquier sistema que atiende usuarios de
          verdad.
        </p>
        <p>
          Ese ejercicio se convirtió en un ecosistema de 8 repositorios que se sostienen entre sí:
          autenticación, procesamiento de trabajos en cola, una API GraphQL, un dashboard en tiempo
          real y la infraestructura que los despliega y monitorea — todo corriendo 24/7 detrás de
          este mismo sitio, no en una demo aparte.
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-cci border border-cci-line bg-cci-surface p-6">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-mono text-3xl font-semibold text-cci-orange">{stat.value}</dd>
            <dd className="mt-1 text-sm text-cci-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-16 font-display text-2xl font-semibold sm:text-3xl">Cómo trabajamos</h2>
      <p className="mt-4 text-cci-muted">
        Estos principios no son una declaración de intenciones: son verificables en cualquiera de
        los repos del ecosistema.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {principles.map((principle) => (
          <li
            key={principle.title}
            className="rounded-cci border border-cci-line bg-cci-surface p-6 transition-colors hover:border-cci-slate-600"
          >
            <h3 className="font-display text-lg font-semibold">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cci-muted">{principle.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap items-center gap-3 rounded-cci border border-cci-line bg-cci-surface p-8">
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold">¿Quieres verlo en un proyecto real?</h2>
          <p className="mt-2 text-sm text-cci-muted">
            Explora el ecosistema funcionando o cuéntanos qué necesitas construir.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#portfolio"
            className="rounded-cci border border-cci-line px-5 py-3 text-sm font-semibold text-cci-text transition-colors hover:border-cci-slate-600 hover:bg-cci-surface-2"
          >
            Ver portfolio
          </Link>
          <Link
            href="/#contacto"
            className="rounded-cci bg-cci-orange px-5 py-3 text-sm font-semibold text-cci-ink transition-colors hover:bg-cci-orange-600"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}
