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

  // -------------------- signin tests part --------------------

  it('Fills out and submits the registration form and fill the code', () => {
    cy.get('[data-testid="username-input"]', { timeout: 10000 }).type('testUser')
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('[data-testid="fName-input"]').type('Charlie')
    cy.get('[data-testid="lName-input"]').type('Gong')
    cy.get('[data-testid="password-input"]').type(testPassword)
    cy.get('[data-testid="term-input"]').click()
    cy.get('button[type="submit"]').click()

    cy.wait(1500)

    // Make sure the confirmation page is displayed
    cy.wait(6000)
    cy.get('[data-testid="confirmation-page"]').should('exist')

    // Check the email for the verification code
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail
    }).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')
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
      cy.wait(10000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login', { timeout: 40000 })

      // Enter the username and password on the login page

      // cy.get('[data-testid="email-input"]').type(testEmail)
      cy.get('input[type="password"]').type(testPassword)
      cy.get('button[type="submit"]').click()
      cy.wait(10000)

      // Verify that the user is redirected to the home
      cy.url().should('include', '/interview', { timeout: 40000 })
    })
  })

  //
  //
  // it('Shows an error message with invalid email address', () => {
  //   const invalidEmail = 'invalidemail'
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(invalidEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with space email address', () => {
  //   const invalidEmail = ' '
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(invalidEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with empty email address', () => {
  //   // const invalidEmail = ''
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //
  //   // cy.get('[data-testid="email-input"]').type(invalidEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email is a required field', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with short password', () => {
  //   const shortPassword = 'Test1'
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(shortPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long', { timeout: 20000 })
  // })
  //
  // it('Shows an error message without password', () => {
  //   // const noCasePassword = '12345678'
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //
  //   // cy.get('[data-testid="password-input"]').type(noCasePassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with space password', () => {
  //   const noCasePassword = ' '
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(noCasePassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with password lacking uppercase and lowercase letters', () => {
  //   const noCasePassword = '12345678'
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(noCasePassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with password lacking numbers', () => {
  //   const noNumberPassword = 'TestPass'
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(noNumberPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long', { timeout: 20000 })
  // })
  //
  // it('Shows an error message without name', () => {
  //   // cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Username cannot contain spaces or underscores', { timeout: 20000 })
  // })
  //
  // it('Shows an error message with empty space name', () => {
  //   cy.get('[data-testid="username-input"]').type(' ')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Username cannot contain spaces or underscores', { timeout: 20000 })
  // })
  //
  // it('Shows an error message without first name', () => {
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //
  //   // cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('first name is a required field', { timeout: 20000 })
  // })
  //
  // it('Shows a wrong message with empty first name', () => {
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type(' ')
  //   cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('first name cannot contain spaces', { timeout: 20000 })
  //
  // })
  //
  // it('Shows an error message without last name', () => {
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //
  //   // cy.get('[data-testid="lName-input"]').type('Gong')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('last name is a required field', { timeout: 20000 })
  // })
  //
  // it('Shows a wrong message with empty last name', () => {
  //   cy.get('[data-testid="username-input"]').type('testUser')
  //   cy.get('[data-testid="email-input"]').type(testEmail)
  //   cy.get('[data-testid="fName-input"]').type('Charlie')
  //   cy.get('[data-testid="lName-input"]').type(' ')
  //   cy.get('[data-testid="password-input"]').type(testPassword)
  //   cy.get('[data-testid="term-input"]').click()
  //   cy.get('button[type="submit"]').click()
  //
  //   cy.wait(1500)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('last name cannot contain spaces', { timeout: 20000 })
  //
  // })
  //
  // // -------------------- login tests part --------------------
  //
  // it('logs in successfully with correct credentials', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   // Change these to valid credentials for your application
  //   const email = testEmail
  //   const password = testPassword
  //
  //   cy.get('[data-testid="email-input"]').scrollIntoView().type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Change this to a URL your app navigates to after successful login
  //   cy.url().should('include', '/interview', { timeout: 20000 })
  // })
  //
  // it('shows an error message with incorrect credentials', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'wrongpassword'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  // })
  //
  // it('shows an error message with invalid email', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = 'invalidemail'
  //   const password = testPassword
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  // })
  //
  // it('shows an error message with short password', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'pass'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  // })
  //
  // it('shows an error message with password less than 8 characters but contains upper, lower case and numbers', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'Pass1'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  // })
  //
  // it('shows an error message with password without uppercase but contains lowercase and numbers', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'password123'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  // })
  //
  // it('shows an error message with password without lowercase but contains uppercase and numbers', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'PASSWORD123'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  // })
  //
  // it('shows an error message with password without numbers but contains uppercase and lowercase', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = 'Password'
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  // })
  //
  // it('shows an error message when email is not entered', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const password = testPassword
  //
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email is a required field', { timeout: 20000 })
  // })
  //
  // it('shows an error message when email is blank', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = '  '
  //   const password = testPassword
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  // })
  //
  // it('shows an error message when password is not entered', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  // })
  //
  // it('shows an error message when password is blank', () => {
  //   cy.viewport(1280, 720)
  //
  //   // Change this to your app's login URL
  //   cy.visit('/login')
  //   cy.wait(2000)
  //   cy.url().should('include', '/login')
  //
  //   const email = testEmail
  //   const password = '   '
  //
  //   cy.get('[data-testid="email-input"]').type(email)
  //   cy.get('input[type="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.wait(2000)
  //
  //   // Verify that the error message is displayed
  //   cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  // })

  // -------------------- reset tests part --------------------

  it('reset successfully with correct credentials', () => {
    cy.viewport(1280, 720)

    // Change this to your app's login URL
    cy.visit('/login')
    cy.wait(2000)
    cy.url().should('include', '/login')

    cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)

    // cy.get('input[type="password"]').type(password)
    cy.get('form').contains('Forgot Password?').click()

    cy.wait(2000)

    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/forgot-password', { timeout: 500000 })

    // Find the email input by its type and type the email
    cy.get('form').find('input[type="email"]').type(testEmail)

    // Verify that the input contains the correct email
    cy.get('form').find('input[type="email"]').should('have.value', testEmail)

    cy.get('button[type="submit"]').click()

    cy.wait(2000)

    // Make sure the confirmation page is displayed
    cy.url().should('include', '/password-reset-validation/', { timeout: 100000 })

    // Check the email for the verification code
    cy.mailosaurGetMessage(
      serverId,
      {
        sentTo: testEmail
      },
      {
        timeout: 30000 // 30 seconds timeout
      }
    ).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')

      // Get the verification code from the email
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]
      cy.log(`Verification code: ${verificationCode}`)

      // Input the verification code on the confirmation page
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      cy.get('input[type="password"]').type('Newpassword123')
      cy.get('button[type="submit"]').click()

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login')
    })
  })

  it('reset successfully with resend correct credentials', () => {
    cy.viewport(1280, 720)

    // Change this to your app's login URL
    cy.visit('/login')
    cy.wait(2000)
    cy.url().should('include', '/login')

    cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)

    // cy.get('input[type="password"]').type(password)
    cy.get('form').contains('Forgot Password?').click()

    cy.wait(2000)

    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/forgot-password', { timeout: 20000 })

    // Find the email input by its type and type the email
    cy.get('form').find('input[type="email"]').type(testEmail)

    // Verify that the input contains the correct email
    cy.get('form').find('input[type="email"]').should('have.value', testEmail)

    cy.get('button[type="submit"]').click()

    cy.wait(2000)

    // Make sure the confirmation page is displayed
    cy.url().should('include', '/password-reset-validation/', { timeout: 100000 })

    // Check the email for the verification code
    cy.mailosaurGetMessage(
      serverId,
      {
        sentTo: testEmail
      },
      {
        timeout: 30000 // 30 seconds timeout
      }
    ).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')

      // Get the verification code from the email
      // const verificationCode = email.html.body.match(/(\d{6})/)[1]
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]
      cy.log(`Verification code: ${verificationCode}`)
    })

    cy.get('[data-testid="auth-input-container"]').contains('Here').click()
    cy.get('div').contains('Verification code successfully sent', { timeout: 20000 })

    cy.wait(2000)

    // Check the email for the verification code
    cy.mailosaurGetMessage(
      serverId,
      {
        sentTo: testEmail
      },
      {
        timeout: 30000 // 30 seconds timeout
      }
    ).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')

      // Get the verification code from the email
      // const verificationCode = email.html.body.match(/(\d{6})/)[1]
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]
      cy.log(`Verification code: ${verificationCode}`)

      // Input the verification code on the confirmation page
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      cy.get('input[type="password"]').type('Newpassword123')
      cy.get('button[type="submit"]').click()

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify that the user is redirected to the login page
      cy.url().should('include', '/login', { timeout: 40000 })
    })
  })

  it('reset failed with wrong credentials', () => {
    cy.viewport(1280, 720)

    // Change this to your app's login URL
    cy.visit('/login')
    cy.wait(2000)
    cy.url().should('include', '/login')

    cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)

    // cy.get('input[type="password"]').type(password)
    cy.get('form').contains('Forgot Password?').click()

    cy.wait(5000)

    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/forgot-password', { timeout: 100000 })

    // Find the email input by its type and type the email
    cy.get('form').find('input[type="email"]').type(testEmail)

    // Verify that the input contains the correct email
    cy.get('form').find('input[type="email"]').should('have.value', testEmail)

    cy.get('button[type="submit"]').click()

    cy.wait(2000)

    // // Make sure the confirmation page is displayed
    cy.url().should('include', '/password-reset-validation', { timeout: 100000 })

    // Check the email for the verification code
    cy.mailosaurGetMessage(
      serverId,
      {
        sentTo: testEmail
      },
      {
        timeout: 30000 // 30 seconds timeout
      }
    ).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')

      // Get the verification code from the email
      // const verificationCode = email.html.body.match(/(\d{6})/)[1]
      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]
      cy.log(`Verification code: ${verificationCode}`)

      // Create the incorrect verification code by adding 1 to each digit
      const incorrectCode = verificationCode
        .split('')
        .map(digit => (parseInt(digit) + 1) % 10)
        .join('')

      // Input the incorrect verification code on the confirmation page
      incorrectCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true })
        })
      })

      cy.get('input[type="password"]').type('Newpassword123')
      cy.get('button[type="submit"]').click()

      // Wait 5 seconds for the verification code to be submitted
      cy.wait(5000)

      // Verify wrong message
      cy.get('div').contains('Invalid code', { timeout: 20000 })
    })
  })
})
