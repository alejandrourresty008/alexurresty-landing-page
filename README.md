# Alex Urresty — Next.js

Landing migrada a Next.js App Router, TypeScript estricto, React y Tailwind CSS. Se conserva la identidad y el contenido del sitio anterior.

## Ejecutar

Requiere Node.js 22.13 o superior y npm.

```sh
npm ci
npm run dev
```

La vista de desarrollo abre en http://127.0.0.1:3000.

```sh
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm run preview
```

`npm run build` genera la web completa en `out/`. `npm run preview` sirve esa exportación en http://127.0.0.1:4177. No es necesario un servidor Node en producción.

Pruebas E2E con Chrome instalado y la vista previa activa:

```sh
npm test
```

Se puede cambiar el origen de pruebas con `BASE_URL`. Las pruebas de formulario interceptan las peticiones: no envían mensajes reales.

## Proyectos y formatos

`media-manifest.json` contiene los metadatos reales de los 26 archivos de video. `lib/catalog.ts` conserva los 13 proyectos, los cuatro servicios, textos, piezas completas y enlaces publicados.

- Nueve proyectos tienen vistas previas verticales; cuatro, horizontales. La clasificación usa dimensiones, no el servicio comercial.
- Escritorio: tres piezas verticales por capítulo; después, una pieza horizontal por capítulo.
- Móvil: una pieza vertical por capítulo, seguida por los capítulos horizontales.
- Escenas a pantalla completa con video en `object-fit: contain` y texto superpuesto. Los formatos 9:16 y 16:9 se conservan dentro de la composición, sin estirar el material ni imponer un ancho del 90% a todos los formatos.
- Un título Proyectos de gran escala abre el recorrido. GSAP lo amplía y desvanece antes de revelar el escenario de video; el scroll vertical traslada físicamente la pista de capítulos en horizontal. Se puede omitir el recorrido con Servicios/Contacto o navegar con los controles.
- Los formatos reales de algunas previsualizaciones son 480×854; se conservan dentro del marco sin distorsión. Las horizontales disponibles son previews de 640×360. La resolución de origen limita su nitidez al ampliarlas; los enlaces a YouTube y los videos completos se conservan en el diálogo.
- Con movimiento reducido o ventanas de poca altura, los capítulos se apilan sin fijación ni reproducción automática.

## Responsabilidades de animación

- GSAP + `@gsap/react`: tipado en bucle, transiciones de capítulos, scroll y reveals. `useGSAP` revierte timelines, estilos y ScrollTriggers al actualizar o desmontar.
- Three.js: importación diferida cerca de Proyectos; un único canvas, renderizado solo durante el cambio de formato, con límite de DPR y liberación explícita de geometría, material y renderer. Sin filtros azules ni líneas rojas durante el scroll.
- anime.js: importación bajo demanda para el desplazamiento del icono de botones independientes. No modifica elementos animados por GSAP.
- CSS: estados simples de hover, foco y botones.

Los videos decorativos se detienen fuera de pantalla y con la pestaña oculta. El control global pausa tipado, videos y efectos. Las piezas completas se reproducen con controles nativos en un `<dialog>` accesible.

## Estructura

- `app/`: página, metadata y estilos Tailwind.
- `components/`: componentes React e interacciones con cleanup.
- `lib/`: datos tipados, contratos y constantes.
- `public/`: medios originales, fuentes Satoshi, robots y sitemap.
- `tests/`: pruebas de catálogo y recorridos Playwright.

## Contacto

El formulario conserva el endpoint existente de Google Apps Script. Valida los campos, limita duplicados, aplica timeout y permite reintentar. La petición `no-cors` devuelve una respuesta opaca: la interfaz informa “Solicitud enviada”, sin afirmar recepción ni almacenamiento confirmados. Queda pendiente la confirmación de una entrega real por el propietario; esta migración no envía pruebas reales.

## Hosting y reversión

`wrangler.jsonc` conserva los dominios existentes y ahora sirve `./out`. No se ha desplegado esta migración. Para publicar posteriormente, compilar primero y usar la configuración de Cloudflare existente.

Los fuentes anteriores se respaldan fuera del repositorio antes de reemplazarlos. El historial `.git` se mantiene; no se mezclan los scripts antiguos con la nueva aplicación. Ver `docs/MIGRATION.md` para el registro de validación y reversión.

## Calidad y compatibilidad

Dependencias fijadas en package-lock.json. Next.js 16.4.3, React 19.3.1, Tailwind 4.3.3, GSAP 3.15.0, Three.js 0.186.1 y anime.js 4.5.0. TypeScript 5.9.3 mantiene compatibilidad con el tooling. ESLint 9.39.5 es la versión admitida por los plugins distribuidos con eslint-config-next; no se fuerza ESLint 10 sobre sus peerDependencies incompatibles.

