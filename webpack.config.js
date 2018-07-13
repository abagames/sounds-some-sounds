const path = require("path");

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
  if (process.env.WEBPACK_SERVE) {
    env.sample = "rects";
  }
  if (env == null || env.sample == null) {
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
    var sample = env.sample;
    config.entry = "./src/samples/" + sample + ".ts";
    config.output = {
      path: path.join(__dirname, "docs"),
      filename: sample + ".js"
    };
  }
  return config;
};
