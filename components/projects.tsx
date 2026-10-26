import type { CSSProperties } from 'react';
import { rowTiles, rows, where } from '@/lib/catalog';
import { ARROW, PLATFORM_ICONS, esc } from '@/lib/icons';
import type { Metric } from '@/lib/types';

interface TileData {
  data: Record<string, string>;
  cover: string;
  preview: string;
  focus?: string;
  title: string;
  meta: string;
  badge: string;
  metrics?: Metric[];
}

function Tile({ t, k }: { t: TileData; k: number }) {
  const style = { '--k': k, ...(t.focus ? { '--focus': t.focus } : {}) } as CSSProperties;
  return <article className="tile" {...t.data} style={style} role="button" tabIndex={0} aria-haspopup="dialog">
    {/* eslint-disable-next-line @next/next/no-img-element -- exportación estática: las imágenes ya están optimizadas en webp */}
    <img src={t.cover} alt={t.title} loading="lazy" decoding="async" />
    <video className="pv" data-src={t.preview} muted loop playsInline preload="none" aria-hidden="true"></video>
    <span className="tile-badge">{t.badge}</span>
    <div className="tile-info">
      <p className="tile-meta">{t.meta}</p>
      <h4 className="tile-title">{t.title}</h4>
      {!!t.metrics?.length && <div className="tile-metrics">
        {t.metrics.map(m => <span key={m.platform} className="tile-metric" aria-label={`${m.value} seguidores en ${PLATFORM_ICONS[m.platform].name}`}
          dangerouslySetInnerHTML={{ __html: `${PLATFORM_ICONS[m.platform].svg}<b>${esc(m.value)}</b>` }} />)}
      </div>}
    </div>
    <span className="tile-go" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ARROW }} />
  </article>;
}

export function Projects() {
  return <section id="proyectos">
    <div className="wrap">
      <div className="section-head">
        <h2 className="section-title proj-title" id="proj-title" aria-label="Proyectos">Proyectos</h2>
      </div>
      <div className="project-rows" id="project-rows">
        {rows.map(r => {
          const tiles = rowTiles(r).map((x): TileData => x.kind === 'client'
            ? {
                data: { 'data-client': x.client.id }, cover: x.client.cover, preview: x.client.preview, focus: x.client.focus,
                title: x.client.name, meta: x.client.sector, metrics: x.client.metrics,
                badge: `${x.client.items.length} ${x.client.items.length === 1 ? 'pieza' : 'piezas'}`
              }
            : {
                data: { 'data-piece': x.piece.id }, cover: x.piece.cover, preview: x.piece.preview, focus: x.piece.focus,
                title: x.piece.title, meta: x.piece.client, badge: x.piece.item.kind === 'link' ? where(x.piece.item.href) : 'Video'
              });
          return <div className="pbento" role="group" aria-label={r.service} key={r.service}>
            <div className={`bento n${Math.min(tiles.length, 4)}`}>{tiles.map((t, k) => <Tile t={t} k={k} key={t.title} />)}</div>
            <div className="pbento-head">
              <h3 className="prow-title">{r.service}</h3>
              <p className="prow-note">{r.note}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
  </section>;
}
