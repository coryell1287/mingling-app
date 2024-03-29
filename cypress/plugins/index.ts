/* eslint-disable compat/compat */
/// <reference types="cypress" />

import fs from 'fs';

import cypressCucumber from 'cypress-cucumber-preprocessor';
import { startDevServer } from '@cypress/webpack-dev-server';
import { lighthouse, pa11y, prepareAudit } from 'cypress-audit';

import { Pa11y, Browser } from '../types/index';

const { default: cucumber } = cypressCucumber;

/* eslint-disable @typescript-eslint/no-unused-vars  */
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {
  on('file:preprocessor', cucumber({ typescript: require.resolve('typescript') }));
  on('dev-server:start', async options => startDevServer({ options }));
  on('before:browser:launch', (browser: Partial<Browser> = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  const dirPath = './audit-report';
  /**
   * After the raw json is created, drop into the lighthouse viewer
   * https://googlechrome.github.io/lighthouse/viewer/
   */
  on('task', {
    lighthouse: lighthouse((lighthouseReport: { lhr: { requestedUrl: string; fetchTime: string } }) => {
      const today = new Date();
      let h = today.getHours().toString();
      let m = today.getMinutes().toString();
      if (JSON.parse(h) < 10) h = '0' + h;
      if (JSON.parse(m) < 10) m = '0' + m;
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(`${dirPath}/lighthouse`, { recursive: true });
        fs.mkdirSync(`${dirPath}/pa11y`, { recursive: true });
      }

      const name = `${process.env.npm_package_name}-${
        new URL(lighthouseReport.lhr.requestedUrl).pathname === '/'
          ? 'home'
          : new URL(lighthouseReport.lhr.requestedUrl).pathname.slice(1)
      }-
      ${lighthouseReport.lhr.fetchTime.split('T')[0]}_${h}:${m}`;
      fs.writeFileSync(`${dirPath}/lighthouse/${name}.json`, JSON.stringify(lighthouseReport, null, 2));
    }),

    pa11y: pa11y((pa11yReport: Pa11y) => {
      const today = new Date();
      let dd = today.getDate().toString();
      let mm = (today.getMonth() + 1).toString();
      const yyyy = today.getFullYear();
      let h = today.getHours().toString();
      let m = today.getMinutes().toString();

      if (JSON.parse(dd) < 10) dd = '0' + dd.toString();
      if (JSON.parse(mm) < 10) mm = '0' + mm;
      if (JSON.parse(h) < 10) h = '0' + h;
      if (JSON.parse(m) < 10) m = '0' + m;

      const date = `${mm}-${dd}-${yyyy}_${h}:${m}`;
      fs.writeFileSync(
        `${dirPath}/pa11y/${pa11yReport.documentTitle.slice(1).toLowerCase()}-${date}.json`,
        JSON.stringify(pa11yReport, null, 2),
      );
    }),
  });
  return config;
};
