import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CircleCheck,
  Clock3,
  HandCoins,
  ShieldCheck,
} from 'lucide-react'
import { CategoryCard } from '@/components/CategoryCard'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Reveal } from '@/components/Reveal'
import { SearchBar } from '@/components/SearchBar'
import { SectionLabel } from '@/components/SectionLabel'
import { StarRating } from '@/components/StarRating'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/categories'
import { featuredProfessionals } from '@/data/professionals'
import { usePageMeta } from '@/hooks/usePageMeta'

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Verificados en persona',
    copy: 'Identidad, seguro y referencias comprobadas.',
  },
  {
    icon: BadgeCheck,
    title: 'Oficio contrastado',
    copy: 'Solo aceptamos profesionales con trayectoria real.',
  },
  {
    icon: HandCoins,
    title: 'Sin comisiones ocultas',
    copy: 'Contactas directo. El presupuesto es entre tú y él.',
  },
]

const stats = [
  { value: '+150', label: 'profesionales verificados' },
  { value: '+2.000', label: 'clientes satisfechos' },
  { value: '4,9/5', label: 'valoración media' },
  { value: '48 h', label: 'tiempo medio de respuesta' },
]

const steps = [
  {
    number: '01',
    title: 'Elige el oficio y la zona',
    copy: 'Dinos qué necesitas y dónde está la casa. Filtramos por especialidad y cobertura real.',
  },
  {
    number: '02',
    title: 'Compara con criterio',
    copy: 'Perfiles verificados con trabajos reales, reseñas de clientes y disponibilidad actualizada.',
  },
  {
    number: '03',
    title: 'Contacta sin intermediarios',
    copy: 'Habla directamente con el profesional. Sin comisiones por trabajo ni presupuestos a ciegas.',
  },
]

