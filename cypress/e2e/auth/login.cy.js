describe('User Login', () => {
  let serverId = Cypress.env('SERVER_ID');
  const uniqueSeed = Date.now().toString();
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
  const testUsername = 'testuser' + getUniqueId();
  const testEmail = `${testUsername}@${serverId}.mailosaur.net`;
  const testPassword = 'Testing1234';

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Logs in using the registered username and password', () => {
    cy.get('[data-testid="email-input"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.url().should('include', '/interview', { timeout: 40000 });
  });
});
