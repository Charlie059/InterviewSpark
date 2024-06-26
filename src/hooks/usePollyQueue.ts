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

// @ts-ignore
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

const START_SYMBOL = '__START__'
const END_SYMBOL = '__END__'

// Extend the HTMLAudioElement interface
interface HTMLAudioElementExtended extends HTMLAudioElement {
  setSinkId?(sinkId: string): Promise<void>
}

export const usePollyQueue = (options: UsePollyOptions = {}, onComplete: () => void, audioOutput: string) => {
  const audioRef = useRef<HTMLAudioElementExtended | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [queue, setQueue] = useState<string[]>([])
  const { region = 'us-east-1', voiceId = 'Ruth', engine = 'neural', sampleRate = '22050' } = options
  const [pollyError, setPollyError] = useState<ErrorState | null>(null)
  const [caption, setCaption] = useState<string>('')

  const addToQueue = useCallback((text: string) => {
    setQueue(prevQueue => [...prevQueue, text])
  }, [])

  const start = useCallback(() => {
    setQueue(prevQueue => [START_SYMBOL, ...prevQueue])
  }, [])

  const end = useCallback(() => {
    setQueue(prevQueue => [...prevQueue, END_SYMBOL])
  }, [])

  const synthesizeSpeech = useCallback(async (text: string) => {
    setIsLoading(true)
    setCaption(text)

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
              if (typeof audioRef.current.setSinkId === 'function') {
                audioRef.current
                  .setSinkId(audioOutput)
                  .then(() => {
                    const playPromise = audioRef.current!.play()
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
                  })
                  .catch(error => {
                    Logger.error('Error:', error)
                    setPollyError({ type: 'AWS-Polly-Error', message: `Failed to set audio output: ${error}` })
                  })
              } else {
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
      // Remove the first element from the queue
      const [text, ...rest] = queue
      setQueue(rest)

      if (text === END_SYMBOL) {
        onComplete()
      }
      if (text !== START_SYMBOL && text !== END_SYMBOL) {
        synthesizeSpeech(text as string)
      }
    }
  }, [isLoading, queue, synthesizeSpeech, onComplete])

  return { caption, audioRef, isLoading, addToQueue, start, end, pollyError }
}
