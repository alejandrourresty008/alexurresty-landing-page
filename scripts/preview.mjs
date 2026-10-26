// Sirve la exportación estática (out/) en http://127.0.0.1:4177, como lo hará Cloudflare.
// Sin dependencias: funciona igual en Windows, Mac y Linux.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = new URL('../out/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const port = Number(process.env.PORT || 4177);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp4': 'video/mp4'
};

createServer((req, res) => {
  const path = normalize(decodeURIComponent((req.url || '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end('No encontrado'); return; }
  const size = statSync(file).size;
  const type = types[extname(file)] || 'application/octet-stream';
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) { // los videos se piden por partes
    const start = Number(range[1] || 0), end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Vista previa en http://127.0.0.1:${port}`));
