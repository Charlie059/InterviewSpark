import React from 'react'
import useTranscribe from 'src/hooks/useTranscribe'

interface SpeechToTextProps {
  onTranscriptionData: (data: string) => void
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscriptionData }) => {
  const { isRecording, transcribedText, language, setLanguage, handleStartRecording, handleStopRecording } =
    useTranscribe()

  React.useEffect(() => {
    if (typeof onTranscriptionData === 'function') {
      onTranscriptionData(transcribedText)
    }
  }, [onTranscriptionData, transcribedText])

  return (
    <div>
      <h3>Transcription:</h3>
      <p>{transcribedText}</p>
      <div>
        <label htmlFor='language'>Language:</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value='en-US'>English (US)</option>
          <option value='zh-CN'>Chinese (Simplified)</option>
          {/* Add more language options here */}
        </select>
      </div>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  )
}

export default SpeechToText
