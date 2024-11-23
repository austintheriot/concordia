import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { Mode, plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    sveltekit(),
    markdown({
      mode: [Mode.HTML],
      markdownIt: {
        html: true,
        breaks: true,
        linkify: true
      }
    })
  ],

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
