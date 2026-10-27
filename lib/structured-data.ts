import { email, instagram, linkedin, tiktok } from './site';

// Datos estructurados (schema.org) que Google lee para entender quién es Alex y qué ofrece.
// Un solo grafo: la persona (Alex), su negocio y la web se enlazan por @id, para que Google entienda
// que la web, el negocio y los perfiles (sameAs) son la misma persona.
const site = 'https://alexurresty.com';
const id = { alex: `${site}/#alex`, negocio: `${site}/#negocio`, web: `${site}/#web` };
const sameAs = [instagram, tiktok, linkedin];

const offers = [
  { name: 'Video corporativo', description: 'Grabación y edición de videos corporativos, institucionales y demos de producto para empresas en Lima y todo el Perú.' },
  { name: 'Estrategia de contenido para redes sociales', description: 'Estrategia y producción de Reels, TikTok y YouTube Shorts para marcas en Lima y todo el Perú.' },
  { name: 'Streaming en vivo', description: 'Transmisiones en vivo para eventos, lanzamientos y clases en Lima y todo el Perú.' },
  { name: 'Producción de podcast', description: 'Grabación multicámara, edición y distribución de podcast corporativo en Lima y todo el Perú.' }
].map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', ...s } }));

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': id.alex,
      name: 'Alex Urresty',
      jobTitle: 'Productor y director audiovisual',
      description: 'Productor y director audiovisual con base en Lima, Perú, que trabaja en todo el país. Especializado en video corporativo, streaming en vivo, podcast y estrategia de contenido para redes sociales.',
      url: site,
      image: `${site}/img/alex.webp`,
      telephone: '+51943214652',
      sameAs,
      address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
      knowsAbout: ['Producción audiovisual', 'Video corporativo B2B', 'Streaming en vivo', 'Podcast corporativo', 'Estrategia de contenido', 'Redes sociales empresariales'],
      makesOffer: offers
    },
    {
      '@type': 'ProfessionalService',
      '@id': id.negocio,
      name: 'Alex Urresty | Producción audiovisual',
      description: 'Producción audiovisual para empresas en Lima y todo el Perú: video corporativo, streaming en vivo, podcast y estrategia de contenido para redes sociales.',
      url: site,
      image: `${site}/img/og-image.jpg`,
      telephone: '+51943214652',
      email,
      priceRange: '$$',
      address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressRegion: 'Lima', addressCountry: 'PE' },
      areaServed: [{ '@type': 'City', name: 'Lima' }, { '@type': 'Country', name: 'Perú' }],
      founder: { '@id': id.alex },
      sameAs,
      serviceType: ['Producción audiovisual', 'Video corporativo', 'Streaming en vivo', 'Producción de podcast', 'Estrategia de contenido', 'Contenido para redes sociales']
    },
    {
      '@type': 'WebSite',
      '@id': id.web,
      url: site,
      name: 'Alex Urresty',
      inLanguage: 'es-PE',
      publisher: { '@id': id.alex },
      about: { '@id': id.alex }
    }
  ]
};
