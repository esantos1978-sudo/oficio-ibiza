import * as React from 'react'
import { cn } from '@/lib/utils'

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  delay?: number
  as?: React.ElementType
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = 'div',
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  )
}
