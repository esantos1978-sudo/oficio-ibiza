import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta({
    title: 'Página no encontrada | OFICIO Ibiza',
    description: 'La página que buscas no existe o ha cambiado de dirección.',
  })

  return (
    <section className="container-editorial flex min-h-[64vh] flex-col justify-center py-20">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-xl mt-5 max-w-[12ch] text-balance">Aquí no hay oficio.</h1>
      <p className="body-lg mt-6 max-w-[42ch]">
        La página que buscas no existe o ha cambiado de dirección. Vuelve al directorio y empieza
        por el principio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="default" size="lg">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Volver al inicio
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/#servicios">Explorar servicios</Link>
        </Button>
      </div>
    </section>
  )
}
