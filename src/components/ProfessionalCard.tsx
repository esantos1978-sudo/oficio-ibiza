import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Clock3, MapPin } from 'lucide-react'
import { StarRating } from '@/components/StarRating'
import { categoryBySlug } from '@/data/categories'
import type { Professional } from '@/data/professionals'
import { formatRating } from '@/data/professionals'
import { cn } from '@/lib/utils'

interface ProfessionalCardProps {
  professional: Professional
  className?: string
  compact?: boolean
}

export function ProfessionalCard({
  professional,
  className,
  compact = false,
}: ProfessionalCardProps) {
  const category = categoryBySlug[professional.category]

  return (
    <article className={cn('group flex flex-col', className)}>
      <Link
        to={`/profesional/${professional.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-deep"
        aria-label={`Ver el perfil de ${professional.name}, ${professional.specialty}`}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-sand',
            compact ? 'aspect-[4/3]' : 'aspect-[4/5]',
          )}
        >
          <img
            src={professional.image}
            alt={`Retrato de ${professional.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.035]"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <span className="inline-flex items-center gap-1.5 border border-background/25 bg-background/90 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
              <Check className="h-3 w-3 text-clay-deep" strokeWidth={2} />
              Verificado
            </span>
            {professional.availableThisWeek && (
              <span className="inline-flex items-center gap-1.5 bg-ink/75 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-background backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A8C28B]" />
                Disponible
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/55 to-transparent px-4 pb-4 pt-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-cream/85">
              Ver perfil
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-clay-deep">
              {category.name}
            </span>
            <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.11em] text-muted">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {professional.location}
            </span>
          </div>

          <h3 className="mt-2.5 font-display text-[26px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[29px]">
            {professional.name}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
            {professional.specialty}
          </p>

          <div className="mt-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <StarRating rating={professional.rating} showValue size={12} />
              <span className="text-[11px] text-muted">
                {professional.reviewCount} reseñas
              </span>
            </div>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
              Desde {professional.priceFrom} €
            </span>
          </div>

          {!compact && (
            <p className="mt-3 line-clamp-2 text-[12px] leading-[1.65] text-muted">
              {professional.tagline}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <Clock3 className="h-3 w-3" strokeWidth={1.5} />
          Responde {professional.responseTime}
        </span>
        <Link
          to={`/profesional/${professional.slug}`}
          className="group/link flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink transition-colors hover:text-clay-deep"
        >
          Ver perfil
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <span className="sr-only">Valoración {formatRating(professional.rating)} sobre 5</span>
    </article>
  )
}
