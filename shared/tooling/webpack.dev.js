const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const yargs = require('yargs');
const common = require('./webpack.common.js');

const args = yargs(process.argv).argv;
const mock = args.env === 'mock';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    overlay: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    contentBase: resolve(__dirname, '../../dist'),
    writeToDisk: true,
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      MOCK_SERVICE_WORKER: mock ? JSON.stringify(true) : JSON.stringify(false),
    }),
  ],
});
