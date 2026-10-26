'use client';
import { useEffect } from 'react';
import { clients, pieces, services, where } from '@/lib/catalog';
import { ARROW_OUT, SOUND_OFF, SOUND_ON, esc, metricsHTML } from '@/lib/icons';
import { formEndpoint } from '@/lib/site';
import type { Clip } from '@/lib/types';

// Interacción de la página. El HTML ya viene completo del servidor: aquí solo se conectan eventos y animaciones.
// Cada listener usa la señal del AbortController y cada observador/temporizador se registra para limpiarlo al desmontar.

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const play = (v: HTMLVideoElement) => { v.play().catch(() => {}); };

interface Ctx {
  signal: AbortSignal;
  timeout: (fn: () => void, ms: number) => number;
  observe: (io: IntersectionObserver) => IntersectionObserver;
}

/* ─── CARRUSEL Y VENTANA ─── */

let soundOn = false; // se recuerda entre videos mientras la página esté abierta

// Precarga por intención: al acercar el mouse (o el dedo) se empieza a descargar el primer video,
// y al abrir la ventana se reutiliza ese mismo elemento ya cargado.
const warm = new Map<string, HTMLVideoElement>();
function warmUp(src?: string) {
  if (!src || warm.has(src)) return;
  const v = document.createElement('video');
  v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = src;
  warm.set(src, v);
}
const firstVideo = (clips: Clip[]) => clips.find(c => c.kind === 'video')?.src;

function buildSlide(c: Clip) {
  if (c.kind === 'image') return `<img src="${c.src}" alt="${esc(c.label || 'Fotografía')}" loading="lazy" decoding="async">`;
  if (c.kind === 'link') return `<img src="${c.poster}" alt="${esc(c.label || 'Video')}" loading="lazy" decoding="async">
    <a class="car-link" href="${c.href}" target="_blank" rel="noopener"><span>${esc(c.label)}</span><b>Ver en ${where(c.href)} ${ARROW_OUT}</b></a>`;
  return `<div class="vp"><video data-src="${c.src}"${c.poster ? ` poster="${c.poster}"` : ''} muted playsinline preload="none"${c.fit ? ` style="object-fit:${c.fit}"` : ''}></video>
    <button class="vp-sound" type="button" aria-label="Activar sonido">${SOUND_OFF}</button><span class="vp-bar" aria-hidden="true"><i></i></span></div>`;
}

