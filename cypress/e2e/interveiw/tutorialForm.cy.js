// describe('Tutorial Flow', () => {
//   let serverId = Cypress.env('SERVER_ID')
//   console.log('serverId: ', serverId)
//   const uniqueSeed = Date.now().toString()
//   const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
//   const testUsername = 'testuser' + getUniqueId()
//   console.log(testUsername)
//   const testEmail = `${testUsername}@${serverId}.mailosaur.net`
//   const testPassword = 'Testing1234'

//   beforeEach(() => {
//     cy.visit('/register')

//     cy.get('[data-testid="username-input"]', {timeout: 10000}).type(testUsername)
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

//   // -------------------- tutorial form test --------------------
//   it('Tests profile user inputs', () => {

//     cy.viewport(1280, 720)

//     cy.get('[data-cy="pencil-icon"]').click()
//     cy.get('input[type="fName"]').clear().type('Felicia')
//     cy.get('input[type="lName"]').clear().type('Chen')
//     cy.get('input[type="contact"]').type('123456789')
//     cy.get('input[type="city"]').type('NYC')

//     cy.get('button[type="submit"]').click()
//     cy.get('[data-cy=close-icon]').click()
//     cy.wait(5000)
//     cy.visit(`/user-profile/${testUsername}_1`)

//     cy.contains('Felicia')
//     cy.contains('Chen')
//     cy.contains('123456789')
//     cy.contains('NYC')
//   })
// })
