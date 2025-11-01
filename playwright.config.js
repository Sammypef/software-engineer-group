import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  testMatch: '**/*.spec.js',
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
  },
});
