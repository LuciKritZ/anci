import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.*',
    '!src/**/*.test.*',
    '!src/**/*.spec.*',
    '!src/**/__tests__/**',
    '!src/**/.storybook/**',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  watch: process.env.NODE_ENV === 'development',
  skipNodeModulesBundle: true,
  treeshake: true,
  outDir: 'dist',
});
