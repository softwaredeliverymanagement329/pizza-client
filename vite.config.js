import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: { sourcemap: true },
  plugins: [
    istanbul({
      include: ['**/*'],
      exclude: ['node_modules'],
      requireEnv: false,
    }),
  ],
});
