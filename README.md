# Alex Urresty — web

Web de producción audiovisual publicada en https://alexurresty.com.

Next.js (App Router) + TypeScript estricto, exportada como sitio estático y servida por Cloudflare. La arquitectura viene de la rama `mejoras-leo`; el diseño y el contenido son los de la versión publicada el 2026-10-25 (antes era un solo `index.html`).

## Cómo está armada

| Carpeta | Qué contiene |
| --- | --- |
| `lib/catalog.ts` | **Todo el contenido**: servicios, filas de Proyectos, piezas, marcas y métricas. Para agregar, quitar u ordenar proyectos se edita solo este archivo. |
| `lib/types.ts` | Forma que debe tener cada dato (TypeScript avisa si falta algo). |
| `lib/site.ts` | Contacto: WhatsApp, email, redes y endpoint del formulario (Google Apps Script → Google Sheets). |
| `lib/structured-data.ts` | Datos estructurados schema.org para Google. |
| `lib/icons.ts` | Íconos SVG y métricas de la ventana. |
| `app/layout.tsx` | Título, descripción, Open Graph y demás metadatos SEO. |
| `app/page.tsx` | Orden de las secciones. |
| `app/globals.css` | Estilos (los mismos de la versión anterior). |
| `components/` | Una pieza por sección. Se generan en el servidor: el HTML llega completo al navegador y a Google. |
| `components/behaviors.tsx` | Única parte que corre en el navegador: ventanas y carrusel, vistas previas, menú, animación de "PROYECTOS", portada, pantalla de entrada y formulario. |
| `public/` | Fuentes Satoshi, imágenes, videos, `robots.txt` y `sitemap.xml`. |
| `tests/` | Pruebas del catálogo y recorridos en Chrome. |

## Comandos

Requiere Node.js 22.13 o superior.

```sh
npm ci              # instalar dependencias
npm run dev         # desarrollo en http://127.0.0.1:3000
npm run build       # exportación estática en out/
npm run preview     # sirve out/ en http://127.0.0.1:4177
```

Comprobaciones antes de publicar:

| Comando | Qué revisa |
| --- | --- |
| `npm run typecheck` | Tipos de TypeScript |
| `npm run lint` | Reglas de ESLint |
| `npm run test:unit` | Catálogo: servicios válidos, ids únicos, archivos existentes, formato de métricas |
| `npm test` | Recorridos en Chrome (con `npm run preview` activo): carga sin errores, animación de Proyectos, ventana de marca, formulario (sin enviar mensajes reales) |

## Publicar

```sh
npm run build
npx wrangler deploy
```

`wrangler.jsonc` publica `out/` en el Worker `alex-urresty` con los dominios `alexurresty.com` y `www.alexurresty.com`. Para volver a una versión anterior: `npx wrangler rollback`.
