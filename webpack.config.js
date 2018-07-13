const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sampleName = "rects";

module.exports = function(env) {
  const config = {
    mode: process.env.WEBPACK_SERVE ? "development" : "production",
    resolve: {
      extensions: [".ts", ".js"],
      modules: ["node_modules", "web_modules"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|web_modules)/,
          loader: "awesome-typescript-loader"
        }
      ]
    }
  };
  if (!process.env.WEBPACK_SERVE && (env == null || env.sample == null)) {
    config.entry = "./src/index.ts";
    config.output = {
      path: path.join(__dirname, "build"),
      filename: "index.js",
      library: ["sss"],
      libraryTarget: "umd"
    };
    config.module.rules[0].query = {
      declaration: true,
      declarationDir: "typings"
    };
  } else {
    config.entry = "./src/samples/" + sampleName + ".ts";
    config.output = {
      path: path.join(__dirname, "docs"),
      filename: sampleName + ".js"
    };
    config.plugins = [
      new HtmlWebpackPlugin({
        template: "src/samples/index.html",
        filename: "index.html",
        title: sampleName,
        inject: false
      })
    ];
  }
  return config;
};
