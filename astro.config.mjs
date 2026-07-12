// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://arclyfesta.vincensiuselang.workers.dev', // ← ganti kalau nanti pakai domain sendiri
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
