import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep',
  {
    variants: {
      variant: {
        default:
          'bg-ink text-background hover:bg-clay-deep active:translate-y-px',
        accent:
          'bg-clay-deep text-white hover:bg-[#8f3b21] active:translate-y-px',
        outline:
          'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-background',
        ghost:
          'bg-transparent text-ink hover:bg-ink/[0.055]',
        light:
          'bg-background text-ink hover:bg-cream focus-visible:outline-background',
        'outline-light':
          'border border-background/30 bg-transparent text-background hover:border-background hover:bg-background hover:text-ink focus-visible:outline-background',
        link:
          'h-auto px-0 text-ink hover:text-clay-deep',
      },
      size: {
        sm: 'h-9 px-4 text-[10px]',
        default: 'h-11 px-5',
        lg: 'h-[52px] px-7',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
