/* eslint-disable cypress/no-force */
import { When } from 'cypress-cucumber-preprocessor/steps';

When('I type a name into a the name field', () => {
  cy.findByPlaceholderText(/enter name/i)
    .clear({ force: true })
    .type('John Doe');
});

When('I type an email into the email field', () => {
  cy.findByPlaceholderText(/enter email/i)
    .clear({ force: true })
    .type('john.doe@gmail.com');
});

When('I type into the feedback field', () => {
  cy.get('#textArea').clear({ force: true }).type('I really enjoyed the experience.');
});

// When('I press the submit button', () => {
//   // cy.findByLabelText(/contact form/i).submit();
// });

// Then(`popup should display the message {string}`, message => {
//   cy.get('#modal').contains(message).should('be.visible');
// });
