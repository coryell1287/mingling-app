import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const url = '/';

Given('I am on the home page', () => {
  cy.visit(url);
  cy.title().should('include', 'Home');
});

When('I type a name into a the name field', () => {
  cy.get('[placeholder="Enter name"]').clear().type('John Doe');
});

When('I type an email into the email field', () => {
  cy.get('[placeholder="Enter email"]').clear().type('john.doe@gmail.com');
});

When('I type into the feedback field', () => {
  cy.get('#textArea').clear().type('I really enjoyed the experience.');
});

When('I press the submit button', () => {
  cy.get('[aria-label="Contact form"]').submit();
});

Then('popup should display the message "Feedback was submitted successfully."', () => {
  cy.get('#modal').contains('Feedback was submitted successfully.');
});
