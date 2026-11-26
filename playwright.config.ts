import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

// Accessibility checks against the prerendered build in dist/ (run `npm run build` first).
export default defineConfig({
  testDir: 'tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // Always start a fresh server: a leftover preview server can keep serving an old build.
    reuseExistingServer: false,
  },
});
