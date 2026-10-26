'use client';
import { gsap } from './motion';
let current: gsap.core.Tween | null = null;
export function stopScroll() { current?.kill(); current = null; }
export function scrollToPosition(top: number, reduced: boolean, complete?: () => void) {
  stopScroll();
  const target = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight));
  if (reduced) { window.scrollTo({ top: target, behavior: 'instant' }); complete?.(); return; }
  current = gsap.to(window, {
    duration: gsap.utils.clamp(.7, 1.6, .7 + Math.abs(target - scrollY) / 6500),
    scrollTo: { y: target, autoKill: true }, ease: 'power3.inOut', overwrite: 'auto',
    onComplete: () => { current = null; complete?.(); }
  });
}
