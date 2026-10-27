import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  CircleCheck,
  HandCoins,
  Search,
  Star,
  Users,
} from 'lucide-react'
import { JoinDialog } from '@/components/LeadDialogs'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { professionalsBySlug } from '@/data/professionals'
import { usePageMeta } from '@/hooks/usePageMeta'

const benefits = [
  {
    number: '01',
    icon: Search,
    title: 'Visibilidad que importa',
    copy: 'Aparece cuando un propietario o una agencia busca exactamente tu oficio y tu zona. Sin competir contra cientos de anuncios sin criterio.',
  },
  {
    number: '02',
    icon: Users,
    title: 'Clientes cualificados',
    copy: 'Casas, villas y alquileres vacacionales que necesitan un profesional de verdad. Presupuestos con contexto desde el primer mensaje.',
  },
  {
    number: '03',
    icon: HandCoins,
    title: 'Cero comisiones',
    copy: 'Una cuota anual y nada más. El cliente te paga a ti, no a nosotros. Sin porcentajes por trabajo ni leads que se revenden.',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Un perfil que trabaja solo',
    copy: 'Trabajos, reseñas verificadas, zonas, idiomas y disponibilidad. Todo lo que un cliente necesita para decidir y contactarte.',
  },
]

const joinSteps = [
  {
    number: '01',
    title: 'Solicitas tu plaza',
    copy: 'Nos cuentas tu oficio, tu experiencia y la zona que cubres. Sin compromiso y sin pago previo.',
  },
  {
    number: '02',
    title: 'Verificamos tu perfil',
    copy: 'Comprobamos identidad, seguro y referencias reales. Después preparamos juntos las fotos y la descripción.',
  },
  {
    number: '03',
    title: 'Publicamos y empiezas',
    copy: 'Tu perfil sale al directorio y empiezas a recibir consultas directas por WhatsApp, llamada o presupuesto.',
  },
]

const included = [
  'Perfil verificado con hasta 8 trabajos',
  'Reseñas comprobadas de clientes reales',
  'Botón de WhatsApp, llamada y presupuesto',
  'Presencia en búsquedas por oficio y zona',
  'Estadísticas de visitas y consultas',
  'Gestión y respuesta de reseñas',
  'Sin comisiones por trabajo',
  'Sin permanencia ni renovación automática',
]

const faqs = [
  {
    value: 'quien',
    question: '¿Quién puede entrar en el directorio?',
    answer:
      'Profesionales autónomos o pequeñas empresas con experiencia demostrable en fontanería, electricidad, piscinas, jardinería, limpieza o reformas. Trabajamos con gente establecida en Ibiza o con cobertura real en la isla. No aceptamos perfiles sin referencias ni intermediarios que subcontratan sin control.',
  },
  {
    value: 'verificacion',
    question: '¿Qué incluye exactamente la verificación?',
    answer:
      'Comprobamos identidad, número de autónomo o empresa, seguro de responsabilidad civil y al menos dos referencias de clientes o colaboradores. También revisamos que las fotos de los trabajos sean reales. El proceso suele tardar entre 5 y 10 días.',
  },
  {
    value: 'resenas',
    question: '¿Cómo se gestionan las reseñas?',
    answer:
      'Solo publicamos reseñas de clientes que han contratado un servicio a través del perfil o que el profesional puede acreditar. No editamos el texto ni eliminamos valoraciones negativas. Si una reseña incumple las normas, la revisamos contigo y con el cliente.',
  },
  {
    value: 'comisiones',
    question: '¿Hay comisión por cada trabajo?',
    answer:
      'No. Pagas 99 € al año y el cliente te paga directamente a ti. No cobramos porcentaje sobre presupuestos, no intermediamos en el pago y no compartimos tus datos con otros profesionales.',
  },
  {
    value: 'zonas',
    question: '¿Puedo elegir las zonas donde aparezco?',
    answer:
      'Sí. En tu perfil indicas las zonas que cubres realmente y los servicios que ofreces. Cuanto más concreta sea tu cobertura, mejor será la calidad de las consultas que recibas.',
  },
  {
    value: 'permanencia',
    question: '¿Qué pasa si no renuevo?',
    answer:
      'El perfil se mantiene activo durante los 12 meses de la cuota y desaparece del directorio al finalizar, sin penalización. Puedes decidir no renovar cuando quieras; no hay renovación automática ni letra pequeña.',
  },
  {
    value: 'plazas',
    question: '¿Por qué hay plazas limitadas?',
    answer:
      'Porque el directorio solo funciona si hay profesionales suficientes para cubrir la demanda, sin saturar cada oficio y zona. Limitamos el número de perfiles por categoría y zona para que la visibilidad sea real.',
  },
]

