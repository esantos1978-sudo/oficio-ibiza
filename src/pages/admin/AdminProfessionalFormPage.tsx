import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
  Upload,
} from 'lucide-react'
import { SeoMeta } from '@/components/seo/SeoMeta'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { uploadProfessionalImage } from '@/lib/professionalStorage'
import {
  categoryOptions,
  emptyProfessional,
  locationOptions,
  normalizeProfessional,
  slugify,
  type ProfessionalFormValues,
} from '@/lib/professionalsAdmin'
import { cn } from '@/lib/utils'

const inputClass =
  'h-11 w-full border border-ink/15 bg-background px-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep aria-[invalid=true]:border-clay-deep'
const labelClass = 'font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-ink'
const errorClass = 'mt-1.5 text-[11px] leading-relaxed text-clay-deep'

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-clay-deep">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={errorClass}>
          {error}
        </p>
      )}
    </div>
  )
}

export function AdminProfessionalFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [form, setForm] = useState<ProfessionalFormValues>(emptyProfessional)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [slugTouched, setSlugTouched] = useState(isEditing)

  useEffect(() => {
    if (id) return

    setForm(emptyProfessional)
    setErrors({})
    setSubmitError('')
    setUploadError('')
    setSlugTouched(false)
    setLoading(false)
  }, [id])

  useEffect(() => {
    if (!id) return

    let active = true
    setLoading(true)
    supabase
      .from('professionals')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error || !data) {
          setSubmitError(error?.message ?? 'No se ha encontrado el profesional.')
          setLoading(false)
          return
        }

        const normalized = normalizeProfessional(data as Record<string, unknown>)
        const { id: _id, created_at: _createdAt, ...values } = normalized
        setForm(values)
        setSlugTouched(true)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  function updateField<K extends keyof ProfessionalFormValues>(
    key: K,
    value: ProfessionalFormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: slugTouched ? current.slug : slugify(value),
    }))
    setErrors((current) => {
      const next = { ...current }
      delete next.name
      if (!slugTouched) delete next.slug
      return next
    })
  }

  function validate() {
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'El nombre es obligatorio.'
    if (!form.slug.trim()) {
      nextErrors.slug = 'El slug es obligatorio.'
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      nextErrors.slug = 'Usa solo minúsculas, números y guiones.'
    }
    if (!form.category) nextErrors.category = 'Selecciona una categoría.'
    if (!form.specialty.trim()) nextErrors.specialty = 'La especialidad es obligatoria.'
    if (!form.location) nextErrors.location = 'Selecciona una zona.'
    if (!form.phone.trim()) nextErrors.phone = 'El teléfono es obligatorio.'
    if (!form.description.trim()) nextErrors.description = 'La descripción es obligatoria.'
    if (!form.response_time.trim()) nextErrors.response_time = 'Indica el tiempo de respuesta.'
    if (!form.image.trim()) nextErrors.image = 'Sube una imagen principal.'
    if (Number.isNaN(form.rating) || form.rating < 0 || form.rating > 5) {
      nextErrors.rating = 'La valoración debe estar entre 0 y 5.'
    }
    if (!Number.isInteger(form.review_count) || form.review_count < 0) {
      nextErrors.review_count = 'Usa un número entero igual o mayor que 0.'
    }
    if (Number.isNaN(form.price_from) || form.price_from < 0) {
      nextErrors.price_from = 'El precio no puede ser negativo.'
    }
    return nextErrors
  }

  async function handleMainUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const file = input.files?.[0]
    if (!file) return

    setUploadingMain(true)
    setUploadError('')
    try {
      const url = await uploadProfessionalImage(file, form.slug || form.name || 'profesional')
      updateField('image', url)
    } catch (uploadFailure) {
      setUploadError(
        uploadFailure instanceof Error ? uploadFailure.message : 'No se pudo subir la imagen.',
      )
    } finally {
      setUploadingMain(false)
      input.value = ''
    }
  }

  async function handleGalleryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const files = Array.from(input.files ?? [])
    if (files.length === 0) return

    setUploadingGallery(true)
    setUploadError('')
    try {
      const urls: string[] = []
      for (const file of files) {
        urls.push(
          await uploadProfessionalImage(file, form.slug || form.name || 'profesional'),
        )
      }
      updateField('gallery', [...form.gallery, ...urls].slice(0, 12))
    } catch (uploadFailure) {
      setUploadError(
        uploadFailure instanceof Error ? uploadFailure.message : 'No se pudieron subir las imágenes.',
      )
    } finally {
      setUploadingGallery(false)
      input.value = ''
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const first = Object.keys(nextErrors)[0]
      window.setTimeout(() => document.getElementById(`field-${first}`)?.focus(), 40)
      return
    }

    setSaving(true)
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category,
      specialty: form.specialty.trim(),
      location: form.location,
      rating: Number(form.rating),
      review_count: Number(form.review_count),
      price_from: Number(form.price_from),
      phone: form.phone.trim(),
      description: form.description.trim(),
      response_time: form.response_time.trim(),
      verified: form.verified,
      image: form.image.trim(),
      gallery: form.gallery,
    }

    const query = isEditing
      ? supabase.from('professionals').update(payload).eq('id', id)
      : supabase.from('professionals').insert(payload)
    const { error } = await query
    setSaving(false)

    if (error) {
      setSubmitError(error.message)
      return
    }

    navigate('/admin/profesionales', {
      state: {
        toast: isEditing
          ? 'Profesional actualizado correctamente.'
          : 'Profesional creado correctamente.',
      },
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-5 w-5 animate-spin text-clay-deep" strokeWidth={1.5} />
          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
            Cargando ficha
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoMeta
        title={`${isEditing ? 'Editar' : 'Nuevo'} profesional | Administración OFICIO`}
        description="Formulario de gestión de profesionales de OFICIO Ibiza."
      />

      <div className="mx-auto max-w-[920px]">
        <Link
          to="/admin/profesionales"
          className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
          Volver a profesionales
        </Link>

        <div className="mt-6">
          <p className="eyebrow">{isEditing ? 'Editar ficha' : 'Nueva ficha'}</p>
          <h1 className="display-sm mt-3 text-[38px] sm:text-[48px]">
            {isEditing ? 'Editar profesional.' : 'Añadir profesional.'}
          </h1>
          <p className="mt-3 max-w-[54ch] text-[13px] leading-relaxed text-muted">
            Completa los datos de la ficha. La imagen se sube a Supabase Storage y se guarda su URL
            pública.
          </p>
        </div>

        {submitError && (
          <p
            role="alert"
            className="mt-6 border border-clay/25 bg-clay/[0.05] px-4 py-3 text-[12px] leading-relaxed text-clay-deep"
          >
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-10">
          <section className="border border-line bg-background p-5 sm:p-7">
            <div className="border-b border-line pb-4">
              <p className="eyebrow">01 · Datos principales</p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="field-name" label="Nombre" required error={errors.name} className="sm:col-span-2">
                <input
                  id="field-name"
                  value={form.name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  placeholder="Nombre completo o empresa"
                  required
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'field-name-error' : undefined}
                />
              </Field>

              <Field id="field-slug" label="Slug" required error={errors.slug}>
                <div className="mt-2 flex">
                  <input
                    id="field-slug"
                    value={form.slug}
                    onChange={(event) => {
                      setSlugTouched(true)
                      updateField(
                        'slug',
                        event.target.value.toLowerCase().replace(/\s+/g, '-'),
                      )
                    }}
                    placeholder="nombre-del-profesional"
                    required
                    className={cn(inputClass, 'rounded-r-none')}
                    aria-invalid={Boolean(errors.slug)}
                    aria-describedby={errors.slug ? 'field-slug-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSlugTouched(false)
                      updateField('slug', slugify(form.name))
                    }}
                    className="shrink-0 border border-l-0 border-ink/15 px-3 font-mono text-[8px] uppercase tracking-[0.08em] text-muted transition-colors hover:bg-fog hover:text-ink"
                  >
                    Generar
                  </button>
                </div>
              </Field>

              <Field id="field-category" label="Categoría" required error={errors.category}>
                <select
                  id="field-category"
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value)}
                  required
                  className={cn(inputClass, 'mt-2 cursor-pointer')}
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? 'field-category-error' : undefined}
                >
                  <option value="">Selecciona una categoría</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="field-specialty" label="Especialidad" required error={errors.specialty}>
                <input
                  id="field-specialty"
                  value={form.specialty}
                  onChange={(event) => updateField('specialty', event.target.value)}
                  placeholder="Ej: Reformas integrales y microcemento"
                  required
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.specialty)}
                  aria-describedby={errors.specialty ? 'field-specialty-error' : undefined}
                />
              </Field>

              <Field id="field-location" label="Zona principal" required error={errors.location}>
                <select
                  id="field-location"
                  value={form.location}
                  onChange={(event) => updateField('location', event.target.value)}
                  required
                  className={cn(inputClass, 'mt-2 cursor-pointer')}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'field-location-error' : undefined}
                >
                  <option value="">Selecciona una zona</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="field-response-time" label="Tiempo de respuesta" required error={errors.response_time}>
                <input
                  id="field-response-time"
                  value={form.response_time}
                  onChange={(event) => updateField('response_time', event.target.value)}
                  placeholder="Ej: menos de 24 horas"
                  required
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.response_time)}
                  aria-describedby={errors.response_time ? 'field-response-time-error' : undefined}
                />
              </Field>

              <Field id="field-phone" label="Teléfono" required error={errors.phone}>
                <input
                  id="field-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="+34 600 000 000"
                  required
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'field-phone-error' : undefined}
                />
              </Field>

              <Field id="field-rating" label="Valoración" error={errors.rating}>
                <input
                  id="field-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(event) => updateField('rating', Number(event.target.value))}
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.rating)}
                  aria-describedby={errors.rating ? 'field-rating-error' : undefined}
                />
              </Field>

              <Field id="field-review-count" label="Número de reseñas" error={errors.review_count}>
                <input
                  id="field-review-count"
                  type="number"
                  min="0"
                  step="1"
                  value={form.review_count}
                  onChange={(event) => updateField('review_count', Number(event.target.value))}
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.review_count)}
                  aria-describedby={errors.review_count ? 'field-review-count-error' : undefined}
                />
              </Field>

              <Field id="field-price-from" label="Precio desde (€)" error={errors.price_from}>
                <input
                  id="field-price-from"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price_from}
                  onChange={(event) => updateField('price_from', Number(event.target.value))}
                  className={cn(inputClass, 'mt-2')}
                  aria-invalid={Boolean(errors.price_from)}
                  aria-describedby={errors.price_from ? 'field-price-from-error' : undefined}
                />
              </Field>

              <Field id="field-description" label="Descripción" required error={errors.description} className="sm:col-span-2">
                <textarea
                  id="field-description"
                  rows={5}
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Describe la experiencia, los servicios y el valor diferencial del profesional."
                  required
                  className={cn(inputClass, 'mt-2 h-auto resize-y py-3')}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'field-description-error' : undefined}
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-muted sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.verified}
                  onChange={(event) => updateField('verified', event.target.checked)}
                  className="check-control mt-0.5"
                />
                <span>Perfil verificado por OFICIO</span>
              </label>
            </div>
          </section>

          <section className="border border-line bg-background p-5 sm:p-7">
            <div className="border-b border-line pb-4">
              <p className="eyebrow">02 · Imágenes</p>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
                  Imagen principal <span className="text-clay-deep">*</span>
                </p>
                <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-lg border border-line bg-fog">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Vista previa de la imagen principal"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
                      <ImagePlus className="h-6 w-6" strokeWidth={1.3} />
                      <span className="font-mono text-[8px] uppercase tracking-[0.1em]">
                        Sin imagen
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 border border-ink/20 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-clay-deep">
                    <input
                      id="field-image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleMainUpload}
                      disabled={uploadingMain}
                      aria-describedby={errors.image ? 'field-image-error' : undefined}
                    />
                    {uploadingMain ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                    ) : (
                      <Upload className="h-3.5 w-3.5" strokeWidth={1.5} />
                    )}
                    {uploadingMain ? 'Subiendo...' : 'Subir imagen'}
                  </label>
                  {form.image && (
                    <button
                      type="button"
                      onClick={() => updateField('image', '')}
                      className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-clay-deep"
                    >
                      Quitar
                    </button>
                  )}
                </div>
                {errors.image && <p id="field-image-error" className={errorClass}>{errors.image}</p>}
                <p className="mt-3 text-[10px] leading-relaxed text-muted">
                  JPG, PNG o WebP. Máximo 6 MB. Se sube a Supabase Storage.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
                    Galería
                  </p>
                  <span className="font-mono text-[8px] text-muted">{form.gallery.length}/12</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {form.gallery.map((url, index) => (
                    <div key={`${url}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg bg-sand">
                      <img src={url} alt={`Imagen de galería ${index + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          updateField(
                            'gallery',
                            form.gallery.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/75 text-cream opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        aria-label={`Eliminar imagen ${index + 1} de la galería`}
                      >
                        <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                  {form.gallery.length < 12 && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 border border-dashed border-ink/20 text-muted transition-colors hover:border-ink hover:text-ink focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-clay-deep">
                      <input
                        id="field-gallery"
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={handleGalleryUpload}
                        disabled={uploadingGallery}
                      />
                      {uploadingGallery ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      )}
                      <span className="font-mono text-[7px] uppercase tracking-[0.08em]">
                        {uploadingGallery ? 'Subiendo' : 'Añadir'}
                      </span>
                    </label>
                  )}
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-muted">
                  Puedes seleccionar varias imágenes. Se guardan en el array `gallery`.
                </p>
                {uploadError && <p className={errorClass}>{uploadError}</p>}
              </div>
            </div>
          </section>

          <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-2 border border-line bg-background/95 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="ghost">
              <Link to="/admin/profesionales">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={saving || uploadingMain || uploadingGallery}
              className="w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" strokeWidth={1.5} />
                  {isEditing ? 'Guardar cambios' : 'Crear profesional'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