export function HomePage() {
  usePageMeta({
    title: 'OFICIO — Los mejores profesionales de Ibiza, en un solo lugar',
    description:
      'Directorio curado de fontaneros, electricistas, jardineros, piscinas, limpieza y reformas en Ibiza. Profesionales verificados y sin comisiones.',
  })

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-8 sm:pt-12 lg:pb-20 lg:pt-14">
        <div className="container-editorial">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10 xl:gap-x-16">
            <div className="lg:col-span-7">
              <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
                <SectionLabel number="01">Directorio curado · Ibiza</SectionLabel>
              </div>

              <h1
                className="display-xl mt-7 animate-fade-up text-balance sm:mt-9"
                style={{ animationDelay: '160ms' }}
              >
                Los mejores
                <br />
                profesionales
                <br />
                de <span className="text-clay-deep">Ibiza</span>, en
                <br />
                un solo lugar.
              </h1>

              <div
                className="mt-8 flex flex-col gap-6 animate-fade-up sm:mt-10 md:flex-row md:items-end md:justify-between"
                style={{ animationDelay: '280ms' }}
              >
                <p className="max-w-[44ch] text-[15px] leading-[1.7] text-muted sm:text-[16px]">
                  Fontaneros, electricistas, jardineros y más. Profesionales de confianza para tu
                  casa o alquiler vacacional, seleccionados uno a uno.
                </p>
                <Link
                  to="/#servicios"
                  className="group inline-flex shrink-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
                >
                  Explorar servicios
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} />
                  </span>
                </Link>
              </div>
            </div>

            <div
              className="animate-fade-in lg:col-span-5"
              style={{ animationDelay: '180ms' }}
            >
              <figure className="relative mx-auto max-w-[560px] lg:ml-auto lg:max-w-none">
                <div className="image-grain relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src="/images/hero-pool.jpg"
                    alt="Piscina de piedra y jardín mediterráneo en una casa de Ibiza"
                    className="h-full w-full animate-scale-in object-cover object-[50%_58%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 border border-cream/30 bg-ink/20 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                    Santa Gertrudis · 39.0° N
                  </span>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between sm:inset-x-5 sm:bottom-5">
                    <p className="max-w-[24ch] font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-cream/85">
                      Casas que se cuidan todo el año
                    </p>
                    <span className="border border-cream/25 bg-cream/10 px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cream backdrop-blur-sm">
                      2026
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 hidden w-[192px] border border-line bg-background p-4 shadow-[0_20px_50px_-30px_rgba(26,26,26,0.3)] sm:block lg:-left-10">
                  <div className="flex items-end gap-1">
                    <span className="font-display text-[36px] font-semibold leading-none tracking-[-0.06em]">
                      4,9
                    </span>
                    <span className="mb-0.5 font-mono text-[9px] text-muted">/ 5</span>
                  </div>
                  <StarRating rating={4.9} className="mt-2" size={11} />
                  <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    Valoración media
                    <br />
                    de la comunidad
                  </p>
                </div>
              </figure>
            </div>
          </div>

          <div
            id="buscar"
            className="mt-12 scroll-mt-28 animate-fade-up sm:mt-16"
            style={{ animationDelay: '380ms' }}
          >
            <SearchBar />
            <div className="mt-3 flex flex-col gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>Búsqueda gratuita. Sin intermediarios.</span>
              <span>Más de 150 profesionales en toda la isla</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Compromisos de OFICIO" className="border-y border-line bg-fog">
        <div className="container-editorial grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex gap-4 py-6 sm:px-6 sm:py-7 lg:px-10">
              <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-clay-deep" strokeWidth={1.4} />
              <div>
                <p className="text-[12px] font-medium">{point.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{point.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="servicios" className="scroll-mt-24 py-20 sm:py-24 lg:py-32">
        <div className="container-editorial">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionLabel number="02">Servicios</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[13ch] text-balance">
                Todo lo que tu casa necesita.
              </h2>
            </Reveal>
            <Reveal delay={100} className="max-w-[36ch] md:pb-1">
              <p className="body-lg">
                Seis oficios, un mismo estándar: gente que conoce la isla, responde y hace las
                cosas bien. Sin sorpresas.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 3) * 90}>
                <CategoryCard category={category} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="destacados"
        className="scroll-mt-24 border-y border-line bg-fog py-20 sm:py-24 lg:py-28"
      >
        <div className="container-editorial">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionLabel number="03">Selección</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[12ch] text-balance">
                Profesionales destacados.
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:pb-1">
              <p className="max-w-[34ch] body-lg">
                Una pequeña selección de los oficios mejor valorados de la isla. Cada perfil está
                verificado y actualizado.
              </p>
              <Link
                to="/#servicios"
                className="link-editorial mt-5 inline-flex text-[10px] text-ink"
              >
                Ver todos los servicios
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-6">
            {featuredProfessionals.map((professional, index) => (
              <Reveal key={professional.slug} delay={index * 80}>
                <ProfessionalCard professional={professional} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionLabel number="04">Cómo funciona</SectionLabel>
              <h2 className="display-md mt-5 max-w-[10ch] text-balance">
                Menos ruido. Mejor oficio.
              </h2>
              <p className="body-lg mt-6 max-w-[30ch]">
                Un directorio pequeño, cuidado y sin intermediarios. Así de simple.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              {steps.map((step, index) => (
                <Reveal
                  key={step.number}
                  delay={index * 80}
                  className="grid grid-cols-[42px_1fr] gap-5 border-t border-line py-7 sm:grid-cols-[70px_1fr_1fr] sm:gap-8 sm:py-8"
                >
                  <span className="font-mono text-[10px] tracking-[0.14em] text-clay-deep">
                    {step.number}
                  </span>
                  <h3 className="font-display text-[23px] font-medium leading-tight tracking-[-0.035em] sm:text-[26px]">
                    {step.title}
                  </h3>
                  <p className="col-start-2 max-w-[42ch] text-[13px] leading-[1.7] text-muted sm:col-start-3">
                    {step.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-background">
        <div className="container-editorial py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink/20 sm:aspect-[16/10] lg:aspect-[4/5]">
                <img
                  src="/images/work-villa.jpg"
                  alt="Villa mediterránea con piscina en Ibiza"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-[25px] font-medium leading-tight tracking-[-0.035em] text-cream">
                    «La casa perfecta no se improvisa.»
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-cream/80">
                    La forma de trabajar de OFICIO
                  </p>
                </div>
              </div>
              <div className="absolute -right-3 -top-3 hidden border border-background/20 bg-ink px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-background/60 lg:block">
                Desde 2016
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel number="05" light>
                  La diferencia OFICIO
                </SectionLabel>
                <h2 className="display-lg mt-5 max-w-[15ch] text-balance text-cream">
                  La confianza también se elige.
                </h2>
                <p className="mt-6 max-w-[48ch] text-[14px] leading-[1.75] text-background/60 sm:text-[15px]">
                  No listamos a cualquiera. Verificamos identidad, seguro y referencias, y
                  revisamos cada perfil antes de publicarlo. Después, el tiempo y las reseñas hacen
                  el resto.
                </p>
              </Reveal>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-background/15 pt-8 sm:mt-12">
                {stats.map((stat, index) => (
                  <Reveal key={stat.label} delay={index * 70}>
                    <p className="font-display text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tracking-[-0.06em] text-cream">
                      {stat.value}
                    </p>
                    <p className="mt-2 max-w-[18ch] font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-background/50">
                      {stat.label}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={140} className="mt-10 border-t border-background/15 pt-6">
                <blockquote className="max-w-[47ch] text-[14px] leading-[1.75] text-background/75">
                  «Encontré un fontanero en Santa Eulalia el mismo día. El perfil era claro, el
                  presupuesto también. Es la primera vez que no tengo que preguntar en tres grupos
                  de WhatsApp.»
                </blockquote>
                <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.13em] text-background/60">
                  Maja K. · Propietaria en Roca Llisa
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-clay-deep text-cream">
        <div className="container-editorial py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionLabel number="06" light>
                Para profesionales
              </SectionLabel>
              <h2 className="display-lg mt-5 max-w-[14ch] text-balance text-cream">
                ¿Eres profesional? Únete al directorio.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[14px] leading-[1.75] text-cream/90 sm:text-[15px]">
                Tu oficio delante de quien lo necesita. Visibilidad local, clientes cualificados y
                cero comisiones por trabajo. Solo profesionales que hacen las cosas bien.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="light" size="lg">
                  <Link to="/profesionales">
                    Reservar mi plaza
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </Button>
                <Button asChild variant="outline-light" size="lg">
                  <Link to="/profesionales#precio">Ver qué incluye</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[8px] uppercase tracking-[0.13em] text-cream/90">
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3" strokeWidth={1.5} />
                  99 € / año
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3" strokeWidth={1.5} />
                  Sin comisiones
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3" strokeWidth={1.5} />
                  Plazas limitadas
                </span>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-5">
              <figure className="relative ml-auto max-w-[420px]">
                <div className="image-grain aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/work-tools.jpg"
                    alt="Herramientas de un profesional del hogar"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between border border-cream/25 bg-ink/20 p-3 backdrop-blur-sm">
                  <span className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-cream/90">
                    Buen oficio.
                    <br />
                    Buena compañía.
                  </span>
                  <span className="font-mono text-[8px] text-cream/80">EST. 2016</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-editorial">
          <div className="grid items-center gap-8 border-y border-line py-10 md:grid-cols-[1fr_auto] md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 text-clay-deep" strokeWidth={1.4} />
                <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                  Respuesta media en menos de 48 h
                </span>
              </div>
              <span className="hidden h-4 w-px bg-line md:block" />
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-clay-deep" strokeWidth={1.4} />
                <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                  Profesionales con seguro en vigor
                </span>
              </div>
            </div>
            <Link to="/#buscar" className="link-editorial text-[10px] text-ink">
              Encontrar a mi profesional
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
