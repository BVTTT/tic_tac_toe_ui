/* eslint-disable strict */
'use strict';

const webpack = require('webpack');

module.exports = {
  entry: ['./app/index.js'],
  output: {
    filename: 'index.js',
    library: ['TicTacToe'],
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST)
    })
  ],
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
