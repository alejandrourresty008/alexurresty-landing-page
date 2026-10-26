import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { clients, pieces, rows, services, rowTiles } from '../lib/catalog.ts';

const publicFile = (src: string) => new URL(`../public${src}`, import.meta.url);
const titles = new Set(services.map(s => s.title));

test('contenido completo: 4 servicios, 4 filas, 7 piezas y 5 marcas', () => {
  assert.equal(services.length, 4);
  assert.equal(rows.length, 4);
  assert.equal(pieces.length, 7);
  assert.equal(clients.length, 5);
});

test('los identificadores no se repiten', () => {
  for (const list of [services, pieces, clients]) assert.equal(new Set(list.map(x => x.id)).size, list.length);
});

test('filas, piezas y marcas apuntan a servicios que existen', () => {
  rows.forEach(r => assert.ok(titles.has(r.service), r.service));
  pieces.forEach(p => assert.ok(titles.has(p.service), p.title));
  clients.forEach(c => c.services.forEach(s => assert.ok(titles.has(s), `${c.name}: ${s}`)));
});

test('ninguna fila queda vacía y cada pieza aparece una sola vez', () => {
  rows.forEach(r => assert.ok(rowTiles(r).length > 0, r.service));
  const shown = rows.flatMap(r => rowTiles(r)).filter(t => t.kind === 'piece').map(t => t.piece.id).sort();
  assert.deepEqual(shown, pieces.map(p => p.id).sort());
});

test('todas las imágenes y videos referenciados existen en public/', () => {
  const files = [
    ...services.flatMap(s => s.clips),
    ...pieces.flatMap(p => [p.item, { kind: 'image' as const, src: p.cover }, { kind: 'video' as const, src: p.preview }]),
    ...clients.flatMap(c => [...c.items, { kind: 'image' as const, src: c.cover }, { kind: 'video' as const, src: c.preview }])
  ].flatMap(c => c.kind === 'link' ? [c.poster] : [c.src, ...('poster' in c && c.poster ? [c.poster] : [])]);
  const missing = [...new Set(files)].filter(f => !existsSync(publicFile(f)));
  assert.deepEqual(missing, []);
});

test('las métricas usan el formato "NK+" y una plataforma conocida', () => {
  clients.flatMap(c => c.metrics ?? []).forEach(m => {
    assert.match(m.value, /^\d+K\+$/);
    assert.ok(['facebook', 'tiktok', 'instagram'].includes(m.platform));
  });
});
