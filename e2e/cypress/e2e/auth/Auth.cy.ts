describe('WhatCanICook App', () => {
  it('Renders app', () => {
    const homepageHeading = 'Znajdź przepisy według kategorii';

    cy.visit('/');
    cy.contains(homepageHeading).should('exist');
  });

  it('Logs in a user in an app', () => {
    const testEmail = 'koncie265@gmail.com';
    const testPassword = '123456';
    const userPageHeading = 'Strona użytkownika';

    cy.signIn(testEmail, testPassword);

    cy.contains(userPageHeading).should('exist');
  });
});

export default {};
