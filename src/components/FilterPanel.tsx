import { RotateCcw } from 'lucide-react'
import { areas } from '@/data/professionals'
import { cn } from '@/lib/utils'

export interface Filters {
  zones: string[]
  minRating: 0 | 4.5 | 4.8
  availableOnly: boolean
  urgentOnly: boolean
}

interface FilterPanelProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onReset: () => void
  resultCount: number
  className?: string
}

const ratingOptions: { label: string; value: Filters['minRating'] }[] = [
  { label: 'Todas las valoraciones', value: 0 },
  { label: '4,5 o más', value: 4.5 },
  { label: '4,8 o más', value: 4.8 },
]

export function FilterPanel({
  filters,
  onChange,
  onReset,
  resultCount,
  className,
}: FilterPanelProps) {
  function toggleZone(zone: string) {
    onChange({
      ...filters,
      zones: filters.zones.includes(zone)
        ? filters.zones.filter((item) => item !== zone)
        : [...filters.zones, zone],
    })
  }

  const activeCount =
    filters.zones.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.availableOnly ? 1 : 0) +
    (filters.urgentOnly ? 1 : 0)

  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="eyebrow">Filtrar</p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
            Limpiar
          </button>
        )}
      </div>

      <fieldset className="border-b border-line py-6">
        <legend className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
          Zona
        </legend>
        <div className="mt-4 space-y-3">
          {areas.map((area) => (
            <label
              key={area}
              className="flex cursor-pointer items-center gap-3 text-[12px] text-muted transition-colors hover:text-ink"
            >
              <input
                type="checkbox"
                className="check-control"
                checked={filters.zones.includes(area)}
                onChange={() => toggleZone(area)}
              />
              <span>{area}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-b border-line py-6">
        <legend className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
          Valoración
        </legend>
        <div className="mt-4 space-y-3">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 text-[12px] text-muted transition-colors hover:text-ink"
            >
              <input
                type="radio"
                name="rating-filter"
                className="radio-control"
                checked={filters.minRating === option.value}
                onChange={() => onChange({ ...filters, minRating: option.value })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="py-6">
        <legend className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
          Disponibilidad
        </legend>
        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 text-[12px] text-muted transition-colors hover:text-ink">
            <input
              type="checkbox"
              className="check-control"
              checked={filters.availableOnly}
              onChange={(event) =>
                onChange({ ...filters, availableOnly: event.target.checked })
              }
            />
            <span>Disponible esta semana</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-[12px] text-muted transition-colors hover:text-ink">
            <input
              type="checkbox"
              className="check-control"
              checked={filters.urgentOnly}
              onChange={(event) =>
                onChange({ ...filters, urgentOnly: event.target.checked })
              }
            />
            <span>Urgencias 24 h</span>
          </label>
        </div>
      </fieldset>

      <div className="border border-line bg-fog p-4">
        <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-muted">
          {resultCount} {resultCount === 1 ? 'profesional coincide' : 'profesionales coinciden'}{' '}
          con tus filtros.
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          Todos los perfiles han sido verificados por OFICIO antes de publicarse.
        </p>
      </div>
    </div>
  )
}
