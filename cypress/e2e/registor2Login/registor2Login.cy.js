describe('User Registration', () => {
  let serverId = Cypress.env('SERVER_ID')
  console.log('serverId: ', serverId)
  const uniqueSeed = Date.now().toString()
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
  const testUsername = 'testuser' + getUniqueId()
  const testEmail = `${testUsername}@${serverId}.mailosaur.net`
  const testPassword = 'Testing1234'

  beforeEach(() => {
    cy.visit('/register')
  })

  it('Fills out and submits the registration form and fill the code', () => {
    cy.get('[data-testid="username-input"]').type('testUser')
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()

    cy.wait(1500)

    // Make sure the confirmation page is displayed
    cy.get('[data-testid="confirmation-page"]').should('exist')

    // Check the email for the verification code
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail
    }).then(email => {
      expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')

      // Get the verification code from the email
      const verificationCode = email.html.body.match(/(\d{6})/)[1]
      cy.log(`Verification code: ${verificationCode}`)

      // Input the verification code on the confirmation page
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login')

      // Enter the username and password on the login page

      cy.get('[data-testid="email-input"]').type(testEmail)
      cy.get('input[type="password"]').type(testPassword)
      cy.get('button[type="submit"]').click()

      // Verify that the user is redirected to the home
      cy.url().should('include', '/interview')
    })
  })

  it('Shows an error message with invalid email address', () => {
    const invalidEmail = 'invalidemail'
    cy.get('[data-testid="username-input"]').type('testUser')
    cy.get('[data-testid="email-input"]').type(invalidEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
  
    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email')
  })
  
  it('Shows an error message with short password', () => {
    const shortPassword = 'Test1'
    cy.get('[data-testid="username-input"]').type('testUser')
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(shortPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
  
    // Verify that the error message is displayed
    cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long')
  })

  it('Shows an error message with password lacking uppercase and lowercase letters', () => {
    const noCasePassword = '12345678'
    cy.get('[data-testid="username-input"]').type('testUser')
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(noCasePassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
  
    // Verify that the error message is displayed
    cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long')
  })

  it('Shows an error message with password lacking numbers', () => {
    const noNumberPassword = 'TestPass'
    cy.get('[data-testid="username-input"]').type('testUser')
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(noNumberPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
  
    // Verify that the error message is displayed
    cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long')
  })
  
})
