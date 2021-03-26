const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
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
    new webpack.ids.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      seed: {
        name: 'Assets Manifest file',
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundleAnalyzer/bundleAnalyzer.html',
    }),
  ],
});
