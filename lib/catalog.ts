import type { Client, Piece, Row, Service } from './types';

// Fuente única del contenido de la web. Las rutas son absolutas desde public/.

export const services: Service[] = [
  {
    id: 'corporativo',
    title: 'Video corporativo',
    short: 'Entrevistas, instalaciones, demos de producto y eventos. Piezas que muestran con claridad lo que hace tu empresa.',
    includes: 'Incluye videos institucionales, testimonios, demos y eventos.',
    long: [
      'Grabación y edición de contenido corporativo: entrevistas, recorridos de instalaciones, demos de producto y cobertura de eventos.',
      'Antes de encender la cámara, el primer paso es entender el negocio. Cada pieza tiene un objetivo concreto: generar confianza, explicar lo que haces o abrir una conversación comercial.',
      'Entregables: videos institucionales, testimonios de clientes, recorridos, demos técnicas y resúmenes de eventos, con fechas claras desde el inicio.'
    ],
    clips: [{ kind: 'video', src: '/videos/corporativo.mp4', poster: '/videos/corporativo.webp' }],
    landscape: true
  },
  {
    id: 'redes',
    title: 'Estrategia de contenido',
    short: 'Qué publicar, para quién y para qué: estrategia, guiones y producción continua para vender, educar o posicionar tu marca.',
    includes: 'Incluye estrategia, calendario, guiones, grabación y edición para Reels, TikTok y Shorts.',
    long: [
      'El punto de partida es qué quiere lograr tu marca en redes y a quién le habla. Desde ahí salen el formato, la frecuencia y la plataforma.',
      'Un sistema de trabajo claro: análisis de audiencia, formatos que ya funcionan y producción constante.',
      'Entregables: guiones, grabación y edición de Reels, TikTok y YouTube Shorts, con calendario de publicación.'
    ],
    // Carrusel: legal, educación legal, restaurante, tecnología, producto
    clips: [
      { kind: 'video', src: '/videos/redes-4.mp4', poster: '/videos/redes-4.webp' },
      { kind: 'video', src: '/videos/redes-egepud.mp4', poster: '/videos/redes-egepud.webp' },
      { kind: 'video', src: '/videos/riverita-leche-de-tigre.mp4', poster: '/videos/riverita-leche-de-tigre.webp' },
      { kind: 'video', src: '/videos/redes-2.mp4', poster: '/videos/redes-2.webp' },
      { kind: 'video', src: '/videos/redes-3.mp4', poster: '/videos/redes-3.webp' }
    ]
  },
  {
    id: 'streaming',
    title: 'Streaming',
    short: 'Transmisiones para eventos, lanzamientos y clases, con montaje técnico y dirección en tiempo real.',
    includes: 'Para eventos, lanzamientos y clases, con montaje multicámara.',
    long: [
      'Producción de transmisiones para eventos, lanzamientos de producto y clases en línea.',
      'En una transmisión no hay segunda toma. Por eso cada emisión sale al aire con señal, imagen y audio probados de antemano, y con equipos conocidos a fondo.',
      'Entregables: producción del evento, dirección en tiempo real, configuración de YouTube, Zoom, StreamYard u OBS, y la grabación para publicar después.'
    ],
    clips: [{ kind: 'video', src: '/videos/streaming.mp4', poster: '/videos/streaming.webp' }]
  },
  {
    id: 'podcast',
    title: 'Podcast',
    short: 'Del formato a la publicación: grabación multicámara, edición, cortes para redes y distribución.',
    includes: 'Incluye formato, grabación multicámara, edición, cortes y distribución.',
    long: [
      'El podcast completo, de principio a fin: formato del programa, montaje de audio y video, grabación, edición y publicación.',
      'Un buen podcast posiciona a quien habla y genera material para redes durante meses.',
      'Entregables: diseño del formato, grabación multicámara, edición de episodios, cortes para Reels y TikTok, y publicación en Spotify, Apple Podcasts y YouTube.'
    ],
    clips: [{ kind: 'video', src: '/videos/podcast.mp4', poster: '/videos/podcast.webp' }]
  }
];

// Filas de Proyectos: una por servicio. La de Estrategia de contenido muestra marcas (clients); las demás, piezas sueltas.
export const rows: Row[] = [
  { service: 'Estrategia de contenido', note: 'Marcas con contenido continuo, mes a mes.', clients: true },
  { service: 'Streaming', note: 'Transmisiones en vivo multicámara.' },
  { service: 'Podcast', note: 'Producción de principio a fin.' },
  { service: 'Video corporativo', note: 'Institucionales, eventos y espacios.' }
];

