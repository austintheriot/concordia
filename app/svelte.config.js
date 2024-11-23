import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex()],

  kit: {
    // see https://svelte.dev/docs/kit/adapter-static
    adapter: adapter({
      // The directory to write prerendered pages to. It defaults to build.
      pages: 'build',
      // The directory to write static assets
      assets: 'build',
      // Specify a fallback page for SPA mode
      fallback: undefined,
      precompress: true,
      strict: true
    }),
    // config for deploying to GitHub pages
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  },

  extensions: ['.svelte', '.svx']
};

export default config;
