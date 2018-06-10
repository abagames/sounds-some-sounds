const path = require("path");

module.exports = {
  mode: process.env.WEBPACK_SERVE ? "development" : "production",
  entry: {
    sss: "./src/sss/index.ts",
    sample: "./src/sample/index.ts"
  },
  output: {
    path: path.join(__dirname, "docs/libs"),
    filename: "[name]/index.js",
    library: ["[name]"],
    libraryTarget: "umd"
  },
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
