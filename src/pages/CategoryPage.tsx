import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { CategoryIcon } from '@/components/CategoryIcon'
import { FilterPanel, type Filters } from '@/components/FilterPanel'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Category } from '@/data/categories'
import { categories } from '@/data/categories'
import {
  professionalsByCategory,
  type Professional,
} from '@/data/professionals'
import { usePageMeta } from '@/hooks/usePageMeta'

type SortOption = 'rating' | 'recent' | 'near'

const defaultFilters: Filters = {
  zones: [],
  minRating: 0,
  availableOnly: false,
  urgentOnly: false,
}

const sortLabels: Record<SortOption, string> = {
  rating: 'Más valorados',
  recent: 'Más recientes',
  near: 'Más cercanos',
}

function filterAndSort(
  professionals: Professional[],
  filters: Filters,
  sort: SortOption,
) {
  const filtered = professionals.filter((professional) => {
    if (filters.zones.length > 0) {
      const matchesZone = filters.zones.some((zone) => professional.areas.includes(zone))
      if (!matchesZone) return false
    }
    if (filters.minRating > 0 && professional.rating < filters.minRating) return false
    if (filters.availableOnly && !professional.availableThisWeek) return false
    if (filters.urgentOnly && !professional.urgent) return false
    return true
  })

  return [...filtered].sort((a, b) => {
    if (sort === 'recent') {
      return new Date(b.joined).getTime() - new Date(a.joined).getTime()
    }
    if (sort === 'near') {
      return a.distanceKm - b.distanceKm
    }
    return b.rating - a.rating || b.reviewCount - a.reviewCount
  })
}

function activeFilterCount(filters: Filters) {
  return (
    filters.zones.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.availableOnly ? 1 : 0) +
    (filters.urgentOnly ? 1 : 0)
  )
}

