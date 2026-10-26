// Contratos de datos de la web. Todo el contenido vive en lib/catalog.ts y se valida en tests/catalog.test.ts.

/** Pieza dentro de una ventana: video propio, foto o video publicado en otra plataforma. */
export type Clip =
  | { kind: 'video'; src: string; poster?: string; fit?: 'contain' }
  | { kind: 'image'; src: string; label?: string }
  | { kind: 'link'; href: string; poster: string; label: string };

export type Platform = 'facebook' | 'tiktok' | 'instagram';

/** Cifra real y verificable de seguidores, redondeada hacia abajo (ej. 102,7K → "100K+"). */
export interface Metric { platform: Platform; value: string }

export interface Service {
  id: 'corporativo' | 'redes' | 'streaming' | 'podcast';
  title: string;
  short: string;
  includes: string;
  long: string[];
  clips: Clip[];
  /** Video horizontal: la ventana usa formato 16:9. */
  landscape?: boolean;
}

/** Fila de Proyectos. `service` debe coincidir con el título de un Service. */
export interface Row { service: string; note: string; clients?: boolean }

/** Pieza suelta de las filas de Streaming, Podcast y Video corporativo. El orden dentro de cada servicio importa. */
export interface Piece {
  id: string;
  service: string;
  client: string;
  title: string;
  text: string;
  cover: string;
  preview: string;
  item: Clip;
  focus?: string;
  landscape?: boolean;
}

/** Marca con contenido continuo (fila de Estrategia de contenido y ventana con carrusel). */
export interface Client {
  id: string;
  name: string;
  sector: string;
  cover: string;
  preview: string;
  focus?: string;
  services: string[];
  metrics?: Metric[];
  text: string[];
  profile?: { url: string; label: string };
  items: Clip[];
}
