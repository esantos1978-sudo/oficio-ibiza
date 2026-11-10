import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Professional } from '@/data/professionals'
import {
  formatRating,
  formatResponseTime,
} from '@/data/professionals'
import { cn } from '@/lib/utils'

interface ServiceProfessionalCardProps {
  professional: Professional
  className?: string
}

export function ServiceProfessionalCard({
  professional,
  className,
}: ServiceProfessionalCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hola ${professional.name}, te escribo desde OFICIO Ibiza. Necesito un servicio de ${professional.specialty.toLowerCase()}.`,
  )

  const coverage =
    professional.areas.length >= 5
      ? 'Cubre toda la isla'
      : `Cubre ${professional.areas.slice(0, 2).join(' y ')}`

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-line bg-background transition-colors duration-500 hover:border-ink/30',
        className,
      )}
    >
      <div className="relative h-40 max-h-40 overflow-hidden bg-sand">
        <img
          src={professional.image}
          alt={`${professional.name} — ${professional.specialty}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
          <span className="inline-flex items-center gap-1.5 border border-[#CADAC5] bg-[#F3F8F0]/95 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#3E6847] backdrop-blur-sm">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#DDEBD8]">
              <Check className="h-2 w-2" strokeWidth={2.5} />
            </span>
            Verificado
          </span>
          {professional.availableThisWeek && (
            <span className="inline-flex items-center gap-1.5 border border-cream/20 bg-ink/75 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cream backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7C98C]" />
              Disponible
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="font-display text-[27px] font-medium leading-[1.02] tracking-[-0.045em]">
            {professional.name}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
            {professional.specialty}
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-clay-deep" strokeWidth={1.5} />
            <span>
              {professional.location}
              <span className="mx-1.5 text-ink/25">·</span>
              {coverage}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-3 text-[10px] text-muted">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Star className="h-3 w-3 fill-clay text-clay" strokeWidth={0} />
            <span className="font-medium text-ink">
              {formatRating(professional.rating)}
            </span>
            <span>({professional.reviewCount} reseñas)</span>
          </span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Clock3 className="h-3 w-3" strokeWidth={1.5} />
            Responde {formatResponseTime(professional.responseTime)}
          </span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <span className="whitespace-nowrap">
            Desde <span className="font-medium text-ink">{professional.priceFrom} €/h</span>
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Button asChild size="default" className="w-full">
            <Link to={`/profesional/${professional.slug}`}>
              Ver perfil completo
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="default" className="w-full">
            <a
              href={`https://wa.me/${professional.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              Contactar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}
