# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el
versionado sigue [SemVer](https://semver.org/lang/es/).

## [1.0.0] - 2026-07-19

Primera versión pública del sitio corporativo de Core Code Innovation.

### Added
- Landing dark-first con design tokens de marca (`--cci-*`): hero con logo,
  sección de servicios (6 áreas) y portfolio con los proyectos del ecosistema
  como casos de estudio.
- Blog técnico en MDX con listado y posts estáticos (SSG).
- Formulario de contacto con validación server-side, honeypot anti-spam y
  notificación vía `ops-notify-bot` (webhook con secret compartido).
- SEO: metadata OpenGraph/Twitter, imágenes OG generadas, `sitemap.xml`,
  `robots.txt` y JSON-LD de organización.
- Accesibilidad AA: skip link, contraste sobre tokens, semántica de landmarks.
  Lighthouse 100 en accessibility, best practices y SEO.
- Docker multi-stage (`output: standalone`) con usuario non-root y healthcheck;
  `docker compose up` en el puerto 3000.
- CI en GitHub Actions: lint + build en cada push/PR.

[1.0.0]: https://github.com/corecodeinnovation/corecode-web/releases/tag/v1.0.0
