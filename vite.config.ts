import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: process.env.NODE_ENV !== 'production',
  },
  build: {
    outDir: 'build',
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'esbuild',
  },
});
