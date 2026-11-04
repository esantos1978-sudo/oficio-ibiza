import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  LoaderCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

// Cambiar por el número real de OFICIO. Solo dígitos, con prefijo de país.
const OFICIO_WHATSAPP_NUMBER = "34620638448";

const steps = [
  {
    title: "Sobre ti",
    description: "Cuéntanos quién eres y qué oficio hay detrás de tu trabajo.",
  },
  {
    title: "Tu trabajo",
    description: "Define cómo trabajas, dónde y en qué condiciones.",
  },
  {
    title: "Contacto",
    description:
      "Así podremos verificar tus datos y ponernos en contacto contigo.",
  },
];

const experienceOptions = ["1-3", "4-7", "8-15", "15+"];
const languageOptions = ["Español", "Inglés", "Alemán", "Francés", "Catalán"];
const zoneOptions = [
  "Ibiza Town",
  "Santa Eulalia",
  "San Antonio",
  "San José",
  "Santa Gertrudis",
  "San Juan",
  "Toda la isla",
];
const categoryOptions = categories.map((category) => category.name);

type FormData = {
  fullName: string;
  category: string;
  specialty: string;
  experience: string;
  languages: string[];
  zone: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  verificationConsent: boolean;
  marketingConsent: boolean;
};

type FormErrors = Record<string, string>;

const initialForm: FormData = {
  fullName: "",
  category: "",
  specialty: "",
  experience: "",
  languages: [],
  zone: "",
  bio: "",
  phone: "",
  whatsapp: "",
  email: "",
  verificationConsent: false,
  marketingConsent: false,
};

const inputClass =
  "h-11 w-full border border-ink/15 bg-background px-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep aria-[invalid=true]:border-clay-deep";
const labelClass =
  "font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-ink";
const errorClass = "mt-1.5 text-[11px] leading-relaxed text-clay-deep";

function fieldId(key: string) {
  const ids: Record<string, string> = {
    fullName: "signup-full-name",
    category: "signup-category",
    specialty: "signup-specialty",
    zone: "signup-zone",
    phone: "signup-phone",
    email: "signup-email",
    verificationConsent: "signup-verification-consent",
  };
  return ids[key];
}

