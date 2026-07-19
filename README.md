<div align="center">

# 🚀 corecode-web

**Web corporativa de Core Code Innovation. Landing, portfolio y blog técnico.**

![Tier](https://img.shields.io/badge/tier-3_flagship-FF5A1F)
![Next.js](https://img.shields.io/badge/Next.js-15-000000)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## Qué es
Sitio de la empresa: servicios, portfolio (los otros repos como casos de estudio),
sobre, blog técnico en MDX y contacto (que notifica vía ops-notify-bot). Self-hosted
en el homelab tras Traefik, con Cloudflare delante.

## Quickstart
```bash
cp .env.example .env.local
npm install && npm run dev
```

## Diseño
Usa `src/styles/tokens.css` — los design tokens de marca CCI. **No inventar colores**:
todo sale de las variables `--cci-*`. Ver `BRAND.md` en la raíz del monorepo homelab.

## Roadmap
- [x] Layout base: tokens de marca, header/footer con monograma, fuentes (Poppins/Inter/JetBrains Mono)
- [x] Hero (logo cubo) + sección de servicios
- [x] Portfolio (casos de estudio enlazando repos)
- [x] Blog MDX (fuente de posts LinkedIn)
- [x] Formulario de contacto -> ops-notify-bot
- [ ] Lighthouse >95, SEO, a11y
