describe('login', () => {
  it('Deve falhar ao tentar realizar o login', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(4) > input').type("emi.sabrina16@gmail.com")
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type("ajbhvhka")
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click()
    cy.get('h2').should('contain','Faça seu login')
  })
})