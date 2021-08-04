import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

const config: webpack.Configuration = {
  target: 'web',
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
      '@components': resolve(__dirname, '../../src/components'),
      '@assets': resolve(__dirname, '../../src/assets'),
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
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
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

export default config;
