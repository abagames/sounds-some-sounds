var glob = require('glob');

module.exports = {
  entry: {
    sss: glob.sync('./src/sss/**/*.ts'),
    sample: glob.sync('./src/**/*.ts'),
  },
  output: {
    path: './docs/libs',
    publicPath: '/libs/',
    filename: '[name]/index.js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', "", ".webpack.js", ".web.js", ".js"]
  },
  devServer: {
    contentBase: 'docs'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|web_modules)/,
        loader: 'ts-loader'
      }
    ]
  }
};