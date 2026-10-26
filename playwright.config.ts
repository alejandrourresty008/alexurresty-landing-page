import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.ts', fullyParallel: false, workers: 1,
  timeout: 45000, retries: 0, reporter: 'list',
  use: { baseURL: process.env.BASE_URL || 'http://127.0.0.1:4177', channel: 'chrome', headless: true, viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
});
