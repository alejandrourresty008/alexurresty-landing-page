import manifest from '@/media-manifest.json';

// Medidas reales de los videos (media-manifest.json). Se usan para mostrar cada pieza con su forma, sin recortar.
const sizes = new Map(manifest.map(m => [`/${m.src}`, m]));

/** Proporción ancho/alto de un video; si no está en el manifiesto, vertical 9:16. */
export function aspect(src: string) {
  const m = sizes.get(src);
  return m ? m.width / m.height : 9 / 16;
}
