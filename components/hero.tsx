// Tres clips verticales lado a lado (en celular, uno a la vez: ver initHeroVideos en behaviors.tsx).
// El orden del arreglo es el orden de las columnas; la del medio es la que se ve primero en celular.
const clips = ['/videos/hero-1.mp4', '/videos/hero-3.mp4', '/videos/hero-2.mp4'];

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero-media" aria-hidden="true">
      {clips.map(src => <div className="hero-clip" key={src}><video muted loop playsInline preload="none" data-src={src}></video></div>)}
    </div>

    <div className="hero-inner">
      <h1 className="hero-title reveal">
        <span className="line"><span>Entiendo tu industria.</span></span>
        <span className="line"><span><span className="accent">Produzco</span> tu historia.</span></span>
      </h1>
      <p className="hero-sub reveal d2">Producción y dirección audiovisual para empresas de tecnología, telecom y sector legal, desde Lima para todo el Perú.</p>
      <div className="hero-actions reveal d3">
        <a href="#contacto" className="btn">Contáctame</a>
        <a href="#proyectos" className="text-link">Ver proyectos <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>;
}
