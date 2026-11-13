import { areas } from '@/data/professionals'
import { categories } from '@/data/categories'

export interface AdminProfessional {
  id: string
  created_at: string | null
  name: string
  slug: string
  category: string
  specialty: string
  location: string
  rating: number
  review_count: number
  price_from: number
  phone: string
  description: string
  response_time: string
  verified: boolean
  image: string
  gallery: string[]
}

export type ProfessionalFormValues = Omit<
  AdminProfessional,
  'id' | 'created_at'
>

export const categoryOptions = categories.map((category) => category.name)
export const locationOptions = [...areas, 'Toda la isla']

export const emptyProfessional: ProfessionalFormValues = {
  name: '',
  slug: '',
  category: '',
  specialty: '',
  location: '',
  rating: 5,
  review_count: 0,
  price_from: 0,
  phone: '',
  description: '',
  response_time: 'menos de 24 horas',
  verified: false,
  image: '',
  gallery: [],
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function normalizeProfessional(row: Record<string, unknown>): AdminProfessional {
  return {
    id: String(row.id),
    created_at: row.created_at ? String(row.created_at) : null,
    name: String(row.name ?? ''),
    slug: String(row.slug ?? ''),
    category: String(row.category ?? ''),
    specialty: String(row.specialty ?? ''),
    location: String(row.location ?? ''),
    rating: Number(row.rating ?? 0),
    review_count: Number(row.review_count ?? 0),
    price_from: Number(row.price_from ?? 0),
    phone: String(row.phone ?? ''),
    description: String(row.description ?? ''),
    response_time: String(row.response_time ?? ''),
    verified: Boolean(row.verified),
    image: String(row.image ?? ''),
    gallery: Array.isArray(row.gallery) ? row.gallery.map(String) : [],
  }
}
