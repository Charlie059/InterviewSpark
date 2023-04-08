import { useState, useEffect, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { Polly, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

type PollysynthState = {
  loading: boolean
  error: Error | null
  response: Blob | null
}

type PollysynthOptions = {
  voiceId?: string
  languageCode?: string
  textType?: string
  outputFormat?: string
}

const usePollysynth = (text: string, options: PollysynthOptions = {}): PollysynthState => {
  const [state, setState] = useState<PollysynthState>({
    loading: true,
    error: null,
    response: null
  })

  const credentialsRef = useRef(null)

  const synthesizeSpeech = async (polly: Polly, params: any, outputFormat: string) => {
    try {
      const data = await polly.send(new SynthesizeSpeechCommand(params))

      console.log(data)

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

  useEffect(() => {
    const fetchPollysynth = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }))

        const credentials = credentialsRef.current || (await Auth.currentCredentials())

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

        await synthesizeSpeech(polly, params, outputFormat)
      } catch (error) {
        console.error('Error:', error)
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: error instanceof Error ? error : null
        }))
      }
    }

    fetchPollysynth()
  }, [text, options])

  return state
}

export default usePollysynth
