// src/hooks/useCaptcha.ts
import axios from 'axios'

const useCaptcha = () => {
  const verifyCaptcha = async (token: string | null) => {
    try {
      // Send the token to your Next.js API endpoint
      const response = await axios.post('/api/verify-captcha', { token })

      return response.data.success
    } catch (error) {
      console.error('Error verifying captcha', error)
      throw error
    }
  }

  return { verifyCaptcha }
}

export default useCaptcha
