// vite.config.js

import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [createHtmlPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point for your static HTML
      },
    },
  },
});