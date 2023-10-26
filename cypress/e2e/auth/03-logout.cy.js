import { testEmail, testPassword, newPassword } from '../../support/userUtils';

describe("Test logout feature", () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('Test logout feature', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('input[type="password"]').type(newPassword);
    cy.get('button[type="submit"]').click();
    cy.wait(8000)
    cy.get('body').then($body => {
      if ($body.text().includes('Welcome to InterviewSpark')) {
        // If jump "Welcome to InterviewSpark" window
        cy.get('[data-cy="close-icon"]').click();
      }

      cy.get('[data-testid="nav-avatar"]').click();
      cy.contains('li', 'Logout').click();
    });


    cy.wait(2000)
    cy.url().should('include', '/login', { timeout: 40000 })

  })
})
