import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// GitHub Pages serves the site from /henry-viii-timeline/, so the build and
// `vite preview` use that prefix. The dev server stays at the root.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/henry-viii-timeline/' : '/',
  plugins: [react()],
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
  },
  server: { port: 8471 },
  preview: { port: 8471 },
  test: {
    environment: 'jsdom',
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
}));