export function CategoryPage({ category }: { category: Category }) {
  const [searchParams] = useSearchParams()
  const zoneParam = searchParams.get('zona')
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    zones: zoneParam ? [zoneParam] : [],
  })
  const [sort, setSort] = useState<SortOption>('rating')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    if (zoneParam) {
      setFilters((current) => ({ ...current, zones: [zoneParam] }))
    }
  }, [zoneParam])

  usePageMeta({
    title: `${category.name} en Ibiza — Profesionales verificados | OFICIO`,
    description: `${category.longDescription} Encuentra ${category.singular.toLowerCase()} verificados en Ibiza.`,
  })

  const categoryProfessionals = professionalsByCategory(category.slug)
  const results = useMemo(
    () => filterAndSort(categoryProfessionals, filters, sort),
    [categoryProfessionals, filters, sort],
  )

  const count = activeFilterCount(filters)
  const zoneText =
    filters.zones.length === 0
      ? 'toda la isla'
      : filters.zones.length === 1
        ? filters.zones[0]
        : `${filters.zones.length} zonas`

  function resetFilters() {
    setFilters(defaultFilters)
  }

  return (
    <>
      <section className="border-b border-line">
        <div className="container-editorial pb-12 pt-6 sm:pt-8 lg:pb-16">
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
            <span className="text-ink">{category.name}</span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel number={category.number}>{category.singular} · Ibiza</SectionLabel>
              <h1 className="display-lg mt-5 text-balance">
                {category.name} en Ibiza.
              </h1>
              <p className="body-lg mt-6 max-w-[54ch]">{category.longDescription}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                  {categoryProfessionals.length}{' '}
                  {categoryProfessionals.length === 1 ? 'profesional' : 'profesionales'}{' '}
                  verificados
                </span>
                <span>Cobertura en toda la isla</span>
                <span>Sin comisiones</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="image-grain relative aspect-[16/10] overflow-hidden bg-sand lg:aspect-[4/3]">
                <img
                  src={category.image}
                  alt={`${category.name} en Ibiza`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 border border-cream/30 bg-ink/25 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-cream backdrop-blur-sm">
                  <CategoryIcon name={category.icon} className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Servicio verificado
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr] xl:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onReset={resetFilters}
                  resultCount={results.length}
                />
              </div>
            </aside>

            <div>
              <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Resultados</p>
                  <p className="mt-2 text-[13px] text-muted" aria-live="polite">
                    <span className="font-medium text-ink">{results.length}</span>{' '}
                    {results.length === 1 ? 'profesional' : 'profesionales'} en {zoneText}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="flex h-10 items-center gap-2 border border-ink/20 px-3.5 font-mono text-[9px] uppercase tracking-[0.11em] text-ink transition-colors hover:border-ink lg:hidden"
                    aria-haspopup="dialog"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Filtros{count > 0 ? ` (${count})` : ''}
                  </button>

                  <label htmlFor="sort" className="sr-only">
                    Ordenar profesionales
                  </label>
                  <div className="relative flex h-10 items-center border border-ink/20 pl-3.5 pr-8 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-clay-deep">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortOption)}
                      className="cursor-pointer appearance-none bg-transparent pr-1 text-[10px] uppercase tracking-[0.08em] text-ink outline-none"
                    >
                      {Object.entries(sortLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-muted"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>

              {results.length > 0 ? (
                <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:gap-x-7">
                  {results.map((professional, index) => (
                    <Reveal key={professional.slug} delay={index * 70}>
                      <ProfessionalCard professional={professional} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-8 border border-line bg-fog px-6 py-14 text-center sm:px-10">
                  <Sparkles className="mx-auto h-5 w-5 text-clay-deep" strokeWidth={1.4} />
                  <h2 className="display-sm mt-5 text-[30px]">No hay coincidencias</h2>
                  <p className="mx-auto mt-3 max-w-[40ch] text-[13px] leading-relaxed text-muted">
                    Prueba a ampliar la zona o a quitar algún filtro. También podemos avisarte
                    cuando se incorpore un profesional que encaje.
                  </p>
                  <Button variant="outline" className="mt-7" onClick={resetFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}

              <div className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Qué resolvemos</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.services.map((service) => (
                      <li
                        key={service}
                        className="border border-ink/15 px-3 py-2 text-[11px] text-muted"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">Nuestro criterio</p>
                  <ul className="mt-4 space-y-2.5 text-[12px] leading-relaxed text-muted">
                    <li className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      Identidad, seguro y referencias comprobadas antes de publicar.
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      Reseñas solo de clientes con servicio real.
                    </li>
                    <li className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      Perfiles revisados cada temporada.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                  ¿No encuentras lo que buscas?
                </p>
                <Link
                  to="/profesionales"
                  className="link-editorial text-[10px] text-ink"
                >
                  Recomiéndanos a un profesional
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-14 sm:py-16">
        <div className="container-editorial">
          <div className="flex items-end justify-between gap-6">
            <div>
              <SectionLabel>Otros servicios</SectionLabel>
              <h2 className="display-sm mt-4 max-w-[12ch]">Sigue explorando.</h2>
            </div>
            <Link to="/#servicios" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink sm:flex">
              Ver todos
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {categories
              .filter((item) => item.slug !== category.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={item.path}
                  className="group flex items-center justify-between bg-background px-5 py-5 transition-colors hover:bg-cream"
                >
                  <span className="flex items-center gap-3">
                    <CategoryIcon
                      name={item.icon}
                      className="h-4 w-4 text-clay-deep"
                      strokeWidth={1.4}
                    />
                    <span className="font-display text-[22px] font-medium tracking-[-0.035em]">
                      {item.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.4}
                  />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="left-auto right-0 top-0 h-[100dvh] max-h-none w-[88vw] max-w-sm translate-x-0 translate-y-0 overflow-y-auto border-0 border-l border-line p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-[30px]">Filtros</DialogTitle>
            <DialogDescription>
              Ajusta la zona, la valoración y la disponibilidad.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              resultCount={results.length}
            />
          </div>
          <DialogClose asChild>
            <Button variant="default" className="mt-6 w-full">
              Ver {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}
