import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base = repo name for GitHub Pages deployment (https://mohammednaji20.github.io/bader.cof/)
export default defineConfig({
  plugins: [react()],
  base: '/bader.cof/',
});
