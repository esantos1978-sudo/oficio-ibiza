import { Link } from 'react-router-dom'
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { categories } from '@/data/categories'

const footerNav = [
  {
    title: 'Servicios',
    links: categories.map((category) => ({
      label: category.name,
      to: category.path,
    })),
  },
  {
    title: 'OFICIO',
    links: [
      { label: 'Cómo funciona', to: '/#como-funciona' },
      { label: 'Profesionales destacados', to: '/#destacados' },
      { label: 'Para profesionales', to: '/profesionales' },
      { label: 'Preguntas frecuentes', to: '/profesionales#faq' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-ink/15 bg-fog">
      <div className="container-editorial pt-14 sm:pt-20">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-12 md:gap-8 lg:pb-20">
          <div className="md:col-span-5 lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[32ch] text-[14px] leading-[1.7] text-muted">
              El directorio curado de profesionales del hogar en Ibiza. Gente que conoce la isla y
              hace las cosas bien.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              <a
                href="mailto:hola@oficio.ibiza"
                className="link-editorial text-[10px] text-ink"
              >
                <Mail className="h-3 w-3" strokeWidth={1.5} />
                hola@oficio.ibiza
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="link-editorial text-[10px] text-ink"
              >
                <Instagram className="h-3 w-3" strokeWidth={1.5} />
                @oficio.ibiza
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="md:col-span-2 lg:col-span-2">
              <p className="eyebrow mb-5">{group.title}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13px] text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3 lg:col-span-3">
            <p className="eyebrow mb-5">Contacto</p>
            <ul className="space-y-4 text-[13px] text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.5} />
                <span>
                  Ibiza, Islas Baleares
                  <br />
                  España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.5} />
                <a href="tel:+34971000000" className="hover:text-ink">
                  +34 971 00 00 00
                </a>
              </li>
              <li>
                <Link
                  to="/profesionales"
                  className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[11px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-clay hover:text-clay-deep"
                >
                  Únete al directorio
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 OFICIO Ibiza. Todos los derechos reservados.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="mailto:privacidad@oficio.ibiza" className="hover:text-ink">
              Privacidad
            </a>
            <a href="mailto:legal@oficio.ibiza" className="hover:text-ink">
              Aviso legal
            </a>
            <span>Fotografía: Unsplash</span>
          </span>
        </div>

        <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <p className="-mb-[0.18em] translate-y-[0.04em] font-display text-[24.5vw] font-semibold leading-[0.72] tracking-[-0.08em] text-ink/[0.08]">
            OFICIO
          </p>
        </div>
      </div>
    </footer>
  )
}
