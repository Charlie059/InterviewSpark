describe('Login Page', () => {
  beforeEach(() => {
    // Change this to your app's login URL
    cy.visit('/login')
  })

  it('logs in successfully with correct credentials', () => {
    // Change these to valid credentials for your application
    const email = 'charlie@catting.co.uk'
    const password = 'Testing1234'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Change this to a URL your app navigates to after successful login
    cy.url().should('include', '/home')
  })

  it('shows an error message with incorrect credentials', () => {
    const email = 'charlie@catting.co.uk'
    const password = 'wrongpassword'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Verify that the error message is displayed
    cy.get('form').contains('Email or Password is invalid')
  })

  it('shows an error message with invalid email', () => {
    const email = 'invalidemail'
    const password = 'password123'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email')
  })

  it('shows an error message with short password', () => {
    const email = 'charlie@catting.co.uk'
    const password = 'pass'

    cy.get('[data-testid="email-input"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Verify that the error message is displayed
    cy.get('form').contains('password must be at least 8 characters')
  })
})
