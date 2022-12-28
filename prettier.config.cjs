module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: "all",
  proseWrap: "always",
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
};
