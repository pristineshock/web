import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import partytown from "@astrojs/partytown";
import { SITE } from "./src/config.mjs";
import svelte from "@astrojs/svelte";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import { readingTimeRemarkPlugin } from "./src/utils/frontmatter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => (SITE.googleAnalyticsId ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : []);

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? "always" : "never",
  output: "static",
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: {
          forward: ["dataLayer.push"],
        },
      })
    ),
    svelte(),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: true,
      svg: false,
      logger: 1,
    }),
    mdx(),
  ],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
