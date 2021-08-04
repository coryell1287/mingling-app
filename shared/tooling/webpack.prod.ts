import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';

const config = merge<webpack.Configuration>(common, {
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      MOCK_SERVICE_WORKER: JSON.stringify(false),
    }),
  ],
});

export default config;
