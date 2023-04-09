import React, { useState } from 'react'
import axios from 'axios'
import { usePolly } from 'src/hooks/usePolly'

const ChatGPTPage: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null)
  const { audioRef, isLoading } = usePolly(response)

  const handleClick = async () => {
    try {
      const res = await axios.post('/api/chatgpt', {
        message: 'Write a python version of bubble sort. Do not include example usage.'
      })
      console.log(res.data.text)
      setResponse(res.data.text)
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
      <button onClick={handleClick} disabled={isLoading}>
        Get ChatGPT Response
      </button>
      <button onClick={handleStop} disabled={!response || isLoading}>
        Stop Playback
      </button>
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
