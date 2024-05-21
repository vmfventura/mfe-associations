describe('First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Visits the initial project page', () => {
    cy.contains('Add Associations')
  })

  it('Add Association button exist', () => {
    cy.get('[id="addAssociations"]').should('exist')
  })
  it('Open add association', () => {
    cy.wait(3000)
    cy.get('[id="addAssociations"]').click()
    cy.contains('Projecto')
    cy.contains('Colaborator')
    cy.contains('Start Date')
    cy.contains('End Date')
    cy.contains('Fundamental')
    cy.get('[id="goBackButton"]').should('exist')
  });
  it('Write new association', () => {
    cy.wait(1000)

    cy.get('[id="addAssociations"]').click()
    cy.wait(1000)

    cy.get('[formControlName="projectId"]').select('teste projecto 1')

    cy.wait(1000)
    cy.get('[formControlName="colaboratorId"]').select('Vitor Ventura')

    cy.wait(1000)
    cy.get('[formControlName="startDate"]').type('2024-04-01')
    cy.wait(1000)

    cy.get('[formControlName="endDate"]').type('2024-04-30')

    cy.wait(1000)
    cy.get('[id="addAssociationForm"]').click()
    cy.wait(3000)
  })
  it('Should go back', () => {
    cy.get('[id="addAssociations"]').click()
    cy.get('[id="goBackButton"]').click()
  })

  it('Value should have been in table', () => {
    cy.get('app-association-list')
      .children()
  });
})

describe('First row open', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('open first row, and verify items', () => {
    cy.get('#association-1').should('exist')
    cy.get('#association-1').click()
    cy.contains('teste projecto 1')
    cy.contains('Vitor Ventura')
    cy.contains('2024-04-01')
    cy.contains('2024-04-30')
  });
})

describe('Open and close App/Edit Component', () => {
  beforeEach(() => {
    cy.visit('/')
  });
  it('should add an association and checks the length', () => {
    cy.get('app-association-list').its('length').then((size) => {
      console.log('Number of app-association-list elements:', size);
      cy.get('[id="addAssociations"]').click()
      cy.get('[formControlName="projectId"]').select('teste projecto 1')
      cy.get('[formControlName="colaboratorId"]').select('Vitor Ventura')
      cy.get('[formControlName="startDate"]').type('2024-04-01')
      cy.get('[formControlName="endDate"]').type('2024-04-30')
      cy.get('[id="addAssociationForm"]').click()
      cy.wait(6000)
      cy.get('app-association-list').its('length').then((size2) => {
        console.log('Number of app-association-list elements:', size2);
        expect(size).to.be.lessThan(size2);
      });
    });
  });
});
