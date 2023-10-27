import { serverId, newPassword } from '../../support/userUtils'

describe('Reset Password with Resend', () => {
  let testEmail
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.fixture('emailData.json').then(data => {
      testEmail = data.email
    })

    cy.visit('/login')
    cy.wait(2000)
    cy.url().should('include', '/login')
  })
  it('reset successfully with resend correct credentials', () => {
    // cy.get('[data-testid="email-input"]').scrollIntoView().type(testUser.email)

    // cy.get('input[type="password"]').type(password)
    cy.get('form').contains('Forgot Password?').click()

    cy.wait(6000)

    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/forgot-password', { timeout: 500000 })

    // // Find the email input by its type and type the email
    cy.get('form').find('input[type="email"]').type(testEmail)

    // Verify that the input contains the correct email
    cy.get('form').find('input[type="email"]').should('have.value', testEmail)

    cy.get('button[type="submit"]').click()

    cy.wait(4000)

    // Make sure the confirmation page is displayed
    cy.url().should('include', '/password-reset-validation/', { timeout: 4000 })

    // // Check the email for the verification code
    cy.mailosaurGetMessage(
      serverId,
      {
        sentTo: testEmail
      },
      {
        timeout: 30000 // 30 seconds timeout
      }
    ).then(email => {
      expect(email.subject).to.equal('Verification code: {####}')

      // Get the verification code from the email
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]
      cy.log(`Verification code: ${verificationCode}`)

      // Input the verification code on the confirmation page
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      cy.get('input[type="password"]').type(newPassword)
      cy.get('button[type="submit"]').click()

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login')
    })
  })

  it('Test Login with reset password', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('input[type="password"]').type(newPassword)
    cy.get('button[type="submit"]').click()
    cy.wait(10000)
    cy.url().should('include', '/interview', { timeout: 40000 })
  })
})
