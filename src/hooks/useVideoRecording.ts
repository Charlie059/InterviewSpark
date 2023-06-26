/***********************************************************************************************
  Name: useVideoRecording.tsx
  Description: This file contains the custom hook for video recording.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/12
  Update Date: 2023/06/12
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

interface ErrorState {
  type: 'Recording-Error'
  message?: string
}

// Constants
const VIDEO_MIME_TYPE = 'video/webm' // MIME type for the recorded video
const MEDIA_RECORDER_INTERVAL = 1000 // Interval for MediaRecorder's start method

export default function useVideoRecording() {
  // States
  const [capturing, setCapturing] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [videoRecordingError, setVideoRecordingError] = useState<ErrorState | null>(null)

  // Refs
  const webcamRef = useRef<Webcam | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([])
  const videoBlobRef = useRef<Blob | null>(null)

  const setVideoOn = async () => {
    if (webcamRef.current) {
      webcamRef.current?.stream?.getVideoTracks().forEach(track => (track.enabled = true))
    }
    setVideoEnabled(true)
  }

  const setVideoOff = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      webcamRef.current?.stream?.getVideoTracks().forEach(track => (track.enabled = false))
    }
    setVideoEnabled(false)
  }

  // Start capturing video
  const handleStartCapture = () => {
    try {
      if (!webcamRef.current || !webcamRef.current.stream) {
        throw new Error('Webcam not available')
      }

      setCapturing(true)
      const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: VIDEO_MIME_TYPE
      })
      mediaRecorderRef.current = mediaRecorder
      setRecordedChunks([]) // Clear previous recording
      mediaRecorderRef.current.start(MEDIA_RECORDER_INTERVAL)
      mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
    } catch (err: any) {
      setVideoRecordingError({ type: 'Recording-Error', message: err.message })
    }
  }

  // Handle new data available from the MediaRecorder
  const handleDataAvailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      setRecordedChunks(prev => prev.concat(e.data))
    }
  }

  // Stop capturing video
  const handleStopCapture = () => {
    try {
      if (!mediaRecorderRef.current) {
        throw new Error('MediaRecorder not available')
      }

      mediaRecorderRef.current.stop()
      setCapturing(false)

      // Convert the recordedChunks into a single Blob
      const blob = new Blob(recordedChunks, { type: VIDEO_MIME_TYPE })
      videoBlobRef.current = blob // Store the Blob in the ref
    } catch (err: any) {
      setVideoRecordingError({ type: 'Recording-Error', message: err.message })
    }
  }

  // Get the Blob of the entire video
  const getVideoBlob = () => {
    return videoBlobRef.current // Return the Blob from the ref
  }

  return {
    webcamRef,
    isCapturing: capturing,
    handleStartCapture,
    handleStopCapture,
    getVideoBlob,
    videoRecordingError,
    setVideoOn,
    setVideoOff,
    isVideoEnabled: videoEnabled
  }
}