function buildCarousel(clips: Clip[], title: string) {
  const chevron = (d: string) => `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  return `<div class="carousel${clips.length === 1 ? ' single' : ''}" role="group" aria-roledescription="carrusel" aria-label="Trabajos de ${esc(title)}">
    <div class="car-track">${clips.map((c, i) => `<div class="car-slide" role="group" aria-label="Pieza ${i + 1} de ${clips.length}">${buildSlide(c)}</div>`).join('')}</div>
    <button class="car-btn prev" type="button" aria-label="Anterior">${chevron('M12.5 4.5L7 10l5.5 5.5')}</button>
    <button class="car-btn next" type="button" aria-label="Siguiente">${chevron('M7.5 4.5L13 10l-5.5 5.5')}</button>
    <div class="car-dots">${clips.map((_, i) => `<button type="button" aria-label="Ir a la pieza ${i + 1}"></button>`).join('')}</div>
  </div>`;
}

// Controles del carrusel abierto (flechas del teclado y cierre)
let carousel: { step: (d: number) => void; stop: () => void } | null = null;

function initCarousel(box: HTMLElement) {
  const slides = [...box.querySelectorAll<HTMLElement>('.car-slide')];
  const videos: (HTMLVideoElement | null)[] = slides.map(sl => sl.querySelector('video'));
  const dots = [...box.querySelectorAll<HTMLButtonElement>('.car-dots button')];
  const prev = box.querySelector<HTMLButtonElement>('.car-btn.prev')!;
  const next = box.querySelector<HTMLButtonElement>('.car-btn.next')!;
  const last = slides.length - 1;
  let index = 0, timer = 0;

  // Si el video ya se precargó al pasar el mouse, se usa ese elemento
  videos.forEach((v, n) => {
    const w = v && warm.get(v.dataset.src!);
    if (!v || !w) return;
    w.poster = v.poster; w.style.cssText = v.style.cssText; w.dataset.src = v.dataset.src;
    v.replaceWith(w); videos[n] = w; warm.delete(v.dataset.src!);
  });

  const load = (v: HTMLVideoElement | null | undefined, full: boolean) => {
    if (!v) return;
    if (!v.getAttribute('src')) { v.preload = full ? 'auto' : 'metadata'; v.src = v.dataset.src!; }
    else if (full) v.preload = 'auto';
  };
  const setSoundIcons = () => box.querySelectorAll('.vp-sound').forEach(b => {
    b.innerHTML = soundOn ? SOUND_ON : SOUND_OFF;
    b.setAttribute('aria-label', soundOn ? 'Silenciar' : 'Activar sonido');
  });

  const paint = (i: number) => {
    index = i;
    clearTimeout(timer);
    slides.forEach((sl, n) => sl.style.setProperty('--pos', String(n - i)));
    dots.forEach((d, n) => d.classList.toggle('on', n === i));
    prev.disabled = i === 0;
    next.disabled = last === 0;
    videos.forEach((v, n) => { if (v && n !== i) v.pause(); });
    const v = videos[i];
    if (v) {
      load(v, true);
      v.muted = !soundOn;
      v.currentTime = 0;
      play(v);
    } else if (last > 0) {
      timer = window.setTimeout(() => go(i + 1), 7000); // fotos y enlaces también avanzan solos
    }
    load(videos[i + 1] || videos[0], true);
  };
  // Al final vuelve al primero: el carrusel nunca se queda quieto
  const go = (i: number) => {
    i = i > last ? 0 : Math.max(0, i);
    if (i !== index) paint(i);
    else if (last === 0 && videos[0]) play(videos[0]);
  };

  videos.forEach((v, n) => {
    if (!v) return;
    const bar = v.parentElement!.querySelector<HTMLElement>('.vp-bar i')!;
    v.addEventListener('ended', () => { if (n === index) { if (last === 0) { v.currentTime = 0; play(v); } else go(index + 1); } });
    v.addEventListener('timeupdate', () => { if (v.duration) bar.style.transform = `scaleX(${v.currentTime / v.duration})`; });
    v.addEventListener('playing', () => v.parentElement!.classList.remove('paused'));
    v.addEventListener('pause', () => v.parentElement!.classList.add('paused'));
    v.addEventListener('click', () => { if (v.paused) play(v); else v.pause(); });
  });
  box.querySelectorAll('.vp-sound').forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    soundOn = !soundOn;
    videos.forEach(v => { if (v) v.muted = !soundOn; });
    setSoundIcons();
  }));
  setSoundIcons();

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  dots.forEach((d, n) => d.addEventListener('click', () => go(n)));
  carousel = { step: d => go(index + d), stop: () => clearTimeout(timer) };

  // Deslizar con el dedo
  let x0: number | null = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
  }, { passive: true });

  paint(0);
}

let lastTrigger: HTMLElement | null = null;

interface ModalContent { title: string; includes: string; desc: string; tipo: string; cta: string; clips: Clip[]; landscape?: boolean }

function showModal(m: ModalContent, trigger: HTMLElement | null) {
  lastTrigger = trigger;
  const modal = $('modal');
  const videoBox = $('modal-video');
  modal.classList.toggle('landscape', !!m.landscape);
  $('modal-title').textContent = m.title;
  $('modal-includes').textContent = m.includes;
  $('modal-desc').innerHTML = m.desc;
  const cta = $('modal-cta');
  cta.dataset.tipo = m.tipo;
  cta.textContent = m.cta;

  if (m.clips.length) {
    videoBox.innerHTML = buildCarousel(m.clips, m.title);
    initCarousel(videoBox);
  } else {
    videoBox.innerHTML = '<div class="pending">Video pendiente</div>';
  }

  setExpanded(false);
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('overlay').classList.add('open');
  $('modal-body').scrollTop = 0;
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
  $('modal-close').focus({ preventScroll: true });
}

const paragraphs = (ps: string[]) => ps.map(p => `<p>${esc(p)}</p>`).join('');

function openService(id: string, trigger: HTMLElement) {
  const s = services.find(x => x.id === id);
  if (!s) return;
  showModal({ title: s.title, includes: s.includes, desc: paragraphs(s.long), tipo: s.title, cta: 'Cotizar este servicio', clips: s.clips, landscape: s.landscape }, trigger);
}

// Ventana de pieza suelta (filas de Streaming, Podcast y Video corporativo)
function openPiece(id: string, trigger: HTMLElement) {
  const pc = pieces.find(x => x.id === id);
  if (!pc) return;
  showModal({ title: pc.title, includes: `${pc.client} · ${pc.service}`, desc: paragraphs([pc.text]), tipo: pc.service, cta: 'Cotizar este servicio', clips: [pc.item], landscape: pc.landscape }, trigger);
}

// Ventana de marca: la misma de servicios, con sus piezas en carrusel
function openClient(id: string, trigger: HTMLElement) {
  const c = clients.find(x => x.id === id);
  if (!c) return;
  const desc = metricsHTML(c.metrics) + paragraphs(c.text) +
    `<p class="client-tags">${c.services.map(esc).join(' · ')}</p>` +
    (c.profile ? `<p><a class="project-cta" href="${c.profile.url}" target="_blank" rel="noopener">Ver en ${esc(c.profile.label)} ${ARROW_OUT}</a></p>` : '');
  showModal({ title: c.name, includes: c.sector, desc, tipo: c.services[0], cta: 'Cotizar algo similar', clips: c.items }, trigger);
}

function closeModal() {
  const modal = $('modal');
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  $('overlay').classList.remove('open');
  document.body.style.overflow = '';
  modal.querySelectorAll('video').forEach(v => v.pause());
  carousel?.stop();
  setTimeout(() => {
    if (!modal.classList.contains('open')) {
      modal.hidden = true;
      $('modal-video').innerHTML = '';
      carousel = null;
    }
  }, 350);
  lastTrigger?.focus({ preventScroll: true });
}

function setExpanded(on: boolean) {
  const info = $('modal-info');
  info.classList.toggle('expanded', on);
  const more = $('modal-more');
  more.setAttribute('aria-expanded', String(on));
  more.textContent = on ? 'Ver menos' : 'Ver más';
  if (!on) info.scrollTop = 0;
}

function initModal({ signal }: Ctx) {
  $('modal-info').addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;
    const info = e.currentTarget as HTMLElement;
    if (target.closest('.modal-more')) setExpanded(!info.classList.contains('expanded'));
    else if (!info.classList.contains('expanded')) setExpanded(true);
  }, { signal });
  $('modal-close').addEventListener('click', closeModal, { signal });
  $('overlay').addEventListener('click', closeModal, { signal });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (carousel && $('modal').classList.contains('open') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      carousel.step(e.key === 'ArrowRight' ? 1 : -1);
    }
  }, { signal });

  // "Cotizar este servicio" cierra la ventana y deja el tipo elegido en el formulario
  $('modal-cta').addEventListener('click', e => {
    const tipo = (e.currentTarget as HTMLElement).dataset.tipo;
    const select = $<HTMLSelectElement>('tipo');
    if ([...select.options].some(o => o.value === tipo)) select.value = tipo!;
    lastTrigger = null;
    closeModal();
  }, { signal });
}

/** Clic y Enter/Espacio abren la ventana; acercarse precarga el primer video. */
function bindOpener(el: HTMLElement, open: () => void, first: string | undefined, signal: AbortSignal) {
  (['pointerenter', 'focus', 'touchstart'] as const).forEach(ev => el.addEventListener(ev, () => warmUp(first), { passive: true, once: true, signal }));
  el.addEventListener('click', open, { signal });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  }, { signal });
}

/* ─── SERVICIOS ─── */
function initServices({ signal }: Ctx) {
  document.querySelectorAll<HTMLElement>('.service-row').forEach(row => {
    const id = row.dataset.id!;
    bindOpener(row, () => openService(id, row), firstVideo(services.find(s => s.id === id)?.clips ?? []), signal);
  });
}

/* ─── PROYECTOS ─── */
function initProjects({ signal, observe }: Ctx) {
  // Vista previa: con mouse se reproduce al pasar por encima; en celular, cuando el bloque está en pantalla
  const startPv = (card: Element) => {
    const v = card.querySelector<HTMLVideoElement>('.pv');
    if (!v) return;
    if (!v.getAttribute('src')) {
      v.muted = true; v.src = v.dataset.src!;
      v.addEventListener('playing', () => v.classList.add('ready'), { once: true });
    }
    card.classList.add('previewing');
    play(v);
  };
  const stopPv = (card: Element) => {
    card.classList.remove('previewing');
    card.querySelector<HTMLVideoElement>('.pv')?.pause();
  };
  const cards = document.querySelectorAll<HTMLElement>('#project-rows .tile');
  if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      card.addEventListener('pointerenter', () => startPv(card), { signal });
      card.addEventListener('pointerleave', () => stopPv(card), { signal });
    });
  } else {
    const io = observe(new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting ? startPv(e.target) : stopPv(e.target)), { threshold: 0.75 }));
    cards.forEach(card => io.observe(card));
  }

  cards.forEach(card => {
    const { client, piece } = card.dataset;
    if (client) bindOpener(card, () => openClient(client, card), firstVideo(clients.find(c => c.id === client)?.items ?? []), signal);
    else if (piece) {
      const item = pieces.find(p => p.id === piece)?.item;
      bindOpener(card, () => openPiece(piece, card), item?.kind === 'video' ? item.src : undefined, signal);
    }
  });
}

/* ─── NAV ─── */
function initNav({ signal, observe }: Ctx) {
  const nav = $('nav');
  const wa = $('wa-float');
  const toTop = $('to-top');

  // Fondo del menú y botones flotantes aparecen al salir del inicio
  observe(new IntersectionObserver(([entry]) => {
    nav.classList.toggle('scrolled', !entry.isIntersecting);
    wa.classList.toggle('show', !entry.isIntersecting);
    toTop.classList.toggle('show', !entry.isIntersecting);
  }, { rootMargin: '-72px 0px 0px 0px', threshold: 0.12 })).observe($('top'));

  // Enlace activo según la sección visible
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-links a')];
  const sectionIO = observe(new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' }));
  links.forEach(a => {
    const section = document.querySelector(a.getAttribute('href')!);
    if (section) sectionIO.observe(section);
  });

  // Menú móvil
  const burger = $('hamburger');
  const mobile = $('nav-mobile');
  const setOpen = (open: boolean) => {
    mobile.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('scrolled', open || window.scrollY > 40);
  };
  burger.addEventListener('click', () => setOpen(!mobile.classList.contains('open')), { signal });
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false), { signal }));
}

/* ─── APARICIÓN AL HACER SCROLL ─── */
function initReveal({ observe }: Ctx) {
  const io = observe(new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('visible', 'seen');
        if (el.closest('.hero')) io.unobserve(el); // el inicio aparece una sola vez
      } else {
        el.classList.remove('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }));
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── TÍTULO DE PROYECTOS ─── */
// Letras que aparecen disolviéndose (desfase algo azaroso, para que se sienta orgánico) y luego se separan.
// Se reproduce la primera vez que se llega a la sección y cada vez que se hace clic en un enlace a #proyectos.
function initProjTitle({ signal, timeout, observe }: Ctx) {
  const t = $('proj-title');
  const reduce = reducedMotion();
  t.innerHTML = [...(t.textContent ?? '')].map((c, i) =>
    `<span class="ch" aria-hidden="true" style="--d:${Math.round(i * 45 + Math.random() * 100)}ms">${esc(c)}</span>`).join('');

  // La primera fila espera a que el título termine de aparecer y entra mientras las letras se separan.
  // Al terminar se le quita "secuencia" para que la atenuación al pasar el mouse vuelva a funcionar normal.
  const fila = document.querySelector<HTMLElement>('#project-rows .pbento')!;
  let timer = 0, timerFila = 0, timerFin = 0, visible = false, pendiente = true;
  const mostrarFila = (ms: number) => {
    clearTimeout(timerFila);
    timerFila = timeout(() => {
      fila.classList.add('entra');
      timerFin = timeout(() => fila.classList.remove('secuencia', 'entra'), 2200);
    }, reduce ? 0 : ms);
  };
  const ocultarFila = () => {
    clearTimeout(timerFila); clearTimeout(timerFin);
    fila.classList.remove('entra');
    fila.classList.add('secuencia');
  };
  ocultarFila();

  const start = () => {
    pendiente = false;
    clearTimeout(timer);
    t.classList.add('disuelto');
    timer = timeout(() => t.classList.add('abierto'), reduce ? 0 : 800);
    mostrarFila(1100);
  };
  const reset = () => {
    clearTimeout(timer);
    t.classList.remove('disuelto', 'abierto');
    ocultarFila();
    void t.offsetWidth; // fuerza el reinicio de la transición
  };

  observe(new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && pendiente) start();
  }, { threshold: 0.6 })).observe(t);
  // Por si se baja tan rápido que el título nunca llega a verse: la fila no se queda oculta
  observe(new IntersectionObserver(([e]) => {
    if (e.isIntersecting && pendiente) start();
  }, { threshold: 0.2 })).observe(fila);

  document.querySelectorAll('a[href="#proyectos"]').forEach(a => a.addEventListener('click', () => {
    reset();
    pendiente = true;
    if (visible) timeout(start, 150); // ya estaba en pantalla: el observador no volverá a avisar
  }, { signal }));
}

/* ─── VIDEOS DEL INICIO ─── */
// Computadora: los tres clips lado a lado. Celular: uno a la vez, y al terminar pasa al siguiente.
function initHeroVideos({ signal }: Ctx) {
  const clips = [...document.querySelectorAll<HTMLElement>('.hero-clip')].filter(c => c.querySelector('video')?.dataset.src);
  const video = (c: HTMLElement) => c.querySelector('video')!;
  const load = (v: HTMLVideoElement) => {
    if (v.getAttribute('src')) return;
    v.muted = true;
    v.src = v.dataset.src!;
    v.addEventListener('canplay', () => v.classList.add('ready'), { once: true });
  };
  if (!window.matchMedia('(max-width: 960px)').matches) {
    clips.forEach(c => { const v = video(c); load(v); play(v); });
    return;
  }
  const order = [clips[1], clips[0], clips[2]].filter(Boolean); // empieza por el clip de Alex
  let k = 0;
  const show = (i: number) => {
    order.forEach((c, n) => c.classList.toggle('on', n === i));
    const v = video(order[i]);
    load(v);
    v.currentTime = 0;
    play(v);
    const nxt = video(order[(i + 1) % order.length]);
    nxt.preload = 'auto';
    load(nxt);
  };
  order.forEach(c => {
    const v = video(c);
    v.loop = order.length === 1;
    v.addEventListener('ended', () => { k = (k + 1) % order.length; show(k); }, { signal });
  });
  show(0);
}

/* ─── FORMULARIO ─── */
function initContactForm({ signal }: Ctx) {
  const form = $<HTMLFormElement>('contact-form');
  const done = $('form-done');
  const error = $('form-error');
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    error.hidden = true;

    if (!form.checkValidity()) {
      const first = form.querySelector<HTMLInputElement>(':invalid');
      error.textContent = first?.type === 'email'
        ? 'Revisa el email, parece incompleto.'
        : 'Completa todos los campos para enviar el mensaje.';
      error.hidden = false;
      first?.focus();
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try {
      // no-cors: Apps Script no permite leer la respuesta; si la petición sale, se da por enviada
      await fetch(formEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>)
      });
      form.hidden = true;
      done.hidden = false;
    } catch {
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
      error.textContent = 'No se pudo enviar. Escribe por WhatsApp o email, por favor.';
      error.hidden = false;
    }
  }, { signal });
}

/* ─── PANTALLA DE ENTRADA ─── */
function runIntro({ signal, timeout }: Ctx, onDone: () => void) {
  const intro = document.getElementById('intro');
  if (!intro) { onDone(); return; }
  const reduce = reducedMotion();
  let finished = false;
  document.body.style.overflow = 'hidden';

  const finish = () => {
    if (finished) return;
    finished = true;
    intro.classList.add('leaving');
    timeout(onDone, reduce ? 0 : 300);
    timeout(() => {
      intro.remove();
      document.body.style.overflow = '';
    }, reduce ? 50 : 1000);
  };

  const hold = timeout(finish, reduce ? 400 : 1100);
  const skip = () => { clearTimeout(hold); finish(); };
  intro.addEventListener('click', skip, { signal });
  window.addEventListener('keydown', skip, { once: true, signal });
  window.addEventListener('wheel', skip, { once: true, passive: true, signal });
  window.addEventListener('touchstart', skip, { once: true, passive: true, signal });
}

export function Behaviors() {
  useEffect(() => {
    // Al recargar, la página vuelve siempre arriba (el navegador no recuerda la posición)
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);

    const ac = new AbortController();
    const timers: number[] = [];
    const observers: IntersectionObserver[] = [];
    const ctx: Ctx = {
      signal: ac.signal,
      timeout: (fn, ms) => { const id = window.setTimeout(fn, ms); timers.push(id); return id; },
      observe: io => { observers.push(io); return io; }
    };

    initServices(ctx);
    initProjects(ctx);
    initModal(ctx);
    initNav(ctx);
    initContactForm(ctx);
    initHeroVideos(ctx);
    runIntro(ctx, () => { initReveal(ctx); initProjTitle(ctx); });

    return () => {
      ac.abort();
      timers.forEach(clearTimeout);
      observers.forEach(io => io.disconnect());
      document.body.style.overflow = '';
    };
  }, []);
  return null;
}
