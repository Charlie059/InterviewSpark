import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { Polly, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'

const ChatGPTPage: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleClick = async () => {
    try {
      const res = await axios.post('/api/chatgpt', {
        message: 'Write a python version of bubble sort. Do not include example usage.'
      })
      console.log(res.data.text)
      setResponse(res.data.text)

      const credentials = await Auth.currentCredentials()

      const polly = new Polly({
        region: 'us-east-1',
        credentials: credentials
      })

      const params: any = {
        OutputFormat: 'mp3',
        Text: res.data.text,
        TextType: 'text',
        Engine: 'neural',
        VoiceId: 'Aria',
        SampleRate: '22050'
      }

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
      console.error('Error:', error)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  return (
    <div>
      <h1>ChatGPT Page</h1>
      <button onClick={handleClick}>Get ChatGPT Response</button>
      <button onClick={handleStop}>Stop Playback</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  )
}

export default ChatGPTPage
