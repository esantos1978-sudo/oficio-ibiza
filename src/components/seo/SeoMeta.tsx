import { useEffect } from 'react'
import { SITE_URL } from '@/lib/schemas/professionalSchema'

interface SeoMetaProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
}

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

export function SeoMeta({
  title,
  description,
  image = '/images/og.jpg',
  url,
  type = 'website',
}: SeoMetaProps) {
  useEffect(() => {
    const resolvedUrl = url ?? `${SITE_URL}${window.location.pathname}`
    const resolvedImage = absoluteUrl(image)

    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', resolvedUrl)
    setMeta('property', 'og:image', resolvedImage)
    setMeta('property', 'og:image:alt', title)
    setMeta('property', 'og:site_name', 'OFICIO Ibiza')
    setMeta('property', 'og:locale', 'es_ES')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', resolvedImage)

    setCanonical(resolvedUrl)
  }, [description, image, title, type, url])

  return null
}
