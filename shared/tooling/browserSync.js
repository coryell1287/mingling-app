const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi = require('strip-ansi');
const webpackConfig = require('../tooling/webpack.dev');
// docker run -it --rm help-desk -v $PWD/artifacts:/artifacts /bin/sh -c "npm run test:coverage"

// - run:
//           name: "Build docker image for testing"
//           command: |
//             # docker build -f shared/config/Dockerfile.dev -t "$AWS_RESOURCE_NAME_PREFIX"-test .
//             # docker run \
//             # -it \
//             # --name test-image \
//             # "$AWS_RESOURCE_NAME_PREFIX"-test \
//             # /bin/bash -c "npm run test:coverage"
//             # docker run -itd test-image /bin/sh -c "ls -lah"
//             # docker cp test-image:/coverage ~/coverage
const bundler = webpack(webpackConfig);

bundler.plugin('done', stats => {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000,
    });
  }
  browserSync.reload();
});

browserSync.init({
  server: 'sync',
  open: false,
  logFileChanges: false,
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    }),
  ],
  plugins: ['bs-fullscreen-message'],
  files: ['src/**/*'],
});
