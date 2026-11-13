import { useNavigate } from 'react-router-dom'
import { Check, Database, LogOut, ShieldCheck } from 'lucide-react'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabaseClient'

export function AdminSettingsPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <SeoMeta
        title="Ajustes | Administración OFICIO"
        description="Ajustes de la cuenta y configuración del panel de OFICIO Ibiza."
      />

      <div className="mx-auto max-w-[860px]">
        <p className="eyebrow">Configuración</p>
        <h1 className="display-sm mt-3 text-[38px] sm:text-[48px]">Ajustes.</h1>
        <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-muted">
          Información de tu cuenta y del entorno de administración.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="border border-line bg-background p-5 sm:p-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Cuenta</p>
            <p className="mt-5 truncate text-[14px] font-medium">{user?.email}</p>
            <p className="mt-2 text-[11px] text-muted">Sesión activa en el panel de OFICIO.</p>
            <Button variant="outline" className="mt-6 w-full" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Cerrar sesión
            </Button>
          </section>

          <section className="border border-line bg-background p-5 sm:p-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
              Conexión
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isSupabaseConfigured
                    ? 'bg-[#E7EFE5] text-[#3E6847]'
                    : 'bg-clay/[0.08] text-clay-deep'
                }`}
              >
                {isSupabaseConfigured ? (
                  <Check className="h-4 w-4" strokeWidth={1.8} />
                ) : (
                  <Database className="h-4 w-4" strokeWidth={1.5} />
                )}
              </span>
              <div>
                <p className="text-[13px] font-medium">
                  {isSupabaseConfigured ? 'Supabase conectado' : 'Supabase sin configurar'}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Base de datos `professionals` y bucket `professional-images`.
                </p>
              </div>
            </div>
            <p className="mt-6 flex items-start gap-2 text-[10px] leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-deep" strokeWidth={1.5} />
              Las rutas del panel están protegidas por sesión de Supabase Auth.
            </p>
          </section>
        </div>

        <section className="mt-4 border border-line bg-fog p-5 sm:p-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
            Flujo de publicación
          </p>
          <p className="mt-3 max-w-[62ch] text-[12px] leading-[1.75] text-muted">
            Crea o edita una ficha, sube la imagen principal y las imágenes de galería al bucket
            `professional-images`, y guarda los cambios. El panel escribe directamente en
            Supabase y deja los datos listos para conectarlos al directorio público.
          </p>
        </section>
      </div>
    </>
  )
}
