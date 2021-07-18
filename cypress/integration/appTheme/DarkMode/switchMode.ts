/* eslint-disable cypress/no-force */
import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';

And('light mode is already set', () => {
  cy.get('body').should('have.attr', 'data-theme', 'light-mode');
});

When('I click the button in the main header, the view switches to dark mode', () => {
  cy.get('[for="themeSwitch"]').click({ force: true });
  cy.get('body').should('have.attr', 'data-theme', 'dark-mode');
});

Then('I click the button in the main header to switch theme back to light mode', () => {
  cy.get('[for="themeSwitch"]').click({ force: true });
  cy.get('body').should('have.attr', 'data-theme', 'light-mode');
});
