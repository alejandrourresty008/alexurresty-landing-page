import type { Project, Service, Chapter, Orientation } from './types';

export const services: Service[] = [
  {
    "id": "corporativo",
    "title": "Video corporativo",
    "category": "Video corporativo",
    "short": "Entrevistas, instalaciones, demos de producto y eventos. Piezas que muestran con claridad lo que hace tu empresa.",
    "includes": "Incluye videos institucionales, testimonios, demos y eventos.",
    "description": [
      "Grabación y edición de contenido corporativo: entrevistas, recorridos de instalaciones, demos de producto y cobertura de eventos.",
      "Antes de encender la cámara, el primer paso es entender el negocio. Cada pieza tiene un objetivo concreto: generar confianza, explicar lo que haces o abrir una conversación comercial.",
      "Entregables: videos institucionales, testimonios de clientes, recorridos, demos técnicas y resúmenes de eventos, con fechas claras desde el inicio."
    ],
    "items": [
      {
        "kind": "video",
        "src": "/videos/corporativo.mp4",
        "poster": "/videos/corporativo.webp"
      }
    ]
  },
  {
    "id": "redes",
    "title": "Estrategia de contenido",
    "category": "Estrategia de contenido",
    "short": "Qué publicar, para quién y para qué: estrategia, guiones y producción continua para vender, educar o posicionar tu marca.",
    "includes": "Incluye estrategia, calendario, guiones, grabación y edición para Reels, TikTok y Shorts.",
    "description": [
      "El punto de partida es qué quiere lograr tu marca en redes y a quién le habla. Desde ahí salen el formato, la frecuencia y la plataforma.",
      "Un sistema de trabajo claro: análisis de audiencia, formatos que ya funcionan y producción constante.",
      "Entregables: guiones, grabación y edición de Reels, TikTok y YouTube Shorts, con calendario de publicación."
    ],
    "items": [
      {
        "kind": "video",
        "src": "/videos/redes-4.mp4",
        "poster": "/videos/redes-4.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-egepud.mp4",
        "poster": "/videos/redes-egepud.webp"
      },
      {
        "kind": "video",
        "src": "/videos/riverita-leche-de-tigre.mp4",
        "poster": "/videos/riverita-leche-de-tigre.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-2.mp4",
        "poster": "/videos/redes-2.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-3.mp4",
        "poster": "/videos/redes-3.webp"
      }
    ]
  },
  {
    "id": "streaming",
    "title": "Streaming",
    "category": "Streaming",
    "short": "Transmisiones para eventos, lanzamientos y clases, con montaje técnico y dirección en tiempo real.",
    "includes": "Para eventos, lanzamientos y clases, con montaje multicámara.",
    "description": [
      "Producción de transmisiones para eventos, lanzamientos de producto y clases en línea.",
      "En una transmisión no hay segunda toma. Por eso cada emisión sale al aire con señal, imagen y audio probados de antemano, y con equipos conocidos a fondo.",
      "Entregables: producción del evento, dirección en tiempo real, configuración de YouTube, Zoom, StreamYard u OBS, y la grabación para publicar después."
    ],
    "items": [
      {
        "kind": "video",
        "src": "/videos/streaming.mp4",
        "poster": "/videos/streaming.webp"
      }
    ]
  },
  {
    "id": "podcast",
    "title": "Podcast",
    "category": "Podcast",
    "short": "Del formato a la publicación: grabación multicámara, edición, cortes para redes y distribución.",
    "includes": "Incluye formato, grabación multicámara, edición, cortes y distribución.",
    "description": [
      "El podcast completo, de principio a fin: formato del programa, montaje de audio y video, grabación, edición y publicación.",
      "Un buen podcast posiciona a quien habla y genera material para redes durante meses.",
      "Entregables: diseño del formato, grabación multicámara, edición de episodios, cortes para Reels y TikTok, y publicación en Spotify, Apple Podcasts y YouTube."
    ],
    "items": [
      {
        "kind": "video",
        "src": "/videos/podcast.mp4",
        "poster": "/videos/podcast.webp"
      }
    ]
  }
];

