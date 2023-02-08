describe('first test', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'GatitoConRulos',
      name: 'Leandro Battocchio',
      password: '12345'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('frontpage can be visit', () => {
    cy.contains('APLICACION DE NOTAS')
    cy.contains('Hide notes').click()
    cy.contains('Show notes')
  })

  it('can login and create a note', () => {
    cy.get('[placeholder="Username"]').type('GatitoConRulos')
    cy.get('[placeholder="Password"]').type('12345')
    cy.get('[name="login-form-button"]').click()
    cy.get('[placeholder="content de la nota..."]').type('A new note from tests')
    cy.contains('Desloguearse')
    cy.contains('Enviar nota').click()
    cy.contains('Show notes').click()
    cy.contains('A new note from tests')
  })
})