export function ForProfessionalsPage() {
  const [joinOpen, setJoinOpen] = useState(false)
  const ana = professionalsBySlug['ana-torres']
  const carlos = professionalsBySlug['carlos-vidal']

  usePageMeta({
    title: 'Para profesionales — Únete al directorio de Ibiza | OFICIO',
    description:
      'Haz que tu oficio llegue a propietarios y agencias de alquiler en Ibiza. 99 € al año, todo incluido, sin comisiones por trabajo. Plazas limitadas.',
  })

  return (
    <>
      <section className="border-b border-line">
        <div className="container-editorial pb-12 pt-6 sm:pt-8 lg:pb-16">
          <nav
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            aria-label="Migas de pan"
          >
            <Link to="/" className="transition-colors hover:text-ink">
              Inicio
            </Link>
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            <span className="text-ink">Para profesionales</span>
          </nav>

          <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7">
              <SectionLabel number="01">Para profesionales</SectionLabel>
              <h1 className="display-xl mt-6 text-balance">
                Tu oficio,
                <br />
                delante de
                <br />
                quien lo
                <br />
                necesita.
              </h1>
              <p className="body-lg mt-7 max-w-[48ch]">
                OFICIO es el directorio curado de profesionales del hogar en Ibiza. Un espacio
                pequeño, exigente y sin comisiones, pensado para que el buen trabajo se encuentre
                con quien lo valora.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="accent" size="lg" onClick={() => setJoinOpen(true)}>
                  Reservar mi plaza
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#precio">Ver qué incluye</a>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3 text-clay-deep" strokeWidth={1.5} />
                  99 € / año
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3 text-clay-deep" strokeWidth={1.5} />
                  Sin comisiones
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3 text-clay-deep" strokeWidth={1.5} />
                  Plazas limitadas
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative mx-auto max-w-[520px] lg:ml-auto lg:max-w-none">
                <div className="image-grain relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src="/images/work-construction.jpg"
                    alt="Profesional revisando planos de una reforma en Ibiza"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 border border-cream/30 bg-ink/25 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                    Plazas 2026 · 38 disponibles
                  </span>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between border border-cream/20 bg-ink/25 p-3 backdrop-blur-sm">
                    <div>
                      <p className="font-display text-[23px] font-medium leading-none tracking-[-0.04em] text-cream">
                        Buen oficio.
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-cream/90">
                        Buena compañía.
                      </p>
                    </div>
                    <BadgeCheck className="h-5 w-5 text-cream/80" strokeWidth={1.4} />
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                  <span>Selección 2026</span>
                  <span>Verificación previa</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-fog">
        <div className="container-editorial grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: '150+', label: 'profesionales verificados' },
            { value: '0%', label: 'comisiones por trabajo' },
            { value: '99 €', label: 'al año, todo incluido' },
          ].map((item) => (
            <div key={item.label} className="py-6 sm:px-6 sm:py-7 lg:px-10">
              <p className="font-display text-[31px] font-medium leading-none tracking-[-0.05em]">
                {item.value}
              </p>
              <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="por-que" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionLabel number="02">Por qué OFICIO</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[10ch] text-balance">
                Menos ruido. Mejores clientes.
              </h2>
              <p className="body-lg mt-6 max-w-[30ch]">
                Un directorio no es una lista. Es la primera impresión que un cliente tiene de tu
                oficio.
              </p>
            </Reveal>

            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:col-span-8">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={benefit.number}
                  delay={index * 70}
                  className="border-t border-line py-7 sm:py-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <benefit.icon className="h-5 w-5 text-clay-deep" strokeWidth={1.4} />
                    <span className="font-mono text-[9px] tracking-[0.13em] text-muted">
                      {benefit.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[25px] font-medium leading-tight tracking-[-0.035em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[12px] leading-[1.7] text-muted">
                    {benefit.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-fog py-20 sm:py-24">
        <div className="container-editorial">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionLabel number="03">Cómo entrar</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[12ch] text-balance">
                Tres pasos. Cero misterio.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-[36ch] body-lg">
                El proceso es sencillo porque conocemos el oficio. Tú haces tu trabajo; nosotros
                hacemos el resto.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {joinSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 80} className="bg-fog p-6 sm:p-8">
                <p className="font-mono text-[10px] tracking-[0.13em] text-clay-deep">
                  {step.number}
                </p>
                <h3 className="mt-10 font-display text-[27px] font-medium leading-tight tracking-[-0.04em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-[12px] leading-[1.7] text-muted">
                  {step.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container-editorial">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel number="04">Ya están dentro</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[12ch] text-balance">
                Los que ya lo viven.
              </h2>
            </div>
            <p className="max-w-[34ch] body-lg">
              Profesionales que llevan temporadas en el directorio y han construido su reputación
              aquí.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[ana, carlos].map((professional, index) => (
              <Reveal
                key={professional.slug}
                delay={index * 100}
                className="grid gap-5 border-t border-line pt-6 sm:grid-cols-[120px_1fr] sm:gap-6"
              >
                <Link
                  to={`/profesional/${professional.slug}`}
                  className="group block aspect-[4/5] overflow-hidden bg-sand sm:aspect-[3/4]"
                >
                  <img
                    src={professional.image}
                    alt={`Retrato de ${professional.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-clay">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-3 w-3 fill-clay text-clay"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-[14px] leading-[1.75] text-muted">
                      {index === 0
                        ? '«Entré en 2022 con un perfil sencillo. Lo que más me ha sorprendido es el tipo de cliente: gente que ya sabe lo que quiere y valora que llegues a tiempo. Las consultas son pocas, pero buenas.»'
                        : '«No tener comisiones cambia la relación. El cliente me paga a mí y yo decido qué presupuesto hacer. OFICIO solo me ha puesto delante de casas que de verdad necesitan un profesional.»'}
                    </blockquote>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
                    <div>
                      <p className="text-[12px] font-medium">{professional.name}</p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                        {professional.specialty}
                      </p>
                    </div>
                    <Link
                      to={`/profesional/${professional.slug}`}
                      className="group/link flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-ink"
                    >
                      Ver perfil
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="precio" className="scroll-mt-24 border-y border-line bg-ink text-background">
        <div className="container-editorial py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionLabel number="05" light>
                Precio
              </SectionLabel>
              <h2 className="display-lg mt-5 max-w-[10ch] text-balance text-cream">
                Una cuota. Todo incluido.
              </h2>
              <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.75] text-background/60 sm:text-[15px]">
                Sin comisiones por trabajo, sin paquetes de leads y sin permanencia. Pagas por estar
                en un directorio que cuida su reputación.
              </p>

              <div className="mt-8 space-y-3 border-t border-background/15 pt-6">
                {[
                  'Presupuesto cerrado antes de solicitar la plaza',
                  'Pago anual, sin renovación automática',
                  'Plazas limitadas por oficio y zona',
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-2.5 text-[12px] leading-relaxed text-background/60"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.8} />
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <div className="border border-background/15 bg-background/[0.04] p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow-dark">Plan Profesional</p>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="font-display text-[80px] font-medium leading-none tracking-[-0.07em] text-cream sm:text-[104px]">
                        99
                      </span>
                      <span className="font-display text-[28px] font-medium text-cream/70">€</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-background/50">
                        / año
                      </span>
                    </p>
                  </div>
                  <span className="border border-clay/50 bg-clay/10 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-clay-soft">
                    Todo incluido
                  </span>
                </div>

                <div className="my-7 h-px bg-background/15" />

                <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12px] leading-relaxed text-background/70"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.8} />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="light"
                  size="lg"
                  className="mt-8 w-full"
                  onClick={() => setJoinOpen(true)}
                >
                  Reservar mi plaza
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
                <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-background/60">
                  Verificación previa · Sin cargo hasta ser aceptado
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionLabel number="06">Preguntas</SectionLabel>
              <h2 className="display-lg mt-5 max-w-[9ch] text-balance">
                Antes de dar el paso.
              </h2>
              <p className="body-lg mt-6 max-w-[28ch]">
                Si te queda algo por resolver, escríbenos. Contestamos personas, no bots.
              </p>
              <a
                href="mailto:profesionales@oficio.ibiza"
                className="link-editorial mt-6 inline-flex text-[10px] text-ink"
              >
                profesionales@oficio.ibiza
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </Reveal>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.value} value={faq.value}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-clay-deep text-cream">
        <div className="container-editorial py-20 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-8">
              <SectionLabel number="07" light>
                Última llamada
              </SectionLabel>
              <h2 className="display-lg mt-5 max-w-[15ch] text-balance text-cream">
                Haz que tu oficio se vea.
              </h2>
              <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.75] text-cream/90 sm:text-[15px]">
                Las plazas se revisan cada temporada para mantener la calidad del directorio. Si tu
                trabajo merece estar aquí, empecemos por una conversación.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-4 lg:justify-self-end">
              <Button variant="light" size="lg" onClick={() => setJoinOpen(true)}>
                Reservar mi plaza
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
              <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-cream/90">
                O escríbenos a profesionales@oficio.ibiza
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </>
  )
}
