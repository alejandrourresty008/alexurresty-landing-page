'use client';
import Image from 'next/image';
import { useState } from 'react';
import { DialogShell } from './dialog-shell';
import type { Detail } from '@/lib/types';
export default function DetailDialog({ detail, onClose, onQuote }: { detail: Detail; onClose: () => void; onQuote: () => void }) {
  const [index, setIndex] = useState(0);
  const item = detail.items[index];
  const step = (amount: number) => setIndex(i => (i + amount + detail.items.length) % detail.items.length);
  return <DialogShell labelledBy="detail-title" className="detail-dialog" closeLabel="Cerrar proyecto" onClose={onClose} onKeyDown={event => {
    if (event.key === 'ArrowRight' && !(event.target instanceof HTMLVideoElement)) step(1);
    if (event.key === 'ArrowLeft' && !(event.target instanceof HTMLVideoElement)) step(-1);
  }}>
    <div className="detail-grid">
      <div className="detail-media">
        {item.kind === 'video' && <video key={item.src} src={item.src} poster={item.poster} controls playsInline preload="metadata" className="h-full w-full object-contain" />}
        {item.kind === 'image' && <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 95vw, 60vw" className="object-contain" />}
        {item.kind === 'link' && <a href={item.href} target="_blank" rel="noopener noreferrer" className="external-piece"><Image src={item.poster} alt="" fill sizes="(max-width: 767px) 95vw, 60vw" className="object-contain" /><span>Ver {item.label} ↗</span></a>}
        {detail.items.length > 1 && <div className="detail-controls"><button onClick={() => step(-1)} aria-label="Pieza anterior">←</button><span>{index + 1} / {detail.items.length}</span><button onClick={() => step(1)} aria-label="Pieza siguiente">→</button></div>}
      </div>
      <div className="detail-info"><p className="text-muted text-sm">{detail.category}</p><h2 id="detail-title">{detail.title}</h2>{detail.description.map(text => <p key={text}>{text}</p>)}{detail.profile && <a className="text-link" href={detail.profile.url} target="_blank" rel="noopener noreferrer">{detail.profile.label} ↗</a>}<button className="button mt-6" onClick={onQuote}>Cotizar este servicio</button></div>
    </div>
  </DialogShell>;
}
