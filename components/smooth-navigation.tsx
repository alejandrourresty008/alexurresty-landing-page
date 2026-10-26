'use client';
import { useEffect } from 'react';
import { scrollToPosition, stopScroll } from '@/lib/navigation';
import { useMotion } from './motion-provider';
export function SmoothNavigation() {
  const { reduced } = useMotion();
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const offset = target.id === 'proyectos' || target.id === 'top' ? 0 : 88;
      scrollToPosition(target.getBoundingClientRect().top + scrollY - offset, reduced, () => {
        if (location.hash !== hash) history.pushState(null, '', hash);
        const focus = target.querySelector<HTMLElement>('h1, h2') || target;
        const original = focus.getAttribute('tabindex');
        if (original === null) focus.setAttribute('tabindex', '-1');
        focus.focus({ preventScroll: true });
        if (original === null) focus.addEventListener('blur', () => focus.removeAttribute('tabindex'), { once: true });
      });
    };
    const interruptKey = (event: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) stopScroll();
    };
    document.addEventListener('click', click);
    window.addEventListener('wheel', stopScroll, { passive: true });
    window.addEventListener('touchstart', stopScroll, { passive: true });
    window.addEventListener('keydown', interruptKey);
    return () => { stopScroll(); document.removeEventListener('click', click); window.removeEventListener('wheel', stopScroll); window.removeEventListener('touchstart', stopScroll); window.removeEventListener('keydown', interruptKey); };
  }, [reduced]);
  return null;
}
