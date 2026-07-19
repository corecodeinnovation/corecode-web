import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://corecodeinnovation.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Core Code Innovation — Desarrollo web, mobile, IA y DevOps",
    template: "%s | Core Code Innovation",
  },
  description:
    "Core Code Innovation (CCI): desarrollo de software a medida — web, apps móviles, IA/ML, DevOps, automatizaciones, bots y redes.",
  openGraph: {
    type: "website",
    siteName: "Core Code Innovation",
    locale: "es",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Core Code Innovation",
  url: siteUrl,
  logo: `${siteUrl}/brand/cci-logo-dark.png`,
};

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const viewport: Viewport = {
  themeColor: "#0B0B0E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-cci focus:bg-cci-surface-2 focus:px-4 focus:py-2 focus:text-sm"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {umamiSrc && umamiWebsiteId && (
          <Script src={umamiSrc} data-website-id={umamiWebsiteId} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
