/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

const lighthouseConfig = {
  formFactor: 'desktop',
  screenEmulation: {
    disabled: true,
  },
};

describe('audit', () => {
  context('Mingling app', () => {
    it('audit the home page', () => {
      cy.visit('/');
      cy.lighthouse(
        {
          'best-practices': 50,
          seo: 60,
          pwa: 50,
          performance: 50,
          accessibility: 50,
          interactive: 2000,
          'first-contentful-paint': 2000,
          'largest-contentful-paint': 3000,
        },
        lighthouseConfig,
      );
      // cy.pa11y();
    });

    it('audits the about page', () => {
      cy.visit('/about');

      cy.lighthouse(
        {
          'best-practices': 50,
          seo: 60,
          pwa: 50,
          performance: 50,
          accessibility: 50,
          interactive: 2000,
          'first-contentful-paint': 2000,
          'largest-contentful-paint': 3000,
        },
        lighthouseConfig,
      );

      // cy.pa11y();
    });

    it('audits the contact page', () => {
      cy.visit('/contact');

      cy.lighthouse(
        {
          'best-practices': 50,
          seo: 60,
          pwa: 50,
          performance: 50,
          accessibility: 50,
          interactive: 2000,
          'first-contentful-paint': 2000,
          'largest-contentful-paint': 3000,
        },
        lighthouseConfig,
      );

      // cy.pa11y();
    });
  });
});
