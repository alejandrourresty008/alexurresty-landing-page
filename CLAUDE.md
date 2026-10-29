# alexurresty.com: guía para cambios rápidos

Web de Alex Urresty (producción audiovisual, Lima). Next.js + TypeScript, exportada como sitio estático (`out/`) y servida por el Worker `alex-urresty` de Cloudflare. El mapa completo de carpetas y comandos está en `README.md`; no hace falta leer nada más para la mayoría de cambios.

## Cómo trabajar sin leer todo el proyecto

Lee solo el archivo que corresponde al pedido:

| Pedido | Archivo |
| --- | --- |
| Cambiar un texto de servicio, agregar/quitar/ordenar proyectos, piezas, marcas o cifras | `lib/catalog.ts` (fuente única del contenido) |
| Teléfono, email, redes, formulario | `lib/site.ts` |
| Título, descripción, SEO | `app/layout.tsx`, `lib/structured-data.ts` |
| Colores, tamaños, animaciones, diseño | `app/globals.css` |
| Orden de secciones | `app/page.tsx` |
| Una sección concreta | `components/<sección>.tsx` |
| Ventanas, carrusel, vistas previas, menú, formulario (JS del navegador) | `components/behaviors.tsx` |

Videos e imágenes van en `public/videos`, `public/img`; el formato real de cada video sale de `media-manifest.json` (no inventar medidas).

## Verificar y publicar

1. `npm run typecheck && npm run lint && npm run test:unit`
2. `npm run build`
3. Publicar: `npx wrangler@4 deploy` (ya hay sesión de Cloudflare; si no, `npx wrangler@4 login`). Volver atrás: `npx wrangler rollback`.
4. Probar en local: `npm run preview` (http://127.0.0.1:4177) y, si el cambio es visual, `npm test` (Playwright, Chrome).

Publicar solo cuando Alex lo pida. Alex quiere ver los cambios en local antes.

## Decisiones de Alex (no revertir)

- Ningún texto en primera persona, salvo la frase de portada: "Entiendo tu industria. Produzco tu historia."
- Servicio se llama "Estrategia de contenido" (no "Contenido para redes"). Solo "Streaming", sin "en vivo" a la vista.
- Orden: Proyectos antes que Servicios. Botón de portada: "Ver proyectos".
- No poner "Más de 5 años de experiencia". Ubicación: "desde Lima para todo el Perú".
- Cada video conserva su forma real: nunca recortar verticales ni pixelar horizontales.
- Estilo: Satoshi, fondo #0D1423, texto #F2F0EC, un solo acento rojo #E5352E. Rechazados: eyebrows, Instrument Serif, raya larga en textos, GSAP de prueba, animaciones que muevan `width`/`padding` (solo transform, opacity, filter).
- Animación al desplazarse: muy sutil; respetar `prefers-reduced-motion`.
- El escritorio y el celular se ajustan por separado: un cambio de escritorio no debe alterar el celular.

## Cuidados

- La web en vivo sale de ESTE proyecto, rama `web-oficial`, que también está en GitHub (`alejandrourresty008/alexurresty-landing-page`, rama `web-oficial`). La rama `main` de GitHub conserva la versión antigua de un solo `index.html` y no se debe usar para publicar. Si se conecta la publicación automática de Cloudflare a GitHub, conectar la rama `web-oficial`, nunca `main`, o se pisaría la web actual.
- Después de cada cambio publicado: `git commit` y `git push` de `web-oficial`, para que GitHub quede igual que la web.
- No enviar mensajes reales al probar el formulario (va a una hoja de Google).
- Respaldo anterior de un solo archivo: `D:\ALEX\WEB ALEX URRESTY\index.html` (ya no es la fuente).
