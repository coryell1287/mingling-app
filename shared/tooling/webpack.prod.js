const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production',
  profile: true,
  performance: {
    hints: 'error',
    maxEntrypointSize: 500000,
  },
  plugins: [
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
