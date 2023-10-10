describe('Email Verification', () => {
  let serverId = Cypress.env('SERVER_ID');
  const uniqueSeed = Date.now().toString();
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
  const testUsername = 'testuser' + getUniqueId();
  const testEmail = `${testUsername}@${serverId}.mailosaur.net`;

  it('Checks email and gets the verification code', () => {
    cy.mailosaurGetMessage(serverId, {
      sentTo: testEmail
    }).then(email => {
      expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address');
      expect(email.to[0].email).to.equal(testEmail);

      const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1];
      verificationCode.split('').forEach((digit, index) => {
        cy.get('[data-testid="auth-input-container"]').then($container => {
          cy.wrap($container).find('input').eq(index).type(digit, { force: true });
        });
      });

      cy.wait(10000);
      cy.url().should('include', '/login', { timeout: 40000 });
    });
  });
});
