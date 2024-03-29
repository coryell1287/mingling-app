const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const { GenerateSW } = require('workbox-webpack-plugin');
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
      '@types': resolve(__dirname, '../../src/types'),
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
    new GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      exclude: [/.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [
        {
          urlPattern: /.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['vendors', 'app'],
      chunksSortMode: 'manual',
    }),
  ],
};
