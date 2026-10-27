import { instagram, linkedin, tiktok, whatsapp } from '@/lib/site';

export function Intro() {
  return <div className="intro" id="intro" aria-hidden="true">
    <span className="intro-name">Alex Urresty</span>
  </div>;
}

export function Footer() {
  return <footer className="footer">
    <div className="footer-inner">
      <span>© 2026 Alex Urresty · Lima, Perú</span>
      <div className="footer-links">
        <a href={instagram} target="_blank" rel="noopener">Instagram</a>
        <a href={tiktok} target="_blank" rel="noopener">TikTok</a>
        <a href={linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
  </footer>;
}

export function FloatingButtons() {
  return <>
    <a className="to-top" id="to-top" href="#top" aria-label="Volver al inicio">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 16V4M4.5 9.5L10 4l5.5 5.5" /></svg>
    </a>
    <a className="wa-float" id="wa-float" href={whatsapp} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L0 24l6.336-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.007-1.374l-.36-.214-3.727.888.906-3.633-.235-.374A9.822 9.822 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" /></svg>
    </a>
  </>;
}

/** Ventana compartida por servicios, marcas y piezas. Su contenido lo arma behaviors.tsx. */
export function Modal() {
  return <>
    <div className="overlay" id="overlay"></div>
    <div className="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
      <button className="modal-close" id="modal-close" aria-label="Cerrar">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
      </button>
      <div className="modal-stage" id="modal-body">
        <div className="modal-video" id="modal-video"></div>
        <div className="modal-info" id="modal-info">
          <h2 className="modal-title" id="modal-title"></h2>
          <div className="modal-desc" id="modal-desc"></div>
          <button className="modal-more" id="modal-more" type="button" aria-expanded="false">Ver más</button>
          <div className="modal-extra">
            <p className="modal-includes" id="modal-includes"></p>
            <a href="#contacto" className="btn" id="modal-cta">Cotizar este servicio</a>
          </div>
        </div>
      </div>
    </div>
  </>;
}
