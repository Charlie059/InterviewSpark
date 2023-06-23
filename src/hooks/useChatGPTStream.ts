/***********************************************************************************************
  Name: UseChatGPTStream.tsx
  Description: This file contains the custom hook for chatGPTStream.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/04
  Update Date: 2023/06/15
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { useState } from 'react'
import Logger from '../middleware/loggerMiddleware'

// Define the error state
interface ErrorState {
  type: 'ChatGPT-Error'
  message?: string
}

// Helper function to check for sentence completion
const checkSentenceCompletion = (text: string) => {
  const punctuationMarks = ['.', ',', '!', '?']
  let lastPunctuationIndex = -1
  punctuationMarks.forEach(mark => {
    const idx = text.lastIndexOf(mark)
    lastPunctuationIndex = idx > lastPunctuationIndex ? idx : lastPunctuationIndex
  })

  return lastPunctuationIndex
}

// Helper function to handle stream reading
const handleStreamReading = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  callback: (value: string) => void,
  end: () => void
) => {
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const decodedValue = new TextDecoder().decode(value)
      callback(decodedValue)
    }
  } catch (error) {
    Logger.error('An error occurred while reading the stream:', error)
  } finally {
    reader.releaseLock()
    end()
  }
}

// The useChatGPTStream Hook
const useChatGPTStream = (addToQueue: (sentence: string) => void, start: () => void, end: () => void) => {
  let cachedText = ''
  const [streamError, setStreamError] = useState<ErrorState | null>(null)

  const addToQueueIfSentenceComplete = (decodedValue: string) => {
    cachedText += decodedValue
    const lastPunctuationIndex = checkSentenceCompletion(cachedText)

    if (lastPunctuationIndex !== -1) {
      const completeSentence = cachedText.slice(0, lastPunctuationIndex + 1)
      cachedText = cachedText.slice(lastPunctuationIndex + 1)

      if (completeSentence.trim() !== '') {
        addToQueue(completeSentence)
      }
    }
  }

  // A function to generate a response from the chatbot
  const generateResponse = async (question: string) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: question,
          history: []
        })
      })

      const stream = res.body
      if (!stream) return
      const reader = stream.getReader()
      start()
      handleStreamReading(reader, addToQueueIfSentenceComplete, end)
    } catch (error: any) {
      setStreamError({ type: 'ChatGPT-Error', message: error })
      Logger.error('An error occurred while generating the response:', error)
    }
  }

  return { generateResponse, chatGPTStreamError: streamError }
}

export default useChatGPTStream
