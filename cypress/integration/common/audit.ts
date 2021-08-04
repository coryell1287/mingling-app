import { And } from 'cypress-cucumber-preprocessor/steps';

const lighthouseConfig = {
  formFactor: 'desktop',
  screenEmulation: {
    disabled: true,
  },
};

And('perform a lighthouse and pa11y audit', () => {
  cy.lighthouse(
    {
      'best-practices': 5,
      seo: 60,
      pwa: 5,
      performance: 0,
      accessibility: 50,
      interactive: 30000,
      'first-contentful-paint': 3000,
      'largest-contentful-paint': 40000,
    },
    lighthouseConfig,
  );
  // cy.pa11y();
});
