/***********************************************************************************************
  Name: UsePollyByQueue.tsx
  Description: This file contains the custom hook for polly.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/12
  Update Date: 2023/06/12
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { useEffect, useState, useRef, useCallback } from 'react'
import { Auth } from 'aws-amplify'
import { Polly, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'
import Logger from '../middleware/loggerMiddleware'

type UsePollyOptions = {
  region?: string
  voiceId?: string
  engine?: string
  sampleRate?: string
}
interface ErrorState {
  type: 'AWS-Polly-Error'
  message?: string
}

export const usePollyByQueue = (options: UsePollyOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [queue, setQueue] = useState<string[]>([])
  const { region = 'us-east-1', voiceId = 'Ruth', engine = 'neural', sampleRate = '22050' } = options
  const [pollyError, setPollyError] = useState<ErrorState | null>(null)

  const addToQueue = useCallback((text: string) => {
    setQueue(prevQueue => [...prevQueue, text])
  }, [])

  const synthesizeSpeech = useCallback(async (text: string) => {
    setIsLoading(true)

    try {
      const credentials = await Auth.currentCredentials()

      const polly = new Polly({
        region: region,
        credentials: credentials
      })

      const params: any = {
        OutputFormat: 'mp3',
        Text: text,
        TextType: 'text',
        Engine: engine,
        VoiceId: voiceId,
        SampleRate: sampleRate
      }

      const data = await polly.send(new SynthesizeSpeechCommand(params))

      if (data.AudioStream && data.AudioStream instanceof ReadableStream) {
        const reader = data.AudioStream.getReader()
        const chunks: Uint8Array[] = []

        const processStream = async (result: ReadableStreamReadResult<Uint8Array>) => {
          if (result.done) {
            const arrayBuffer = chunks.reduce((acc, chunk) => {
              const tmp = new Uint8Array(acc.byteLength + chunk.byteLength)
              tmp.set(new Uint8Array(acc), 0)
              tmp.set(new Uint8Array(chunk), acc.byteLength)

              return tmp.buffer
            }, new ArrayBuffer(0))
            const blob = new Blob([arrayBuffer], { type: 'audio/mp3' })
            const url = URL.createObjectURL(blob)

            if (audioRef.current) {
              audioRef.current.src = url
              const playPromise = audioRef.current.play()
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    return new Promise(resolve => {
                      audioRef.current!.addEventListener('ended', resolve, { once: true })
                    })
                  })
                  .then(() => {
                    setIsLoading(false)
                  })
              }
            }
          } else {
            chunks.push(result.value)
            reader.read().then(processStream)
          }
        }

        reader.read().then(processStream)
      }
    } catch (error: any) {
      setIsLoading(false)
      Logger.error('Error:', error)
      setPollyError({ type: 'AWS-Polly-Error', message: error })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isLoading && queue.length > 0) {
      const text = queue.shift()
      setQueue([...queue])
      synthesizeSpeech(text as string)
    }
  }, [isLoading, queue, synthesizeSpeech])

  return { audioRef, isLoading, addToQueue, pollyError }
}
