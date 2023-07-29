import { useEffect, useState, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { Polly, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'
import Logger from 'src/middleware/loggerMiddleware'

type UsePollyOptions = {
  region?: string
  voiceId?: string
  engine?: string
  sampleRate?: string
}

export const usePolly = (text: string | null, options: UsePollyOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { region = 'us-east-1', voiceId = 'Ruth', engine = 'neural', sampleRate = '22050' } = options

  useEffect(() => {
    const synthesizeSpeech = async () => {
      if (!text) {
        return
      }

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
                audioRef.current.play()
              }
            } else {
              chunks.push(result.value)
              reader.read().then(processStream)
            }
          }

          reader.read().then(processStream)
        }
      } catch (error) {
        Logger.error('An error occurred while reading the stream:', error)
      } finally {
        setIsLoading(false)
      }
    }

    synthesizeSpeech()
  }, [text, region, engine, voiceId, sampleRate])

  return { audioRef, isLoading }
}
