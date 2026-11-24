// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages:
//  - user site (username.github.io repo): leave BASE_PATH empty
//  - project site (any other repo name): BASE_PATH=/repo-name
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { assets: '_assets' },
  image: { responsiveStyles: false },
});
