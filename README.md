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
- `/login` — acceso privado con Supabase Auth.
- `/admin` — dashboard protegido con métricas y listado de profesionales.
- `/admin/profesionales` — CRUD de fichas y subida de imágenes a Supabase Storage.
- `/admin/ajustes` — cuenta y estado de la conexión.

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

## Panel de administración

El panel usa Supabase Auth, la tabla `professionals` y el bucket
`professional-images`. Las rutas `/admin/*` están protegidas por sesión.

Variables necesarias en `.env` (o en el entorno de Vercel):

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

La configuración de build estática lee estas variables y las inyecta en el bundle. El panel
requiere que la tabla tenga, al menos, las columnas usadas por el formulario:
`name`, `slug`, `category`, `specialty`, `location`, `rating`, `review_count`, `price_from`,
`phone`, `description`, `response_time`, `verified`, `image`, `gallery` y `created_at`.

Para que el panel funcione en producción, configura las políticas RLS de Supabase para que solo
usuarios autenticados puedan escribir en `professionals` y subir archivos al bucket.

La web pública lee de la misma tabla mediante `src/lib/professionalsService.ts`: la home muestra
las últimas fichas, las categorías filtran por `category` y los perfiles se resuelven por `slug`.
Necesita una política de lectura para el rol `anon`:

```sql
create policy "Public professionals read"
on public.professionals
for select
to anon
using (true);
```

Si prefieres publicar solo fichas verificadas, cambia `using (true)` por
`using (verified = true)`. El bucket `professional-images` debe ser público (o tener una política
de lectura equivalente) para que las URLs de `getPublicUrl()` funcionen en la web.

## Estructura

```text
src/
  components/
    layout/          Header, Footer y Layout
    ui/              Button, Badge, Tabs, Accordion y Dialog (Radix + shadcn patterns)
    ...              buscador, cards, filtros, estrellas, formularios
  data/
    categories.ts    Las seis categorías y sus rutas
    professionals.ts Tipos, zonas y datos editoriales de referencia
  lib/
    professionalsService.ts  Consultas públicas a Supabase y mapeo de fichas
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

El directorio público (home, categorías y perfiles) se lee de Supabase a través de
`src/lib/professionalsService.ts`. Para publicar o editar una ficha, usa el panel `/admin` o la
tabla `professionals`.

`src/data/professionals.ts` conserva los tipos del perfil, las zonas y algunos datos editoriales
de referencia usados por componentes de marketing. El formulario de presupuesto sigue siendo una
demo de interfaz. El formulario de alta de profesionales envía la solicitud formateada a WhatsApp;
el número de destino se configura en la constante `OFICIO_WHATSAPP_NUMBER` de
`src/components/ProfessionalSignupForm.tsx`.

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
