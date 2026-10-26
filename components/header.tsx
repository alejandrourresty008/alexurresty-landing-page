'use client';
import { useEffect, useRef, useState } from 'react';
const links = [['#proyectos', 'Proyectos'], ['#servicios', 'Servicios'], ['#sobre-mi', 'Sobre mí']] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const marker = document.getElementById('nav-marker');
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { rootMargin: '-72px 0px 0px 0px' });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
      if (event.key === 'Tab') {
        const last = menu.current?.querySelector<HTMLAnchorElement>('a:last-child');
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); button.current?.focus(); }
        if (event.shiftKey && document.activeElement === button.current) { event.preventDefault(); last?.focus(); }
      }
    };
    const resize = () => { if (innerWidth >= 960) setOpen(false); };
    document.addEventListener('keydown', handler); window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', handler); window.removeEventListener('resize', resize); };
  }, [open]);
  return <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
    <a href="#top" className="brand" aria-label="Alex Urresty, inicio"><strong>Alex Urresty</strong><span>Producción audiovisual</span></a>
    <nav aria-label="Principal" className="hidden min-[960px]:block"><ul className="flex items-center gap-9">{links.map(([href, text]) => <li key={href}><a className="nav-link" href={href}>{text}</a></li>)}</ul></nav>
    <div className="hidden min-[960px]:block"><a className="button" href="#contacto">Contáctame</a></div>
    <button ref={button} id="menu-toggle" className="menu-button min-[960px]:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    {open && <nav ref={menu} id="mobile-menu" className="mobile-menu" aria-label="Menú móvil">{[...links, ['#contacto', 'Contáctame']].map(([href, text]) => <a key={href} href={href} onClick={() => setOpen(false)}>{text}</a>)}</nav>}
  </header>;
}
