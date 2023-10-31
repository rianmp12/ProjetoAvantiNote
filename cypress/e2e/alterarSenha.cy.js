describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(4) > input').type("emi.sabrina16@gmail.com")
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type("161020")
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click()
    cy.wait(1000);
    cy.get('.sc-jSMfEi').click()
    cy.wait(1000);
    cy.get(':nth-child(4) > input').type('161020')
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type('161020')
    cy.get('.sc-hKMtZM').click()
    cy.get('a').click()
    cy.get('.sc-kDDrLX').should('contain','Avantinotes')
  })
})