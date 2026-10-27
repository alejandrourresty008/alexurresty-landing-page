import { test, expect } from '@playwright/test';

// Recorridos sobre la exportación estática servida en BASE_URL (por defecto npm run preview, puerto 4177).

test('carga sin errores y con todo el contenido ya en el HTML', async ({ page }) => {
  const errors: string[] = [], bad: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400 && r.url().includes('127.0.0.1')) bad.push(r.url()); });

  const html = await (await page.request.get('/')).text();
  expect(html).toContain('Entiendo tu industria.');
  expect(html).toContain('Silvia Huisa Alvarado'); // proyectos generados en el servidor (visibles para Google)
  expect(html).toContain('application/ld+json');

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Produzco tu historia.');
  await expect(page.locator('#project-rows .pbento')).toHaveCount(4);
  await expect(page.locator('#project-rows .tile')).toHaveCount(11);
  // Las piezas horizontales conservan su forma 16:9 (no se recortan a vertical)
  const land = page.locator('#project-rows .tile.land');
  await expect(land).toHaveCount(3);
  const box = await land.first().boundingBox();
  expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
  await expect(page.locator('.service-row')).toHaveCount(4);
  await expect(page.locator('#intro')).toHaveCount(0, { timeout: 5000 });
  expect(errors).toEqual([]);
  expect(bad).toEqual([]);
});

test('el título de Proyectos se anima y luego entra la primera fila', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#intro')).toHaveCount(0, { timeout: 5000 });
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Proyectos' }).click();
  const title = page.locator('#proj-title');
  await expect(title.locator('.ch')).toHaveCount(9);
  await expect(title).toHaveClass(/abierto/, { timeout: 4000 });
  await expect(page.locator('#project-rows .pbento').first()).not.toHaveClass(/secuencia/, { timeout: 6000 });
});

test('una marca abre su ventana con métricas, y Escape la cierra', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#intro')).toHaveCount(0, { timeout: 5000 });
  await page.locator('[data-client="silvia"]').click();
  const modal = page.locator('#modal');
  await expect(modal).toHaveClass(/open/);
  await expect(page.locator('#modal-title')).toHaveText('Silvia Huisa Alvarado');
  await expect(modal.locator('.tile-metric')).toHaveCount(2);
  await expect(modal.locator('.tile-metric').first()).toContainText('100K+ seguidores en TikTok');
  await page.keyboard.press('Escape');
  await expect(modal).not.toHaveClass(/open/);
});

test('el formulario valida y envía sin mandar mensajes reales', async ({ page }) => {
  let sent = false;
  await page.route('https://script.google.com/**', route => { sent = true; return route.fulfill({ status: 200, body: '' }); });
  await page.goto('/');
  await expect(page.locator('#intro')).toHaveCount(0, { timeout: 5000 });
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('#form-error')).toBeVisible();
  await page.fill('#nombre', 'Prueba');
  await page.fill('#email', 'prueba@ejemplo.com');
  await page.fill('#telefono', '999999999');
  await page.selectOption('#tipo', 'Podcast');
  await page.fill('#mensaje', 'Mensaje de prueba automática');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('#form-done')).toBeVisible();
  expect(sent).toBe(true);
});
