/* eslint-disable cypress/no-force */
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I click on the About link, I should navigate to the About page', () => {
  cy.get('[href="/about"]').click({ force: true });
  cy.title().should('include', 'About');
});

When('I click on Contact link, I should navigate to the Contact page', () => {
  cy.get('[href="/contact"]').click({ force: true });
  cy.title().should('include', 'Contact');
});

Then('I return to the Home page, when I click on the Home link', () => {
  cy.get('[href="/"]').click({ force: true });
  cy.title().should('include', 'Home');
});
