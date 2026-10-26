import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects, services, orientation, makeChapters } from '../lib/catalog.ts';
test('retains all 13 projects and the 4 existing services', () => {
  assert.equal(projects.length, 13); assert.equal(services.length, 4);
  assert.equal(new Set(projects.map(p => p.id)).size, 13);
});
test('uses measured preview dimensions rather than commercial categories', () => {
  const portraitPodcast = projects.find(p => p.title === 'Estudio de podcast móvil');
  const landscapeCorporate = projects.find(p => p.title === '9 años formando a la comunidad jurídica');
  assert.ok(portraitPodcast && landscapeCorporate);
  assert.equal(orientation(portraitPodcast), 'portrait');
  assert.equal(orientation(landscapeCorporate), 'landscape');
});
test('chapters start vertical, then horizontal, with every project exactly once', () => {
  const chapters = makeChapters(projects);
  assert.equal(chapters.length, 7);
  assert.deepEqual(chapters.map(c => c.format), ['portrait','portrait','portrait','landscape','landscape','landscape','landscape']);
  assert.deepEqual(chapters.flatMap(c => c.projects).map(p => p.id).sort(), projects.map(p => p.id).sort());
  assert.ok(chapters.every(c => c.projects.every(p => orientation(p) === c.format)));
});
test('empty and filtered catalogs produce only valid chapters', () => {
  assert.deepEqual(makeChapters([]), []);
  const selected = projects.filter(p => p.category === 'Streaming');
  assert.equal(makeChapters(selected).flatMap(c => c.projects).length, 2);
});
test('local services match the deployed service catalog verified on 2026-10-26', async () => {
  const { readFile } = await import('node:fs/promises');
  const snapshot = JSON.parse(await readFile(new URL('../docs/services-live-snapshot.json', import.meta.url), 'utf8'));
  type PublishedService = { id: string; title: string; short: string; includes: string; long: string[]; video?: string; poster?: string; videos?: { src: string; poster: string }[] };
  const normalized = snapshot.services.map((service: PublishedService) => ({
    id: service.id, title: service.title, category: service.title, short: service.short, includes: service.includes, description: service.long,
    items: (service.videos ?? [{ src: service.video, poster: service.poster }]).map(video => ({ kind: 'video', src: '/' + video.src, poster: '/' + video.poster })),
  }));
  assert.deepEqual(services, normalized);
});
