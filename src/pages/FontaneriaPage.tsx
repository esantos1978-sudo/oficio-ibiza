import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  SearchX,
  X,
} from 'lucide-react'
import { SectionLabel } from '@/components/SectionLabel'
import { ServiceProfessionalCard } from '@/components/ServiceProfessionalCard'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Button } from '@/components/ui/button'
import {
  formatRating,
  responseTimeInMinutes,
  type Professional,
} from '@/data/professionals'
import { getProfessionalsByCategory } from '@/lib/professionalsService'
import { SITE_URL } from '@/lib/schemas/professionalSchema'
import { cn } from '@/lib/utils'

const zoneOptions = [
  { value: '', label: 'Toda la isla' },
  { value: 'Ibiza Town', label: 'Ibiza Town' },
  { value: 'Santa Eulalia', label: 'Santa Eulalia' },
  { value: 'San Antonio', label: 'San Antonio' },
  { value: 'San José', label: 'San José' },
  { value: 'Santa Gertrudis', label: 'Santa Gertrudis' },
]

const ratingOptions = [
  { value: 'all', label: 'Todas las valoraciones' },
  { value: '4.5', label: '4,5+' },
  { value: '4.8', label: '4,8+' },
  { value: '5.0', label: '5,0' },
]

const sortOptions = [
  { value: 'rating', label: 'Más valorados' },
  { value: 'response', label: 'Respuesta más rápida' },
  { value: 'price', label: 'Precio: menor a mayor' },
]

type RatingFilter = 'all' | '4.5' | '4.8' | '5.0'
type SortOption = 'rating' | 'response' | 'price'

const ratingLabels: Record<RatingFilter, string> = {
  all: 'Todas',
  '4.5': '4,5+',
  '4.8': '4,8+',
  '5.0': '5,0',
}

const sortLabels: Record<SortOption, string> = {
  rating: 'Más valorados',
  response: 'Respuesta más rápida',
  price: 'Precio: menor a mayor',
}

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
  className,
}: {
  id: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'group relative border-b border-line px-4 py-3.5 transition-colors focus-within:bg-fog/70 sm:border-b-0 sm:border-r',
        className,
      )}
    >
      <label htmlFor={id} className="block cursor-pointer">
        <span className="font-mono text-[8px] uppercase leading-none tracking-[0.14em] text-muted">
          {label}
        </span>
        <span className="relative mt-1.5 block">
          <select
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[12px] font-medium text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted transition-transform duration-300 group-focus-within:rotate-180"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </label>
    </div>
  )
}

function ActiveFilter({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <span className="inline-flex h-8 items-center gap-2 border border-ink/15 bg-background pl-3 pr-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ink">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="flex h-5 w-5 items-center justify-center text-muted transition-colors hover:bg-ink hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-clay-deep"
        aria-label={`Quitar filtro ${label}`}
      >
        <X className="h-3 w-3" strokeWidth={1.8} />
      </button>
    </span>
  )
}

