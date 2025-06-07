import { defineConfig } from 'vite';

export default defineConfig(async () => ({
  css: {
    postcss: './postcss.config.js',
  },
}));
