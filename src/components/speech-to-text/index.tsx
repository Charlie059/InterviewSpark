import { useState, useEffect } from 'react'
import { startRecording, stopRecording } from './transcribeClient'

type SpeechToTextProps = {
  onTranscriptionData: (data: string) => void
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptionData }) => {
  const [recording, setRecording] = useState(false)
  const [language, setLanguage] = useState<string>('')

  const handleStartRecording = async () => {
    try {
      setRecording(true)
      await startRecording(language, onTranscriptionData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleStopRecording = () => {
    try {
      setRecording(false)
      stopRecording()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    try {
      if (recording) {
        handleStartRecording()
      } else {
        handleStopRecording()
      }
    } catch (error) {}
  }, [recording])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value=''>Select a language</option>
        <option value='en-US'>English (US)</option>
        <option value='es-US'>Spanish (US)</option>
        {/* Add more language options */}
      </select>
      <button onClick={() => setRecording(!recording)}>{recording ? 'Stop Recording' : 'Start Recording'}</button>
    </div>
  )
}

export default SpeechToText
