import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  number?: string
  className?: string
  light?: boolean
}

export function SectionLabel({ children, number, className, light = false }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn('h-px w-8', light ? 'bg-background/40' : 'bg-clay')}
        aria-hidden="true"
      />
      <span
        className={cn(
          'font-mono text-[10px] uppercase leading-none tracking-label',
          light ? 'text-background/90' : 'text-muted',
        )}
      >
        {number && (
          <span className={cn('mr-2', light ? 'text-background' : 'text-ink')}>{number}</span>
        )}
        {children}
      </span>
    </div>
  )
}
