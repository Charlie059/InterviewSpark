import type { NextApiRequest, NextApiResponse } from 'next/types'
import { ChatGPTAPI } from 'chatgpt'

const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY as string

const api = new ChatGPTAPI({
  apiKey: apiKey
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const message = req.body.message
      const response = await api.sendMessage(message)
      console.log(response)
      res.status(200).json({ text: response.text })
    } catch (error) {
      console.error('Error occurred:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
