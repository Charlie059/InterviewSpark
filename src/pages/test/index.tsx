import { useState, useEffect } from 'react'
import { usePollyByQueue } from 'src/hooks/usePollyByQueue'

export default function Chat() {
  // const [messageToSpeak, setMessageToSpeak] = useState('')

  // const { audioRef } = usePolly(messageToSpeak)

  const { audioRef, addToQueue } = usePollyByQueue()
  const [incoming, setIncoming] = useState({ role: 'ai', message: '' })
  const [newMessage, setNewMessage] = useState({ role: 'ai', message: '' })
  const [input, setInput] = useState('')
  const [finished, setFinished] = useState(true)

  // const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'human',
      message: 'hello mr robot 👋'
    },
    {
      role: 'ai',
      message: '🤖 beep boop. hi. what do u want'
    }
  ])

  // const [playQueue, setPlayQueue] = useState<string[]>([])

  useEffect(() => {
    setNewMessage(incoming)
  }, [incoming])

  useEffect(() => {
    if (newMessage.message) {
      setMessages(prevMsgs => [...prevMsgs, newMessage])
    }
  }, [finished])

  // const startAndAwaitAudio = () => {
  //   return new Promise((resolve, reject) => {
  //     const onEnded = () => {
  //       audioRef.current?.removeEventListener('ended', onEnded)
  //       resolve(true)
  //     }

  //     audioRef.current?.addEventListener('ended', onEnded)
  //     audioRef.current?.addEventListener('error', reject)
  //     audioRef.current?.play()
  //   })
  // }

  // const playAudio = async message => {
  //   if (!message || message === '') {
  //     console.log('The message to speak is either null or empty.')

  //     return
  //   }

  //   setIsPlaying(true)
  //   setMessageToSpeak(message)
  //   try {
  //     await startAndAwaitAudio()
  //   } catch (error) {
  //     console.error('An error occurred while playing audio:', error)
  //   } finally {
  //     setIsPlaying(false)
  //   }
  // }

  const handleSubmit = async e => {
    e.preventDefault()

    setFinished(false)
    setMessages(prev => [...prev, { role: 'human', message: input }])

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: input,
        history: []
      })
    })

    setInput('')
    setIncoming({ role: 'ai', message: '' })

    const stream = res.body
    const reader = stream.getReader()

    let partialText = ''
    let cachedText = ''

    const addToQueueIfSentenceComplete = decodedValue => {
      cachedText += decodedValue
      const lastPunctuationIndex = Math.max(
        cachedText.lastIndexOf('.'),
        cachedText.lastIndexOf(','),
        cachedText.lastIndexOf('!'),
        cachedText.lastIndexOf('?')
      )

      if (lastPunctuationIndex !== -1) {
        const completeSentence = cachedText.slice(0, lastPunctuationIndex + 1)
        cachedText = cachedText.slice(lastPunctuationIndex + 1)

        if (completeSentence.trim() !== '') {
          // setPlayQueue(prevQueue => [...prevQueue, completeSentence])
          console.log('addToQueue', completeSentence)
          addToQueue(completeSentence)
        }
      }
    }

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }

        const decodedValue = new TextDecoder().decode(value)
        partialText += decodedValue
        addToQueueIfSentenceComplete(decodedValue)

        setIncoming(({ role, message }) => ({
          role,
          message: message + decodedValue
        }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      reader.releaseLock()
      setIncoming({ role: 'ai', message: '' })
      setFinished(true)
    }
  }

  return (
    <div className='bg-slate-100'>
      <div className='mx-auto flex h-screen max-w-[1000px] flex-col bg-white'>
        <div className='flex-grow overflow-y-auto p-4'>
          <div className='flex flex-col'>
            {messages.map((message, index) => {
              return (
                <div key={index} className={`flex ${message.role !== 'ai' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`${
                      message.role !== 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }  mb-2 max-w-sm rounded-md p-2 text-2xl`}
                  >
                    {message.message}
                  </div>
                </div>
              )
            })}

            {!finished && (
              <div className='mb-2 flex max-w-sm justify-start rounded-md bg-gray-200 p-2 text-2xl'>
                {incoming.message && incoming.message}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex-none p-6'>
          <div className='flex flex-col rounded-lg'>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={4}
              maxLength={200}
              className='w-full rounded-sm border
         p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:outline-none'
              placeholder={'Ask a question'}
            />

            {finished ? (
              <button
                className='mt-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-2 text-xl font-semibold text-white hover:from-blue-400 hover:to-blue-500 focus:outline-none'
                type='submit'
              >
                Submit
              </button>
            ) : (
              <button disabled className='w-full'>
                <div className='animate-pulse font-bold'>Thinking</div>
              </button>
            )}
          </div>
        </form>
      </div>
      <audio ref={audioRef} />
    </div>
  )
}

Chat.acl = {
  action: 'read',
  subject: 'acl-page'
}
