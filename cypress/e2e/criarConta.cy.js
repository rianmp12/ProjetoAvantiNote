describe('Criar conta', () => {
  it('Criar conta com sucesso', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a').click()
    cy.get(':nth-child(4) > input').type('Rian M')
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type('rmp12@gmail.com')
    cy.wait(1000);
    cy.get(':nth-child(6) > input').type('123456')
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click('')
    cy.get('h2').should('contain','Faça seu login')
  
  })
})