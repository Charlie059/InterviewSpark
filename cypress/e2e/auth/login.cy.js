describe('User Login', () => {  // const testEmail = `${testUsername}@${serverId}.mailosaur.net`;
  // const testPassword = 'Testing1234';
  // const testEmail1 = registrationEmail

  beforeEach(() => {

    cy.visit('/login');

  });

  it.only('Logs in using the registered username and password', () => {
    console.log(testEmail1);
    cy.get('[data-testid="email-input"]').type('shenyf1124@outlook.com')
    cy.get('input[type="password"]').type('111111Ss!');
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.url().should('include', '/interview', { timeout: 40000 });
  });

  it('Shows an error message with wrong email address', () => {
    cy.get('[data-testid="email-input"]').type('test1234')
    cy.get('input[type="password"]').click()

    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })

  })

  it('Shows an error message with space email address', () => {
    const invalidEmail = ' '
    cy.get('[data-testid="email-input"]').type(invalidEmail)
    cy.get('input[type="password"]').click()
    cy.wait(1500)

    // Verify that the error message is displayed
    cy.get('form').contains('email must be a valid email', { timeout: 20000 })
  })
  it('Shows an error message with less length password', () => {
    const testPwd = '1111'
    cy.get('input[type="password"]').type(testPwd)
    cy.get('[data-testid="email-input"]').click()
    cy.get('form').contains('password must be at least 8 characters', { timeout: 20000 })
  })

  it('Shows an error message with wrong password', () => {
    cy.get('[data-testid="email-input"]').type('shenyf1124@outlook.com')
    const testPwd = '11111111'
    cy.get('input[type="password"]').type(testPwd)
    cy.get('[data-testid="email-input"]').click()
    cy.get('button[type="submit"]').click();
    cy.wait(1500)
    cy.get('form').contains('Incorrect username or password', { timeout: 20000 })
  })
});
