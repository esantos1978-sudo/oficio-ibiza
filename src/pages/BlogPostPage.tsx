import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
} from 'lucide-react'
import { mdxComponents } from '@/components/blog/mdxComponents'
import { JsonLd } from '@/components/seo/JsonLd'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBlogPost } from '@/generated/blog'
import { blogImageUrl, formatBlogDate } from '@/lib/blog'
import { SITE_URL } from '@/lib/schemas/professionalSchema'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) {
    return (
      <>
        <SeoMeta
          title="Artículo no encontrado | Blog OFICIO"
          description="El artículo que buscas no existe o ha cambiado de dirección."
        />
        <section className="container-editorial flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="display-md mt-5">Este artículo no existe.</h1>
          <p className="body-lg mt-4 max-w-[40ch]">
            Puede que el enlace haya cambiado o que el artículo ya no esté disponible.
          </p>
          <Button asChild className="mt-8">
            <Link to="/blog">Volver al blog</Link>
          </Button>
        </section>
      </>
    )
  }

  const Post = post.Component
  const postUrl = `${SITE_URL}/blog/${post.slug}`
  const postImage = blogImageUrl(post.image, 1800)

  const articleSchema = {
    '@type': 'BlogPosting',
    '@id': postUrl,
    headline: post.title,
    description: post.description,
    image: postImage,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es-ES',
    articleSection: post.category,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OFICIO Ibiza',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
  }

  return (
    <>
      <SeoMeta
        title={`${post.title} | Blog OFICIO`}
        description={post.description}
        image={postImage}
        url={postUrl}
        type="article"
      />
      <JsonLd data={articleSchema} />

      <article>
        <header className="border-b border-line">
          <div className="container-editorial pb-10 pt-6 sm:pt-8 lg:pb-14">
            <nav
              className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
              aria-label="Migas de pan"
            >
              <Link to="/" className="transition-colors hover:text-ink">
                Inicio
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog" className="transition-colors hover:text-ink">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{post.category}</span>
            </nav>

            <div className="mt-8 max-w-[1000px]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{post.category}</Badge>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  <CalendarDays className="h-3 w-3" strokeWidth={1.5} />
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                </span>
                <span className="h-3 w-px bg-line" aria-hidden="true" />
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  <Clock3 className="h-3 w-3" strokeWidth={1.5} />
                  {post.readingTime} min de lectura
                </span>
              </div>

              <h1 className="display-lg mt-5 max-w-[20ch] text-balance">{post.title}</h1>
              <p className="body-lg mt-6 max-w-[62ch]">{post.description}</p>
              <div className="mt-5 flex items-center gap-2 text-[12px] text-muted">
                <UserRound className="h-3.5 w-3.5" strokeWidth={1.5} />
                Por {post.author}
              </div>
            </div>

            <div className="mt-10 aspect-[16/9] max-h-[560px] overflow-hidden rounded-lg bg-sand">
              <img
                src={postImage}
                alt={post.title}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="py-14 sm:py-16 lg:py-20">
          <div className="container-editorial">
            <div className="mx-auto max-w-[760px]">
              <div className="prose-oficio">
                <MDXProvider components={mdxComponents}>
                  <Post />
                </MDXProvider>
              </div>

              <footer className="mt-14 border-t border-line pt-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand font-mono text-[9px] uppercase tracking-[0.08em] text-ink">
                      OF
                    </span>
                    <div>
                      <p className="text-[12px] font-medium">{post.author}</p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.11em] text-muted">
                        Publicado el {formatBlogDate(post.date)}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Volver al blog
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </footer>

              <div className="mt-12 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  ¿Quieres aparecer en OFICIO?
                </p>
                <Link to="/profesionales" className="link-editorial text-[10px] text-ink">
                  Únete al directorio
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
