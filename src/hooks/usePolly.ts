import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Polly, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

type PollyState = {
  loading: boolean
  error: Error | null
  response: Blob | null
}

type PollyOptions = {
  voiceId?: string
  languageCode?: string
  textType?: string
  outputFormat?: string
}

const usePolly = (text: string, options: PollyOptions = {}): PollyState => {
  const [state, setState] = useState<PollyState>({
    loading: true,
    error: null,
    response: null
  })

  useEffect(() => {
    const fetchPolly = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }))

        const credentials = await Auth.currentCredentials()

        const polly = new Polly({
          region: 'us-east-1',
          credentials: credentials
        })

        const { voiceId = 'Joanna', languageCode = 'en-US', textType = 'text', outputFormat = 'mp3' } = options

        const params: any = {
          OutputFormat: outputFormat,
          Text: text,
          VoiceId: voiceId,
          TextType: textType,
          LanguageCode: languageCode
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
              const blob = new Blob([arrayBuffer], { type: `audio/${outputFormat}` })

              setState(prevState => ({ ...prevState, loading: false, response: blob }))
            } else {
              chunks.push(result.value)
              reader.read().then(processStream)
            }
          }

          reader.read().then(processStream)
        }
      } catch (error) {
        console.error('Error:', error)
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : null
        }))
      }
    }

    fetchPolly()
  }, [text, options])

  return state
}

export default usePolly
