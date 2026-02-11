const purgecss = require("@fullhuman/postcss-purgecss");
const purgecssPlugin = purgecss.default ?? purgecss;

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: isProduction
    ? [
        purgecssPlugin({
          content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
          safelist: ["hidden", "hovered", "paused"],
          defaultExtractor: (content) => content.match(/[A-Za-z0-9_-]+/g) || []
        })
      ]
    : []
};
