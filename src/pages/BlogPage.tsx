import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/JsonLd'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { SectionLabel } from '@/components/SectionLabel'
import { blogPosts } from '@/generated/blog'
import { blogImageUrl, formatBlogDate, type BlogPost } from '@/lib/blog'
import { SITE_URL } from '@/lib/schemas/professionalSchema'

const upcomingTopics = [
  {
    number: '01',
    title: 'Los mejores profesionales por zona',
    copy: 'Una guía para encontrar el oficio adecuado en cada rincón de la isla.',
  },
  {
    number: '02',
    title: 'Precios reales en Ibiza',
    copy: 'Qué esperar, qué preguntar y cómo leer un presupuesto sin sorpresas.',
  },
  {
    number: '03',
    title: 'Mantenimiento de tu casa',
    copy: 'Rutinas sencillas para cuidar una vivienda o un alquiler vacacional.',
  },
]

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link
        to={`/blog/${post.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-deep"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-sand">
          <img
            src={blogImageUrl(post.image, 1200)}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.035]"
          />
        </div>
        <div className="pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
            <span className="text-clay-deep">{post.category}</span>
            <span>{post.readingTime} min de lectura</span>
          </div>
          <h3 className="mt-3 font-display text-[27px] font-medium leading-[1.05] tracking-[-0.04em]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.7] text-muted">
            {post.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-[11px] text-muted">{formatBlogDate(post.date)}</span>
            <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink">
              Leer
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export function BlogPage() {
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0]
  const rest = blogPosts.filter((post) => post.slug !== featured?.slug)

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Diario OFICIO',
    url: `${SITE_URL}/blog`,
    description:
      'Historias, guías y consejos sobre profesionales del hogar, viviendas y vida en Ibiza.',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  }

  return (
    <>
      <SeoMeta
        title="Diario OFICIO — Historias y guías de la casa en Ibiza"
        description="Historias, guías y consejos sobre profesionales del hogar, mantenimiento, reformas y vida en Ibiza. El blog de OFICIO."
        image={featured ? blogImageUrl(featured.image, 1600) : '/images/og.jpg'}
        url={`${SITE_URL}/blog`}
        type="website"
      />
      <JsonLd data={blogSchema} />

      <section className="border-b border-line">
        <div className="container-editorial pb-12 pt-6 sm:pt-8 lg:pb-16">
          <nav
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            aria-label="Migas de pan"
          >
            <Link to="/" className="transition-colors hover:text-ink">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Blog</span>
          </nav>

          <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <SectionLabel number="01">Diario OFICIO</SectionLabel>
              <h1 className="display-xl mt-5 max-w-[11ch] text-balance">
                Historias, guías y oficio.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-[34ch] text-[14px] leading-[1.75] text-muted">
                Una mirada más pausada a las casas de Ibiza: cómo cuidarlas, quién las cuida y
                qué hace que un oficio dure.
              </p>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                {String(blogPosts.length).padStart(2, '0')}{' '}
                {blogPosts.length === 1 ? 'artículo publicado' : 'artículos publicados'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-editorial">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
              <Link
                to={`/blog/${featured.slug}`}
                className="group relative lg:col-span-7"
                aria-label={`Leer ${featured.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-sand">
                  <img
                    src={blogImageUrl(featured.image, 1800)}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
                  />
                  <Badge variant="verified" className="absolute left-4 top-4 px-2.5 py-1.5">
                    Destacado
                  </Badge>
                </div>
              </Link>

              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                  <span className="text-clay-deep">{featured.category}</span>
                  <span className="h-3 w-px bg-line" aria-hidden="true" />
                  <span>{formatBlogDate(featured.date)}</span>
                  <span className="h-3 w-px bg-line" aria-hidden="true" />
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3 w-3" strokeWidth={1.5} />
                    {featured.readingTime} min
                  </span>
                </div>

                <h2 className="display-md mt-5 max-w-[15ch] text-balance">
                  <Link to={`/blog/${featured.slug}`} className="transition-colors hover:text-clay-deep">
                    {featured.title}
                  </Link>
                </h2>
                <p className="body-lg mt-5 max-w-[46ch]">{featured.description}</p>
                <div className="mt-6 flex items-center gap-2 text-[11px] text-muted">
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Por {featured.author}
                </div>
                <Button asChild variant="outline" size="lg" className="mt-8">
                  <Link to={`/blog/${featured.slug}`}>
                    Leer artículo
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="container-editorial py-20">
          <p className="body-lg">Todavía no hay artículos publicados.</p>
        </section>
      )}

      {rest.length > 0 && (
        <section className="border-t border-line bg-fog py-16 sm:py-20">
          <div className="container-editorial">
            <SectionLabel number="02">Archivo</SectionLabel>
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionLabel>En preparación</SectionLabel>
              <h2 className="display-md mt-5 max-w-[10ch] text-balance">
                Lo que viene.
              </h2>
              <p className="body-lg mt-5 max-w-[30ch]">
                Contenido útil, sin ruido. Lo que nos gustaría saber antes de contratar un oficio
                en Ibiza.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
                {upcomingTopics.map((topic) => (
                  <div key={topic.number} className="bg-background p-5 sm:p-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-clay-deep">
                      {topic.number}
                    </span>
                    <h3 className="mt-5 font-display text-[23px] font-medium leading-tight tracking-[-0.035em]">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-[1.7] text-muted">{topic.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
