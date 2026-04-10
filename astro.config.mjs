// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-strapi-frontend.vercel.app",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
      },
    ],
  },
  i18n: {
    defaultLocale: "hu",
    locales: ["hu", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
