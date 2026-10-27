import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = window.setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-[12px] uppercase tracking-wider text-background transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <ScrollManager />
      <Header />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
