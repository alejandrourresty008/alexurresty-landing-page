'use client';
import { useRef, useState } from 'react';
import { useDialog } from './dialog-provider';
import { whatsapp } from '@/lib/site';
const endpoint = 'https://script.google.com/macros/s/AKfycbwiYcau8dYgruTINKkAhLUj4s4nplgre6V82iz3xEgtsGJUevd_fdtiauID6n9Rl1Zg2A/exec';
export function Contact() {
  const { service, setService } = useDialog();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const done = useRef<HTMLDivElement>(null);
  return <section id="contacto" className="section-space wrap grid gap-12 md:grid-cols-2 md:gap-20">
    <div><h2 className="section-title">Contáctame</h2><p className="mt-6 max-w-[43ch] text-muted">Escribe por el formulario o directo por WhatsApp: video corporativo, streaming, podcast o estrategia de contenido.</p><ul className="direct-links mt-8"><li><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span>+51 943 214 652</span></a></li><li><a href="mailto:alexrenato_008@hotmail.es">Email <span>alexrenato_008@hotmail.es</span></a></li><li><a href="https://www.instagram.com/alex.urresty/" target="_blank" rel="noopener noreferrer">Instagram <span>@alex.urresty</span></a></li></ul></div>
    {status === 'sent' ? <div ref={done} tabIndex={-1} role="status" className="self-center"><h3 className="text-3xl font-bold">Solicitud enviada</h3><p className="mt-4 text-muted">Para confirmar la recepción o coordinar directamente, también puedes escribir por WhatsApp.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-link mt-6">Escribir por WhatsApp ↗</a></div> :
    <form id="contact-form" aria-busy={status === 'sending'} className="contact-form" noValidate onSubmit={async event => {
      event.preventDefault(); if (status === 'sending') return;
      const form = event.currentTarget; setError('');
      const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')];
      fields.forEach(field => field.setAttribute('aria-invalid', String(!field.validity.valid)));
      if (!form.checkValidity()) { setError('Completa los campos y revisa el email antes de enviar.'); form.querySelector<HTMLElement>(':invalid')?.focus(); return; }
      setStatus('sending');
      try {
        await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(fields.map(field => [field.name, field.value])), signal: AbortSignal.timeout(12000) });
        setStatus('sent'); requestAnimationFrame(() => done.current?.focus());
      } catch { setStatus('idle'); setError('No se pudo enviar. Intenta otra vez o escribe por WhatsApp.'); }
    }}>
      <div className="grid gap-5 sm:grid-cols-2"><label>Nombre<input id="nombre" name="nombre" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" spellCheck={false} required /></label></div>
      <div className="grid gap-5 sm:grid-cols-2"><label>Teléfono / WhatsApp<input name="telefono" type="tel" autoComplete="tel" required /></label><label>Tipo de proyecto<select id="tipo" name="tipo" value={service} onChange={event => setService(event.target.value)} required><option value="" disabled>Elige uno</option>{['Video corporativo', 'Estrategia de contenido', 'Streaming', 'Podcast', 'Otro'].map(value => <option key={value}>{value}</option>)}</select></label></div>
      <label>Mensaje<textarea name="mensaje" placeholder="Qué necesitas, para cuándo y para qué empresa." rows={4} required /></label>
      <button className="button justify-self-start" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}</button>
      {error && <p role="alert" className="text-accent">{error}</p>}
    </form>}
  </section>;
}
