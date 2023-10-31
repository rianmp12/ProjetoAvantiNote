describe('pesquisar', () => {
  it('Pesquisar nota por titulo', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(4) > input').type("emi.sabrina16@gmail.com")
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type("161020")
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click()
    cy.get('.sc-crXcEl').type('sdzhfjdtj')
    cy.get('.sc-kDDrLX').should('contain','Avantinotes')
    
  })
})