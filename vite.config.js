import { defineConfig } from 'vite';

// GitHub Pages serves this site from https://<user>.github.io/geography-trivia/,
// so every asset URL needs that prefix. `base` tells Vite to add it.
export default defineConfig({
  base: '/geography-trivia/',
});
