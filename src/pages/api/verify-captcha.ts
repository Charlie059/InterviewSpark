import type { NextApiRequest, NextApiResponse } from 'next/types'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    debugger
    try {
      const googleResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: secretKey,
          response: token
        }
      })

      res.status(200).json({ success: googleResponse.data.success })
    } catch (error) {
      res.status(500).json({ error: 'Error verifying captcha', details: error })
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
