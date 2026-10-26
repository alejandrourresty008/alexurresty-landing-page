# Registro de migración

25 de octubre de 2026. Cambio de HTML/CSS/JavaScript global a Next.js App Router con TypeScript, React y Tailwind. La entrega es local: no se publica ni se modifica el repositorio remoto.

## Resultado

- Datos comerciales y medios conservados; 57 assets comprobados por SHA-256 contra el proyecto anterior.
- Trece proyectos en siete capítulos de escritorio: tres capítulos de tres piezas verticales, seguidos por cuatro capítulos horizontales. Móvil muestra una pieza vertical por capítulo.
- Escenarios a pantalla completa; los formatos 9:16, 16:9 y las pequeñas diferencias de los previews 480×854 se conservan mediante contain, sin estirar ni recortar el cuadro.
- GSAP controla el recorrido, el cambio entre formatos y el titular en bucle. La galería deja de imponer un ancho del 90% al material vertical.
- Three.js se importa cuando la sección entra en pantalla; solo renderiza la transición de formato dentro de la galería. Se libera el renderer y sus recursos al desmontar. Sin filtros azules ni líneas de progreso rojas sobre el scroll de la página.
- anime.js se reserva para iconos de botones independientes, cargado bajo demanda.
- Navegación, diálogo nativo accesible, piezas completas, enlaces externos, cotización y contacto reconstruidos con componentes React.
- El HTML y la metadata se generan durante el build. La aplicación exporta a out/ y conserva la opción de hosting estático de Cloudflare.

## Pruebas

- Instalación limpia mediante npm ci: completada.
- npm run typecheck: sin errores, modo strict.
- npm run lint: sin errores ni advertencias de código.
- npm run test:unit: cuatro pruebas del catálogo, orden de formatos y filtros.
- npm run build: exportación estática de producción correcta.
- npm test: seis recorridos Playwright, incluida consola sin errores en el flujo normal, GPU, ratios, foco, cotización, validación/error/éxito simulado del formulario, navegación móvil, movimiento reducido y fallback sin WebGL.
- Capturas revisadas del hero, capítulos verticales y horizontales y móvil.

Los envíos del formulario se interceptan: no se mandaron mensajes reales. La respuesta del endpoint existente de Apps Script es opaca por no-cors y no acredita recepción o almacenamiento. Confirmar una entrega real requiere coordinación con su propietario.

## Hosting

wrangler.jsonc conserva nombre, compatibility_date y dominios; cambia assets.directory de . a ./out. Después de npm ci y npm run build, se puede servir out/ mediante cualquier servidor estático. No ejecutar next start con output: export; para desarrollo utilizar npm run dev.

No se copian node_modules, .next ni resultados de pruebas al disco externo. Se entregan los fuentes, package-lock y la exportación out ya validada. Para desarrollar en la carpeta externa ejecutar npm ci allí; la vista previa local usa la exportación.

## Reversión

Copia completa de los fuentes previos y assets, fuera del repositorio:

/Users/leoleos/Documents/ChatGPT/Freelance/alexurresty-legacy-before-next

El directorio .git original se conserva. Los archivos viejos index.html, css/, js/, scripts/ y los assets de raíz se retiran de la implementación activa solo después de verificar este respaldo; sus medios pasan a public/ con los mismos bytes. Los tests del sistema anterior se sustituyen por los recorridos equivalentes y los del nuevo comportamiento por formato.

Para revertir, reemplazar los fuentes activos por el respaldo sin tocar .git. No usar reset --hard: había cambios locales anteriores a la migración. La migración queda sin commit para la revisión del propietario.

## Límites de esta validación

Las pruebas se realizan con Chrome local en escritorio y emulación móvil. Falta validación en dispositivos físicos y medición de campo tras una eventual publicación. No se atribuye ninguna mejora de Core Web Vitals a una medición local. La nitidez de las vistas previas externas de 640×360 está limitada por sus archivos de origen; las piezas originales publicadas siguen accesibles desde el diálogo.

## Actualización inmersiva

- Título Proyectos a pantalla completa, ampliación/desvanecimiento y revelado del escenario de video.
- Pista horizontal real, conectada al scroll vertical mediante GSAP; salida al terminar y regreso reversible.
- Iconos originales de Servicios restaurados a partir del respaldo previo a Next.js.
- Navegación GSAP suave, cancelable y con gestión del hash, foco y offset de cabecera.
- Cuatro pruebas unitarias y seis recorridos E2E. Las pruebas nuevas verifican escala del título, movimiento horizontal real, avance a formatos horizontales, filtros sin repetir la introducción, cuatro iconos, interpolación del scroll y cancelación por rueda.
- Respaldo de los fuentes modificados y de la exportación anterior en /Users/leoleos/Documents/ChatGPT/Freelance/alexurresty-before-immersive-next.


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
