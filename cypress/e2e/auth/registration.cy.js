describe('User Registration', () => {
  let serverId = Cypress.env('SERVER_ID');
  const uniqueSeed = Date.now().toString();
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
  const testUsername = 'testuser' + getUniqueId();
  const testEmail = `${testUsername}@${serverId}.mailosaur.net`;
  const testPassword = 'Testing1234';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('Fills out and submits the registration form', () => {
    cy.get('[data-testid="username-input"]', { timeout: 10000 }).type('testUser');
    cy.get('[data-testid="email-input"]').type(testEmail);
    cy.get('[data-testid="fName-input"]').type('Charlie');
    cy.get('[data-testid="lName-input"]').type('Gong');
    cy.get('[data-testid="password-input"]').type(testPassword);
    cy.get('[data-testid="term-input"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait(1500);

    // Make sure the confirmation page is displayed
    cy.wait(6000);
    cy.get('[data-testid="confirmation-page"]').should('exist');
  });
});


