const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  profile: true,
  devtool: 'source-map',
  performance: {
    hints: 'error',
    maxEntrypointSize: 420 * 1024,
    maxAssetSize: 420 * 1024,
  },
  plugins: [
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
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new webpack.ids.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new WebpackManifestPlugin({
      seed: {
        name: 'Assets Manifest file',
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-analyzer/bundle-analyzer.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      MOCK_SERVICE_WORKER: JSON.stringify(false),
    }),
  ],
});
