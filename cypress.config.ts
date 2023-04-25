import { defineConfig } from 'cypress'

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
      config.env = {
        ...process.env,
        ...config.env
      }

      return config
    }
  },

  env: {
    MAILOSAUR_API_KEY: 'cqbNeiG7h0LhsaYCiUarNxSqMPoEqMeB'
  }
})
