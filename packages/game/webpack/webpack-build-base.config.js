/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const BUILD_PARAMS = {
  // FIXME: change SCENARIO_NAME
  SCENARIO_NAME: 'shakuro-playable-test',
  LANGUAGE: 'en',
  PLATFORM: process.env.PLATFORM,
  VERSION: 1,
};

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
    path: path.resolve(__dirname, `../dist/${process.env.PLATFORM}`),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s(x)?$/,
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
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PLATFORM: JSON.stringify(process.env.PLATFORM),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `index-${process.env.PLATFORM}.html`,
      title: 'shakuro playable test',
      appMountId: 'app',
      filename: `${BUILD_PARAMS.SCENARIO_NAME}_${BUILD_PARAMS.LANGUAGE}_${BUILD_PARAMS.PLATFORM}_v${BUILD_PARAMS.VERSION}.html`,
      inject: 'body',
      inlineSource: '.(js|css)$',
      minify: false,
      hash: false,
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
};

module.exports = config;
