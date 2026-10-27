import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
process.chdir(root)

const dist = path.join(root, 'dist')
rmSync(dist, { recursive: true, force: true })
mkdirSync(path.join(dist, 'assets'), { recursive: true })
cpSync(path.join(root, 'public'), dist, { recursive: true })

const esbuildBinary =
  process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild'
const esbuild = require.resolve(
  `@esbuild/${process.platform}-${process.arch}/${esbuildBinary}`,
)

const esbuildArgs = [
  'scripts/static-entry.tsx',
  '--bundle',
  '--outdir=dist/assets',
  '--entry-names=entry',
  '--asset-names=[name]-[hash]',
  '--loader:.woff2=file',
  '--loader:.woff=file',
  '--jsx=automatic',
  '--minify',
  '--alias:@=./src',
  '--log-limit=0',
  '--define:process.env.NODE_ENV="production"',
]

const jsBuild = spawnSync(esbuild, esbuildArgs, { cwd: root, stdio: 'inherit' })
if (jsBuild.status !== 0) {
  process.exit(jsBuild.status ?? 1)
}

const tailwindCli = require.resolve('tailwindcss/lib/cli.js')
const cssBuild = spawnSync(
  process.execPath,
  [
    tailwindCli,
    '-i',
    'src/index.css',
    '-o',
    'dist/assets/tailwind.css',
    '--minify',
    '--config',
    'tailwind.config.ts',
  ],
  { cwd: root, stdio: 'inherit' },
)
if (cssBuild.status !== 0) {
  process.exit(cssBuild.status ?? 1)
}

let html = readFileSync(path.join(root, 'index.html'), 'utf8')
html = html.replace(
  '</head>',
  '    <link rel="stylesheet" href="/assets/entry.css" />\n    <link rel="stylesheet" href="/assets/tailwind.css" />\n  </head>',
)
html = html.replace(
  '<script type="module" src="/src/main.tsx"></script>',
  '<script type="module" src="/assets/entry.js"></script>',
)
writeFileSync(path.join(dist, 'index.html'), html)

console.log('Built site in dist/')
