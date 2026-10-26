'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMotion } from './motion-provider';
export function PreviewVideo({ src, poster, active, fit = 'contain', priority = false }: { src: string; poster: string; active: boolean; fit?: 'contain' | 'cover'; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { reduced } = useMotion();
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let visible = false;
    const sync = () => {
      const saveData = 'connection' in navigator && Boolean((navigator.connection as { saveData?: boolean }).saveData);
      if (active && visible && !reduced && !document.hidden && !saveData) {
        if (!element.getAttribute('src')) element.src = src;
        element.play().catch(() => {});
      } else element.pause();
    };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    io.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); element.pause(); };
  }, [src, active, reduced]);
  return <>
    <Image src={poster} alt="" fill sizes="(max-width: 767px) 90vw, 45vw" priority={priority} className={fit === 'contain' ? 'object-contain' : 'object-cover'} />
    <video ref={video} muted loop playsInline preload="none" aria-hidden="true" data-preview-src={src} data-fit={fit} onPlaying={() => setPlaying(true)} className={`preview-video ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${playing && !reduced ? 'is-playing' : ''}`} />
  </>;
}
