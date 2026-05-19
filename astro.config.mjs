// @ts-check
import { defineConfig } from "astro/config";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import react from "@astrojs/react";

import node from "@astrojs/node";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [
      paraglideVitePlugin({
        strategy: ["url", "baseLocale"],
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
      }),
    ],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
