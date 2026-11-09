import type { ComponentType } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  featured: boolean
  readingTime: number
}

export interface BlogPost extends BlogPostMeta {
  Component: ComponentType
}

export function formatBlogDate(date: string) {
  return format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function blogImageUrl(image: string, width = 1600) {
  if (!image.includes('images.unsplash.com')) return image

  const separator = image.includes('?') ? '&' : '?'
  return `${image}${separator}auto=format&fit=crop&w=${width}&q=82`
}
