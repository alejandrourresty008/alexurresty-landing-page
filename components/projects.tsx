'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { makeChapters } from '@/lib/catalog';
import type { Project } from '@/lib/types';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion';
import { scrollToPosition } from '@/lib/navigation';
import { useMotion } from './motion-provider';
import { useDialog } from './dialog-provider';
import { PreviewVideo } from './preview-video';
import { MicroButton } from './micro-button';
const ProjectTransition = dynamic(() => import('./project-transition'), { ssr: false });
const INTRO_END = 1.15;
function useMedia(query: string) {
  const subscribe = useCallback((notify: () => void) => { const media = matchMedia(query); media.addEventListener('change', notify); return () => media.removeEventListener('change', notify); }, [query]);
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}
export function Projects({ items }: { items: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cinema = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const enteredRef = useRef(false);
  const resetting = useRef(false);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [near, setNear] = useState(false);
  const mobile = useMedia('(max-width: 767px)');
  const short = useMedia('(max-height: 599px)');
  const { reduced } = useMotion();
  const { open } = useDialog();
  const filtered = useMemo(() => items.filter(item => filter === 'Todos' || item.category === filter), [filter, items]);
  const chapters = useMemo(() => makeChapters(filtered, mobile ? 1 : 3), [filtered, mobile]);
  const current = Math.min(active, chapters.length - 1);
  const stacked = reduced || short;
  const categories = ['Todos', 'Estrategia de contenido', 'Streaming', 'Podcast', 'Video corporativo'];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio > 0) setNear(true); }, { threshold: .1 });
    observer.observe(stage.current!);
    return () => observer.disconnect();
  }, []);
  useGSAP(() => {
    if (stacked) { timeline.current = null; return; }
    const last = Math.max(0, chapters.length - 1);
    const animation = gsap.timeline({ scrollTrigger: {
      id: 'project-story', trigger: root.current, pin: stage.current,
      start: 'top top',
      end: () => `+=${innerHeight * .85 + last * Math.min(innerHeight * .65, 600)}`,
      scrub: .35, refreshPriority: 1, invalidateOnRefresh: true,
      onUpdate: self => {
        const position = Math.max(0, self.progress * (INTRO_END + Math.max(last, .2)) - INTRO_END);
        const next = Math.min(last, Math.round(position));
        const visible = self.progress * (INTRO_END + Math.max(last, .2)) >= INTRO_END - .1;
        if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
        if (visible !== enteredRef.current) { enteredRef.current = visible; setEntered(visible); }
      }
    } });
    timeline.current = animation;
    animation.to({}, { duration: .2 })
      .to(intro.current, { scale: 2.5, autoAlpha: 0, duration: .7, ease: 'power2.in' }, .2)
      .fromTo(cinema.current, { autoAlpha: 0, scale: .94 }, { autoAlpha: 1, scale: 1, duration: .4, ease: 'power2.out' }, .75);
    if (last) animation.to(track.current, {
      x: () => -(track.current!.scrollWidth - track.current!.clientWidth),
      duration: last, ease: 'none'
    }, INTRO_END);
    else animation.to({}, { duration: .2 }, INTRO_END);
    ScrollTrigger.refresh();
    if (resetting.current) {
      const trigger = animation.scrollTrigger!;
      window.scrollTo({ top: trigger.start + INTRO_END / animation.duration() * (trigger.end - trigger.start), behavior: 'instant' });
      ScrollTrigger.update(); resetting.current = false;
    }
    return () => { timeline.current = null; };
  }, { scope: root, dependencies: [chapters, stacked], revertOnUpdate: true });
  const selectFilter = (category: string) => {
    if (filter === category) return;
    resetting.current = true; activeRef.current = 0; setActive(0); setFilter(category);
  };
  const navigate = (index: number) => {
    const target = Math.max(0, Math.min(chapters.length - 1, index));
    const trigger = timeline.current?.scrollTrigger;
    if (trigger && timeline.current) {
      scrollToPosition(trigger.start + (INTRO_END + target) / timeline.current.duration() * (trigger.end - trigger.start), reduced);
    } else { chapterRefs.current[target]?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' }); setActive(target); activeRef.current = target; }
  };
  return <section ref={root} id="proyectos" aria-labelledby="projects-title" data-project-count={filtered.length}>
    <div ref={stage} className={`project-stage ${stacked ? 'is-stacked' : ''}`}>
      <div ref={intro} className="project-intro"><h2 id="projects-title">Proyectos</h2><p>Desplázate para descubrir <span aria-hidden="true">↓</span></p></div>
      <div ref={cinema} className="project-cinema" aria-hidden={!stacked && !entered}>
        <div className="project-heading wrap"><div className="flex items-center justify-between gap-4"><span className="project-section-label" aria-hidden="true">Proyectos</span><span className="format-label" aria-live="polite">{stacked ? 'Verticales y horizontales' : chapters[current]?.format === 'portrait' ? 'Formato vertical' : 'Formato horizontal'}</span></div>
          <div className="project-toolbar"><div className="hidden min-[1024px]:block"><div className="project-filters" role="group" aria-label="Filtrar proyectos">{categories.map(category => <button key={category} aria-pressed={filter === category} tabIndex={!stacked && !entered ? -1 : undefined} onClick={() => selectFilter(category)}>{category}</button>)}</div></div><select className="project-filter-select min-[1024px]:hidden" aria-label="Filtrar proyectos" value={filter} onChange={event => selectFilter(event.target.value)} tabIndex={!stacked && !entered ? -1 : undefined}>{categories.map(category => <option key={category}>{category}</option>)}</select><div className="flex shrink-0 items-center gap-2"><button className="icon-button" aria-label="Capítulo anterior" disabled={current === 0 || (!stacked && !entered)} onClick={() => navigate(current - 1)}>←</button><span className="chapter-count">{current + 1} / {chapters.length}</span><button className="icon-button" aria-label="Capítulo siguiente" disabled={current === chapters.length - 1 || (!stacked && !entered)} onClick={() => navigate(current + 1)}>→</button></div></div>
        </div>
        <div className="chapter-viewport" onKeyDown={event => {
          if (event.key === 'ArrowRight') { event.preventDefault(); navigate(current + 1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(current - 1); }
        }}>
          <div ref={track} className="project-track">
            {chapters.map((chapter, index) => <article key={chapter.id} ref={node => { chapterRefs.current[index] = node; }} data-format={chapter.format} data-chapter={index} aria-label={`${chapter.format === 'portrait' ? 'Videos verticales' : 'Video horizontal'}, capítulo ${index + 1}`} aria-hidden={!stacked && (!entered || index !== current)} className={`project-chapter format-${chapter.format}`}>
              {chapter.projects.map(project => <div key={project.id} className={`project-frame ${chapter.format === 'portrait' ? 'portrait-frame' : 'landscape-frame'}`} data-project={project.id} data-width={project.preview.width} data-height={project.preview.height}>
                <PreviewVideo src={project.preview.src} poster={project.preview.poster} active={stacked || (entered && index === current)} />
                <div className="project-shade" aria-hidden="true" />
                <button type="button" className="project-video-hit" onClick={() => open(project)} aria-label={`Abrir video de ${project.title}`} aria-haspopup="dialog" disabled={!stacked && (!entered || index !== current)} />
                <div className="project-caption"><p>{project.client} · {project.category}</p><h3>{project.title}</h3><MicroButton className="project-open" onClick={() => open(project)} label={`Ver ${project.title}`} disabled={!stacked && (!entered || index !== current)}>Ver proyecto</MicroButton></div>
              </div>)}
            </article>)}
          </div>
          {near && !stacked && entered && <ProjectTransition transitionKey={current} format={chapters[current]?.format || 'portrait'} />}
        </div>
        <p className="project-hint wrap">{stacked ? `${filtered.length} proyectos · Ver cada pieza en su formato original` : 'Scroll para explorar'}</p>
      </div>
    </div>
  </section>;
}