// El orden importa: la primera pieza de cada servicio ocupa el bloque grande de la grilla.
export const pieces: Piece[] = [
  {
    id: 'congreso', service: 'Streaming', client: 'EGEPUD', title: 'I Congreso Nacional Multidisciplinario de Derecho',
    text: 'Cobertura del congreso en Chiclayo. En esta pieza, la ponencia de Frank Almanza sobre el dolo.',
    cover: '/img/cover-congreso.webp', preview: '/videos/preview/congreso.mp4',
    item: { kind: 'link', href: 'https://www.youtube.com/watch?v=PmBJ-UlxCGM', poster: '/img/proy-congreso-egepud.webp', label: 'I Congreso Nacional Multidisciplinario de Derecho' }
  },
  {
    id: 'avance-podcast-27', service: 'Podcast', client: 'EGEPUD', title: 'Avance del podcast #27',
    text: 'Corte vertical del episodio para Reels y Facebook.',
    cover: '/img/egepud-reel-podcast27.webp', preview: '/videos/preview/egepud-avance.mp4',
    item: { kind: 'link', href: 'https://www.facebook.com/share/r/18AjjfrKku/', poster: '/img/egepud-reel-podcast27.webp', label: 'Avance del podcast #27 para redes' }
  },
  {
    id: 'conversaciones', service: 'Podcast', client: 'Elena Rochabrun', title: 'Conversaciones que Transforman',
    text: 'Primer episodio: liderazgo con propósito, con Kathy Román como invitada.',
    cover: '/img/cover-elena.webp', preview: '/videos/preview/elena.mp4',
    item: { kind: 'link', href: 'https://www.youtube.com/watch?v=x9HW7XKCQRk&t=38s', poster: '/img/proy-conversaciones-que-transforman.webp', label: 'Conversaciones que Transforman · EP. 1' }
  },
  {
    id: 'estudio-movil', service: 'Podcast', client: 'Detrás de cámaras', title: 'Estudio de podcast móvil',
    text: 'Set de tres cámaras armado en las oficinas del cliente.',
    cover: '/videos/podcast.webp', preview: '/videos/preview/podcast.mp4',
    item: { kind: 'video', src: '/videos/podcast.mp4', poster: '/videos/podcast.webp' }
  },
  {
    id: 'egepud-9-anos', service: 'Video corporativo', client: 'EGEPUD', title: '9 años formando a la comunidad jurídica',
    text: 'Video institucional por el aniversario: congresos, podcast y formación.',
    cover: '/videos/corporativo.webp', preview: '/videos/preview/corporativo.mp4', landscape: true,
    item: { kind: 'video', src: '/videos/corporativo.mp4', poster: '/videos/corporativo.webp' }
  },
  {
    id: 'experiencia-omnimedia', service: 'Video corporativo', client: 'OMNIMEDIA', title: 'Experiencia OMNIMEDIA',
    text: 'Recorrido por su sala de videoconferencia y la experiencia de sus clientes.',
    cover: '/img/cover-omnimedia.webp', preview: '/videos/preview/omnimedia.mp4', focus: '8%',
    item: { kind: 'video', src: '/videos/omnimedia-experiencia.mp4', poster: '/videos/omnimedia-experiencia.webp' }
  },
  {
    id: 'salas-zegarra', service: 'Video corporativo', client: 'Salas Zegarra & Abogados', title: 'Inauguración de oficinas',
    text: 'Cobertura del evento de inauguración, editada para Reels.',
    cover: '/img/egepud-reel-salas-zegarra.webp', preview: '/videos/preview/salas-zegarra.mp4',
    item: { kind: 'link', href: 'https://www.instagram.com/reel/DQprCAoD11n/', poster: '/img/egepud-reel-salas-zegarra.webp', label: 'Inauguración de Salas Zegarra & Abogados' }
  }
];