Referencias: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [GSAP React](https://gsap.com/resources/React/), [Three.js cleanup](https://threejs.org/manual/pages/cleanup.html), [anime.js React](https://animejs.com/documentation/getting-started/using-with-react/).

## Inmersividad y navegación

La referencia visual para la escala tipográfica y la presentación por escenas fue [AirPods Pro](https://www.apple.com/la/airpods-pro/) y [MacBook Pro](https://www.apple.com/macbook-pro/). Se mantiene el lenguaje y todos los medios de Alex Urresty; no se incorporan imágenes, tipografías ni contenido comercial de Apple.

Proyectos empieza con un título a pantalla completa. El recorrido posterior ocupa el viewport de borde a borde, conserva el formato de los videos y los desplaza en horizontal mientras se hace scroll vertical. Los controles se superponen; en móvil el filtro se compacta en un selector nativo. El movimiento reducido presenta el título y los capítulos sin pinning ni desplazamiento animado.

Los cuatro iconos de Servicios recuperan exactamente los trazados SVG Tabler de la versión anterior (video, contenido, streaming y podcast).

Los enlaces internos usan GSAP ScrollToPlugin y una duración adaptada a la distancia. La cabecera fija se compensa al llegar, la URL conserva su hash sin provocar un segundo salto y el foco pasa al destino. Rueda, toque, teclas de desplazamiento o un nuevo enlace pueden cancelar el recorrido. No se activa scroll-behavior: smooth global para evitar conflictos con ScrollTrigger.


## Servicios bento y acceso directo a las piezas (2026-10-26)

Se contrastó Servicios con [alexurresty.com](https://alexurresty.com/) mediante Chrome. Los cuatro servicios, sus textos, entregables y videos coinciden con el catálogo local; `docs/services-live-snapshot.json` conserva esa referencia y una prueba compara ambos catálogos. Se adaptó el formato publicado de video con texto superpuesto y «Ver más» al nuevo diálogo React de Servicios, manteniendo el acceso a cotización y las cinco piezas de Estrategia de contenido.

La sección utiliza un bento de dos filas con columnas 7/5 y 5/7 en escritorio, dos columnas iguales en tablet y una en móvil. Los iconos originales y los fotogramas locales dan contexto sin reproducir cuatro videos decorativos a la vez. Los reproductores conservan la proporción original; en móvil el texto de los videos horizontales pasa bajo la imagen para conservar su legibilidad.

En Proyectos, la superficie de cada video abre la pieza, además de «Ver proyecto». El recorrido GSAP, los filtros, el orden y las fuentes de los 13 proyectos se conservan. El diálogo compartido mantiene el foco, bloquea el fondo y permite cerrar con X, Escape o un clic completo fuera de sus límites; interactuar con el video o arrastrar desde dentro no lo cierra.

Validación: cinco pruebas unitarias y ocho recorridos Playwright, además de TypeScript, ESLint y compilación estática. Se revisó el bento y los diálogos en Chrome de escritorio y móvil. Respaldo previo: `/Users/leoleos/Documents/ChatGPT/Freelance/alexurresty-before-bento-services`. Cambios locales, sin despliegue al dominio.


## Cierre visual de la landing (2026-10-26)

Servicios aparece al entrar en el viewport con un fade y 24 px de desplazamiento vertical (0,7 s). Sobre mí entra desde la derecha hasta su posición centrada (0,9 s; distancia limitada según el viewport). GSAP anima únicamente opacidad y transform; no se añade pinning, scroll artificial ni esperas. Las transiciones se ejecutan una vez, se limpian al terminar y se desactivan con movimiento reducido o con el control global de pausa. Sin JavaScript el contenido mantiene su estado visible.

Sobre mí pasa a un componente renderizado en servidor con una composición editorial sobre el fondo claro de la marca, retrato de Alex, tipografía amplia, enlace a Contacto, tres etapas del proceso y la nota personal sobre marinera. Se conserva la biografía existente sin añadir cifras, clientes o reconocimientos. En móvil la composición se apila; se comprobó el ancho de 320 a 1440 px.

Validación de este cierre: cinco pruebas unitarias y diez recorridos E2E, TypeScript estricto, ESLint y exportación estática. Las dos pruebas nuevas muestrean fotogramas para comprobar fades y desplazamientos reales sin retener el scroll, y validan biografía, responsive, movimiento reducido y contenido sin JavaScript. Proyectos y su reproducción/modal conservan sus componentes y catálogo.

Respaldo previo de fuentes y exportación: `/Users/leoleos/Documents/ChatGPT/Freelance/alexurresty-before-final-polish`. El proyecto del disco externo se actualiza junto con la vista previa; el dominio público no se despliega en este paso.
