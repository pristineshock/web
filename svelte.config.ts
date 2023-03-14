import { vitePreprocess } from "@astrojs/svelte";

export default {
  emitCss: true,
  compilerOptions: { hydratable: true },
  preprocess: vitePreprocess(),
};
