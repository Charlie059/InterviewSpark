/***********************************************************************************************
  Name: UseTranscribe.tsx
  Description: This file contains the custom hook for transcribe.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/12
  Update Date: 2023/06/12
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { useState, useCallback, useEffect, SetStateAction } from 'react'
import { startRecording, stopRecording } from 'src/utils/transcribe'

interface ErrorState {
  type: 'AWS-Transcribe-Error'
  message?: string
}

const useTranscribe = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcribedText, setTranscribedText] = useState('')
  const [language, setLanguage] = useState('en-US')
  const [transcribeError, setTranscribeError] = useState<ErrorState | null>(null)

  const handleStartTranscribe = useCallback(async () => {
    setIsRecording(true)
    try {
      await startRecording(language, (data: SetStateAction<string>) => setTranscribedText(data))
    } catch (err: any) {
      setTranscribeError({ type: 'AWS-Transcribe-Error', message: err })
    }
  }, [language])

  const handleStopTranscribe = useCallback(() => {
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
    transcribeError,
    handleStartTranscribe,
    handleStopTranscribe
  }
}

export default useTranscribe
