describe('excluir nota', () => {
  it('a nota já criada será excluida', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(4) > input').type("emi.sabrina16@gmail.com")
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type("161020")
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click()
    cy.wait(1000);
    cy.get(':nth-child(2) > h1').click()
    cy.wait(1000);
    cy.get('.sc-fnykZs').click()
  })
})