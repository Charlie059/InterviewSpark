// describe('Tutorial Flow', () => {
//   let serverId = Cypress.env('SERVER_ID')
//   console.log('serverId: ', serverId)
//   const uniqueSeed = Date.now().toString()
//   const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
//   const testUsername = 'testuser' + getUniqueId()
//   const testEmail = `${testUsername}@${serverId}.mailosaur.net`
//   const testPassword = 'Testing1234'

//   beforeEach(() => {
//     cy.visit('/register')

//     cy.get('[data-testid="username-input"]', {timeout: 10000}).type('testUser')
//     cy.get('[data-testid="email-input"]').type(testEmail)
//     cy.get('[data-testid="fName-input"]').type('Charlie')
//     cy.get('[data-testid="lName-input"]').type('Gong')
//     cy.get('[data-testid="password-input"]').type(testPassword)
//     cy.get('[data-testid="term-input"]').click()
//     cy.get('button[type="submit"]').click()

//     cy.wait(1500)

//     // Make sure the confirmation page is displayed
//     cy.wait(5000)
//     cy.get('[data-testid="confirmation-page"]').should('exist')

//     // Check the email for the verification code
//     cy.mailosaurGetMessage(serverId, {
//       sentTo: testEmail
//     }).then(email => {
//       expect(email.subject).to.equal('Welcome to InterviewSpark! Verify your email address')
//       cy.log("subject", email.subject)
//       cy.log("email", email)
//       expect(email.to[0].email).to.equal(testEmail)

//       // Get the verification code from the email
//       // const verificationCode = email.html.body.match(/(\d{6})/)[1]
//       const verificationCode = email.html.body.match(/<span class="code">(\d{6})<\/span>/)[1]

//       // Input the verification code on the confirmation page
//       verificationCode.split('').forEach((digit, index) => {
//         cy.get('[data-testid="auth-input-container"]').then($container => {
//           cy.wrap($container).find('input').eq(index).type(digit, {force: true})
//         })
//       })

//       // Wait 5 seconds for the verification code to be submitted
//       cy.wait(10000)

//       // Verify that the user is redirected to the login page
//       cy.url().should('include', '/login', {timeout: 40000})
//     })

//     cy.visit('/login')

//     // Enter the username and password on the login page
//     cy.get('[data-testid="email-input"]').type(testEmail)
//     cy.get('input[type="password"]').type(testPassword)
//     cy.get('button[type="submit"]').click()
//     cy.wait(10000)

//     // Verify that the user is redirected to the home
//     cy.url().should('include', '/interview', {timeout: 40000})
//   })

//   // -------------------- tutorial flow test --------------------
//   it('Checks the state of the tutorial dialog', () => {

//     cy.viewport(1280, 720)

//     // Go through the tutorial steps by steps
//     cy.contains('Your guide to acing the next big interview!').should('be.visible')
//     cy.contains('Details').should('be.visible')

//     cy.reload(true);

//     cy.contains('Details').should('be.visible')
//     cy.contains('Next').should('be.visible').click()
//     cy.get('input[name="eduSchool"]').should('be.visible');

//     cy.reload(true);

//     cy.contains('Details').should('be.visible')
//     cy.contains('Next').should('be.visible').click()
//     cy.get('input[name="eduSchool"]').should('be.visible');
//     cy.contains('Next').should('be.visible').click()
//     cy.get('[data-cy=select-topic]', { timeout: 10000 }).should('exist')

//     cy.reload(true);

//     cy.contains('Details').should('be.visible')
//     cy.contains('Next').should('be.visible').click()
//     cy.get('input[name="eduSchool"]').should('be.visible');
//     cy.contains('Next').should('be.visible').click()
//     cy.get('[data-cy=select-topic]', { timeout: 10000 }).should('exist')
//     cy.contains('Next').should('be.visible').click()
//     cy.contains('Unlock your interview potential and land your dream job with confidence!').should('be.visible')

//     // Click outside the tutorial dialog
//     cy.get('body').click(0, 0);
//     cy.contains('Your guide to acing the next big interview!').should('be.visible')

//     // Close the tutorial dialog
//     cy.get('[data-cy=close-icon]').click()
//     cy.contains('Profile').should('be.visible')
//   })
// })