export const projects: Project[] = [
  {
    "id": "omnimedia",
    "title": "OMNIMEDIA",
    "category": "Estrategia de contenido",
    "client": "Tecnología",
    "description": [
      "Soluciones de tecnología y videoconferencia para empresas.",
      "Estrategia de contenido, guiones y producción de videos de producto y de sus espacios para TikTok y redes."
    ],
    "preview": {
      "src": "/videos/preview/omnimedia.mp4",
      "poster": "/img/cover-omnimedia.webp",
      "width": 480,
      "height": 854
    },
    "profile": {
      "url": "https://www.tiktok.com/@omnimediaperu",
      "label": "TikTok"
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/omnimedia-experiencia.mp4",
        "poster": "/videos/omnimedia-experiencia.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-3.mp4",
        "poster": "/videos/redes-3.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-2.mp4",
        "poster": "/videos/redes-2.webp"
      }
    ]
  },
  {
    "id": "egepud",
    "title": "EGEPUD",
    "category": "Estrategia de contenido",
    "client": "Educación legal",
    "description": [
      "Escuela de formación jurídica.",
      "Estrategia de contenido para sus redes, producción de EGEPUD Podcast, video institucional y registro de sus congresos."
    ],
    "preview": {
      "src": "/videos/preview/egepud.mp4",
      "poster": "/img/cover-egepud.webp",
      "width": 480,
      "height": 854
    },
    "profile": {
      "url": "https://www.facebook.com/egepud",
      "label": "Facebook"
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/corporativo.mp4",
        "poster": "/videos/corporativo.webp"
      },
      {
        "kind": "link",
        "href": "https://www.instagram.com/reel/DQprCAoD11n/",
        "poster": "/img/egepud-reel-salas-zegarra.webp",
        "label": "Inauguración de Salas Zegarra & Abogados"
      },
      {
        "kind": "link",
        "href": "https://www.youtube.com/watch?v=9FrImhIQUkY&t=69s",
        "poster": "/img/proy-egepud-podcast-27.webp",
        "label": "EGEPUD Podcast #27 · Fiscal Juárez Atoche"
      },
      {
        "kind": "link",
        "href": "https://www.instagram.com/reel/DbwW1VGlVk1/",
        "poster": "/img/egepud-reel-curso.webp",
        "label": "Reel del curso para ser juez o fiscal"
      },
      {
        "kind": "link",
        "href": "https://www.youtube.com/watch?v=PmBJ-UlxCGM",
        "poster": "/img/proy-congreso-egepud.webp",
        "label": "I Congreso Nacional Multidisciplinario de Derecho"
      },
      {
        "kind": "link",
        "href": "https://www.facebook.com/share/r/18AjjfrKku/",
        "poster": "/img/egepud-reel-podcast27.webp",
        "label": "Avance del podcast #27 para redes"
      }
    ]
  },
  {
    "id": "silvia",
    "title": "Silvia Huisa Alvarado",
    "category": "Estrategia de contenido",
    "client": "Legal",
    "description": [
      "Abogada de familia.",
      "Estrategia de contenido, guiones y producción de videos que explican temas legales en lenguaje simple."
    ],
    "preview": {
      "src": "/videos/preview/silvia.mp4",
      "poster": "/img/cover-silvia.webp",
      "width": 480,
      "height": 854
    },
    "profile": {
      "url": "https://www.tiktok.com/@silviahuisaalvarado",
      "label": "TikTok"
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/redes-4.mp4",
        "poster": "/videos/redes-4.webp"
      },
      {
        "kind": "video",
        "src": "/videos/redes-1.mp4",
        "poster": "/videos/redes-1.webp"
      }
    ]
  },
  {
    "id": "riverita",
    "title": "La Riverita",
    "category": "Estrategia de contenido",
    "client": "Restaurante",
    "description": [
      "Cevichería en el Malecón de Chucuito, Callao.",
      "Estrategia de contenido, reels y fotografía de carta para atraer visitas."
    ],
    "preview": {
      "src": "/videos/preview/riverita.mp4",
      "poster": "/img/cover-riverita.webp",
      "width": 480,
      "height": 854
    },
    "profile": {
      "url": "https://www.tiktok.com/@lariverita.pe",
      "label": "TikTok"
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/riverita-leche-de-tigre.mp4",
        "poster": "/videos/riverita-leche-de-tigre.webp"
      },
      {
        "kind": "video",
        "src": "/videos/proy-riverita.mp4",
        "poster": "/img/marca-riverita.webp"
      },
      {
        "kind": "image",
        "src": "/img/proy-riverita-foto.webp",
        "alt": "La Riverita"
      }
    ]
  },
  {
    "id": "piece-0",
    "title": "I Congreso Nacional Multidisciplinario de Derecho",
    "category": "Streaming",
    "client": "EGEPUD",
    "description": [
      "Cobertura del congreso en Chiclayo. En esta pieza, la ponencia de Frank Almanza sobre el dolo."
    ],
    "preview": {
      "src": "/videos/preview/congreso.mp4",
      "poster": "/img/cover-congreso.webp",
      "width": 640,
      "height": 360
    },
    "items": [
      {
        "kind": "link",
        "href": "https://www.youtube.com/watch?v=PmBJ-UlxCGM",
        "poster": "/img/proy-congreso-egepud.webp",
        "label": "I Congreso Nacional Multidisciplinario de Derecho"
      }
    ]
  },
  {
    "id": "piece-1",
    "title": "Streaming de un concurso de marinera",
    "category": "Streaming",
    "client": "Detrás de cámaras",
    "description": [
      "Montaje técnico y realización en vivo, contado desde la cabina."
    ],
    "preview": {
      "src": "/videos/preview/streaming.mp4",
      "poster": "/videos/streaming.webp",
      "width": 480,
      "height": 854
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/streaming.mp4",
        "poster": "/videos/streaming.webp"
      }
    ]
  },
  {
    "id": "piece-2",
    "title": "EGEPUD Podcast #27",
    "category": "Podcast",
    "client": "EGEPUD",
    "description": [
      "Entrevista al fiscal Germán Juárez Atoche sobre los casos Vizcarra, Nadine Heredia y Humala."
    ],
    "preview": {
      "src": "/videos/preview/egepud-podcast27.mp4",
      "poster": "/img/cover-egepud-podcast27.webp",
      "width": 640,
      "height": 360
    },
    "items": [
      {
        "kind": "link",
        "href": "https://www.youtube.com/watch?v=9FrImhIQUkY&t=69s",
        "poster": "/img/proy-egepud-podcast-27.webp",
        "label": "EGEPUD Podcast #27 · Fiscal Juárez Atoche"
      }
    ]
  },
  {
    "id": "piece-3",
    "title": "Estudio de podcast móvil",
    "category": "Podcast",
    "client": "Detrás de cámaras",
    "description": [
      "Set de tres cámaras armado en las oficinas del cliente."
    ],
    "preview": {
      "src": "/videos/preview/podcast.mp4",
      "poster": "/videos/podcast.webp",
      "width": 480,
      "height": 854
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/podcast.mp4",
        "poster": "/videos/podcast.webp"
      }
    ]
  },
  {
    "id": "piece-4",
    "title": "Conversaciones que Transforman",
    "category": "Podcast",
    "client": "Elena Rochabrun",
    "description": [
      "Primer episodio: liderazgo con propósito, con Kathy Román como invitada."
    ],
    "preview": {
      "src": "/videos/preview/elena.mp4",
      "poster": "/img/cover-elena.webp",
      "width": 640,
      "height": 360
    },
    "items": [
      {
        "kind": "link",
        "href": "https://www.youtube.com/watch?v=x9HW7XKCQRk&t=38s",
        "poster": "/img/proy-conversaciones-que-transforman.webp",
        "label": "Conversaciones que Transforman · EP. 1"
      }
    ]
  },
  {
    "id": "piece-5",
    "title": "Avance del podcast #27",
    "category": "Podcast",
    "client": "EGEPUD",
    "description": [
      "Corte vertical del episodio para Reels y Facebook."
    ],
    "preview": {
      "src": "/videos/preview/egepud-avance.mp4",
      "poster": "/img/egepud-reel-podcast27.webp",
      "width": 480,
      "height": 854
    },
    "items": [
      {
        "kind": "link",
        "href": "https://www.facebook.com/share/r/18AjjfrKku/",
        "poster": "/img/egepud-reel-podcast27.webp",
        "label": "Avance del podcast #27 para redes"
      }
    ]
  },
  {
    "id": "piece-6",
    "title": "9 años formando a la comunidad jurídica",
    "category": "Video corporativo",
    "client": "EGEPUD",
    "description": [
      "Video institucional por el aniversario: congresos, podcast y formación."
    ],
    "preview": {
      "src": "/videos/preview/corporativo.mp4",
      "poster": "/videos/corporativo.webp",
      "width": 640,
      "height": 360
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/corporativo.mp4",
        "poster": "/videos/corporativo.webp"
      }
    ]
  },
  {
    "id": "piece-7",
    "title": "Experiencia OMNIMEDIA",
    "category": "Video corporativo",
    "client": "OMNIMEDIA",
    "description": [
      "Recorrido por su sala de videoconferencia y la experiencia de sus clientes."
    ],
    "preview": {
      "src": "/videos/preview/omnimedia.mp4",
      "poster": "/img/cover-omnimedia.webp",
      "width": 480,
      "height": 854
    },
    "items": [
      {
        "kind": "video",
        "src": "/videos/omnimedia-experiencia.mp4",
        "poster": "/videos/omnimedia-experiencia.webp"
      }
    ]
  },
  {
    "id": "piece-8",
    "title": "Inauguración de oficinas",
    "category": "Video corporativo",
    "client": "Salas Zegarra & Abogados",
    "description": [
      "Cobertura del evento de inauguración, editada para Reels."
    ],
    "preview": {
      "src": "/videos/preview/salas-zegarra.mp4",
      "poster": "/img/egepud-reel-salas-zegarra.webp",
      "width": 480,
      "height": 854
    },
    "items": [
      {
        "kind": "link",
        "href": "https://www.instagram.com/reel/DQprCAoD11n/",
        "poster": "/img/egepud-reel-salas-zegarra.webp",
        "label": "Inauguración de Salas Zegarra & Abogados"
      }
    ]
  }
];

export function orientation(project: Project): Orientation { return project.preview.height > project.preview.width ? 'portrait' : 'landscape'; }
export function makeChapters(items: Project[], portraitCount = 3): Chapter[] {
  const vertical = items.filter(p => orientation(p) === 'portrait');
  const horizontal = items.filter(p => orientation(p) === 'landscape');
  const chapters: Chapter[] = [];
  for (let i = 0; i < vertical.length; i += portraitCount) chapters.push({ id: 'portrait-' + i, format: 'portrait', projects: vertical.slice(i, i + portraitCount) });
  horizontal.forEach(project => chapters.push({ id: project.id, format: 'landscape', projects: [project] }));
  return chapters;
}
