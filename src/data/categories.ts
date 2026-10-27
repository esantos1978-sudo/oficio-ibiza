export type CategorySlug =
  | 'fontaneros'
  | 'electricistas'
  | 'piscinas'
  | 'jardineros'
  | 'limpieza'
  | 'manitas'

export type CategoryIcon =
  | 'droplets'
  | 'zap'
  | 'waves'
  | 'leaf'
  | 'sparkles'
  | 'hammer'

export interface Category {
  slug: CategorySlug
  path: string
  name: string
  shortName: string
  singular: string
  number: string
  icon: CategoryIcon
  image: string
  description: string
  longDescription: string
  services: string[]
}

export const categories: Category[] = [
  {
    slug: 'fontaneros',
    path: '/fontaneros-ibiza',
    name: 'Fontanería',
    shortName: 'Fontanería',
    singular: 'Fontanero',
    number: '01',
    icon: 'droplets',
    image: '/images/service-plumbing.jpg',
    description: 'Fugas, instalaciones y climatización.',
    longDescription:
      'Desde una fuga que no puede esperar hasta la reforma completa de un baño. Profesionales que conocen las instalaciones de la isla y trabajan con materiales pensados para la cal y el agua de Ibiza.',
    services: [
      'Reparación de fugas',
      'Reforma de baños',
      'Termos y aerotermia',
      'Desatascos',
    ],
  },
  {
    slug: 'electricistas',
    path: '/electricistas-ibiza',
    name: 'Electricidad',
    shortName: 'Electricidad',
    singular: 'Electricista',
    number: '02',
    icon: 'zap',
    image: '/images/service-electrical.jpg',
    description: 'Cuadros, averías, iluminación y domótica.',
    longDescription:
      'Cuadros eléctricos, averías, iluminación exterior y domótica para villas y alquileres. Instalaciones seguras y documentadas, sin sorpresas y con margen para crecer.',
    services: [
      'Cuadros eléctricos',
      'Averías y urgencias',
      'Iluminación exterior',
      'Domótica',
    ],
  },
  {
    slug: 'piscinas',
    path: '/piscinas-ibiza',
    name: 'Piscinas',
    shortName: 'Piscinas',
    singular: 'Especialista en piscinas',
    number: '03',
    icon: 'waves',
    image: '/images/service-pools.jpg',
    description: 'Mantenimiento, tratamiento y puesta a punto.',
    longDescription:
      'Mantenimiento semanal, puesta a punto de temporada y tratamiento de agua. Para que la piscina esté siempre lista, también cuando llega el primer huésped de la temporada.',
    services: [
      'Mantenimiento semanal',
      'Tratamiento de agua',
      'Puesta a punto',
      'Reparación de equipos',
    ],
  },
  {
    slug: 'jardineros',
    path: '/jardineros-ibiza',
    name: 'Jardinería',
    shortName: 'Jardinería',
    singular: 'Jardinero',
    number: '04',
    icon: 'leaf',
    image: '/images/service-gardening.jpg',
    description: 'Jardines mediterráneos y riego eficiente.',
    longDescription:
      'Jardines mediterráneos, riego eficiente y poda respetuosa con el clima. Menos agua, más vida y un exterior que acompaña a la casa durante todo el año.',
    services: [
      'Diseño y plantación',
      'Poda y mantenimiento',
      'Riego eficiente',
      'Jardines de bajo consumo',
    ],
  },
  {
    slug: 'limpieza',
    path: '/limpieza-ibiza',
    name: 'Limpieza',
    shortName: 'Limpieza',
    singular: 'Profesional de limpieza',
    number: '05',
    icon: 'sparkles',
    image: '/images/service-cleaning.jpg',
    description: 'Villas, casas y cambios de huéspedes.',
    longDescription:
      'Limpieza profunda, mantenimiento de villas y cambios de huéspedes con estándares de hotel. Discreción, confianza y atención al detalle en cada rincón.',
    services: [
      'Limpieza de mantenimiento',
      'Cambios de huéspedes',
      'Limpieza profunda',
      'Puesta a punto de temporada',
    ],
  },
  {
    slug: 'manitas',
    path: '/manitas-ibiza',
    name: 'Manitas / Reformas',
    shortName: 'Manitas',
    singular: 'Manitas',
    number: '06',
    icon: 'hammer',
    image: '/images/service-renovation.jpg',
    description: 'Pequeños arreglos y reformas contenidas.',
    longDescription:
      'Pequeños arreglos, montajes e instalaciones que alargan la vida de tu casa. Reformas contenidas, bien ejecutadas y con un calendario que se cumple.',
    services: [
      'Montajes e instalaciones',
      'Pequeñas reformas',
      'Pintura y acabados',
      'Mantenimiento general',
    ],
  },
]

export const categoryBySlug = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<CategorySlug, Category>

export const categoryByPath = Object.fromEntries(
  categories.map((category) => [category.path, category]),
) as Record<string, Category>
