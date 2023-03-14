/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 150,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,

  plugins: [require.resolve("prettier-plugin-astro"), require.resolve("prettier-plugin-svelte"), require.resolve("prettier-plugin-tailwindcss")],

  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
