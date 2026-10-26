import { services } from '@/lib/catalog';
import { email, instagram, whatsapp } from '@/lib/site';

// Orden del selector: el de la versión publicada (no el de la lista de servicios)
const tipos = ['Video corporativo', 'Estrategia de contenido', 'Streaming', 'Podcast'] as const satisfies readonly (typeof services)[number]['title'][];

export function Contact() {
  return <section id="contacto">
    <div className="wrap contact-grid">
      <div className="contact-aside">
        <h2 className="section-title reveal">Contáctame</h2>
        <p className="reveal d1">Escribe por el formulario o directo por WhatsApp: video corporativo, streaming, podcast o estrategia de contenido.</p>
        <ul className="direct reveal d2">
          <li><a href={whatsapp} target="_blank" rel="noopener">WhatsApp <span>+51 943 214 652</span></a></li>
          <li><a href={`mailto:${email}`}>Email <span>{email}</span></a></li>
          <li><a href={instagram} target="_blank" rel="noopener">Instagram <span>@alex.urresty</span></a></li>
        </ul>
      </div>

      <div className="reveal d1">
        <form className="form" id="contact-form" noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="tu@empresa.com" autoComplete="email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="telefono">Teléfono / WhatsApp</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+51 999 999 999" autoComplete="tel" required />
            </div>
            <div className="field">
              <label htmlFor="tipo">Tipo de proyecto</label>
              <select id="tipo" name="tipo" required defaultValue="">
                <option value="" disabled>Elige uno</option>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" placeholder="Qué necesitas, para cuándo y para qué empresa." required></textarea>
          </div>
          <button type="submit" className="btn">Enviar mensaje</button>
          <p className="form-error" id="form-error" role="alert" hidden></p>
        </form>

        <div className="form-done" id="form-done" hidden>
          <h3>Mensaje recibido</h3>
          <p>Gracias. La respuesta llegará pronto por email o WhatsApp.</p>
        </div>
      </div>
    </div>
  </section>;
}
