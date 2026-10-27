import { email, instagram, tiktok } from './site';

// Datos estructurados (schema.org) que Google lee para entender quién es Alex y qué ofrece.
const sameAs = [instagram, tiktok];

export const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alex Urresty',
    jobTitle: 'Director Audiovisual Freelance',
    description: 'Director audiovisual freelance con base en Lima, Perú, que trabaja en todo el país. Especializado en video corporativo B2B, streaming en vivo, podcast y estrategia de contenido para redes sociales.',
    url: 'https://alexurresty.com',
    telephone: '+51943214652',
    sameAs,
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
    knowsAbout: ['Producción audiovisual', 'Video corporativo B2B', 'Streaming en vivo', 'Podcast corporativo', 'Estrategia de contenido', 'Redes sociales empresariales'],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video corporativo', description: 'Grabación y edición de videos corporativos, institucionales y demos de producto para empresas en Lima y todo el Perú.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estrategia de contenido para redes sociales', description: 'Estrategia y producción de Reels, TikTok y YouTube Shorts para marcas en Lima y todo el Perú.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Streaming en vivo', description: 'Transmisiones en vivo para eventos, lanzamientos y clases en Lima y todo el Perú.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Producción de podcast', description: 'Grabación multicámara, edición y distribución de podcast corporativo en Lima y todo el Perú.' } }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Alex Urresty | Producción Audiovisual',
    description: 'Producción audiovisual para empresas en Lima y todo el Perú: video corporativo, streaming en vivo, podcast y estrategia de contenido para redes sociales.',
    url: 'https://alexurresty.com',
    image: 'https://alexurresty.com/img/og-image.jpg',
    telephone: '+51943214652',
    email,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressRegion: 'Lima', addressCountry: 'PE' },
    areaServed: [{ '@type': 'City', name: 'Lima' }, { '@type': 'Country', name: 'Perú' }],
    founder: { '@type': 'Person', name: 'Alex Urresty' },
    sameAs,
    serviceType: ['Producción audiovisual', 'Video corporativo', 'Streaming en vivo', 'Producción de podcast', 'Estrategia de contenido', 'Contenido para redes sociales']
  }
];
