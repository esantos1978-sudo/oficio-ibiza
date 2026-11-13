import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Profesionales', to: '/admin/profesionales', icon: Users, end: false },
  { label: 'Ajustes', to: '/admin/ajustes', icon: Settings, end: false },
]

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-background/10 bg-ink text-background lg:flex">
        <div className="border-b border-background/10 px-6 py-7">
          <Logo light />
          <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-background/40">
            Panel de administración
          </p>
        </div>

        <nav className="flex-1 px-3 py-6" aria-label="Navegación del panel">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-3 text-[12px] transition-colors',
                      isActive
                        ? 'bg-background/10 text-background'
                        : 'text-background/55 hover:bg-background/[0.06] hover:text-background',
                    )
                  }
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-background/10 p-4">
          <p className="truncate px-2 text-[11px] text-background/60">{user?.email}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 flex w-full items-center gap-3 px-2 py-2 text-[11px] text-background/50 transition-colors hover:text-background"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            Cerrar sesión
          </button>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex w-full items-center gap-2 px-2 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-background/35 transition-colors hover:text-background/70"
          >
            Ver web
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-line bg-background/95 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-5 lg:h-[72px] lg:px-10">
            <div className="lg:hidden">
              <Logo />
            </div>
            <p className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-muted lg:block">
              OFICIO / Administración
            </p>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink sm:flex"
              >
                Ver web
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
              </a>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink lg:hidden"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <nav
            className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-4 py-2 lg:hidden"
            aria-label="Navegación del panel móvil"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] transition-colors',
                    isActive ? 'bg-ink text-background' : 'text-muted hover:text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
