describe('Searching for a recipe', () => {
  const recipeName = 'spaghetti';
  const recipePageHeading = 'Spaghetti';

  it('Search a particular recipe', () => {
    cy.visit('/');
    cy.get('[data-cy="search"]').click();
    cy.get('[placeholder="Wyszukaj przepis ..."]').type(recipeName);
    cy.get('[data-cy="Spaghetti"]').should('be.visible').click();
    cy.url().should('contain', 'przepisy/dania-i-przekaski/dania-glowne/spaghetti');
    cy.contains(recipePageHeading).should('exist');
  });
});

export default {};
