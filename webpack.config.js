const path = require('path');

module.exports = {
  entry: {
    bundle1: './js/sphere.js',
    bundle2: [
      './js/welcome.anime.min.js',
      './js/switchTabs.js',
      './js/nav.min.js',
      './js/pageAnimations.min.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
