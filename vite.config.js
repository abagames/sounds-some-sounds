const path = require("path");
const { defineConfig } = require("vite");

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  base: "./",
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "sss",
      formats: ["umd"],
      fileName: () => `index.js`,
    },
    outDir: "build/",
    minify: false,
  },
};

module.exports = defineConfig(config);
