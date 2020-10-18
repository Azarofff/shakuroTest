/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions, ie 11',
        modules: false,
      },
    ],
  ],
};

const config = {
  context: path.resolve(__dirname, '../src'),
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    host:'0.0.0.0',
    contentBase: '../dist',
    port: 5000,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PLATFORM: JSON.stringify(process.env.PLATFORM),
    }),
    new HtmlWebpackPlugin({
      template: 'index-dev.html',
      title: 'shakuro creatives',
      appMountId: 'app',
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      hash: false,
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
};

module.exports = config;
