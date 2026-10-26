'use client';
import Image from 'next/image';
import type { Service } from '@/lib/types';
import { ServiceIcon } from './service-icon';
import { useDialog } from './dialog-provider';
export function Services({ items }: { items: Service[] }) {
  const { open } = useDialog();
  return <section id="servicios" className="section-space bg-secondary">
    <div className="wrap services-content" data-section-enter="services">
      <h2 className="section-title mb-10 md:mb-14">Servicios</h2>
      <ul className="services-bento">
        {items.map(service => {
          const preview = service.items.find(item => item.kind === 'video');
          return <li key={service.id} className="service-bento-card" data-service={service.id}>
            {preview?.kind === 'video' && <div className="service-art" aria-hidden="true"><Image src={preview.poster} alt="" fill sizes="(min-width: 1024px) 35vw, (min-width: 640px) 40vw, 80vw" /></div>}
            <div className="service-card-copy">
              <ServiceIcon id={service.id} />
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <span className="service-card-link" aria-hidden="true">Ver servicio <span>↗</span></span>
            </div>
            <button type="button" className="service-card-hit" onClick={() => open(service)} aria-label={`Conocer ${service.title}`} aria-haspopup="dialog" />
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
