const report = require('multiple-cucumber-html-reporter');
const os = require('os');

report.generate({
  jsonDir: './cypress/cucumber-json',
  reportPath: './cucumber-report',
  pageTitle: 'mingling-staging feature report',
  reportName: 'mingling-staging',
  displayDuration: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: '60',
    },
    device: os.hostname(),
    platform: {
      name: process.platform,
      version: process.release.lts,
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'mingling-staging' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Date', value: new Date() },
    ],
  },
});
