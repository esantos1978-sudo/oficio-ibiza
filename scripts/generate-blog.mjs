import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from '@mdx-js/mdx'
import matter from 'gray-matter'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'src/content/blog')
const outputDir = path.join(root, 'src/generated/blog')

const rehypePlugins = [
  [
    rehypePrettyCode,
    {
      theme: 'github-dark-dimmed',
      keepBackground: false,
    },
  ],
]

function slugFromFile(file) {
  return file.replace(/\.mdx$/i, '')
}

function readingTime(content) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const words = plainText ? plainText.split(' ').length : 0
  return Math.max(1, Math.ceil(words / 200))
}

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(outputDir, { recursive: true })

const files = readdirSync(contentDir).filter((file) => file.endsWith('.mdx'))
const posts = []

for (const file of files) {
  const slug = slugFromFile(file)
  const source = readFileSync(path.join(contentDir, file), 'utf8')
  const { data, content } = matter(source)
  // La portada del artículo usa el título del frontmatter. Evitamos duplicar
  // el H1 que algunos artículos incluyen al principio del MDX.
  const contentForRender = content.replace(/^\s*#\s+[^\n]+\n+/, '')

  if (!data.title || !data.description || !data.date) {
    throw new Error(`El artículo ${file} necesita title, description y date.`)
  }

  const compiled = String(
    await compile(contentForRender, {
      outputFormat: 'program',
      development: false,
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkGfm],
      rehypePlugins,
    }),
  )

  const moduleSource = `// @ts-nocheck\n${compiled}\n`
  writeFileSync(path.join(outputDir, `${slug}.tsx`), moduleSource, 'utf8')

  posts.push({
    slug,
    title: String(data.title),
    description: String(data.description),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    author: String(data.author ?? 'Equipo OFICIO'),
    category: String(data.category ?? 'OFICIO'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: String(data.image ?? ''),
    featured: Boolean(data.featured),
    readingTime: readingTime(content),
  })
}

posts.sort((a, b) => b.date.localeCompare(a.date))

const imports = posts
  .map((post, index) => `import Post${index} from './${post.slug}'`)
  .join('\n')

const entries = posts
  .map(
    (post, index) => `  {
    slug: ${JSON.stringify(post.slug)},
    title: ${JSON.stringify(post.title)},
    description: ${JSON.stringify(post.description)},
    date: ${JSON.stringify(post.date)},
    author: ${JSON.stringify(post.author)},
    category: ${JSON.stringify(post.category)},
    tags: ${JSON.stringify(post.tags)},
    image: ${JSON.stringify(post.image)},
    featured: ${post.featured},
    readingTime: ${post.readingTime},
    Component: Post${index},
  },`,
  )
  .join('\n')

const indexSource = `// Archivo generado por scripts/generate-blog.mjs. No editar a mano.
import type { BlogPost } from '@/lib/blog'
${imports}

export const blogPosts: BlogPost[] = [
${entries}
]

export const getBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug)
`

writeFileSync(path.join(outputDir, 'index.ts'), indexSource, 'utf8')

console.log(`Blog generado: ${posts.length} artículo(s) en src/generated/blog`)
