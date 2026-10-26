'use client';
import { gsap, useGSAP } from '@/lib/motion';
import { useMotion } from './motion-provider';
export function ScrollDetails() {
  const { reduced } = useMotion();
  useGSAP(() => {
    if (reduced) return;
    // Entry transitions stay in normal document flow; no additional pinned scroll.
    const services = document.querySelector<HTMLElement>('[data-section-enter="services"]');
    const about = document.querySelector<HTMLElement>('[data-section-enter="about"]');
    if (services) gsap.fromTo(services, { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: .7, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { id: 'services-entry', trigger: services, start: 'top 92%', once: true },
    });
    if (about) gsap.fromTo(about, { opacity: 0, x: () => Math.min(innerWidth * .12, 144) }, {
      opacity: 1, x: 0, duration: .9, ease: 'power3.out', clearProps: 'transform,opacity',
      scrollTrigger: { id: 'about-entry', trigger: about, start: 'top 90%', once: true, invalidateOnRefresh: true },
    });
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => gsap.fromTo(element, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } }));
  }, { dependencies: [reduced], revertOnUpdate: true });
  return null;
}
