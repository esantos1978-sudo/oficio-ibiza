# OFICIO — Directorio de profesionales del hogar en Ibiza

Sitio web de directorio curado para servicios profesionales del hogar en Ibiza. Construido con
React, TypeScript, Tailwind CSS y componentes accesibles basados en Radix (estilo shadcn/ui).

## Páginas

- `/` — Home: hero, buscador por servicio y zona, seis categorías, profesionales destacados,
  prueba social y CTA para profesionales.
- `/fontaneros-ibiza`, `/electricistas-ibiza`, `/piscinas-ibiza`, `/jardineros-ibiza`,
  `/limpieza-ibiza`, `/manitas-ibiza` — listados con filtros por zona, valoración y
  disponibilidad, y orden por valoración, antigüedad y cercanía.
- `/profesional/:slug` — perfil completo con pestañas de información, trabajos, reseñas
  verificadas y disponibilidad, además de contacto directo y solicitud de presupuesto.
- `/profesionales` — landing de captación: beneficios, cómo entrar, cuota de 99 €/año, FAQ y
  formulario para reservar plaza.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Build de producción:

```bash
pnpm build
pnpm preview
```

## Estructura

```text
src/
  components/
    layout/          Header, Footer y Layout
    ui/              Button, Badge, Tabs, Accordion y Dialog (Radix + shadcn patterns)
    ...              buscador, cards, filtros, estrellas, formularios
  data/
    categories.ts    Las seis categorías y sus rutas
    professionals.ts 12 profesionales, 8 zonas, reseñas y disponibilidad
  pages/             Home, categoría, perfil, profesionales y 404
  hooks/             Metadatos de página
  index.css          Tokens y estilos editoriales
public/images/       Fotografía local descargada de Unsplash
```

## Datos

Toda la información es de demostración. Los 12 perfiles incluyen biografía, servicios, zonas,
idiomas, horario, galería y 3–4 reseñas detalladas. Para editar contenido, cambia
`src/data/professionals.ts` y `src/data/categories.ts`.

Los formularios de presupuesto y alta son demos de interfaz: muestran el estado de éxito, pero no
envían datos a ningún servidor. Para producción, conecta `QuoteDialog` y `JoinDialog` a tu CRM o
endpoint.

## Fotografía

Imágenes de Unsplash descargadas y servidas localmente para que el sitio no dependa de peticiones
externas en tiempo de ejecución. Las fotos se usan como placeholders editoriales; para producción,
sustitúyelas por fotografía propia de los profesionales y de la isla.

## Accesibilidad

Navegación con teclado, foco visible, skip link, etiquetas de formulario, tabs y diálogos con
Radix, textos alternativos, regiones semánticas, `aria-label` en controles y soporte para
`prefers-reduced-motion`.
