export function About() {
  return <section className="about" id="sobre-mi">
    <div className="wrap about-grid">
      <div className="about-photo reveal">
        <video src="/videos/alex-trabajando.mp4" poster="/videos/alex-trabajando.webp" muted loop playsInline preload="none" data-about-video aria-label="Alex Urresty hablando a cámara, dirigiendo una entrevista y coordinando con intercom en un evento"></video>
      </div>
      <div className="about-text">
        <h2 className="section-title reveal">Detrás de la cámara</h2>
        <p className="lead reveal d1">Soy Alex Urresty, director audiovisual y estratega de contenido para empresas de tecnología, telecomunicaciones y educación legal, desde Lima para todo el Perú.</p>
        <p className="reveal d2">Parto del objetivo de negocio de cada marca y me encargo de todo el proceso: estrategia, grabación, edición y entrega lista para publicar.</p>
      </div>
    </div>
  </section>;
}
