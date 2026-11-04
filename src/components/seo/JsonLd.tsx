import { useEffect } from 'react'

interface JsonLdProps {
  data: Record<string, unknown>
}

/**
 * Injects a structured-data script into <head> and removes it on unmount.
 * Keeping the payload in a string prevents unnecessary DOM updates when the
 * parent re-renders with an equivalent schema object.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.oficioJsonLd = 'true'
    script.textContent = payload
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [payload])

  return null
}
