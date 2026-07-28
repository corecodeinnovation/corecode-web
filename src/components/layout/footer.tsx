import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cci-line bg-cci-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Image src="/brand/cci-monogram.svg" alt="" width={53} height={25} className="h-6 w-auto" />
          <p className="text-sm text-cci-muted">
            Web · Mobile · IA/ML · DevOps · Bots · Redes
          </p>
        </div>

        <nav aria-label="Enlaces del footer" className="flex items-center gap-4 text-sm">
          <Link href="/#servicios" className="text-cci-muted transition-colors hover:text-cci-text">
            Servicios
          </Link>
          <Link href="/#portfolio" className="text-cci-muted transition-colors hover:text-cci-text">
            Portfolio
          </Link>
          <Link href="/blog" className="text-cci-muted transition-colors hover:text-cci-text">
            Blog
          </Link>
          <Link href="/sobre-nosotros" className="text-cci-muted transition-colors hover:text-cci-text">
            Nosotros
          </Link>
          <a
            href="https://dashboard.corecodeinnovation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cci-muted transition-colors hover:text-cci-text"
          >
            Dashboard
          </a>
          <a
            href="https://github.com/corecodeinnovation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cci-muted transition-colors hover:text-cci-text"
          >
            GitHub
          </a>
        </nav>
      </div>

      <div className="border-t border-cci-line">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <p className="font-mono text-xs text-cci-slate">
            © {new Date().getFullYear()} Core Code Innovation
          </p>
        </div>
      </div>
    </footer>
  );
}
