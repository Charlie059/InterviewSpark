import { testEmail, testPassword, wrongPassword, spaceEmail, shortPassword } from '../../support/userUtils';

describe('User Login', () => {

  beforeEach(() => {

    cy.visit('/login');
    cy.wait(1000)

  });

  it('Logs in using the registered username and password', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.url().should('include', '/interview', { timeout: 40000 });
  });

  it('Shows an error message with wrong email address', () => {
    cy.get('[data-testid="email-input"]').type(wrongPassword)
    cy.get('input[type="password"]').click()

    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })

  })

  it('Shows an error message with space email address', () => {
    cy.get('[data-testid="email-input"]').type(spaceEmail)
    cy.get('input[type="password"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  })

  it('Shows an error message with less length password', () => {
    cy.get('[data-testid="email-input"]').type(testEmail);
    cy.get('input[type="password"]').type(shortPassword);
    cy.get('[data-testid="email-input"]').click();
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 });
  })

  it('Shows an error message with wrong password', () => {
    cy.get('[data-testid="email-input"]').type(testEmail);
    cy.get('input[type="password"]').type(wrongPassword);
    cy.get('[data-testid="email-input"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait(1500);
    cy.get('form').contains('Incorrect username or password', { timeout: 20000 })
  })
});
