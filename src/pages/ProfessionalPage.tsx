import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileCheck2,
  Languages,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { QuoteDialog } from '@/components/LeadDialogs'
import { StarRating } from '@/components/StarRating'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { categoryBySlug } from '@/data/categories'
import {
  formatDate,
  formatJoined,
  formatRating,
  professionalsBySlug,
  type GalleryItem,
} from '@/data/professionals'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ProfessionalPage() {
  const { slug } = useParams()
  const professional = slug ? professionalsBySlug[slug] : undefined
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null)

  usePageMeta({
    title: professional
      ? `${professional.name} — ${professional.specialty} en Ibiza | OFICIO`
      : 'Profesional no encontrado | OFICIO',
    description: professional?.tagline,
  })

  if (!professional) {
    return (
      <section className="container-editorial flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-md mt-5">Este perfil no existe.</h1>
        <p className="body-lg mt-4 max-w-[40ch]">
          Puede que el enlace haya cambiado o que el profesional ya no forme parte del directorio.
        </p>
        <Button asChild className="mt-8">
          <Link to="/#servicios">Explorar servicios</Link>
        </Button>
      </section>
    )
  }

  const category = categoryBySlug[professional.category]
  const whatsappMessage = encodeURIComponent(
    `Hola ${professional.name}, te escribo desde OFICIO Ibiza. Me gustaría consultarte sobre un servicio de ${category.name.toLowerCase()}.`,
  )
  const today = new Date().getDay()
  const todayName = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][
    today
  ]

  return (
    <>
      <section className="border-b border-line">
        <div className="container-editorial pb-10 pt-6 sm:pt-8 lg:pb-14">
          <nav
            className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            aria-label="Migas de pan"
          >
            <Link to="/" className="transition-colors hover:text-ink">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <Link to={category.path} className="transition-colors hover:text-ink">
              {category.name}
            </Link>
            <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
            <span className="text-ink">{professional.name}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-5">
              <figure className="relative">
                <div className="image-grain relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src={professional.image}
                    alt={`Retrato de ${professional.name}, ${professional.specialty} en Ibiza`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <Badge variant="verified" className="gap-1.5 px-2.5 py-1.5">
                      <BadgeCheck className="h-3 w-3" strokeWidth={2} />
                      Verificado
                    </Badge>
                    <span className="border border-cream/30 bg-ink/25 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-cream backdrop-blur-sm">
                      Miembro desde {formatJoined(professional.joined).split(' de ')[1]}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent p-4 pt-14">
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-cream/70">
                      {professional.location} · Ibiza
                    </p>
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                  <span>{professional.experience} años de oficio</span>
                  <span>Perfil verificado por OFICIO</span>
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={category.path}
                  className="border border-clay/30 bg-clay/[0.08] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-clay-deep transition-colors hover:bg-clay/15"
                >
                  {category.name}
                </Link>
                {professional.availableThisWeek ? (
                  <span className="inline-flex items-center gap-1.5 border border-ink/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6E8556]" />
                    Disponible esta semana
                  </span>
                ) : (
                  <span className="border border-ink/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                    Consultar disponibilidad
                  </span>
                )}
              </div>

              <h1 className="display-lg mt-5 text-balance">{professional.name}</h1>
              <p className="mt-3 font-display text-[24px] font-medium leading-tight tracking-[-0.035em] text-muted sm:text-[28px]">
                {professional.specialty}
              </p>
              <p className="body-lg mt-4 max-w-[48ch]">{professional.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={professional.rating}
                    showValue
                    reviewCount={professional.reviewCount}
                    size={14}
                  />
                </div>
                <span className="h-3 w-px bg-line" aria-hidden="true" />
                <span className="flex items-center gap-1.5 text-[12px] text-muted">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {professional.location}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-muted">
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Responde {professional.responseTime}
                </span>
              </div>

              <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
                <Button asChild variant="accent" size="lg" className="w-full">
                  <a
                    href={`https://wa.me/${professional.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={`tel:${professional.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                    Llamar
                  </a>
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => setQuoteOpen(true)}
                >
                  Solicitar presupuesto
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-display text-[26px] font-medium leading-none tracking-[-0.05em]">
                    {professional.experience}
                  </p>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    años de oficio
                  </p>
                </div>
                <div>
                  <p className="font-display text-[26px] font-medium leading-none tracking-[-0.05em]">
                    {professional.responseRate}
                  </p>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    tasa de respuesta
                  </p>
                </div>
                <div>
                  <p className="font-display text-[26px] font-medium leading-none tracking-[-0.05em]">
                    {professional.priceFrom} €
                  </p>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    desde / visita
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-8">
              <Tabs defaultValue="about">
                <TabsList aria-label="Información del profesional">
                  <TabsTrigger value="about">Sobre mí</TabsTrigger>
                  <TabsTrigger value="work">Trabajos realizados</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                  <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="pt-8 sm:pt-10">
                  <div className="max-w-[66ch]">
                    <p className="eyebrow">Perfil</p>
                    <h2 className="display-sm mt-4 text-balance">
                      Hola, soy {professional.name.split(' ')[0]}.
                    </h2>
                    <div className="mt-6 space-y-5">
                      {professional.bio.map((paragraph) => (
                        <p key={paragraph} className="body-copy">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <p className="eyebrow">En qué puedo ayudarte</p>
                    <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {professional.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center gap-3 border-b border-line/70 pb-3 text-[13px] text-muted"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-clay-deep" strokeWidth={1.8} />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">Zonas que cubre</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {professional.areas.map((area) => (
                          <span
                            key={area}
                            className="border border-ink/15 px-2.5 py-1.5 text-[11px] text-muted"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="eyebrow">Idiomas</p>
                      <p className="mt-3 text-[13px] leading-relaxed text-muted">
                        {professional.languages.join(' · ')}
                      </p>
                      <p className="eyebrow mt-5">Experiencia</p>
                      <p className="mt-3 text-[13px] text-muted">
                        {professional.experience} años trabajando en Ibiza
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border border-line bg-fog p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-start gap-3.5">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-clay-deep" strokeWidth={1.4} />
                      <div>
                        <p className="text-[13px] font-medium">Verificado por OFICIO</p>
                        <p className="mt-1 max-w-[48ch] text-[11px] leading-relaxed text-muted">
                          Identidad, seguro de responsabilidad civil y referencias comprobadas.
                          Revisamos el perfil cada temporada.
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                      Miembro desde {formatJoined(professional.joined)}
                    </span>
                  </div>
                </TabsContent>

                <TabsContent value="work" className="pt-8 sm:pt-10">
                  <div className="max-w-[58ch]">
                    <p className="eyebrow">Trabajos</p>
                    <h2 className="display-sm mt-4">Hecho, no solo dicho.</h2>
                    <p className="body-copy mt-4">
                      Una selección de trabajos recientes en casas y villas de la isla. Toca una
                      imagen para verla con detalle.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {professional.gallery.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(item)}
                        className="group relative block aspect-[4/3] overflow-hidden bg-sand text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep"
                        aria-label={`Ampliar imagen: ${item.caption}, ${item.location}`}
                      >
                        <img
                          src={item.src}
                          alt={`${item.caption} en ${item.location}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1000ms] ease-editorial group-hover:scale-[1.04]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                          <span>
                            <span className="block text-[12px] text-cream">{item.caption}</span>
                            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-cream/80">
                              {item.location}
                            </span>
                          </span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="mt-6 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                    Fotografías aportadas por el profesional. OFICIO comprueba que corresponden a
                    trabajos reales.
                  </p>
                </TabsContent>

                <TabsContent value="reviews" className="pt-8 sm:pt-10">
                  <div className="max-w-[58ch]">
                    <p className="eyebrow">Opiniones</p>
                    <h2 className="display-sm mt-4">Lo que dicen sus clientes.</h2>
                    <p className="body-copy mt-4">
                      Todas las reseñas proceden de clientes con un servicio real. No se editan ni
                      se eliminan por su valoración.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-8 border-y border-line py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
                    <div className="flex items-center gap-5">
                      <div>
                        <p className="font-display text-[58px] font-semibold leading-none tracking-[-0.07em]">
                          {formatRating(professional.rating)}
                        </p>
                        <StarRating rating={professional.rating} className="mt-2" size={13} />
                        <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                          {professional.reviewCount} reseñas
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {professional.reviewBreakdown.map((amount, index) => {
                        const stars = 5 - index
                        const percent = Math.round((amount / professional.reviewCount) * 100)
                        return (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="flex w-8 items-center gap-1 text-[10px] text-muted">
                              {stars}
                              <Star className="h-2.5 w-2.5 fill-clay text-clay" strokeWidth={0} />
                            </span>
                            <span className="h-[3px] flex-1 bg-ink/10">
                              <span
                                className="block h-full bg-clay"
                                style={{ width: `${percent}%` }}
                              />
                            </span>
                            <span className="w-7 text-right font-mono text-[9px] text-muted">
                              {amount}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="divide-y divide-line">
                    {professional.reviews.map((review) => (
                      <article key={review.id} className="py-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand font-mono text-[10px] tracking-[0.08em] text-ink">
                              {review.initials}
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-[13px] font-medium">{review.author}</p>
                                {review.verified && (
                                  <Badge variant="accent" className="gap-1 px-2 py-1">
                                    <FileCheck2 className="h-2.5 w-2.5" strokeWidth={1.8} />
                                    Reseña verificada
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                                {review.service} ·{' '}
                                <time dateTime={review.date}>{formatDate(review.date)}</time>
                              </p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size={12} className="sm:mt-1" />
                        </div>
                        <p className="mt-4 max-w-[68ch] text-[13px] leading-[1.75] text-muted sm:pl-[52px]">
                          {review.text}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p className="pt-5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                    Mostrando {professional.reviews.length} reseñas destacadas de{' '}
                    {professional.reviewCount}
                  </p>
                </TabsContent>

                <TabsContent value="availability" className="pt-8 sm:pt-10">
                  <div className="max-w-[58ch]">
                    <p className="eyebrow">Agenda</p>
                    <h2 className="display-sm mt-4">Cuándo está disponible.</h2>
                    <p className="body-copy mt-4">
                      Horario orientativo para esta temporada. Para urgencias o fechas concretas,
                      lo mejor es escribir directamente.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                    <div className="border border-line">
                      {professional.schedule.map((day) => {
                        const isToday = day.day === todayName
                        return (
                          <div
                            key={day.day}
                            className={`flex items-center justify-between border-b border-line px-4 py-3.5 text-[12px] last:border-b-0 ${
                              isToday ? 'bg-clay/[0.06]' : ''
                            }`}
                          >
                            <span className={`flex items-center gap-2 ${isToday ? 'text-ink' : 'text-muted'}`}>
                              {isToday && <span className="h-1.5 w-1.5 rounded-full bg-clay" />}
                              {day.day}
                              {isToday && (
                                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-clay-deep">
                                  Hoy
                                </span>
                              )}
                            </span>
                            <span
                              className={
                                day.closed ? 'text-muted/60' : 'font-medium text-ink'
                              }
                            >
                              {day.hours}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="space-y-4">
                      <div className="border border-line bg-fog p-5">
                        <CalendarDays className="h-4 w-4 text-clay-deep" strokeWidth={1.4} />
                        <p className="mt-3 text-[13px] font-medium">Reserva con antelación</p>
                        <p className="mt-2 text-[12px] leading-relaxed text-muted">
                          En temporada alta, la agenda se completa con 1–2 semanas de antelación.
                          Para cambios de huéspedes, avisa cuanto antes.
                        </p>
                      </div>
                      {professional.urgent && (
                        <div className="border border-clay/25 bg-clay/[0.06] p-5">
                          <Clock3 className="h-4 w-4 text-clay-deep" strokeWidth={1.4} />
                          <p className="mt-3 text-[13px] font-medium">Urgencias</p>
                          <p className="mt-2 text-[12px] leading-relaxed text-muted">
                            Atiende urgencias fuera de horario. Llama y describe el problema; si no
                            puede acudir, te orientará por teléfono.
                          </p>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setQuoteOpen(true)}
                      >
                        Consultar disponibilidad
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="border border-line bg-fog p-6">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">Contacto directo</p>
                    <BadgeCheck className="h-4 w-4 text-clay-deep" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 font-display text-[23px] font-medium leading-tight tracking-[-0.035em]">
                    Habla con {professional.name.split(' ')[0]}.
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted">
                    Sin intermediarios. Cuéntale qué necesitas y te responderá{' '}
                    {professional.responseTime}.
                  </p>

                  <div className="mt-5 space-y-3 border-y border-line py-5 text-[12px]">
                    <a
                      href={`tel:${professional.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-clay-deep" strokeWidth={1.5} />
                      {professional.phone}
                    </a>
                    <a
                      href={`mailto:${professional.email}`}
                      className="flex items-center gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center font-mono text-[10px] text-clay-deep">
                        @
                      </span>
                      {professional.email}
                    </a>
                    <p className="flex items-center gap-3 text-muted">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-clay-deep" strokeWidth={1.5} />
                      {professional.location} · {professional.areas.length} zonas
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-display text-[25px] font-medium leading-none tracking-[-0.05em]">
                        {professional.responseRate}
                      </p>
                      <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                        responde
                      </p>
                    </div>
                    <div>
                      <p className="font-display text-[25px] font-medium leading-none tracking-[-0.05em]">
                        {professional.responseTime.replace('menos de ', '< ')}
                      </p>
                      <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                        tiempo medio
                      </p>
                    </div>
                  </div>

                  <Button asChild variant="accent" className="mt-5 w-full">
                    <a
                      href={`https://wa.me/${professional.whatsapp}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                      Escribir por WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => setQuoteOpen(true)}
                  >
                    Solicitar presupuesto
                  </Button>

                  <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[11px]">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-muted">
                        <CalendarDays className="h-3.5 w-3.5 text-clay-deep" strokeWidth={1.5} />
                        Miembro desde
                      </dt>
                      <dd className="text-right text-ink">{formatJoined(professional.joined)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-muted">
                        <Languages className="h-3.5 w-3.5 text-clay-deep" strokeWidth={1.5} />
                        Idiomas
                      </dt>
                      <dd className="text-right text-ink">{professional.languages.join(', ')}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex items-center gap-2 text-muted">
                        <Briefcase className="h-3.5 w-3.5 text-clay-deep" strokeWidth={1.5} />
                        Experiencia
                      </dt>
                      <dd className="text-right text-ink">{professional.experience} años</dd>
                    </div>
                  </dl>
                </div>

                <div className="border border-line p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay-deep" strokeWidth={1.5} />
                    <div>
                      <p className="text-[12px] font-medium">Garantía OFICIO</p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                        Si algo no encaja con el perfil, escríbenos. Revisamos cada incidencia y
                        protegemos la confianza del directorio.
                      </p>
                      <a
                        href="mailto:hola@oficio.ibiza"
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-clay-deep"
                      >
                        Contactar con OFICIO
                        <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-ink p-5 text-background">
                  <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-background/50">
                    Zona de cobertura
                  </p>
                  <p className="mt-3 font-display text-[21px] font-medium leading-tight tracking-[-0.03em] text-cream">
                    {professional.areas.slice(0, 3).join(' · ')}
                  </p>
                  <p className="mt-2 text-[11px] text-background/50">
                    + {Math.max(0, professional.areas.length - 3)} zonas más
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <QuoteDialog
        professional={professional}
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
      />

      <Dialog open={Boolean(activeImage)} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="max-w-4xl border-0 bg-ink p-2 text-background [&>button:hover]:text-white [&>button]:text-background/80 sm:p-3">
          {activeImage && (
            <>
              <DialogTitle className="sr-only">{activeImage.caption}</DialogTitle>
              <DialogDescription className="sr-only">
                {activeImage.caption} en {activeImage.location}
              </DialogDescription>
              <img
                src={activeImage.src}
                alt={`${activeImage.caption} en ${activeImage.location}`}
                className="max-h-[76vh] w-full object-contain"
              />
              <div className="flex items-center justify-between gap-4 px-2 py-2">
                <p className="text-[12px] text-cream">{activeImage.caption}</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-background/50">
                  {activeImage.location}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
