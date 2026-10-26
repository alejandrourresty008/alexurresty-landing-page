'use client';
import { useState } from 'react';
import type { Detail } from '@/lib/types';
import manifest from '@/media-manifest.json';
import { DialogShell } from './dialog-shell';
export default function ServiceDialog({ detail, includes, onClose, onQuote }: { detail: Detail; includes: string; onClose: () => void; onQuote: () => void }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const item = detail.items[index];
  const dimensions = item.kind === 'video' ? manifest.find(video => '/' + video.src === item.src) : undefined;
  const landscape = dimensions ? dimensions.width > dimensions.height : true;
  const step = (direction: number) => setIndex(current => (current + direction + detail.items.length) % detail.items.length);
  return <DialogShell onClose={onClose} labelledBy="service-detail-title" className={`service-dialog ${landscape ? 'service-dialog-landscape' : 'service-dialog-portrait'}`} closeLabel="Cerrar servicio" onKeyDown={event => {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  }}>
    <div className="service-player">
      {item.kind === 'video' && <video key={item.src} src={item.src} poster={item.poster} controls autoPlay muted playsInline loop preload="metadata" className="service-detail-video" />}
      <div className={`service-summary ${expanded ? 'is-expanded' : ''}`}>
        <h2 id="service-detail-title">{detail.title}</h2>
        <div id="service-description" className="service-description"><p>{detail.description[0]}</p>{expanded && detail.description.slice(1).map(text => <p key={text}>{text}</p>)}</div>
        <button type="button" className="service-expand" aria-controls="service-description" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? 'Ver menos' : 'Ver más'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
        {expanded && <div className="service-deliverables"><p>{includes}</p><button type="button" className="button" onClick={onQuote}>Cotizar este servicio</button></div>}
      </div>
      {detail.items.length > 1 && <div className="service-piece-controls"><button type="button" onClick={() => step(-1)} aria-label="Pieza anterior">←</button><span>{index + 1} / {detail.items.length}</span><button type="button" onClick={() => step(1)} aria-label="Pieza siguiente">→</button></div>}
    </div>
  </DialogShell>;
}
