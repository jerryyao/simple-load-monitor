const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    }, {
      test: /\.(css)$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader?importLoaders=1&modules&localIdentName=[local]--[hash:base64:5]',
    }],
  },
  resolve: { modules: ['node_modules', path.resolve(__dirname)] },
};
