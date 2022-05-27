describe('Calculator', () => {
  it('Can make calculations', () => {
    cy.visit('/')

    cy.findByText(/^1$/).click()
    cy.findByText(/^\+$/).click()
    cy.findByText(/^2$/).click()
    cy.findByText(/^=$/).click()

    cy.findByTestId(/total/i).should('have.text', '3')
  })
})
