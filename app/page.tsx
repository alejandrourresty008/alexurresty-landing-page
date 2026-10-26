import { MotionProvider } from '@/components/motion-provider';
import { DialogProvider } from '@/components/dialog-provider';
import { SmoothNavigation } from '@/components/smooth-navigation';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Services } from '@/components/services';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { ScrollDetails } from '@/components/scroll-details';
import { projects, services } from '@/lib/catalog';
import { structuredData } from '@/lib/structured-data';
import { whatsapp } from '@/lib/site';
export default function Home() {
  return <MotionProvider><DialogProvider>
    <a className="skip-link" href="#main">Saltar al contenido</a>
    <div className="film-grain" aria-hidden="true" />
    <SmoothNavigation /><Header />
    <main id="main"><Hero /><Projects items={projects} /><Services items={services} />
      <About />
      <Contact />
    </main>
    <footer className="wrap flex flex-wrap items-center justify-between gap-6 border-t border-line py-9 text-sm text-muted"><span>© 2026 Alex Urresty · Lima, Perú</span><div className="flex gap-6"><a href="https://www.instagram.com/alex.urresty/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.tiktok.com/@prod.alexurresty" target="_blank" rel="noopener noreferrer">TikTok</a></div></footer>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/><path d="M12 0A12 12 0 0 0 1.53 17.86L0 24l6.34-1.51A12 12 0 1 0 12 0Zm0 21.82a9.81 9.81 0 0 1-5.01-1.37l-.36-.22-3.73.89.91-3.63-.24-.38A9.82 9.82 0 1 1 12 21.82Z"/></svg></a>
    <ScrollDetails />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </DialogProvider></MotionProvider>;
}
