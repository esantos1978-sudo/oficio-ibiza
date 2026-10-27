import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap border font-mono text-[9px] uppercase leading-none tracking-[0.12em]',
  {
    variants: {
      variant: {
        default: 'border-ink/15 bg-transparent px-2.5 py-1.5 text-ink',
        accent: 'border-clay/30 bg-clay/[0.08] px-2.5 py-1.5 text-clay-deep',
        solid: 'border-ink bg-ink px-2.5 py-1.5 text-background',
        light: 'border-background/25 bg-background/10 px-2.5 py-1.5 text-background backdrop-blur-sm',
        verified:
          'border-clay/25 bg-background/90 px-2 py-1 text-clay-deep backdrop-blur-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
