import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  size?: number
  className?: string
  showValue?: boolean
  reviewCount?: number
}

export function StarRating({
  rating,
  size = 12,
  className,
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  const percentage = Math.max(0, Math.min(100, (rating / 5) * 100))

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative inline-flex shrink-0" aria-hidden="true">
        <span className="flex gap-[2px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={`outline-${index}`}
              width={size}
              height={size}
              strokeWidth={1.4}
              className="text-ink/30"
            />
          ))}
        </span>
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <span className="flex gap-[2px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`fill-${index}`}
                width={size}
                height={size}
                strokeWidth={0}
                className="shrink-0 fill-clay text-clay"
              />
            ))}
          </span>
        </span>
      </span>
      {showValue && (
        <span className="text-[12px] font-medium tabular-nums text-ink">
          {rating.toFixed(1).replace('.', ',')}
        </span>
      )}
      {typeof reviewCount === 'number' && (
        <span className="text-[11px] tabular-nums text-muted">({reviewCount})</span>
      )}
      <span className="sr-only">
        {rating.toFixed(1).replace('.', ',')} de 5 estrellas
        {typeof reviewCount === 'number' ? `, ${reviewCount} reseñas` : ''}
      </span>
    </span>
  )
}
