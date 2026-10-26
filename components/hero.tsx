'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/motion';
import { MotionToggle, useMotion } from './motion-provider';
import { PreviewVideo } from './preview-video';
const lines = ['Entiendo tu industria.', 'Produzco tu historia.'];
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(false);
  const { reduced } = useMotion();
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setDesktop(media.matches);
    media.addEventListener('change', sync); sync();
    return () => media.removeEventListener('change', sync);
  }, []);
  useGSAP(() => {
    if (reduced) return;
    const rows = [...root.current!.querySelectorAll('.type-line')];
    const chars = rows.map(row => [...row.querySelectorAll('.type-char')]);
    const cursors = rows.map(row => row.querySelector('.type-cursor'));
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: .4 });
    timeline.set(chars.flat(), { opacity: 0 }).set(cursors, { opacity: 0 });
    chars.forEach((letters, i) => timeline.set(cursors, { opacity: 0 }).set(cursors[i], { opacity: 1 }).to(letters, { opacity: 1, duration: .001, stagger: .065 }));
    timeline.to({}, { duration: 2.2 });
    [...chars].reverse().forEach((letters, n) => timeline.set(cursors, { opacity: 0 }).set(cursors[1 - n], { opacity: 1 }).to([...letters].reverse(), { opacity: 0, duration: .001, stagger: .028 }));
    let visible = true;
    const sync = () => { if (visible && !document.hidden) timeline.resume(); else timeline.pause(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root.current!); document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
  return <section ref={root} id="top" className="hero">
    <span id="nav-marker" className="nav-marker" aria-hidden="true" />
    <div className="hero-mosaic" aria-hidden="true">
      <div className="hero-panel hidden md:block"><PreviewVideo src="/videos/hero-1.mp4" poster="/videos/podcast.webp" active={desktop} fit="cover" /></div>
      <div className="hero-panel"><PreviewVideo src="/videos/hero-3.mp4" poster="/img/alex.webp" active fit="cover" priority /></div>
      <div className="hero-panel hidden md:block"><PreviewVideo src="/videos/hero-2.mp4" poster="/img/cover-omnimedia.webp" active={desktop} fit="cover" /></div>
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-copy wrap">
      <h1 aria-label={lines.join(' ')}>{lines.map((line, n) => <span className="type-line" aria-hidden="true" key={line}>{[...line].map((letter, i) => <span key={i} className={`type-char ${n === 1 && i < 8 ? 'text-accent' : ''}`}>{letter === ' ' ? '\u00a0' : letter}</span>)}<span className="type-cursor" aria-hidden="true">_</span></span>)}</h1>
      <p className="hero-sub">Producción y dirección audiovisual en Lima para empresas de tecnología, telecom y sector legal. Más de 5 años de experiencia.</p>
      <div className="flex flex-wrap items-center gap-7"><a href="#contacto" className="button">Contáctame</a><a href="#proyectos" className="text-link">Ver proyectos <span aria-hidden="true">→</span></a></div>
      <MotionToggle />
    </div>
  </section>;
}
