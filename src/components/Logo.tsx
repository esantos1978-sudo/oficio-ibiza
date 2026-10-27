import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  light?: boolean
  to?: string
}

export function Logo({ className, light = false, to = '/' }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-end gap-2 leading-none transition-opacity hover:opacity-70',
        className,
      )}
      aria-label="OFICIO Ibiza — Inicio"
    >
      <span
        className={cn(
          'font-display text-[23px] font-bold leading-none tracking-[-0.075em]',
          light ? 'text-background' : 'text-ink',
        )}
      >
        OFICIO
      </span>
      <span
        className={cn(
          'mb-[2px] font-mono text-[8px] uppercase leading-none tracking-[0.22em]',
          light ? 'text-background/60' : 'text-muted',
        )}
      >
        Ibiza
      </span>
    </Link>
  )
}
