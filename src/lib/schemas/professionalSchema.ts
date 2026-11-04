export const SITE_URL = 'https://oficio-ibiza.vercel.app'

export interface Professional {
  id: string
  name: string
  category: string
  specialty: string
  location: string
  rating: number
  reviewCount: number
  priceFrom: number
  phone: string
  whatsapp?: string
  image: string
  description: string
  responseTime: string
}

export function generateProfessionalSchema(pro: Professional) {
  const url = `${SITE_URL}/profesional/${pro.id}`

  return {
    '@type': 'ProfessionalService',
    '@id': url,
    name: pro.name,
    description: pro.description,
    image: pro.image,
    url,
    telephone: pro.phone,
    priceRange: `€${pro.priceFrom} - €${pro.priceFrom * 3}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: pro.location,
      addressRegion: 'Illes Balears',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.9067,
      longitude: 1.4206,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pro.rating,
      reviewCount: pro.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Ibiza, Illes Balears',
    },
    knowsAbout: pro.specialty,
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: pro.specialty,
        serviceType: pro.category,
      },
      price: pro.priceFrom,
      priceCurrency: 'EUR',
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'OFICIO Ibiza',
    url: SITE_URL,
    description:
      'Directorio curado de profesionales del hogar en Ibiza. Fontaneros, electricistas, jardineros y más, seleccionados uno a uno.',
    foundingDate: '2016',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Eivissa',
      addressRegion: 'Illes Balears',
      addressCountry: 'ES',
    },
  }
}

export function generateWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'OFICIO Ibiza',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/servicios/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
