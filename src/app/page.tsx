// Placeholder de la landing — el hero y las secciones llegan en la fase 2.
export default function Home() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-cci-orange">{"// corecode-web"}</p>
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">
        Core Code <span className="text-cci-orange">Innovation</span>
      </h1>
      <p className="max-w-xl text-lg text-cci-muted">
        Desarrollo de software a medida: web, mobile, IA/ML, DevOps, automatizaciones, bots y
        redes.
      </p>
    </section>
  );
}
