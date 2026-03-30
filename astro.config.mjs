// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
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
