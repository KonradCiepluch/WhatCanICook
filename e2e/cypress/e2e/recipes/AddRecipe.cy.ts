describe('Adding new recipe', () => {
  const testEmail = 'koncie265@gmail.com';
  const testPassword = '123456';

  const { name, category, subCategory, difficultyLevel, prepareTime, productsList, tags, steps } = {
    name: 'Sałatka grecka',
    category: 'Wege',
    subCategory: 'Dania Wegetariańskie',
    difficultyLevel: 1,
    prepareTime: '15',
    productsList: [
      { name: 'pomidory', amount: '2', unit: 'szt' },
      { name: 'ogórki', amount: '4', unit: 'szt' },
      { name: 'czerwona cebula', amount: '1', unit: 'szt' },
      { name: 'czarne oliwki', amount: '100', unit: 'gram' },
      { name: 'grecki ser feta', amount: '250', unit: 'gram' },
      { name: 'suszone oregano', amount: '10', unit: 'gram' },
      { name: 'oliwa', amount: '20', unit: 'ml' },
      { name: 'pieprz', amount: '3', unit: 'gram' },
    ],
    tags: ['pomysł na sałatkę', 'dobre sałatki'],
    steps: [
      'Pomidory pokroić na ćwiartki, usunąć szypułki, następnie pokroić na jeszcze mniejsze kawałki.',
      '	Ogórki obrać (można pozostawić miejscami paseczki zielonej skórki), przekroić wzdłuż na pół a następnie na grubsze półplasterki.',
      'Cebulę cienko poszatkować. Oliwki przekroić na połówki.',
      'Wszystkie składniki umieścić w jednej większej salaterce lub w 4 mniejszych, doprawić świeżo zmielonym pieprzem.',
      ' Na wierzchu położyć plasterki sera feta. Posypać suszonym oregano i polać oliwą. Można doprawić solą, ale ser feta jest już dość słony.',
    ],
  };

  const successMessage = 'Przepis został dodany, dziękujemy!';

  it('Adds new recipe', () => {
    cy.signIn(testEmail, testPassword);

    cy.get('[data-cy="Dodaj przepis"]').click();
    cy.url().should('contain', '/uzytkownik/przepis');

    cy.get('[placeholder="Nazwa dania"]').type(name);
    cy.get('[name="category"]').select(category);
    cy.get('[name="subcategory"]').select(subCategory);
    cy.get('label + [name="photo"]').selectFile('./cypress/e2e/recipes/salat.jpg', { action: 'drag-drop' });
    cy.get('[name="level"]').select(difficultyLevel);
    cy.get('[name="time"]').type(prepareTime);

    productsList.forEach(cy.addProductToList);
    cy.addTags(tags);
    steps.forEach(cy.addStep);

    cy.get('button[type=submit]').click();

    cy.contains(successMessage).should('exist');
  });
});

export default {};
