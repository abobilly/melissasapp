import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: '/intro-screen.html'
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        intro: 'intro-screen.html',
        game: 'butterfly-waterfall-integrated.html'
      }
    }
  }
});