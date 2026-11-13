import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Users,
} from 'lucide-react'
import { AdminToast, type AdminToastState } from '@/components/admin/AdminToast'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProfessionals } from '@/hooks/useProfessionals'
import { supabase } from '@/lib/supabaseClient'
import type { AdminProfessional } from '@/lib/professionalsAdmin'

interface AdminProfessionalsPageProps {
  mode?: 'dashboard' | 'list'
}

function ProfessionalAvatar({ professional }: { professional: AdminProfessional }) {
  return professional.image ? (
    <img
      src={professional.image}
      alt=""
      className="h-11 w-11 shrink-0 rounded-lg object-cover"
      loading="lazy"
    />
  ) : (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand font-mono text-[10px] text-muted">
      {professional.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function AdminProfessionalsPage({
  mode = 'dashboard',
}: AdminProfessionalsPageProps) {
  const { professionals, loading, error, reload } = useProfessionals()
  const location = useLocation()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<AdminToastState | null>(null)

  useEffect(() => {
    const state = location.state as { toast?: string } | null
    if (state?.toast) {
      setToast({ type: 'success', message: state.toast })
    }
  }, [location.state])

  const verifiedCount = professionals.filter((professional) => professional.verified).length
  const pendingCount = professionals.length - verifiedCount
  const categoryCount = new Set(
    professionals.map((professional) => professional.category).filter(Boolean),
  ).size

  async function handleDelete(professional: AdminProfessional) {
    const confirmed = window.confirm(
      `¿Eliminar a ${professional.name}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    setDeletingId(professional.id)
    const { error: deleteError } = await supabase
      .from('professionals')
      .delete()
      .eq('id', professional.id)
    setDeletingId(null)

    if (deleteError) {
      setToast({ type: 'error', message: deleteError.message })
      return
    }

    await reload()
    setToast({ type: 'success', message: `${professional.name} eliminado correctamente.` })
  }

  return (
    <>
      <SeoMeta
        title={
          mode === 'dashboard'
            ? 'Dashboard | Administración OFICIO'
            : 'Profesionales | Administración OFICIO'
        }
        description="Panel de administración de profesionales de OFICIO Ibiza."
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{mode === 'dashboard' ? 'Dashboard' : 'Directorio'}</p>
          <h1 className="display-sm mt-3 text-[38px] sm:text-[48px]">
            {mode === 'dashboard' ? 'Resumen.' : 'Profesionales.'}
          </h1>
          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-muted">
            {mode === 'dashboard'
              ? 'Una vista rápida del directorio y sus fichas publicadas.'
              : 'Gestiona las fichas, imágenes y datos de los profesionales del directorio.'}
          </p>
        </div>

        <Button asChild variant="accent" size="lg" className="shrink-0">
          <Link to="/admin/profesionales/nuevo">
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Añadir nuevo
          </Link>
        </Button>
      </div>

      {mode === 'dashboard' && (
        <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {[
            { label: 'Profesionales', value: professionals.length, icon: Users },
            { label: 'Verificados', value: verifiedCount, icon: BadgeCheck },
            { label: 'Pendientes', value: pendingCount, icon: RefreshCw },
            { label: 'Categorías', value: categoryCount, icon: ArrowUpRight },
          ].map((stat) => (
            <div key={stat.label} className="bg-background p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <stat.icon className="h-4 w-4 text-clay-deep" strokeWidth={1.5} />
                <span className="font-display text-[34px] font-medium leading-none tracking-[-0.055em] sm:text-[42px]">
                  {String(stat.value).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
            {loading ? 'Cargando' : `${professionals.length} fichas`}
          </p>
          {mode === 'dashboard' && professionals.length > 0 && (
            <Link
              to="/admin/profesionales"
              className="link-editorial text-[9px] text-ink"
            >
              Ver todas
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="border border-line">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex animate-pulse items-center gap-4 border-b border-line p-4 last:border-b-0">
                <div className="h-11 w-11 rounded-lg bg-sand" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-40 bg-sand" />
                  <div className="h-2.5 w-28 bg-sand" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="border border-clay/25 bg-clay/[0.05] p-6">
            <p className="text-[13px] text-clay-deep">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => void reload()}>
              Reintentar
            </Button>
          </div>
        ) : professionals.length === 0 ? (
          <div className="border border-line bg-fog px-6 py-16 text-center">
            <p className="display-sm text-[34px]">Todavía no hay fichas.</p>
            <p className="mx-auto mt-3 max-w-[40ch] text-[13px] leading-relaxed text-muted">
              Añade el primer profesional para empezar a construir el directorio.
            </p>
            <Button asChild variant="accent" className="mt-7">
              <Link to="/admin/profesionales/nuevo">
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                Añadir profesional
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto border border-line md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-line bg-fog">
                    {['Profesional', 'Categoría', 'Zona', 'Estado', 'Acciones'].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-4 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-muted"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {professionals.map((professional) => (
                    <tr
                      key={professional.id}
                      className="border-b border-line last:border-b-0"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <ProfessionalAvatar professional={professional} />
                          <div>
                            <p className="text-[12px] font-medium">{professional.name}</p>
                            <p className="mt-0.5 font-mono text-[8px] text-muted">
                              /{professional.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[12px] text-muted">
                        {professional.category}
                      </td>
                      <td className="px-4 py-3.5 text-[12px] text-muted">
                        {professional.location}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={professional.verified ? 'accent' : 'default'}>
                          {professional.verified ? 'Verificado' : 'Pendiente'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/profesionales/${professional.id}/editar`}
                            className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:bg-fog hover:text-ink"
                            aria-label={`Editar ${professional.name}`}
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void handleDelete(professional)}
                            disabled={deletingId === professional.id}
                            className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:bg-clay/[0.06] hover:text-clay-deep disabled:opacity-40"
                            aria-label={`Eliminar ${professional.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {professionals.map((professional) => (
                <article key={professional.id} className="border border-line bg-background p-4">
                  <div className="flex items-start gap-3">
                    <ProfessionalAvatar professional={professional} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{professional.name}</p>
                      <p className="mt-1 text-[11px] text-muted">{professional.category}</p>
                      <p className="mt-1 text-[11px] text-muted">{professional.location}</p>
                    </div>
                    <Badge variant={professional.verified ? 'accent' : 'default'}>
                      {professional.verified ? 'Verificado' : 'Pendiente'}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                    <Link
                      to={`/admin/profesionales/${professional.id}/editar`}
                      className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleDelete(professional)}
                      disabled={deletingId === professional.id}
                      className="font-mono text-[9px] uppercase tracking-[0.1em] text-clay-deep disabled:opacity-40"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
