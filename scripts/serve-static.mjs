import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.env.PORT || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0])
  let file = path.join(root, url)

  if (!file.startsWith(root)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (!existsSync(file) || statSync(file).isDirectory()) {
    const candidate = path.join(file, 'index.html')
    file = existsSync(candidate) ? candidate : path.join(root, 'index.html')
  }

  const ext = path.extname(file).toLowerCase()
  res.writeHead(200, {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  })
  createReadStream(file).pipe(res)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`OFICIO preview at http://127.0.0.1:${port}`)
})
