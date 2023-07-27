describe('Login Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)

    // Change this to your app's login URL
    cy.visit('/login')
    cy.wait(2000)
  })

  it('logs in successfully with correct credentials', () => {
    // Change these to valid credentials for your application
    const email = 'xiongyu0124@gmail.com'
    const password = 'Testing1234'

    cy.get('[data-testid="email-input"]').scrollIntoView().type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/interview', { timeout: 20000 })
  })

  it('shows an error message with incorrect credentials', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'wrongpassword'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  })

  it('shows an error message with invalid email', () => {
    const email = 'invalidemail'
    const password = 'password123'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  })

  it('shows an error message with short password', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'pass'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  })

  it('shows an error message with password less than 8 characters but contains upper, lower case and numbers', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'Pass1'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  })

  it('shows an error message with password without uppercase but contains lowercase and numbers', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'password123'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  })

  it('shows an error message with password without lowercase but contains uppercase and numbers', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'PASSWORD123'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  })

  it('shows an error message with password without numbers but contains uppercase and lowercase', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = 'Password'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('Incorrect username or password.', { timeout: 20000 })
  })

  it('shows an error message when email is not entered', () => {
    const password = 'Testing1234'

    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('email is a required field', { timeout: 20000 })
  })

  it('shows an error message when email is blank', () => {
    const email = '  '
    const password = 'Testing1234'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  })

  it('shows an error message when password is not entered', () => {
    const email = 'xiongyu0124@gmail.com'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  })

  it('shows an error message when password is blank', () => {
    const email = 'xiongyu0124@gmail.com'
    const password = '   '

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    // Verify that the error message is displayed
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  })


})

