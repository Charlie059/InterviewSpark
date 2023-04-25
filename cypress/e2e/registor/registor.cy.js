describe('User Registration', () => {
  const serverId = 'pirc3bnk' // Replace SERVER_ID with an actual Mailosaur Server ID
  const uniqueSeed = Date.now().toString()
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
  const testUsername = 'testuser' + getUniqueId()
  const testEmail = `${testUsername}@${serverId}.mailosaur.net`
  const testPassword = 'password1234'

  beforeEach(() => {
    cy.visit('/register')
  })

  it('Fills out and submits the registration form', () => {
    cy.get('[data-testid="username-input"]').type(testUsername)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()

    cy.wait(1500)

    // Make sure the confirmation page is displayed
    cy.get('[data-testid="confirmation-page"]').should('exist')
  })

  it('Receives a registration confirmation email and inputs the code', () => {
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail
    }).then(email => {
      expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')

      // Get the verification code from the email
      const verificationCode = email.html.body.match(/(\d{6})/)[1]
      cy.log(`Verification code: ${verificationCode}`)
    })
  })
})
