import Image from 'next/image';
const process = [
  { title: 'Entender', text: 'El negocio, el objetivo y la audiencia. Cada pieza empieza con una intención clara.' },
  { title: 'Producir', text: 'Encontrar el formato y el tono. Dirigir la grabación y cuidar la imagen y el sonido.' },
  { title: 'Dar forma', text: 'Editar la historia y entregar una pieza lista para publicar.' },
];
export function About() {
  return <section id="sobre-mi" className="about-section section-space" aria-labelledby="about-title">
    <div className="wrap about-composition" data-section-enter="about">
      <div className="about-profile">
        <div className="about-story">
          <p className="about-role">Alex Urresty <span>Producción audiovisual</span></p>
          <h2 id="about-title">Detrás de<br />la cámara.</h2>
          <p className="about-lead">Alex Urresty dirige producciones audiovisuales en Lima para empresas de telecomunicaciones, tecnología y educación legal.</p>
          <p className="about-description">El trabajo empieza antes de grabar: entender qué necesita comunicar la marca y a quién. Después vienen el formato y el tono, la grabación, la edición y una entrega lista para publicar.</p>
          <a href="#contacto" className="about-contact">Conversemos sobre tu proyecto <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="about-portrait">
          <Image src="/img/alex.webp" alt="Alex Urresty con intercom durante un evento en el natatorio" width={800} height={1000} sizes="(min-width: 1024px) 44vw, (min-width: 768px) 46vw, 90vw" />
          <span className="about-frame" aria-hidden="true" />
          <figcaption><span>Dirección en campo</span><span>Lima, Perú</span></figcaption>
        </figure>
      </div>
      <div className="about-method">
        <h3>De la idea a la entrega.</h3>
        <ol className="about-process">{process.map((step, index) => <li key={step.title}>
          <span className="about-step" aria-hidden="true">0{index + 1}</span>
          <div><h4>{step.title}</h4><p>{step.text}</p></div>
        </li>)}</ol>
      </div>
      <div className="about-personal"><h3>Fuera de cámara</h3><p>Fuera de cámara, baila y enseña marinera desde niño, con la misma disciplina que pone en una línea de tiempo de edición.</p></div>
    </div>
  </section>;
}
