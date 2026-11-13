import { categories, type Category, type CategorySlug } from '@/data/categories'
import {
  areas as allAreas,
  type Professional,
} from '@/data/professionals'
import { supabase } from '@/lib/supabaseClient'

interface ProfessionalRow {
  id?: string | number
  created_at?: string | null
  name?: string | null
  slug?: string | null
  category?: string | null
  specialty?: string | null
  location?: string | null
  rating?: number | string | null
  review_count?: number | string | null
  price_from?: number | string | null
  phone?: string | null
  description?: string | null
  response_time?: string | null
  verified?: boolean | null
  image?: string | null
  gallery?: unknown
}

function resolveCategory(value: unknown): Category | undefined {
  const raw = String(value ?? '').trim().toLowerCase()
  return categories.find(
    (category) =>
      category.name.toLowerCase() === raw || category.slug.toLowerCase() === raw,
  )
}

function localSlugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function mapRow(row: ProfessionalRow): Professional | null {
  const category = resolveCategory(row.category)
  if (!category) return null

  const name = String(row.name ?? '').trim()
  const slug = String(row.slug ?? '').trim() || localSlugify(name)
  if (!name || !slug) return null

  const description = String(row.description ?? '').trim()
  const specialty = String(row.specialty ?? category.name).trim()
  const location = String(row.location ?? 'Toda la isla').trim()
  const rating = Number(row.rating ?? 0)
  const reviewCount = Math.max(0, Number(row.review_count ?? 0))
  const priceFrom = Math.max(0, Number(row.price_from ?? 0))
  const phone = String(row.phone ?? '').trim()
  const whatsapp = phone.replace(/\D/g, '')
  const gallery = Array.isArray(row.gallery)
    ? row.gallery.filter((url): url is string => typeof url === 'string' && Boolean(url))
    : []
  const tagline =
    description.split('. ')[0]?.trim() || `${specialty} en ${location}`

  return {
    slug,
    name,
    category: category.slug as CategorySlug,
    specialty,
    tagline,
    image: String(row.image ?? '').trim() || category.image,
    location,
    areas: location === 'Toda la isla' ? allAreas : [location],
    rating,
    reviewCount,
    reviewBreakdown:
      reviewCount > 0 ? [reviewCount, 0, 0, 0, 0] : [0, 0, 0, 0, 0],
    priceFrom,
    experience: 0,
    languages: [],
    verified: Boolean(row.verified),
    featured: false,
    urgent: false,
    availableThisWeek: true,
    joined: row.created_at
      ? String(row.created_at).slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    responseTime: String(row.response_time ?? 'a consultar'),
    responseRate: '—',
    distanceKm: 999,
    phone,
    whatsapp,
    email: '',
    bio: description ? [description] : [],
    services: [specialty, ...category.services].filter(
      (service, index, list) => service && list.indexOf(service) === index,
    ),
    schedule: [],
    gallery: gallery.map((src) => ({
      src,
      caption: 'Trabajo realizado',
      location,
    })),
    reviews: [],
  }
}

export async function getAllProfessionals() {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? [])
    .map((row) => mapRow(row as ProfessionalRow))
    .filter((professional): professional is Professional => Boolean(professional))
}

export async function getProfessionalsByCategory(category: CategorySlug) {
  const categoryName =
    categories.find((item) => item.slug === category)?.name ?? category

  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('category', categoryName)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? [])
    .map((row) => mapRow(row as ProfessionalRow))
    .filter((professional): professional is Professional => Boolean(professional))
}

export async function getProfessionalBySlug(slug: string) {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  return mapRow(data as ProfessionalRow)
}
