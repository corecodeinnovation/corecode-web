// El build `output: standalone` no copia public/ ni .next/static (server.js no
// los necesita para arrancar, pero sí para servirlos). El Dockerfile ya hace
// esta copia en la imagen; este script la replica para correr el mismo
// server.js localmente (e2e con Playwright), sin depender de `next start`
// (incompatible con standalone).
import { cpSync } from "node:fs";

cpSync("public", ".next/standalone/public", { recursive: true });
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
