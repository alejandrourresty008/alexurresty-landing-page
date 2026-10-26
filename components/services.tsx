import { services } from '@/lib/catalog';
import { ARROW, SERVICE_ICONS } from '@/lib/icons';

export function Services() {
  return <section className="services" id="servicios">
    <div className="wrap">
      <div className="section-head">
        <h2 className="section-title reveal">Servicios</h2>
      </div>
      <ul className="service-list" id="service-list">
        {services.map((s, i) => <li key={s.id} className={`service-row reveal d${(i % 3) + 1}`} data-id={s.id} role="button" tabIndex={0} aria-haspopup="dialog">
          <h3 className="service-name"><span className="service-icon" dangerouslySetInnerHTML={{ __html: SERVICE_ICONS[s.id] }} /><span>{s.title}</span></h3>
          <p className="service-desc">{s.short}</p>
          <span className="service-go" dangerouslySetInnerHTML={{ __html: ARROW }} />
        </li>)}
      </ul>
    </div>
  </section>;
}
