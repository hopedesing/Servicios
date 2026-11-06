/**
 * Servidor local para probar la web y el formulario:   npm run dev
 * - Sirve los archivos estáticos.
 * - Atiende POST /api/cotizacion con la misma lógica que la función de Vercel.
 * - Lee variables desde .env (si existe). Sin RESEND_API_KEY usa modo prueba (no envía, imprime el correo).
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleQuote } from './api/_quote.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.env.PORT) || 5173;

// .env mínimo
if (existsSync(join(ROOT, '.env'))) {
  for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
if (!process.env.RESEND_API_KEY && !process.env.QUOTE_DRY_RUN) {
  process.env.QUOTE_DRY_RUN = '1';
  console.log('· Sin RESEND_API_KEY: el formulario funciona en modo prueba (imprime el correo aquí).');
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json', '.ico': 'image/x-icon', '.txt': 'text/plain' };
const BLOCKED = /^\/(\.env|api|server\.mjs|package|node_modules|\.git)/;

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/cotizacion') {
    if (req.method !== 'POST') { res.writeHead(405, { Allow: 'POST' }); return res.end(); }
    let raw = '';
    for await (const chunk of req) { raw += chunk; if (raw.length > 50_000) break; }
    let body = {};
    try { body = JSON.parse(raw || '{}'); } catch { /* vacío */ }
    const { status, body: out } = await handleQuote({ body, ip: req.socket.remoteAddress, origin: req.headers.origin || '' });
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(out));
  }

  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (BLOCKED.test(path)) { res.writeHead(404); return res.end('No encontrado'); }
  if (path.endsWith('/')) path += 'index.html';
  const file = join(ROOT, path);
  try {
    if (!(await stat(file)).isFile()) throw new Error();
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
  }
}).listen(PORT, () => console.log(`HOPE en http://localhost:${PORT}`));