// Marcas. metrics: solo cifras reales y verificables, redondeadas hacia abajo.
export const clients: Client[] = [
  {
    id: 'omnimedia',
    name: 'OMNIMEDIA',
    sector: 'Tecnología',
    cover: '/img/cover-omnimedia.webp',
    focus: '8%',
    preview: '/videos/preview/omnimedia.mp4',
    services: ['Estrategia de contenido'],
    text: [
      'Soluciones de tecnología y videoconferencia para empresas.',
      'Estrategia de contenido, guiones y producción de videos de producto y de sus espacios para TikTok y redes.'
    ],
    profile: { url: 'https://www.tiktok.com/@omnimediaperu', label: 'TikTok' },
    items: [
      { kind: 'video', src: '/videos/omnimedia-experiencia.mp4', poster: '/videos/omnimedia-experiencia.webp' },
      { kind: 'video', src: '/videos/redes-3.mp4', poster: '/videos/redes-3.webp' },
      { kind: 'video', src: '/videos/redes-2.mp4', poster: '/videos/redes-2.webp' }
    ]
  },
  {
    id: 'egepud',
    name: 'EGEPUD',
    sector: 'Educación legal',
    cover: '/img/cover-egepud.webp',
    preview: '/videos/preview/egepud.mp4',
    services: ['Estrategia de contenido', 'Podcast', 'Streaming', 'Video corporativo'],
    // 209K, 134,6K y 13,3K al 2026-10-25
    metrics: [{ platform: 'facebook', value: '200K+' }, { platform: 'tiktok', value: '130K+' }, { platform: 'instagram', value: '13K+' }],
    text: [
      'Escuela de formación jurídica.',
      'Estrategia de contenido para sus redes, producción de EGEPUD Podcast, video institucional y registro de sus congresos.'
    ],
    profile: { url: 'https://www.facebook.com/egepud', label: 'Facebook' },
    items: [
      { kind: 'video', src: '/videos/corporativo.mp4', poster: '/videos/corporativo.webp', fit: 'contain' },
      { kind: 'link', href: 'https://www.instagram.com/reel/DQprCAoD11n/', poster: '/img/egepud-reel-salas-zegarra.webp', label: 'Inauguración de Salas Zegarra & Abogados' },
      { kind: 'link', href: 'https://www.youtube.com/watch?v=9FrImhIQUkY&t=69s', poster: '/img/proy-egepud-podcast-27.webp', label: 'EGEPUD Podcast #27 · Fiscal Juárez Atoche' },
      { kind: 'link', href: 'https://www.instagram.com/reel/DbwW1VGlVk1/', poster: '/img/egepud-reel-curso.webp', label: 'Reel del curso para ser juez o fiscal' },
      { kind: 'link', href: 'https://www.youtube.com/watch?v=PmBJ-UlxCGM', poster: '/img/proy-congreso-egepud.webp', label: 'I Congreso Nacional Multidisciplinario de Derecho' },
      { kind: 'link', href: 'https://www.facebook.com/share/r/18AjjfrKku/', poster: '/img/egepud-reel-podcast27.webp', label: 'Avance del podcast #27 para redes' }
    ]
  },
  {
    id: 'silvia',
    name: 'Silvia Huisa Alvarado',
    sector: 'Legal',
    cover: '/img/cover-silvia.webp',
    focus: '0%',
    preview: '/videos/preview/silvia.mp4',
    services: ['Estrategia de contenido'],
    // 102,7K y 19,9K al 2026-10-25
    metrics: [{ platform: 'tiktok', value: '100K+' }, { platform: 'instagram', value: '19K+' }],
    text: [
      'Abogada de familia.',
      'Estrategia de contenido, guiones y producción de videos que explican temas legales en lenguaje simple.'
    ],
    profile: { url: 'https://www.tiktok.com/@silviahuisaalvarado', label: 'TikTok' },
    items: [
      { kind: 'video', src: '/videos/redes-4.mp4', poster: '/videos/redes-4.webp' },
      { kind: 'video', src: '/videos/redes-1.mp4', poster: '/videos/redes-1.webp' }
    ]
  },
  {
    id: 'riverita',
    name: 'La Riverita',
    sector: 'Restaurante',
    cover: '/img/cover-riverita.webp',
    preview: '/videos/preview/riverita.mp4',
    services: ['Estrategia de contenido'],
    text: [
      'Cevichería en el Malecón de Chucuito, Callao.',
      'Estrategia de contenido, reels y fotografía de carta para atraer visitas.'
    ],
    profile: { url: 'https://www.tiktok.com/@lariverita.pe', label: 'TikTok' },
    items: [
      { kind: 'video', src: '/videos/riverita-leche-de-tigre.mp4', poster: '/videos/riverita-leche-de-tigre.webp' },
      { kind: 'video', src: '/videos/proy-riverita.mp4', poster: '/img/marca-riverita.webp' },
      { kind: 'image', src: '/img/proy-riverita-foto.webp' }
    ]
  },
  {
    id: 'elena',
    name: 'Elena Rochabrun',
    sector: 'Marca personal',
    cover: '/img/cover-elena.webp',
    preview: '/videos/preview/elena.mp4',
    services: ['Podcast'],
    text: [
      'Conversaciones que Transforman: podcast de historias reales de liderazgo.',
      'Producción del podcast. En el primer episodio, Kathy Román habla de liderazgo con propósito.'
    ],
    items: [
      { kind: 'link', href: 'https://www.youtube.com/watch?v=x9HW7XKCQRk&t=38s', poster: '/img/proy-conversaciones-que-transforman.webp', label: 'Conversaciones que Transforman · EP. 1' }
    ]
  }
];

/** Plataforma de un enlace externo, para la etiqueta "Ver en …". */
export const where = (url: string) =>
  /instagram\./.test(url) ? 'Instagram' : /tiktok\./.test(url) ? 'TikTok' : /facebook\./.test(url) ? 'Facebook' : 'YouTube';

export type RowTile = { kind: 'client'; client: Client } | { kind: 'piece'; piece: Piece };

/** Tarjetas de cada fila, en orden. */
export function rowTiles(row: Row): RowTile[] {
  if (row.clients) return clients.filter(c => c.services.includes(row.service)).map(c => ({ kind: 'client', client: c }));
  return pieces.filter(p => p.service === row.service).map(p => ({ kind: 'piece', piece: p }));
}
