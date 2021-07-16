import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I type a name into a the name field', () => {
  cy.findByPlaceholderText(/enter name/i)
    .clear()
    .type('John Doe');
});

When('I type an email into the email field', () => {
  cy.findByPlaceholderText(/enter email/i)
    .clear()
    .type('john.doe@gmail.com');
});

When('I type into the feedback field', () => {
  cy.get('#textArea').clear().type('I really enjoyed the experience.');
});

// When('I press the submit button', () => {
//   // cy.findByLabelText(/contact form/i).submit();
// });

// Then(`popup should display the message {string}`, message => {
//   cy.get('#modal').contains(message).should('be.visible');
// });
