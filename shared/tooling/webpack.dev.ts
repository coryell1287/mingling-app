import { merge } from 'webpack-merge';
import { resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import common from './webpack.common';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config = merge<Configuration>(common, {
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
    new WorkboxPlugin.GenerateSW({
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
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default config;
