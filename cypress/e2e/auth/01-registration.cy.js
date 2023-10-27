import {
  serverId,
  testUsername,
  invalidEmail,
  spaceEmail,
  testPassword,
  shortUsername,
  fName,
  lName,
  shortPassword,
  noUppercasePassword,
  noLowercasePassword
} from '../../support/userUtils'

describe('Dynamic Email Test', () => {
  it('Generates and writes dynamic email to a file', () => {
    const timestamp = new Date().getTime()
    const dynamicEmail = `testuser${timestamp}@pirc3bnk.mailosaur.net`

    cy.task('writeEmailToFile', dynamicEmail)
  })
})

describe('User Registration', () => {
  let testEmail
  beforeEach(() => {
    cy.visit('/register')
    cy.fixture('emailData.json').then(data => {
      testEmail = data.email
    })
  })

  it('Fills out and submits the registration form and fill the code', () => {
    cy.get('[data-testid="username-input"]', { timeout: 10000 }).type(testUsername)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()

    // Make sure the confirmation page is displayed
    cy.wait(6000)
    cy.get('[data-testid="confirmation-page"]').should('exist')

    // Check the email for the verification code
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail
    }).then(email => {
      expect(email.subject).to.equal('Verification code: {####}')
      cy.log('subject', email.subject)
      cy.log('email', email)
      expect(email.to[0].email).to.equal(testEmail)

      // Get the verification code from the email
      // const verificationCode = email.html.body.match(/(\d{6})/)[1]
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]

      // Input the verification code on the confirmation page
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login', { timeout: 40000 })
      cy.wait(5000)

      // Enter the username and password on the login page
      cy.loginApp(testEmail, testPassword)
    })
  })

  it('Shows an error message with short Username', () => {
    cy.get('[data-testid="username-input"]', { timeout: 10000 }).type(shortUsername)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
    cy.wait(3500)
    cy.get('form').contains('Username must be at least 3 characters long', { timeout: 20000 })
  })

  it('Shows error message with empty value', () => {
    cy.get('button[type="submit"]').click()
    cy.wait(3500)
    cy.get('form').should('contain', 'email is a required field')
    cy.get('form').should('contain', 'Username can only contain letters and numbers')
    cy.get('form').should('contain', 'first name is a required field')
    cy.get('form').should('contain', 'last name is a required field')
    cy.get('form').should(
      'contain',
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long'
    )
    cy.get('form').should('contain', 'You must accept the privacy policy & terms')
  })

  it('Shows an error message with invalid email address', () => {
    cy.get('[data-testid="username-input"]').type(testUsername)
    cy.get('[data-testid="email-input"]').type(invalidEmail)
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').should('contain', 'email must be a valid email', { timeout: 20000 })
  })

  it('Shows an error message with space email address', () => {
    cy.get('[data-testid="username-input"]').type(testUsername)
    cy.get('[data-testid="email-input"]').type(spaceEmail)
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').should('contain', 'email must be a valid email', { timeout: 20000 })
  })

  it('Shows an error message without click checkbox', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="username-input"]').type(testUsername)
    cy.get('[data-testid="email-input"]').click()
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('button[type="submit"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').should('contain', 'You must accept the privacy policy & terms', { timeout: 20000 })
  })

  it('Shows an error message with short password', () => {
    cy.get('[data-testid="username-input"]').type(testUsername)
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type(fName)
    cy.get('[data-testid="lName-input"]').type(lName)
    cy.get('[data-testid="password-input"]').type(shortPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').contains(
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long',
      { timeout: 20000 }
    )
  })

  it('Shows an error message with invalid password', () => {
    //Test entry short Password
    cy.get('[data-testid="password-input"]').type(shortPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('form').should(
      'contain',
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long',
      { timeout: 20000 }
    )

    //Test entry no Uppercase Password
    cy.get('[data-testid="password-input"]').clear().type(noUppercasePassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('form').should(
      'contain',
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long',
      { timeout: 20000 }
    )

    //Test entry no Lowercase Password
    cy.get('[data-testid="password-input"]').clear().type(noLowercasePassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('form').should(
      'contain',
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long',
      { timeout: 20000 }
    )
  })

  it('should display the "Terms & Conditions" header and load pdf successfully', () => {
    // Check display the "Terms & Conditions" header
    cy.get('[data-testid="term-link"]').click()
    cy.get('#scroll-dialog-title').should('have.text', 'Terms & Conditions')

    // Check iframe exist and have correct src attribute
    cy.get('div.MuiDialogContent-root iframe').should('have.attr', 'src', '/terms.pdf')
  })
})
