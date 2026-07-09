import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        rechtliches: resolve(import.meta.dirname, 'rechtliches.html'),
        404: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
