describe('Subscribing newsletter', () => {
  const testEmail = 'koncie265@gmail.com';
  const successMessage = 'Email został zapisany do naszej bazy. Dziękujemy!';
  const submitButton = /wyślij/i;

  it('Adds user to newsletter', () => {
    cy.visit('/');
    cy.get('[placeholder="wpisz adres email"]').type(testEmail);
    cy.contains(submitButton).click();
    cy.contains(successMessage).should('exist');
  });
});

export default {};
