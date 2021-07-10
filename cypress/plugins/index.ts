/// <reference types="cypress" />

import fs from 'fs';

import cypressCucumber from 'cypress-cucumber-preprocessor';
import { startDevServer } from '@cypress/webpack-dev-server';
import { lighthouse, pa11y, prepareAudit } from 'cypress-audit';

const { default: cucumber } = cypressCucumber;

interface Browser {
  name: string;
  family: string;
  channel: string;
  displayName: string;
  version: string;
  majorVersion: number;
  path: string;
  isHeaded: boolean;
  isHeadless: boolean;
}
/* eslint-disable @typescript-eslint/no-unused-vars  */
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {
  on('file:preprocessor', cucumber({ typescript: require.resolve('typescript') }));
  on('dev-server:start', async options => startDevServer({ options }));
  on('before:browser:launch', (browser: Partial<Browser> = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  /**
   * After the raw json is created, drop into the lighthouse viewer
   * https://googlechrome.github.io/lighthouse/viewer/
   */
  on('task', {
    lighthouse: lighthouse((lighthouseReport: { lhr: { requestedUrl: string; fetchTime: string } }) => {
      const dirPath = './AuditReport';

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      const name = `${process.env.npm_package_name}-${lighthouseReport.lhr.requestedUrl.replace(
        /https?:\/\/(localhost)((:?[0-9]+)?\/)/g,
        x => '',
      )}-
      ${lighthouseReport.lhr.fetchTime.split('T')[0]}`;

      fs.writeFileSync(`${dirPath}/${name}.json`, JSON.stringify(lighthouseReport, null, 2));
    }),
    pa11y: pa11y(),
  });
  return config;
};
