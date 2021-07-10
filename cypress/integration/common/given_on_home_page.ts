import { Given } from 'cypress-cucumber-preprocessor/steps';

const url = '/';

Given('I am on the home page', () => {
  cy.visit(url);
  cy.title().should('include', 'Home');
});
