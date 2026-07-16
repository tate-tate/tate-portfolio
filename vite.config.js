import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dsv from '@rollup/plugin-dsv';

export default defineConfig({
  plugins: [
    react(),
    dsv(),
  ],
  base: '/', // Root-relative paths for custom-domain GitHub Pages deploys
  server: {
    fs: {
      strict: false, // Allow access to files outside the root
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
  },
});