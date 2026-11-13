import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabaseClient'

interface LoginLocationState {
  from?: string
}

export function LoginPage() {
  const { session, loading, signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as LoginLocationState | null)?.from
  const redirectTo = from?.startsWith('/admin') ? from : '/admin'

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-5 w-5 animate-spin text-clay-deep" strokeWidth={1.5} />
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            Comprobando sesión
          </p>
        </div>
      </div>
    )
  }

  if (session) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Introduce tu email y contraseña.')
      return
    }

    setSubmitting(true)
    const result = await signIn(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <>
      <SeoMeta
        title="Acceso al panel | OFICIO Ibiza"
        description="Acceso privado al panel de administración de OFICIO Ibiza."
        type="website"
      />

      <main className="grid min-h-screen bg-background lg:grid-cols-[0.85fr_1.15fr]">
        <section className="relative hidden overflow-hidden bg-ink p-10 text-background lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div>
            <Logo light />
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-background/40">
              Panel de administración
            </p>
          </div>

          <div className="max-w-[420px]">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-clay">
              Acceso reservado
            </p>
            <p className="display-lg mt-5 text-cream">
              El oficio,
              <br />
              bien cuidado.
            </p>
            <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.75] text-background/55">
              Gestiona profesionales, imágenes y datos del directorio desde un único lugar.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-background/15 pt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-background/35">
            <span>Ibiza · 38.9° N</span>
            <span>OFICIO © 2026</span>
          </div>
        </section>

        <section className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-5 lg:hidden">
            <Logo />
            <Link
              to="/"
              className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted"
            >
              Volver a la web
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
            <div className="w-full max-w-[400px]">
              <p className="eyebrow">Área privada</p>
              <h1 className="display-sm mt-4 text-[34px] sm:text-[42px]">Entrar.</h1>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Accede con tu cuenta de OFICIO para gestionar el directorio.
              </p>

              {!isSupabaseConfigured && (
                <p
                  className="mt-6 border border-clay/25 bg-clay/[0.06] px-4 py-3 text-[12px] leading-relaxed text-clay-deep"
                  role="alert"
                >
                  Supabase no está configurado. Revisa las variables de entorno del proyecto.
                </p>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink"
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@email.com"
                    className="mt-2 h-11 w-full border border-ink/15 bg-background px-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep"
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink"
                  >
                    Contraseña
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      className="h-11 w-full border border-ink/15 bg-background px-3.5 pr-11 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-ink"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                      ) : (
                        <Eye className="h-4 w-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="border border-clay/25 bg-clay/[0.06] px-4 py-3 text-[12px] leading-relaxed text-clay-deep"
                  >
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="mt-8 border-t border-line pt-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
                  Volver a OFICIO
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
