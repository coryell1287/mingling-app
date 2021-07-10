const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'web',
  profile: true,
  stats: {
    children: false,
  },
  context: resolve(__dirname, '../../src'),
  entry: {
    app: { import: './index.tsx' },
  },
  resolve: {
    fallback: { path: require.resolve('path-browserify') },
    extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.ico'],
    alias: {
      '@assets': resolve(__dirname, '../../src/assets'),
      '@components': resolve(__dirname, '../../src/components'),
      '@mocks': resolve(__dirname, '../../src/mocks'),
      '@styles': resolve(__dirname, '../../src/styles'),
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, '../../dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              // context: resolve(__dirname, '../..'),
              // configFile: require.resolve('../../tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv({ browsers: 'last 2 versions' })],
              },
            },
          },
        ],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    //Include the CSS extract plugin
    //doing so will allow the CSS to load before the JavaScript bundle
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     files: '../../src/**/*.{ts,tsx,js,jsx}',
    //   },
    // }),
    // new TsconfigPathsPlugin({
    //   configFile: '/home/coryell/Development/microApps/mingling-app/mingling-app_client/tsconfig.json',
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../src/assets/images',
          to: './assets/images',
        },
        {
          from: '../src/assets/icons',
          to: './assets/icons',
        },
        {
          from: '../src/manifest.webmanifest',
          to: './',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['vendors', 'app'],
      chunksSortMode: 'manual',
    }),
    new webpack.DefinePlugin({
      MOCK_SERVICE_WORKER: JSON.stringify(false),
    }),
  ],
};
