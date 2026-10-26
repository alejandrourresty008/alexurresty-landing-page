# Migración de la landing de Alex Urresty

## Objetivo y criterios

Migrar el sitio existente a Next.js App Router + TypeScript + React + Tailwind sin alterar identidad, textos comerciales, fotografías, datos de contacto ni enlaces a trabajos. GSAP controla tipado y storytelling; Three.js se carga de forma diferida y solo dibuja durante transiciones de formato. anime.js se limita a la respuesta de iconos de botones independientes.

La galería anterior recortaba material vertical al imponer una anchura del 90%. La nueva presentación conserva los formatos reales, verificados a partir de videoWidth/videoHeight en Chrome. Primero agrupa piezas verticales en paneles 9:16 y luego presenta las horizontales 16:9, con una transición visual clara. Texto y CTA se superponen como en el hero. El contenido significativo usa object-fit: contain y nunca se estira. Se conservan los 13 proyectos y todas sus piezas de detalle.

## Arquitectura y orden de trabajo

1. Catálogo tipado y manifiesto de medios: fuente única para proyectos, servicios y formatos.
2. Página, metadata y assets: exportación estática compatible con hosting Cloudflare existente; sin despliegue.
3. React UI: navegación, hero, proyectos por capítulos, servicios, Sobre mí, contacto y diálogo accesible.
4. Movimiento: GSAP con cleanup por componente, Three.js bajo demanda y anime.js solo para microinteracciones.
5. Verificación y sustitución: TypeScript estricto, lint, build, pruebas de catálogo y navegador; respaldo antes de cambiar la carpeta externa.

## Reglas

Mantener Satoshi, #0D1423, #F2F0EC y #E5352E. Conservar el hero de tres videos. No introducir filtros azules ni líneas rojas al hacer scroll. No bloquear wheel/touch; solo la sección de proyectos tiene un recorrido finito de capítulos. Con movimiento reducido o ventanas bajas, los capítulos se apilan y no se fijan.

Los videos decorativos se pausan fuera de pantalla o con pestaña oculta; reproducción sin sonido con control global de pausa. Los videos de detalle usan controles nativos y ajuste contain. El diálogo recibe y contiene el foco, cierra con Escape y lo devuelve. El formulario conserva su endpoint y no afirma recepción confirmada cuando la respuesta es opaca.

## Validación

- npm run typecheck, npm run lint, npm run build.
- npm run test:unit: cobertura de clasificación por formato, orden de capítulos y conservación del catálogo.
- npm test: ratios visibles, transición vertical→horizontal, capítulos y salida, modales, CTAs, navegación móvil, movimiento reducido, fallback WebGL y errores de recursos.
- Capturas de escritorio y móvil. No enviar mensajes reales en pruebas.

La migración se implementa y prueba en una carpeta local rápida. Una vez validada se guarda el reemplazo en el repositorio del disco externo, manteniendo un respaldo completo de los fuentes previos y su historial Git.
