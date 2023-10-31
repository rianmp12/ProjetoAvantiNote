describe('criar nota', () => {
  it('Deverá ser criado uma nota', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(4) > input').type("emi.sabrina16@gmail.com")
    cy.wait(1000);
    cy.get(':nth-child(5) > input').type("161020")
    cy.wait(1000);
    cy.get('.sc-hKMtZM').click()
    cy.wait(1000);
    cy.get('.sc-breuTD').click()
    cy.get('.sc-iBkjds > input').type('Anotações')
    cy.wait(1000);
    cy.get('.sc-bczRLJ').type('Amanhã tenho apresentação de seminário')
    cy.wait(1000);
    cy.get('.tags > .sc-gsnTZi > input').type('Out')
    cy.get('.sc-hKMtZM').click()
    cy.get('span').click()
    cy.get('a').click()
  })
})