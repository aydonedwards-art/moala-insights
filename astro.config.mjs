import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical home (D26). Change here if the subdomain decision changes.
export default defineConfig({
  site: 'https://insights.moalaglobal.com',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
