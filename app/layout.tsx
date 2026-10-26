import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const satoshi = localFont({ src: [{ path: '../public/fonts/satoshi-400.woff2', weight: '400' }, { path: '../public/fonts/satoshi-500.woff2', weight: '500' }, { path: '../public/fonts/satoshi-700.woff2', weight: '700' }, { path: '../public/fonts/satoshi-900.woff2', weight: '900' }], variable: '--font-satoshi', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL('https://alexurresty.com'),
  title: 'Producción Audiovisual y Video Corporativo en Lima | Alex Urresty',
  description: 'Producción audiovisual en Lima para empresas: video corporativo, streaming en vivo, podcast y estrategia de contenido. Tecnología, telecom y sector legal.',
  authors: [{ name: 'Alex Urresty' }],
  keywords: ['producción audiovisual Lima', 'video corporativo Lima', 'streaming eventos Lima', 'podcast corporativo Lima', 'videógrafo freelance Lima'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Producción Audiovisual en Lima | Alex Urresty', description: 'Video corporativo, streaming en vivo, podcast y estrategia de contenido para empresas de tecnología, telecom y sector legal en Lima.', locale: 'es_PE', type: 'website', url: '/', images: [{ url: '/img/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' }, robots: { index: true, follow: true }
};
export const viewport: Viewport = { themeColor: '#0D1423' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={satoshi.variable}><body>{children}</body></html>;
}
