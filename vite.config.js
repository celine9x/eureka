import { defineConfig } from 'vite';

export default defineConfig({
  root: 'nexus',
  publicDir: false,
  server: {
    fs: {
      // allow serving files from the whole repo root
      allow: ['..'],
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
