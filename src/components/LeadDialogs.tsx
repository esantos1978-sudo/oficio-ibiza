import { useEffect, useState } from 'react'
import { Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { categories, categoryBySlug } from '@/data/categories'
import { areas } from '@/data/professionals'
import type { Professional } from '@/data/professionals'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay-deep'

const labelClass = 'font-mono text-[9px] uppercase tracking-[0.14em] text-muted'

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  )
}

interface QuoteDialogProps {
  professional: Professional
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuoteDialog({ professional, open, onOpenChange }: QuoteDialogProps) {
  const [sent, setSent] = useState(false)
  const category = categoryBySlug[professional.category]

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setSent(false), 300)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        {sent ? (
          <div className="py-8 text-center" role="status">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay-deep">
              <Check className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <DialogTitle className="mt-6 text-[34px]">Solicitud enviada</DialogTitle>
            <p className="mx-auto mt-3 max-w-[38ch] text-[14px] leading-relaxed text-muted">
              {professional.name} suele responder {professional.responseTime}. Recibirás una
              respuesta con disponibilidad y un presupuesto orientativo.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
              <Button asChild variant="accent">
                <a
                  href={`https://wa.me/${professional.whatsapp}?text=${encodeURIComponent(
                    `Hola ${professional.name}, acabo de enviar una solicitud de presupuesto a través de OFICIO.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="eyebrow">Solicitud directa</p>
              <DialogTitle>Solicitar presupuesto</DialogTitle>
              <DialogDescription>
                Cuéntale a {professional.name} qué necesitas. Recibirás una respuesta{' '}
                {professional.responseTime} y sin compromiso.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre" htmlFor="quote-name">
                  <input
                    id="quote-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </Field>
                <Field label="Teléfono o email" htmlFor="quote-contact">
                  <input
                    id="quote-contact"
                    name="contact"
                    required
                    autoComplete="tel"
                    placeholder="Cómo contactarte"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Servicio" htmlFor="quote-service">
                <select id="quote-service" name="service" className={inputClass} defaultValue={category.services[0]}>
                  {category.services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                  <option value="Otro">Otro / no estoy seguro</option>
                </select>
              </Field>

              <Field label="¿Qué necesitas?" htmlFor="quote-message">
                <textarea
                  id="quote-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Describe el trabajo, la zona y cuándo te vendría bien."
                  className={cn(inputClass, 'resize-none')}
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-muted">
                <input type="checkbox" required className="check-control mt-0.5" />
                <span>
                  Acepto que OFICIO comparta estos datos con el profesional para responder a mi
                  solicitud.
                </span>
              </label>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Enviar solicitud
              </Button>
              <p className="text-center font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                Sin comisiones · Respuesta directa del profesional
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface JoinDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinDialog({ open, onOpenChange }: JoinDialogProps) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setSent(false), 300)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        {sent ? (
          <div className="py-8 text-center" role="status">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay-deep">
              <Check className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <DialogTitle className="mt-6 text-[34px]">Solicitud recibida</DialogTitle>
            <p className="mx-auto mt-3 max-w-[38ch] text-[14px] leading-relaxed text-muted">
              Revisaremos tu perfil y te escribiremos en menos de 48 horas para concretar la
              verificación. No se ha realizado ningún cargo.
            </p>
            <Button
              variant="outline"
              className="mt-7"
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="eyebrow">Plazas 2026</p>
              <DialogTitle>Reservar mi plaza</DialogTitle>
              <DialogDescription>
                99 € al año, todo incluido. Cuéntanos un poco sobre tu oficio y te explicamos el
                proceso de verificación.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre" htmlFor="join-name">
                  <input
                    id="join-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Nombre y apellidos"
                    className={inputClass}
                  />
                </Field>
                <Field label="Teléfono" htmlFor="join-phone">
                  <input
                    id="join-phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="+34"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Oficio" htmlFor="join-trade">
                  <select id="join-trade" name="trade" className={inputClass}>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Zona principal" htmlFor="join-zone">
                  <select id="join-zone" name="zone" className={inputClass}>
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Email" htmlFor="join-email">
                <input
                  id="join-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Cuéntanos algo más" htmlFor="join-message">
                <textarea
                  id="join-message"
                  name="message"
                  rows={3}
                  placeholder="Años de experiencia, especialidad, web o Instagram."
                  className={cn(inputClass, 'resize-none')}
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-muted">
                <input type="checkbox" required className="check-control mt-0.5" />
                <span>
                  He leído la información sobre el directorio y acepto que OFICIO me contacte para
                  valorar mi candidatura.
                </span>
              </label>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Reservar mi plaza
              </Button>
              <p className="text-center font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                Sin permanencia · Verificación previa
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
