import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import './globals.css';

const keywords = 'producción audiovisual Lima, producción audiovisual Perú, video corporativo Lima, video corporativo Perú, videógrafo freelance Lima, video empresarial Perú, streaming eventos Lima, podcast corporativo Lima, contenido redes sociales empresas Lima, estrategia de contenido Lima, video B2B Lima, producción audiovisual sector legal, videos institucionales Lima';

export const metadata: Metadata = {
  metadataBase: new URL('https://alexurresty.com'),
  title: 'Producción Audiovisual y Video Corporativo en Lima | Alex Urresty',
  description: 'Producción audiovisual para empresas en Lima y todo el Perú: video corporativo, streaming en vivo, podcast y estrategia de contenido. Tecnología, telecom y sector legal.',
  keywords,
  authors: [{ name: 'Alex Urresty' }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Producción Audiovisual en Lima | Alex Urresty',
    description: 'Video corporativo, streaming en vivo, podcast y estrategia de contenido para empresas de tecnología, telecom y sector legal en Lima y todo el Perú.',
    type: 'website',
    url: '/',
    locale: 'es_PE',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' },
  other: { 'geo.region': 'PE-LIM', 'geo.placename': 'Lima, Perú' }
};

export const viewport: Viewport = { themeColor: '#0D1423' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Tipografía servida desde la propia web: se precargan los pesos que se ven primero
  preload('/fonts/satoshi-900.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  preload('/fonts/satoshi-400.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' });
  return <html lang="es"><body>{children}</body></html>;
}
