import cypressCucumber from 'cypress-cucumber-preprocessor';
import { startDevServer } from '@cypress/webpack-dev-server';
import { lighthouse, pa11y, prepareAudit } from 'cypress-audit';

const { default: cucumber } = cypressCucumber;

export default (on, config) => {
  on('dev-server:start', async options => startDevServer({ options }));
  on('file:preprocessor', cucumber());
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse(lighthouseReport => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y(pa11yReport => {
      console.log(pa11yReport);
    }),
  });
  return config;
};
