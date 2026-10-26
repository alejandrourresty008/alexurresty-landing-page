const links = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#sobre-mi', label: 'Sobre mí' }
];

export function Header() {
  return <>
    <header className="nav" id="nav">
      <a href="#top" className="brand" aria-label="Alex Urresty, inicio">
        <span className="brand-name">Alex Urresty</span>
        <span className="brand-sub">Producción audiovisual</span>
      </a>
      <nav aria-label="Principal">
        <ul className="nav-links">
          {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </nav>
      <a href="#contacto" className="nav-cta">Contáctame</a>
      <button className="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-mobile">
        <span></span><span></span>
      </button>
    </header>

    <div className="nav-mobile" id="nav-mobile">
      {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
      <a href="#contacto">Contáctame</a>
    </div>
  </>;
}
