import { useState, useCallback, useEffect, useRef } from 'react'
import { startRecording, stopRecording } from 'src/utils/transcribe'

interface ErrorState {
  type: 'AWS-Transcribe-Error'
  message?: string
}

const useTranscribe = (audioInput: string) => {
  const [isRecording, setIsRecording] = useState(false)
  const transcribedText = useRef('')
  const [language, setLanguage] = useState('en-US')
  const [transcribeError, setTranscribeError] = useState<ErrorState | null>(null)

  const handleStartTranscribe = useCallback(async () => {
    setIsRecording(true)
    try {
      await startRecording(
        language,
        (data: any) => {
          transcribedText.current = data as string
        },
        audioInput
      )
    } catch (err: any) {
      setTranscribeError({ type: 'AWS-Transcribe-Error', message: err })
    }
  }, [language, audioInput])

  const handleStopTranscribe = useCallback(() => {
    setIsRecording(false)
    stopRecording()
  }, [])

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording()
      }
    }
  }, [isRecording])

  return {
    isRecording,
    setIsRecording,
    transcribedText,
    language,
    setLanguage,
    transcribeError,
    handleStartTranscribe,
    handleStopTranscribe
  }
}

export default useTranscribe