export function FontaneriaPage() {
  const [searchParams] = useSearchParams()
  const zoneParam = searchParams.get('zona')
  const initialZone =
    zoneParam && zoneOptions.some((option) => option.value === zoneParam) ? zoneParam : ''

  const [zone, setZone] = useState(initialZone)
  const [rating, setRating] = useState<RatingFilter>('all')
  const [sort, setSort] = useState<SortOption>('rating')
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (zoneParam && zoneOptions.some((option) => option.value === zoneParam)) {
      setZone(zoneParam)
    } else if (!zoneParam) {
      setZone('')
    }
  }, [zoneParam])

  useEffect(() => {
    let active = true
    setLoading(true)
    setLoadError('')

    getProfessionalsByCategory('fontaneros')
      .then((data) => {
        if (!active) return
        setProfessionals(data)
        setLoading(false)
      })
      .catch((error: unknown) => {
        if (!active) return
        setProfessionals([])
        setLoadError(
          error instanceof Error
            ? error.message
            : 'No se han podido cargar los profesionales.',
        )
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [reloadKey])

  const results = useMemo(() => {
    const filtered = professionals.filter((professional) => {
      if (zone && !professional.areas.includes(zone)) return false
      if (rating !== 'all' && professional.rating < Number(rating)) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'response') {
        return (
          responseTimeInMinutes(a.responseTime) -
            responseTimeInMinutes(b.responseTime) ||
          b.rating - a.rating
        )
      }
      if (sort === 'price') {
        return a.priceFrom - b.priceFrom || b.rating - a.rating
      }
      return b.rating - a.rating || b.reviewCount - a.reviewCount
    })
  }, [professionals, rating, sort, zone])

  const averageRating =
    professionals.length > 0
      ? professionals.reduce(
          (total, professional) => total + professional.rating,
          0,
        ) / professionals.length
      : 0
  const averageResponseMinutes =
    professionals.length > 0
      ? professionals.reduce(
          (total, professional) =>
            total + responseTimeInMinutes(professional.responseTime),
          0,
        ) / professionals.length
      : 0

  const hasActiveControls = zone !== '' || rating !== 'all' || sort !== 'rating'

  function resetFilters() {
    setZone('')
    setRating('all')
    setSort('rating')
  }

  const zoneLabel = zone || 'Toda la isla'
  const ratingLabel = rating === 'all' ? 'Todas' : ratingLabels[rating]

  return (
    <>
      <SeoMeta
        title="Fontanería en Ibiza — Profesionales verificados | OFICIO"
        description="Profesionales de fontanería verificados en Ibiza para fugas, instalaciones, desatascos y climatización. Compara perfiles, zonas, precios y disponibilidad."
        image={`${SITE_URL}/images/service-plumbing.jpg`}
        url={`${SITE_URL}/servicios/fontaneria`}
        type="website"
      />

      <section className="border-b border-line">
        <div className="container-editorial pb-10 pt-6 sm:pt-8 lg:pb-14">
          <nav
            className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            aria-label="Migas de pan"
          >
            <Link to="/" className="transition-colors hover:text-ink">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <Link to="/#servicios" className="transition-colors hover:text-ink">
              Servicios
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <span className="text-ink">Fontanería</span>
          </nav>

          <div className="mt-8 grid gap-9 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <SectionLabel number="01">Servicio · Fontanería</SectionLabel>
              <h1 className="display-lg mt-5 text-balance">Fontanería en Ibiza</h1>
              <p className="body-lg mt-6 max-w-[58ch]">
                Profesionales verificados para fugas, instalaciones, desatascos y climatización en
                toda la isla.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-3 gap-4 border-t border-line pt-5 lg:border-t-0 lg:pt-0">
                <div>
                  <p className="font-display text-[clamp(2rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.055em]">
                    {loading ? '—' : String(professionals.length).padStart(2, '0')}
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    profesionales
                    <br />
                    en el directorio
                  </p>
                </div>
                <div>
                  <p className="font-display text-[clamp(2rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.055em]">
                    {loading || professionals.length === 0 ? '—' : formatRating(averageRating)}
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    valoración
                    <br />
                    media
                  </p>
                </div>
                <div>
                  <p className="whitespace-nowrap font-display text-[clamp(2rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.055em]">
                    {loading || professionals.length === 0
                      ? '—'
                      : `< ${Math.ceil(averageResponseMinutes / 60)}h`}
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    respuesta
                    <br />
                    media
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-line bg-background/95 backdrop-blur-xl lg:sticky lg:top-[78px] lg:z-30"
        aria-label="Filtros y ordenación"
      >
        <div className="container-editorial">
          <div className="grid sm:grid-cols-3 lg:grid-cols-[1.05fr_0.85fr_1.2fr_auto]">
            <FilterSelect
              id="zone-filter"
              label="Zona"
              value={zone}
              options={zoneOptions}
              onChange={setZone}
            />
            <FilterSelect
              id="rating-filter"
              label="Valoración"
              value={rating}
              options={ratingOptions}
              onChange={(value) => setRating(value as RatingFilter)}
            />
            <FilterSelect
              id="sort-filter"
              label="Ordenar por"
              value={sort}
              options={sortOptions}
              onChange={(value) => setSort(value as SortOption)}
            />
            <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3.5 sm:col-span-3 lg:col-span-1 lg:border-t-0">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted"
                aria-live="polite"
              >
                {loading ? (
                  'Cargando...'
                ) : (
                  <>
                    <span className="font-medium text-ink">{results.length}</span>{' '}
                    {results.length === 1 ? 'profesional' : 'profesionales'}
                  </>
                )}
              </p>
              {hasActiveControls ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
                >
                  Limpiar
                </button>
              ) : (
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted/70">
                  Sin filtros
                </span>
              )}
            </div>
          </div>

          {hasActiveControls && (
            <div className="flex flex-wrap items-center gap-2 border-t border-line py-3">
              <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                Filtros activos
              </span>
              {zone && (
                <ActiveFilter label={`Zona: ${zoneLabel}`} onRemove={() => setZone('')} />
              )}
              {rating !== 'all' && (
                <ActiveFilter
                  label={`Valoración: ${ratingLabel}`}
                  onRemove={() => setRating('all')}
                />
              )}
              {sort !== 'rating' && (
                <ActiveFilter
                  label={`Orden: ${sortLabels[sort]}`}
                  onRemove={() => setSort('rating')}
                />
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="ml-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="container-editorial">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel number="02">Directorio</SectionLabel>
              <h2 className="display-sm mt-4">Fontaneros en Ibiza.</h2>
            </div>
            <p className="text-[12px] text-muted" aria-live="polite">
              {loading
                ? 'Cargando profesionales...'
                : `Mostrando ${results.length} ${
                    results.length === 1 ? 'profesional' : 'profesionales'
                  }${zone ? ` en ${zone}` : ' en toda la isla'}`}
            </p>
          </div>

          {loading ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse border border-line">
                  <div className="h-40 bg-sand" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-2/3 bg-sand" />
                    <div className="h-2.5 w-1/2 bg-sand" />
                    <div className="h-10 bg-sand" />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div className="border border-clay/25 bg-clay/[0.05] px-6 py-16 text-center sm:px-10">
              <h2 className="display-sm text-[30px]">No se pudo cargar el directorio.</h2>
              <p className="mx-auto mt-3 max-w-[46ch] text-[13px] leading-relaxed text-muted">
                {loadError}
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setReloadKey((value) => value + 1)}
              >
                Reintentar
              </Button>
            </div>
          ) : professionals.length === 0 ? (
            <div className="border border-line bg-fog px-6 py-16 text-center sm:px-10 sm:py-20">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-background text-clay-deep">
                <SearchX className="h-5 w-5" strokeWidth={1.4} />
              </span>
              <h2 className="display-sm mx-auto mt-6 max-w-[20ch] text-[30px] sm:text-[36px]">
                Próximamente más profesionales en esta categoría
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-[13px] leading-relaxed text-muted">
                Estamos revisando nuevas incorporaciones de fontanería para toda la isla. Vuelve
                pronto o explora otros servicios.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/#servicios">Explorar otros servicios</Link>
              </Button>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7">
              {results.map((professional) => (
                <ServiceProfessionalCard
                  key={professional.slug}
                  professional={professional}
                />
              ))}
            </div>
          ) : (
            <div className="border border-line bg-fog px-6 py-16 text-center sm:px-10 sm:py-20">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-background text-clay-deep">
                <SearchX className="h-5 w-5" strokeWidth={1.4} />
              </span>
              <h2 className="display-sm mx-auto mt-6 max-w-[18ch] text-[30px] sm:text-[36px]">
                No hay resultados con esos filtros.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-[13px] leading-relaxed text-muted">
                No encontramos profesionales con esos filtros en esta zona. Prueba a ampliar la
                búsqueda a «Toda la isla».
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Button onClick={resetFilters}>Ver toda la isla</Button>
                <Button asChild variant="outline">
                  <Link to="/#servicios">Explorar otros servicios</Link>
                </Button>
              </div>
            </div>
          )}

          <div className="mt-14 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">¿Eres fontanero?</p>
              <p className="mt-2 max-w-[48ch] text-[12px] leading-relaxed text-muted">
                Si trabajas en la isla y te gusta hacer las cosas bien, queremos conocerte.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/profesionales">
                Unirme al directorio
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
