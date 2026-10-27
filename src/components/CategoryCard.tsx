import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CategoryIcon } from '@/components/CategoryIcon'
import type { Category } from '@/data/categories'
import { getCategoryProfessionalCount } from '@/data/professionals'
import { cn } from '@/lib/utils'

export function CategoryCard({
  category,
  index = 0,
  className,
}: {
  category: Category
  index?: number
  className?: string
}) {
  const count = getCategoryProfessionalCount(category.slug)

  return (
    <Link
      to={category.path}
      className={cn(
        'group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-deep',
        className,
      )}
      aria-label={`Ver profesionales de ${category.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={category.image}
          alt={`Servicio de ${category.name.toLowerCase()} en Ibiza`}
          loading={index < 3 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-ink/10 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center border border-cream/30 bg-ink/20 text-cream backdrop-blur-sm">
          <CategoryIcon name={category.icon} className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.12em] text-cream/75">
          {category.number}
        </span>

        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-[25px] font-medium leading-none tracking-[-0.035em] text-cream sm:text-[28px]">
                {category.name}
              </h3>
              <p className="mt-2 max-w-[26ch] text-[11px] leading-relaxed text-cream/85">
                {category.description}
              </p>
            </div>
            <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-500 ease-editorial group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line py-3.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
          {count} {count === 1 ? 'profesional' : 'profesionales'}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-ink transition-colors group-hover:text-clay-deep">
          Ver servicio
        </span>
      </div>
    </Link>
  )
}
