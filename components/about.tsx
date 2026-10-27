export function About() {
  return <section className="about" id="sobre-mi">
    <div className="wrap about-grid">
      <div className="about-photo reveal">
        {/* eslint-disable-next-line @next/next/no-img-element -- exportación estática: imagen ya optimizada en webp */}
        <img src="/img/alex.webp" alt="Alex Urresty con intercom durante un evento en el natatorio" loading="lazy" decoding="async" width={800} height={1000} />
      </div>
      <div className="about-text">
        <h2 className="section-title reveal">Detrás de la cámara</h2>
        <p className="lead reveal d1">Alex Urresty dirige producciones audiovisuales para empresas de telecomunicaciones, tecnología y educación legal, desde Lima y en todo el Perú.</p>
        <p className="reveal d2">El trabajo empieza antes de grabar: entender qué necesita comunicar la marca y a quién. Después vienen el formato y el tono, la grabación, la edición y una entrega lista para publicar.</p>
        <p className="reveal d3">Fuera de cámara, baila y enseña marinera desde niño, con la misma disciplina que pone en una línea de tiempo de edición.</p>
      </div>
    </div>
  </section>;
}
