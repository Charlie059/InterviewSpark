import { testPassword } from '../../support/userUtils'

describe('Test logout feature', () => {
  let testEmail
  beforeEach(() => {
    cy.visit('/login')
    cy.fixture('emailData.json').then(data => {
      testEmail = data.email
    })
  })
  it('Test logout feature', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)
    cy.get('button[type="submit"]').click()
    cy.wait(8000)
    cy.get('body').then($body => {
      if ($body.text().includes('Welcome to InterviewSpark')) {
        // If jump "Welcome to InterviewSpark" window
        cy.get('[data-cy="close-icon"]').click()
      }

      cy.get('[data-testid="nav-avatar"]').click()
      cy.contains('li', 'Logout').click()
    })

    cy.wait(2000)
    cy.url().should('include', '/login', { timeout: 40000 })
  })
})
