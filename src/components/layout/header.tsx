import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cci-line bg-cci-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Core Code Innovation — inicio" className="flex items-center gap-3">
          <Image
            src="/brand/cci-monogram.svg"
            alt=""
            width={70}
            height={33}
            priority
            className="h-8 w-auto"
          />
          <span className="hidden font-display text-sm font-semibold tracking-wide sm:inline">
            Core Code <span className="text-cci-orange">Innovation</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-cci px-3 py-2 text-sm text-cci-muted transition-colors hover:bg-cci-surface hover:text-cci-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="ml-2 rounded-cci bg-cci-orange px-4 py-2 text-sm font-semibold text-cci-ink transition-colors hover:bg-cci-orange-600"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
