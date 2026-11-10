# OFICIO — Directorio de profesionales del hogar en Ibiza

Sitio web de directorio curado para servicios profesionales del hogar en Ibiza. Construido con
React, TypeScript, Tailwind CSS y componentes accesibles basados en Radix (estilo shadcn/ui).

## Páginas

- `/` — Home: hero, buscador por servicio y zona, seis categorías, profesionales destacados,
  prueba social y CTA para profesionales.
- `/fontaneros-ibiza` — redirige a la nueva página de servicio `/servicios/fontaneria`.
- `/servicios/fontaneria` — nueva página de categoría con barra de filtros y ordenación,
  filtros activos descartables, cards detalladas y estado vacío.
- `/electricistas-ibiza`, `/piscinas-ibiza`, `/jardineros-ibiza`,
  `/limpieza-ibiza`, `/manitas-ibiza` — listados con filtros por zona, valoración y
  disponibilidad, y orden por valoración, antigüedad y cercanía.
- `/profesional/:slug` — perfil completo con pestañas de información, trabajos, reseñas
  verificadas y disponibilidad, además de contacto directo y solicitud de presupuesto.
- `/profesionales` — landing de captación: beneficios, cómo entrar, cuota de 99 €/año, FAQ y
  formulario inline de alta en 3 pasos que envía la solicitud a WhatsApp.
- `/blog` — diario editorial con artículo destacado y próximos temas.
- `/blog/:slug` — artículo MDX con metadatos, contenido enriquecido y JSON-LD `BlogPosting`.

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
    professionals.ts 15 profesionales, 8 zonas, reseñas y disponibilidad
  content/blog/      Artículos MDX con frontmatter
  components/blog/   Componentes y estilos de contenido MDX
  pages/             Home, categoría, perfil, profesionales, blog y 404
  hooks/             Metadatos de página
  index.css          Tokens y estilos editoriales
public/images/       Fotografía local descargada de Unsplash
scripts/             Generación del blog y build estático
```

## Blog

Los artículos viven en `src/content/blog/*.mdx` y usan frontmatter (`title`, `description`,
`date`, `author`, `category`, `tags`, `image`, `featured`). El script
`scripts/generate-blog.mjs` compila los MDX y genera el manifiesto que consume la web.

```bash
pnpm generate:blog
```

`pnpm dev` y `pnpm build` ejecutan la generación automáticamente. Vite también está configurado
con `@mdx-js/rollup`, `remark-gfm` y `rehype-pretty-code` para el flujo MDX del proyecto.

## Datos

Toda la información es de demostración salvo **HC Reformas (Hamlet)**, la primera ficha real del
directorio. Los perfiles de muestra incluyen biografía, servicios, zonas, idiomas, horario, galería
y 3–4 reseñas detalladas; HC Reformas todavía no tiene reseñas publicadas. Para editar contenido,
cambia `src/data/professionals.ts` y `src/data/categories.ts`.

El formulario de presupuesto sigue siendo una demo de interfaz. El formulario de alta de
profesionales envía la solicitud formateada a WhatsApp; el número de destino se configura en la
constante `OFICIO_WHATSAPP_NUMBER` de `src/components/ProfessionalSignupForm.tsx`.

## Fotografía

Imágenes de Unsplash descargadas y servidas localmente para que el sitio no dependa de peticiones
externas en tiempo de ejecución. Las fotos se usan como placeholders editoriales; para producción,
sustitúyelas por fotografía propia de los profesionales y de la isla.

## SEO técnico

- `SeoMeta` actualiza título, descripción, canonical, Open Graph y Twitter Cards en cada ruta.
- `JsonLd` inyecta datos estructurados schema.org en el `<head>`.
- La homepage publica `Organization` y `WebSite`; cada perfil publica `ProfessionalService` con
  valoraciones, precio, horario y área de servicio.
- `index.html` incluye metadatos sociales base y directivas `robots` para rastreadores.

## Accesibilidad

Navegación con teclado, foco visible, skip link, etiquetas de formulario, tabs y diálogos con
Radix, textos alternativos, regiones semánticas, `aria-label` en controles y soporte para
`prefers-reduced-motion`.
