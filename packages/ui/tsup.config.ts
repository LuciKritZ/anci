import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  watch: process.env.NODE_ENV === 'development',
  skipNodeModulesBundle: true,
  treeshake: true,
  outDir: 'dist',
  external: [
    // Exclude all Storybook files
    '**/*.stories.*',
    '**/.storybook/**',
    '**/stories/**',
    // Exclude test files
    '**/__tests__/**',
    '**/*.test.*',
    '**/*.spec.*',
  ],
  // Ensure external patterns are strictly enforced
  noExternal: [/^(?!.*\.(stories|test|spec)\.).*$/],
});
