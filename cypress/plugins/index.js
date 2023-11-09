import { writeFileSync } from 'fs'

export default (on, config) => {
  on('task', {
    writeEmailToFile(email) {
      const emailDataPath = 'cypress/fixtures/emailData.json'
      writeFileSync(emailDataPath, JSON.stringify({ email }))

      return null
    }
  })
}
