const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
    }],
  },
  resolve: { modules: ['node_modules', path.resolve(__dirname)] },
};
