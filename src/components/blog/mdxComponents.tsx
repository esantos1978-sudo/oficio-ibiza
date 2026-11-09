import type { MDXComponents } from 'mdx/types'
import { ArrowUpRight } from 'lucide-react'

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')

    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <ArrowUpRight
            className="ml-1 inline h-3 w-3 align-baseline"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </a>
    )
  },
  img: ({ alt, ...props }) => (
    <img
      alt={alt ?? ''}
      loading="lazy"
      className="my-8 w-full rounded-lg"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  ),
}
