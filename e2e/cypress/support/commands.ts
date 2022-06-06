/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command which allows to sign in user with credentials passed in parameters
       * @example cy.signIn('example@com', '123456')
       */
      signIn: (email: string, pw: string) => void;
      addProductToList: (product: { name: string; amount: string; unit: string }) => void;
      addTags: (tags: string[]) => void;
      addStep: (step: string) => void;
    }
  }
}

Cypress.Commands.add('signIn', (email: string, pw: string) => {
  const submitButton = /zaloguj się/i;

  cy.visit('/');
  cy.get('[data-cy="burger"]').click();
  cy.get('[data-cy="Użytkownik"]').click();
  cy.get('[data-cy="Logowanie"]').click();
  cy.url().should('contain', 'login');

  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(pw);

  cy.contains(submitButton).click();
});

Cypress.Commands.add('addProductToList', ({ name, amount, unit }) => {
  cy.get('[placeholder="Nazwa produktu"]').type(name);
  cy.get('[placeholder="Ilość"]').type(amount);
  cy.get('[name="unit"]').select(unit);
  cy.get('select+button').click();
});

Cypress.Commands.add('addTags', (tags) => {
  cy.get('[role="combobox"]').click();
  tags.forEach((tag) => cy.contains(tag).click());
  cy.get('[role="combobox"]').blur();
});

Cypress.Commands.add('addStep', (step) => {
  cy.get('[placeholder="Opis"]').type(step);
  cy.get('div+input+button').click();
});

export default {};

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
