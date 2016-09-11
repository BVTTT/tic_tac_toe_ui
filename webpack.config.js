/* eslint-disable strict */
'use strict';

module.exports = {
  entry: './source/index.js',
  output: {
    filename: 'index.js',
    library: ['TicTacToe'],
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
