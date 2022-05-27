describe('Calculator', () => {
  it('Can make calculations', () => {
    cy.visit('http://localhost:8080/')

    cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)').click()
    cy.get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)').click()
    cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)').click()
    cy.get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)').click()

    cy.get('.css-lq9ahq-calculator-display--CalculatorDisplay').should(
      'have.text',
      '3',
    )
  })
})
