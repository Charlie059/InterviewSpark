import { useState, useCallback } from 'react'
import { ChatGPTAPI } from 'chatgpt'
import 'isomorphic-fetch'

const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY as string
const chatGPTAPIInstance = new ChatGPTAPI({
  apiKey: API_KEY
})

const useChatGPT = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (message: string) => {
    if (!message) {
      setError('Message input cannot be empty.')

      return { response: null, isLoading, error }
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await chatGPTAPIInstance.sendMessage(message)

      return { response, isLoading, error }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { sendMessage, isLoading, error }
}

export default useChatGPT
