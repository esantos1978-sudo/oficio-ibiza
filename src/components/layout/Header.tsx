import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'

const mainNav = [
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Selección', to: '/#destacados' },
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Para profesionales', to: '/profesionales' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <div className="hidden border-b border-line md:block">
        <div className="container-editorial flex h-[34px] items-center justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
          <span>Ibiza · 38.9° N — 1.4° E</span>
          <span className="hidden lg:block">Servicios del hogar, seleccionados uno a uno</span>
          <span className="text-ink">Temporada 2026</span>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-500',
          scrolled ? 'border-line shadow-[0_1px_0_rgba(26,26,26,0.03)]' : 'border-transparent',
        )}
      >
        <div className="container-editorial flex h-[70px] items-center justify-between gap-6 lg:h-[78px]">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="link-editorial text-[11px] font-medium uppercase tracking-[0.1em] text-ink/75 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/#buscar"
              className="hidden items-center gap-2 border border-ink/20 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors hover:border-ink hover:bg-ink hover:text-background sm:inline-flex"
            >
              Buscar profesional
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>

            <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-ink lg:hidden"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </DialogTrigger>
              <DialogContent
                hideClose
                className="inset-0 left-0 top-0 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto border-0 bg-background p-0 sm:p-0"
              >
                <div className="flex min-h-[100dvh] flex-col">
                  <DialogTitle className="sr-only">Menú de navegación</DialogTitle>
                  <DialogDescription className="sr-only">
                    Enlaces a servicios, profesionales y páginas de OFICIO Ibiza.
                  </DialogDescription>
                  <div className="flex h-[70px] items-center justify-between border-b border-line px-5 sm:px-8">
                    <Logo />
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-ink"
                        aria-label="Cerrar menú"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </DialogClose>
                  </div>

                  <div className="flex-1 px-5 py-10 sm:px-8 sm:py-14">
                    <p className="eyebrow mb-6">Navegación</p>
                    <nav className="flex flex-col" aria-label="Navegación móvil">
                      {mainNav.map((item, index) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center justify-between border-b border-line py-5 transition-colors hover:text-clay-deep"
                        >
                          <span className="font-display text-[30px] font-medium leading-none tracking-[-0.04em] sm:text-[38px]">
                            {item.label}
                          </span>
                          <span className="font-mono text-[9px] tracking-label text-muted">
                            0{index + 1}
                          </span>
                        </Link>
                      ))}
                    </nav>

                    <p className="eyebrow mb-5 mt-12">Servicios</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          to={category.path}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between border-b border-line/70 py-2.5 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          {category.name}
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-line bg-fog px-5 py-6 sm:px-8">
                    <Button asChild variant="default" size="lg" className="w-full">
                      <Link to="/#buscar" onClick={() => setMenuOpen(false)}>
                        Buscar un profesional
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                    </Button>
                    <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                      <a href="mailto:hola@oficio.ibiza" className="hover:text-ink">
                        hola@oficio.ibiza
                      </a>
                      <span>Ibiza, España</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
    </>
  )
}