export function ProfessionalSignupForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const mountedRef = useRef(false);
  const submitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (submitted) successHeadingRef.current?.focus();
  }, [submitted]);

  useEffect(
    () => () => {
      if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    },
    [],
  );

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function toggleLanguage(language: string) {
    updateField(
      "languages",
      form.languages.includes(language)
        ? form.languages.filter((item) => item !== language)
        : [...form.languages, language],
    );
  }

  function validateStep(currentStep: number) {
    const nextErrors: FormErrors = {};

    if (currentStep === 0) {
      if (!form.fullName.trim()) {
        nextErrors.fullName = "Escribe tu nombre completo o el de tu empresa.";
      }
      if (!form.category) {
        nextErrors.category = "Selecciona una categoría principal.";
      }
      if (!form.specialty.trim()) {
        nextErrors.specialty = "Indica tu especialidad concreta.";
      }
    }

    if (currentStep === 1) {
      if (!form.zone) {
        nextErrors.zone = "Selecciona tu zona principal de trabajo.";
      }
    }

    if (currentStep === 2) {
      if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 6) {
        nextErrors.phone = "Introduce un teléfono de contacto válido.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Introduce un email válido.";
      }
      if (!form.verificationConsent) {
        nextErrors.verificationConsent =
          "Debes aceptar la verificación para enviar tu solicitud.";
      }
    }

    return nextErrors;
  }

  function showErrors(nextErrors: FormErrors) {
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (!firstError) return;
    const id = fieldId(firstError);
    if (id) {
      window.setTimeout(() => document.getElementById(id)?.focus(), 40);
    }
  }

  function goNext() {
    const nextErrors = validateStep(step);
    if (Object.keys(nextErrors).length > 0) {
      showErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, 2));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  function buildWhatsappUrl() {
    const message = [
      "🔔 NUEVA SOLICITUD OFICIO",
      `👤 Nombre: ${form.fullName.trim()}`,
      `🏷️ Categoría: ${form.category}`,
      `🔧 Especialidad: ${form.specialty.trim()}`,
      `⭐ Experiencia: ${form.experience || "No indicada"}`,
      `🌍 Idiomas: ${form.languages.length > 0 ? form.languages.join(", ") : "No indicados"}`,
      `📍 Zona: ${form.zone}`,
      "📝 Biografía:",
      form.bio.trim() || "No indicada",
      `📞 Teléfono: ${form.phone.trim()}`,
      `💬 WhatsApp: ${form.whatsapp.trim() || "Mismo que el teléfono"}`,
      `📧 Email: ${form.email.trim()}`,
    ].join("\n");

    return `https://wa.me/${OFICIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStep(2);
    if (Object.keys(nextErrors).length > 0) {
      showErrors(nextErrors);
      return;
    }

    const url = buildWhatsappUrl();
    setWhatsappUrl(url);
    setSubmitting(true);
    window.open(url, "_blank", "noopener,noreferrer");

    submitTimerRef.current = window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className="border border-line bg-background p-5 sm:p-8 lg:p-10">
        <div
          className="flex min-h-[420px] flex-col items-center justify-center text-center"
          role="status"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 text-clay-deep">
            <Check className="h-7 w-7" strokeWidth={1.5} />
          </span>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="display-sm mt-7 max-w-[14ch] text-[32px] outline-none sm:text-[40px]"
          >
            ¡Solicitud enviada!
          </h3>
          <p className="mt-3 text-[14px] text-ink">
            Te contactaremos en menos de 24h.
          </p>
          <p className="mx-auto mt-3 max-w-[42ch] text-[12px] leading-relaxed text-muted">
            Si no se ha abierto WhatsApp automáticamente, haz clic aquí para
            enviarnos los datos.
          </p>
          <div className="mt-8 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Enviar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-background p-5 sm:p-8 lg:p-10">
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Solicitud de alta</p>
          <p
            className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            aria-live="polite"
          >
            Paso {step + 1} de 3
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden="true">
          {steps.map((item, index) => (
            <div key={item.title}>
              <div
                className={cn(
                  "h-[2px] transition-colors duration-300",
                  index <= step ? "bg-clay" : "bg-ink/10",
                )}
              />
              <span
                className={cn(
                  "mt-2 block truncate font-mono text-[8px] uppercase tracking-[0.1em] transition-colors",
                  index === step ? "text-ink" : "text-muted",
                )}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-[3px] bg-ink/10" aria-hidden="true">
          <div
            className="h-full bg-clay transition-[width] duration-500 ease-editorial"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div
        key={step}
        className="mt-7 animate-fade-up"
        style={{ animationDuration: "0.45s" }}
      >
        <h3
          ref={stepHeadingRef}
          tabIndex={-1}
          className="display-sm text-[30px] outline-none sm:text-[36px]"
        >
          {steps[step].title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-[12px] leading-relaxed text-muted">
          {steps[step].description}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulario de alta de profesional"
          className="mt-7"
        >
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="signup-full-name" className={labelClass}>
                  Nombre completo o empresa{" "}
                  <span className="text-clay-deep">*</span>
                </label>
                <input
                  id="signup-full-name"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? "signup-full-name-error" : undefined
                  }
                  placeholder="Ej: Juan Martínez / Fontanería Martínez"
                  className={cn(inputClass, "mt-2")}
                />
                {errors.fullName && (
                  <p id="signup-full-name-error" className={errorClass}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="signup-category" className={labelClass}>
                  Categoría principal <span className="text-clay-deep">*</span>
                </label>
                <div className="relative mt-2">
                  <select
                    id="signup-category"
                    name="category"
                    required
                    value={form.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={
                      errors.category ? "signup-category-error" : undefined
                    }
                    className={cn(
                      inputClass,
                      "cursor-pointer appearance-none pr-9",
                    )}
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                {errors.category && (
                  <p id="signup-category-error" className={errorClass}>
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="signup-specialty" className={labelClass}>
                  Especialidad concreta{" "}
                  <span className="text-clay-deep">*</span>
                </label>
                <input
                  id="signup-specialty"
                  name="specialty"
                  type="text"
                  required
                  value={form.specialty}
                  onChange={(event) =>
                    updateField("specialty", event.target.value)
                  }
                  aria-invalid={Boolean(errors.specialty)}
                  aria-describedby={
                    errors.specialty ? "signup-specialty-error" : undefined
                  }
                  placeholder="Ej: Fugas, termos y climatización"
                  className={cn(inputClass, "mt-2")}
                />
                {errors.specialty && (
                  <p id="signup-specialty-error" className={errorClass}>
                    {errors.specialty}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="signup-experience" className={labelClass}>
                  Años de experiencia
                </label>
                <div className="relative mt-2">
                  <select
                    id="signup-experience"
                    name="experience"
                    value={form.experience}
                    onChange={(event) =>
                      updateField("experience", event.target.value)
                    }
                    className={cn(
                      inputClass,
                      "cursor-pointer appearance-none pr-9",
                    )}
                  >
                    <option value="">Selecciona una opción</option>
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option} años
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClass}>Idiomas que hablas</legend>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {languageOptions.map((language) => (
                    <label
                      key={language}
                      className="flex cursor-pointer items-center gap-2.5 text-[12px] text-muted transition-colors hover:text-ink"
                    >
                      <input
                        type="checkbox"
                        className="check-control"
                        checked={form.languages.includes(language)}
                        onChange={() => toggleLanguage(language)}
                      />
                      {language}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="signup-zone" className={labelClass}>
                  Zona principal de trabajo{" "}
                  <span className="text-clay-deep">*</span>
                </label>
                <div className="relative mt-2">
                  <select
                    id="signup-zone"
                    name="zone"
                    required
                    value={form.zone}
                    onChange={(event) =>
                      updateField("zone", event.target.value)
                    }
                    aria-invalid={Boolean(errors.zone)}
                    aria-describedby={
                      errors.zone ? "signup-zone-error" : undefined
                    }
                    className={cn(
                      inputClass,
                      "cursor-pointer appearance-none pr-9",
                    )}
                  >
                    <option value="" disabled>
                      Selecciona una zona
                    </option>
                    {zoneOptions.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                {errors.zone && (
                  <p id="signup-zone-error" className={errorClass}>
                    {errors.zone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="signup-bio" className={labelClass}>
                    Biografía breve
                  </label>
                  <span
                    id="signup-bio-counter"
                    className="font-mono text-[8px] tracking-[0.1em] text-muted"
                  >
                    {form.bio.length}/280
                  </span>
                </div>
                <textarea
                  id="signup-bio"
                  name="bio"
                  maxLength={280}
                  rows={4}
                  value={form.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  aria-describedby="signup-bio-counter"
                  placeholder="Cuéntanos en 2-3 frases tu experiencia, qué te hace diferente y por qué los clientes te recomiendan."
                  className={cn(
                    inputClass,
                    "mt-2 h-auto min-h-[112px] resize-y py-3",
                  )}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="signup-phone" className={labelClass}>
                  Teléfono móvil <span className="text-clay-deep">*</span>
                </label>
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "signup-phone-error" : undefined
                  }
                  placeholder="+34 600 000 000"
                  className={cn(inputClass, "mt-2")}
                />
                {errors.phone && (
                  <p id="signup-phone-error" className={errorClass}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="signup-whatsapp" className={labelClass}>
                  WhatsApp <span className="text-muted">(opcional)</span>
                </label>
                <input
                  id="signup-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={(event) =>
                    updateField("whatsapp", event.target.value)
                  }
                  placeholder="Si es diferente al teléfono"
                  className={cn(inputClass, "mt-2")}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="signup-email" className={labelClass}>
                  Email <span className="text-clay-deep">*</span>
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "signup-email-error" : undefined
                  }
                  placeholder="tu@email.com"
                  className={cn(inputClass, "mt-2")}
                />
                {errors.email && (
                  <p id="signup-email-error" className={errorClass}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-3 border-t border-line pt-5 sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-muted">
                  <input
                    id="signup-verification-consent"
                    type="checkbox"
                    required
                    checked={form.verificationConsent}
                    onChange={(event) =>
                      updateField("verificationConsent", event.target.checked)
                    }
                    aria-invalid={Boolean(errors.verificationConsent)}
                    aria-describedby={
                      errors.verificationConsent
                        ? "signup-verification-consent-error"
                        : undefined
                    }
                    className="check-control mt-0.5"
                  />
                  <span>
                    Acepto que OFICIO verifique mi identidad y datos para
                    publicar mi ficha
                  </span>
                </label>
                {errors.verificationConsent && (
                  <p
                    id="signup-verification-consent-error"
                    className={errorClass}
                  >
                    {errors.verificationConsent}
                  </p>
                )}

                <label className="flex cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-muted">
                  <input
                    type="checkbox"
                    checked={form.marketingConsent}
                    onChange={(event) =>
                      updateField("marketingConsent", event.target.checked)
                    }
                    className="check-control mt-0.5"
                  />
                  <span>
                    Quiero recibir consejos y novedades de OFICIO por email
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={submitting}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                Atrás
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < 2 ? (
              <Button
                type="button"
                variant="accent"
                size="lg"
                onClick={goNext}
                className="w-full sm:w-auto"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <LoaderCircle
                      className="h-4 w-4 animate-spin"
                      strokeWidth={1.5}
                    />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar solicitud
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-5">
        <ShieldCheck
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-deep"
          strokeWidth={1.5}
        />
        <p className="text-[10px] leading-relaxed text-muted">
          Tus datos se envían directamente a OFICIO por WhatsApp. No se publican
          ni se comparten con terceros antes de completar la verificación.
        </p>
      </div>
    </div>
  );
}
