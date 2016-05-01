var LiveReloadPlugin = require('webpack-livereload-plugin');
var glob = require('glob');

module.exports = {
  entry: {
    sss: glob.sync('./src/sss/**/*.ts'),
    app: glob.sync('./src/**/*.ts'),
  },
  output: {
    path: '.',
    filename: '[name]/index.js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', "", ".webpack.js", ".web.js", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|web_modules)/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};