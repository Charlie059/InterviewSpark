import { useState, useCallback, useEffect, SetStateAction } from 'react'
import { startRecording, stopRecording } from 'src/utils/transcribe'

const useTranscribe = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState('')
  const [language, setLanguage] = useState('en-US')

  const handleStartRecording = useCallback(async () => {
    setIsRecording(true)
    await startRecording(language, (data: SetStateAction<string>) => setTranscribedText(data))
  }, [language])

  const handleStopRecording = useCallback(() => {
    setIsRecording(false)
    stopRecording()
    setTranscribedText('')
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
    setTranscribedText,
    language,
    setLanguage,
    handleStartRecording,
    handleStopRecording
  }
}

export default useTranscribe
