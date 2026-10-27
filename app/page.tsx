import { About } from '@/components/about';
import { Behaviors } from '@/components/behaviors';
import { FloatingButtons, Footer, Intro, Modal } from '@/components/chrome';
import { Contact } from '@/components/contact';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Services } from '@/components/services';
import { structuredData } from '@/lib/structured-data';

// Todo el contenido se genera aquí, en el servidor (HTML completo para Google). behaviors.tsx agrega la interacción.
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <div className="grain" aria-hidden="true"></div>
    <Intro />
    <Header />
    <main id="main">
      <Hero />
      <Projects />
      <Services />
      <About />
      <Contact />
    </main>
    <Footer />
    <FloatingButtons />
    <Modal />
    <Behaviors />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </>;
}
