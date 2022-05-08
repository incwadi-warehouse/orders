describe('reservation', () => {
  it('show reservation', () => {
    cy.visit('/')
    cy.url().should('include', '/')
  })
})
