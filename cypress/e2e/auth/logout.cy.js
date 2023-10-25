beforeEach(() => {
  cy.visit('/login')
  cy.wait(2000)
  cy.url().should('include', '/login')
})
it('Test logout feature', () => {
  cy.get
})
