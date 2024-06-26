import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        writeEmailToFile(email) {
          const emailDataPath = 'cypress/fixtures/emailData.json'
          writeFileSync(emailDataPath, JSON.stringify({ email }))

          return null
        }
      })
    }
  },

  env: {
    MAILOSAUR_API_KEY: process.env.CYPRESS_MAILOSAUR_API_KEY,
    SERVER_ID: process.env.CYPRESS_SERVER_ID
  }
})
