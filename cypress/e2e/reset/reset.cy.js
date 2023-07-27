describe('Reset Page', () => {

    beforeEach(() => {

        cy.viewport(1280, 720)

        // Change this to your app's login URL
        cy.visit('/login')
        cy.wait(2000)
    })

    it('reset successfully with correct credentials', () => {

        let serverId = Cypress.env('SERVER_ID')
        console.log('serverId: ', serverId)
        const uniqueSeed = Date.now().toString()
        const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
        const testUsername = 'testuserresend' + getUniqueId()
        const testEmail = `${testUsername}@${serverId}.mailosaur.net`
        const testPassword = 'Testing1234'

        cy.visit('/register')
        cy.wait(2000)
        cy.url().should('include', '/register')

        cy.get('[data-testid="username-input"]').type('testUser')
        cy.get('[data-testid="email-input"]').type(testEmail)
        cy.get('[data-testid="fName-input"]').type('Charlie')
        cy.get('[data-testid="lName-input"]').type('Gong')
        cy.get('[data-testid="password-input"]').type(testPassword)
        cy.get('[data-testid="term-input"]').click()
        cy.get('button[type="submit"]').click()
    
        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.get('[data-testid="confirmation-page"]').should('exist')
    
        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
          sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
        }).then(email => {
          expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
    
          // Get the verification code from the email
          const verificationCode = email.html.body.match(/(\d{6})/)[1]
          cy.log(`Verification code: ${verificationCode}`)
    
          // Input the verification code on the confirmation page
          verificationCode.split('').forEach((digit, index) => {
            cy.get('[data-testid="auth-input-container"]').then($container => {
              cy.wrap($container).find('input').eq(index).type(digit, { force: true })
            })
          })
    
          // Wait 5 seconds for the verification code to be submitted
          cy.wait(5000)
    
          // Verify that the user is redirected to the login page
          cy.url().should('include', '/login')

        })
    
        cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)
        // cy.get('input[type="password"]').type(password)
        cy.get('form').contains('Forgot Password?').click();
    
        cy.wait(2000)
        // Change this to a URL your app navigates to after successful login
        cy.url().should('include', '/forgot-password', { timeout: 20000 })
            // Find the email input by its type and type the email
        cy.get('form')
        .find('input[type="email"]')
        .type(testEmail)

        // Verify that the input contains the correct email
        cy.get('form')
        .find('input[type="email"]')
        .should('have.value', testEmail)

        cy.get('button[type="submit"]').click()

        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.url().should('include', '/password-reset-validation', { timeout: 20000 })

        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
            }).then(email => {
            expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
        
            // Get the verification code from the email
            const verificationCode = email.html.body.match(/(\d{6})/)[1]
            cy.log(`Verification code: ${verificationCode}`)
        
            // Input the verification code on the confirmation page
            verificationCode.split('').forEach((digit, index) => {
                cy.get('[data-testid="auth-input-container"]').then($container => {
                cy.wrap($container).find('input').eq(index).type(digit, { force: true })
                })
            })

            cy.get('input[type="password"]').type("Newpassword123")
            cy.get('button[type="submit"]').click()
        
            // Wait 5 seconds for the verification code to be submitted
            cy.wait(5000)
        
            // Verify that the user is redirected to the login page
            cy.url().should('include', '/login')
    
            })


    })

    it('reset successfully with resend correct credentials', () => {

        let serverId = Cypress.env('SERVER_ID')
        console.log('serverId: ', serverId)
        const uniqueSeed = Date.now().toString()
        const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
        const testUsername = 'testuserresend' + getUniqueId()
        const testEmail = `${testUsername}@${serverId}.mailosaur.net`
        const testPassword = 'Testing1234'

        cy.visit('/register')
        cy.wait(2000)
        cy.url().should('include', '/register')

        cy.get('[data-testid="username-input"]').type('testUser')
        cy.get('[data-testid="email-input"]').type(testEmail)
        cy.get('[data-testid="fName-input"]').type('Charlie')
        cy.get('[data-testid="lName-input"]').type('Gong')
        cy.get('[data-testid="password-input"]').type(testPassword)
        cy.get('[data-testid="term-input"]').click()
        cy.get('button[type="submit"]').click()
    
        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.get('[data-testid="confirmation-page"]').should('exist')
    
        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
          sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
        }).then(email => {
          expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
    
          // Get the verification code from the email
          const verificationCode = email.html.body.match(/(\d{6})/)[1]
          cy.log(`Verification code: ${verificationCode}`)
    
          // Input the verification code on the confirmation page
          verificationCode.split('').forEach((digit, index) => {
            cy.get('[data-testid="auth-input-container"]').then($container => {
              cy.wrap($container).find('input').eq(index).type(digit, { force: true })
            })
          })
    
          // Wait 5 seconds for the verification code to be submitted
          cy.wait(5000)
    
          // Verify that the user is redirected to the login page
          cy.url().should('include', '/login')

        })
    
        cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)
        // cy.get('input[type="password"]').type(password)
        cy.get('form').contains('Forgot Password?').click();
    
        cy.wait(2000)
        // Change this to a URL your app navigates to after successful login
        cy.url().should('include', '/forgot-password', { timeout: 20000 })
            // Find the email input by its type and type the email
        cy.get('form')
        .find('input[type="email"]')
        .type(testEmail)

        // Verify that the input contains the correct email
        cy.get('form')
        .find('input[type="email"]')
        .should('have.value', testEmail)

        cy.get('button[type="submit"]').click()

        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.url().should('include', '/password-reset-validation', { timeout: 20000 })

        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
            }).then(email => {
            expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
        
            // Get the verification code from the email
            const verificationCode = email.html.body.match(/(\d{6})/)[1]
            cy.log(`Verification code: ${verificationCode}`)
    
        })

        cy.get('[data-testid="auth-input-container"]').contains('Here').click()
        cy.get('div').contains('Verification code successfully sent', { timeout: 20000 })

        cy.wait(2000)

        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
            }).then(email => {
            expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
        
            // Get the verification code from the email
            const verificationCode = email.html.body.match(/(\d{6})/)[1]
            cy.log(`Verification code: ${verificationCode}`)
        
            // Input the verification code on the confirmation page
            verificationCode.split('').forEach((digit, index) => {
                cy.get('[data-testid="auth-input-container"]').then($container => {
                cy.wrap($container).find('input').eq(index).type(digit, { force: true })
                })
            })

            cy.get('input[type="password"]').type("Newpassword123")
            cy.get('button[type="submit"]').click()
        
            // Wait 5 seconds for the verification code to be submitted
            cy.wait(5000)
        
            // Verify that the user is redirected to the login page
            cy.url().should('include', '/login')
    
        })


    })

    it('reset successfully with wrong credentials', () => {

        let serverId = Cypress.env('SERVER_ID')
        console.log('serverId: ', serverId)
        const uniqueSeed = Date.now().toString()
        const getUniqueId = () => Cypress._.uniqueId(uniqueSeed)
        const testUsername = 'testuserresend' + getUniqueId()
        const testEmail = `${testUsername}@${serverId}.mailosaur.net`
        const testPassword = 'Testing1234'

        cy.visit('/register')
        cy.wait(2000)
        cy.url().should('include', '/register')

        cy.get('[data-testid="username-input"]').type('testUser')
        cy.get('[data-testid="email-input"]').type(testEmail)
        cy.get('[data-testid="fName-input"]').type('Charlie')
        cy.get('[data-testid="lName-input"]').type('Gong')
        cy.get('[data-testid="password-input"]').type(testPassword)
        cy.get('[data-testid="term-input"]').click()
        cy.get('button[type="submit"]').click()
    
        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.get('[data-testid="confirmation-page"]').should('exist')
    
        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
          sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
        }).then(email => {
          expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
    
          // Get the verification code from the email
          const verificationCode = email.html.body.match(/(\d{6})/)[1]
          cy.log(`Verification code: ${verificationCode}`)
    
          // Input the verification code on the confirmation page
          verificationCode.split('').forEach((digit, index) => {
            cy.get('[data-testid="auth-input-container"]').then($container => {
              cy.wrap($container).find('input').eq(index).type(digit, { force: true })
            })
          })
    
          // Wait 5 seconds for the verification code to be submitted
          cy.wait(5000)
    
          // Verify that the user is redirected to the login page
          cy.url().should('include', '/login')

        })
    
        cy.get('[data-testid="email-input"]').scrollIntoView().type(testEmail)
        // cy.get('input[type="password"]').type(password)
        cy.get('form').contains('Forgot Password?').click();
    
        cy.wait(2000)
        // Change this to a URL your app navigates to after successful login
        cy.url().should('include', '/forgot-password', { timeout: 20000 })
            // Find the email input by its type and type the email
        cy.get('form')
        .find('input[type="email"]')
        .type(testEmail)

        // Verify that the input contains the correct email
        cy.get('form')
        .find('input[type="email"]')
        .should('have.value', testEmail)

        cy.get('button[type="submit"]').click()

        cy.wait(2000)
    
        // Make sure the confirmation page is displayed
        cy.url().should('include', '/password-reset-validation', { timeout: 20000 })

        // Check the email for the verification code
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail
        }, {
            timeout: 30000  // 30 seconds timeout
            }).then(email => {
            expect(email.subject).to.equal('Welcome to HireBeat! Verify your email address')
        
            // Get the verification code from the email
            const verificationCode = email.html.body.match(/(\d{6})/)[1]
            cy.log(`Verification code: ${verificationCode}`)
        
            // Create the incorrect verification code by adding 1 to each digit
            const incorrectCode = verificationCode.split('').map(digit => (parseInt(digit) + 1) % 10).join('')

            // Input the incorrect verification code on the confirmation page
            incorrectCode.split('').forEach((digit, index) => {
                cy.get('[data-testid="auth-input-container"]').then($container => {
                cy.wrap($container).find('input').eq(index).type(digit, { force: true })
                })
            })

            cy.get('input[type="password"]').type("Newpassword123")
            cy.get('button[type="submit"]').click()
        
            // Wait 5 seconds for the verification code to be submitted
            cy.wait(5000)
        
            // Verify wrong message
            cy.get('div').contains('Invalid code', { timeout: 20000 })
    
        })


    })
})
  
  