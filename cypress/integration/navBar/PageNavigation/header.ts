import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I click on the About link, I navigate to the About page', () => {
  cy.get('[href="/about"]').click();
  cy.title().should('include', 'About');
});

When('I click on Contact link, I navigate to the Contact page', () => {
  cy.get('[href="/contact"]').click();
  cy.title().should('include', 'Contact');
});

Then('I return to the Home page, when I click on the Home link', () => {
  cy.get('[href="/"]').click();
  cy.title().should('include', 'Home');
});
