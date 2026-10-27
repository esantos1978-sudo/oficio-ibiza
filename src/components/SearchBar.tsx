import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MapPin, Search } from 'lucide-react'
import { CategoryIcon } from '@/components/CategoryIcon'
import { categories } from '@/data/categories'
import { areas } from '@/data/professionals'
import { cn } from '@/lib/utils'
import type { CategorySlug } from '@/data/categories'

export function SearchBar({ className }: { className?: string }) {
  const navigate = useNavigate()
  const [service, setService] = useState<CategorySlug | ''>('')
  const [zone, setZone] = useState('')

  const selectedCategory = categories.find((category) => category.slug === service)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!service) return

    const category = categories.find((item) => item.slug === service)
    if (!category) return

    const query = zone ? `?zona=${encodeURIComponent(zone)}` : ''
    navigate(`${category.path}${query}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'grid overflow-hidden border border-ink/20 bg-background/90 shadow-[0_18px_60px_-44px_rgba(26,26,26,0.5)] backdrop-blur-md md:grid-cols-[1.15fr_0.85fr_auto]',
        className,
      )}
      aria-label="Buscar un profesional en Ibiza"
    >
      <div className="group relative flex items-center gap-3 px-5 py-4 md:px-6 md:py-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/10 bg-fog text-ink/70">
          {selectedCategory ? (
            <CategoryIcon name={selectedCategory.icon} className="h-4 w-4" strokeWidth={1.4} />
          ) : (
            <Search className="h-4 w-4" strokeWidth={1.4} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor="search-service" className="field-label mb-1.5 block">
            ¿Qué servicio necesitas?
          </label>
          <div className="relative">
            <select
              id="search-service"
              name="servicio"
              required
              value={service}
              onChange={(event) => setService(event.target.value as CategorySlug | '')}
              className="field-control cursor-pointer truncate pr-6"
            >
              <option value="" disabled>
                Selecciona un servicio
              </option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-3 border-t border-ink/10 px-5 py-4 md:border-l md:border-t-0 md:px-6 md:py-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/10 bg-fog text-ink/70">
          <MapPin className="h-4 w-4" strokeWidth={1.4} />
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor="search-zone" className="field-label mb-1.5 block">
            ¿En qué zona?
          </label>
          <div className="relative">
            <select
              id="search-zone"
              name="zona"
              value={zone}
              onChange={(event) => setZone(event.target.value)}
              className="field-control cursor-pointer truncate pr-6"
            >
              <option value="">Toda la isla</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="group flex min-h-[64px] items-center justify-center gap-2.5 bg-ink px-7 py-4 text-[11px] font-medium uppercase tracking-[0.13em] text-background transition-colors duration-300 hover:bg-clay-deep md:min-h-full"
      >
        Buscar
        <Search
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </button>
    </form>
  )
}
