// @ts-check
import { defineConfig, memoryCache } from "astro/config";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import react from "@astrojs/react";

import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [react()],
  experimental: {
    cache: {
      provider: memoryCache(),
    },
    routeRules: {
      "*": { swr: 1200 },
    },
  },
  vite: {
    plugins: [
      paraglideVitePlugin({
        strategy: ["url", "cookie", "baseLocale"],
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
      }),
    ],
  },
  output: "server",
  adapter: netlify(),
});