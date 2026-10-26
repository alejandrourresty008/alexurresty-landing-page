import { test, expect } from '@playwright/test';
test('fullscreen title opens into a horizontal cinema with intact media', async ({ page }) => {
  const errors: string[] = [], bad: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400 && response.url().includes('127.0.0.1')) bad.push(response.url()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Entiendo tu industria. Produzco tu historia.');
  await expect(page.locator('.project-frame')).toHaveCount(13);
  await expect(page.locator('.project-transition')).toHaveCount(0);
  await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  await expect(page.locator('.project-intro')).toHaveCSS('opacity', '1');
  const title = await page.locator('#projects-title').boundingBox();
  expect(title!.width).toBeGreaterThan(1100);
  expect(title!.width).toBeLessThan(1441);
  await page.mouse.move(700, 500);
  await page.mouse.wheel(0, 750);
  await expect(page.locator('.project-cinema')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('.project-intro')).toHaveCSS('visibility', 'hidden');
  await expect.poll(async () => (await page.locator('[data-chapter="0"]').boundingBox())?.width).toBeCloseTo(1440, 0);
  const scene = await page.locator('[data-chapter="0"]').boundingBox();
  expect(scene!.height).toBeCloseTo(1000, 0);
  await expect(page.locator('[data-chapter="0"] video').first()).toHaveCSS('object-fit', 'contain');
  const before = await page.locator('.project-track').evaluate(el => el.getBoundingClientRect().x);
  await page.mouse.wheel(0, 550); await page.waitForTimeout(650);
  const after = await page.locator('.project-track').evaluate(el => el.getBoundingClientRect().x);
  expect(after).toBeLessThan(before - 400);
  await page.getByRole('button', { name: 'Capítulo siguiente' }).click(); await page.waitForTimeout(1400);
  await page.getByRole('button', { name: 'Capítulo siguiente' }).click(); await page.waitForTimeout(1400);
  await expect(page.locator('.format-label')).toHaveText('Formato horizontal');
  const horizontal = page.locator('[data-format="landscape"][aria-hidden="false"]');
  await expect(horizontal).toHaveCount(1);
  await expect(horizontal.locator('video')).toHaveCSS('object-fit', 'contain');
  await expect.poll(() => horizontal.locator('video').evaluate(video => video instanceof HTMLVideoElement && video.videoWidth / video.videoHeight)).toBeCloseTo(16 / 9, 2);
  await expect(page.locator('.project-transition')).toHaveAttribute('data-webgl', 'ready');
  await expect(page.locator('.story-progress')).toHaveCount(0);
  const cinemaPosition = await page.evaluate(() => scrollY);
  await horizontal.getByRole('button', { name: /^Abrir video de / }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar proyecto' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(cinemaPosition, 0);
  await expect(horizontal).toHaveAttribute('aria-hidden', 'false');
  await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Servicios', exact: true }).click();
  await expect(page).toHaveURL(/#servicios$/);
  await expect(page.getByRole('heading', { name: 'Servicios', exact: true })).toBeInViewport();
  await expect(page.locator('[data-service-icon]')).toHaveCount(4);
  expect(errors).toEqual([]); expect(bad).toEqual([]);
});
test('project dialog retains pieces, focus, quote and form validation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver OMNIMEDIA', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('video')).toHaveCSS('object-fit', 'contain');
  await expect(dialog.locator('video')).toHaveAttribute('controls', '');
  await page.getByRole('button', { name: 'Pieza siguiente' }).click();
  await expect(dialog.locator('.detail-controls')).toContainText('2 / 3');
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Ver OMNIMEDIA', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Conocer Video corporativo', exact: true }).click();
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Ver más', exact: true }).click();
  await page.getByRole('button', { name: 'Cotizar este servicio' }).click();
  await expect(page.locator('#tipo')).toHaveValue('Video corporativo');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('#contact-form').getByRole('alert')).toBeVisible();
  await expect(page.locator('#nombre')).toBeFocused();
  await page.locator('#nombre').fill('Prueba interceptada');
  await page.getByLabel('Email', { exact: true }).fill('prueba@example.com');
  await page.getByLabel('Teléfono / WhatsApp').fill('999999999');
  await page.getByLabel('Mensaje', { exact: true }).fill('Solicitud de prueba, no enviar.');
  await page.route('https://script.google.com/**', route => route.abort());
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.locator('#contact-form').getByRole('alert')).toContainText('No se pudo enviar');
  await expect(page.locator('#nombre')).toHaveValue('Prueba interceptada');
  await page.unroute('https://script.google.com/**');
  await page.route('https://script.google.com/**', route => route.fulfill({ status: 200, body: 'ok' }));
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.getByRole('heading', { name: 'Solicitud enviada' })).toBeVisible();
});
test('mobile and reduced motion preserve formats without pinning or autoplay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.project-stage')).toHaveClass(/is-stacked/);
  await expect(page.locator('[data-format="portrait"]')).toHaveCount(9);
  await expect(page.locator('[data-format="landscape"]')).toHaveCount(4);
  await expect(page.locator('.project-transition')).toHaveCount(0);
  expect(await page.locator('video').evaluateAll(videos => videos.every(video => video instanceof HTMLVideoElement && video.paused && !video.getAttribute('src')))).toBe(true);
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: 'Proyectos' }).click();
  await expect(page.getByRole('navigation', { name: 'Menú móvil' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Filtrar proyectos' }).selectOption('Streaming');
  await expect(page.locator('.project-frame')).toHaveCount(2);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
test('fallback without WebGL does not block projects', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === 'webgl2') return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver proyectos', exact: false }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  await page.mouse.move(700, 500); await page.mouse.wheel(0, 750);
  await expect(page.locator('.project-transition')).toHaveAttribute('data-webgl', 'fallback');
  await page.getByRole('button', { name: 'Ver OMNIMEDIA', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('menu navigation interpolates, can be interrupted and respects the fixed header', async ({ page }) => {
  await page.goto('/');
  const services = page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Servicios', exact: true });
  const start = await page.evaluate(() => scrollY);
  const target = await page.locator('#servicios').evaluate(el => el.getBoundingClientRect().top + scrollY - 88);
  await services.click(); await page.waitForTimeout(200);
  const during = await page.evaluate(() => scrollY);
  expect(during).toBeGreaterThan(start); expect(during).toBeLessThan(target - 200);
  await page.mouse.wheel(0, 120); await page.waitForTimeout(150);
  const interrupted = await page.evaluate(() => scrollY);
  await page.waitForTimeout(1000);
  expect(Math.abs((await page.evaluate(() => scrollY)) - interrupted)).toBeLessThan(20);
  await services.click(); await expect(page).toHaveURL(/#servicios$/);
  expect(await page.locator('#servicios').evaluate(el => el.getBoundingClientRect().top)).toBeCloseTo(88, 0);
  await page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Sobre mí', exact: true }).click();
  await expect(page).toHaveURL(/#sobre-mi$/);
  expect(await page.locator('#sobre-mi').evaluate(el => el.getBoundingClientRect().top)).toBeCloseTo(88, 0);
});
test('filtering keeps the cinema visible and starts its new horizontal track', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver proyectos', exact: false }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  await page.mouse.wheel(0, 750); await expect(page.locator('.project-cinema')).toHaveAttribute('aria-hidden', 'false');
  await page.getByRole('button', { name: 'Streaming', exact: true }).first().click();
  await expect(page.locator('.project-frame')).toHaveCount(2);
  await expect(page.locator('.project-cinema')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.locator('.project-intro')).toHaveCSS('visibility', 'hidden');
  await page.getByRole('button', { name: 'Capítulo siguiente' }).click();
  await expect(page.locator('.format-label')).toHaveText('Formato horizontal');
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await expect(page.locator('.project-frame')).toHaveCount(13);
});

test('video surface opens projects and only the backdrop or close controls dismiss them', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const surface = page.getByRole('button', { name: 'Abrir video de OMNIMEDIA', exact: true });
  await surface.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.locator('video').click({ position: { x: 80, y: 80 } });
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar proyecto' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(surface).toBeFocused();
  await surface.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
  await expect(surface).toBeFocused();
});
test('services bento preserves published content and expands video information', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const cards = page.locator('.service-bento-card');
  await expect(cards).toHaveCount(4);
  await expect(cards.locator('[data-service-icon]')).toHaveCount(4);
  const first = await cards.nth(0).boundingBox(), second = await cards.nth(1).boundingBox();
  expect(first!.width).toBeGreaterThan(second!.width + 100);
  await page.getByRole('button', { name: 'Conocer Estrategia de contenido', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveClass(/service-dialog-portrait/);
  await expect(dialog.locator('video')).toHaveAttribute('controls', '');
  await expect(dialog.locator('video')).toHaveCSS('object-fit', 'contain');
  await page.getByRole('button', { name: 'Ver más', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Ver menos', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Cotizar este servicio' })).toBeVisible();
  await page.getByRole('button', { name: 'Pieza siguiente' }).click();
  await expect(dialog.locator('.service-piece-controls')).toContainText('2 / 5');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Conocer Video corporativo', exact: true }).click();
  await expect(dialog).toHaveClass(/service-dialog-landscape/);
  await page.getByRole('button', { name: 'Ver más', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Cotizar este servicio' })).toBeVisible();
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.getByRole('button', { name: 'Cerrar servicio' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('section entries fade up into Services and arrive from the right into About without pinning', async ({ page }) => {
  await page.goto('/');
  const services = page.locator('[data-section-enter="services"]');
  const about = page.locator('[data-section-enter="about"]');
  await expect(services).toHaveCSS('opacity', '0');
  await expect(about).toHaveCSS('opacity', '0');
  // Sample rendered frames through each native-scroll entry, not just the end state.
  for (const section of ['services', 'about']) {
    const samples = await page.evaluate(async name => {
      const element = document.querySelector<HTMLElement>(`[data-section-enter="${name}"]`)!;
      window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .85, behavior: 'instant' });
      const frames: { opacity: number; x: number; y: number; scroll: number }[] = [];
      const start = performance.now();
      await new Promise<void>(resolve => {
        function sample() {
          const style = getComputedStyle(element);
          const matrix = new DOMMatrixReadOnly(style.transform);
          frames.push({ opacity: Number(style.opacity), x: matrix.m41, y: matrix.m42, scroll: scrollY });
          if (performance.now() - start < 1150) requestAnimationFrame(sample); else resolve();
        }
        requestAnimationFrame(sample);
      });
      return frames;
    }, section);
    expect(samples.some(frame => frame.opacity > 0 && frame.opacity < 1)).toBe(true);
    expect(samples.some(frame => section === 'services' ? frame.y > 1 : frame.x > 10)).toBe(true);
    expect(samples.at(-1)!.opacity).toBe(1);
    expect(samples.at(-1)!.x).toBe(0); expect(samples.at(-1)!.y).toBe(0);
    expect(Math.max(...samples.map(frame => frame.scroll)) - Math.min(...samples.map(frame => frame.scroll))).toBeLessThan(2);
  }
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  const centered = await about.boundingBox();
  expect(centered!.x + centered!.width / 2).toBeCloseTo(720, 0);
  await page.locator('.about-contact').click();
  await expect(page).toHaveURL(/#contacto$/);
});

test('About preserves the biography and stays visible without motion or JavaScript', async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-section-enter="services"]')).toHaveCSS('opacity', '1');
  await expect(page.locator('.about-composition')).toHaveCSS('transform', 'none');
  await expect(page.locator('.about-process li')).toHaveCount(3);
  await expect(page.locator('.about-personal')).toContainText('baila y enseña marinera desde niño');
  await expect(page.locator('.about-lead')).toContainText('telecomunicaciones, tecnología y educación legal');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('#sobre-mi').scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.about-portrait img')).toBeVisible();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(page.url());
  await expect(staticPage.locator('.about-composition')).toHaveCSS('opacity', '1');
  await expect(staticPage.locator('.about-composition')).toHaveCSS('transform', 'none');
  await expect(staticPage.locator('.about-process li')).toHaveCount(3);
  await noJs.close();
});
