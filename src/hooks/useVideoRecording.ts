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
import Logger from 'src/middleware/loggerMiddleware'

interface ErrorState {
  type: 'Recording-Error'
  message?: string
}

// Constants
const VIDEO_MIME_TYPE = 'video/webm' // MIME type for the recorded video
const AUDIO_MIME_TYPE = 'audio/webm' // MIME type for the recorded audio
const MEDIA_RECORDER_INTERVAL = 1000 // Interval for MediaRecorder's start method

export default function useVideoRecording(audioInput: string) {
  // States
  const [capturing, setCapturing] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [videoRecordingError, setVideoRecordingError] = useState<ErrorState | null>(null)

  // Refs
  const webcamRef = useRef<Webcam | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<BlobPart[]>([])
  const videoBlobRef = useRef<Blob | null>(null)
  const startTimeRef = useRef<Date | null>(null)

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

  // Start capturing video or audio
  const handleStartCapture = () => {
    try {
      setCapturing(true)

      // Check if webcam is available
      if (!webcamRef.current || !webcamRef.current.stream) {
        console.log('Webcam not available, falling back to audio')

        // Fall back to audio if webcam is not available
        const mediaStreamConstraints = {
          audio: {
            deviceId: audioInput ? { exact: audioInput } : undefined
          }
        }
        navigator.mediaDevices
          .getUserMedia(mediaStreamConstraints)
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: AUDIO_MIME_TYPE
            })
            mediaRecorderRef.current = mediaRecorder
            recordedChunksRef.current = [] // Clear previous recording
            mediaRecorderRef.current.start(MEDIA_RECORDER_INTERVAL)
            mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
            startTimeRef.current = new Date()
          })
          .catch(err => {
            setVideoRecordingError({ type: 'Recording-Error', message: err.message })
            Logger.error(err)
          })
      } else {
        console.log('webcamRef.current: ' + webcamRef.current)

        const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
          mimeType: VIDEO_MIME_TYPE
        })
        mediaRecorderRef.current = mediaRecorder
        recordedChunksRef.current = [] // Clear previous recording
        mediaRecorderRef.current.start(MEDIA_RECORDER_INTERVAL)
        mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
        startTimeRef.current = new Date()
      }
    } catch (err: any) {
      setVideoRecordingError({ type: 'Recording-Error', message: err.message })
      Logger.error(err)
    }
  }

  // Handle new data available from the MediaRecorder
  const handleDataAvailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      recordedChunksRef.current = [...recordedChunksRef.current, e.data]
      console.log('e.data: ' + e.data)
    }
  }

  // Stop capturing video or audio
  const handleStopCapture = () => {
    try {
      if (!mediaRecorderRef.current) {
        throw new Error('MediaRecorder not available')
      }

      mediaRecorderRef.current.stop()
      setCapturing(false)

      console.log('recordedChunks: ' + recordedChunksRef)

      // Check the mimeType of the MediaRecorder to determine whether to save as video or audio
      const blobType = mediaRecorderRef.current.mimeType.includes('audio') ? AUDIO_MIME_TYPE : VIDEO_MIME_TYPE

      // Convert the recordedChunks into a single Blob
      const blob = new Blob(recordedChunksRef.current, { type: blobType })
      videoBlobRef.current = blob // Store the Blob in the ref

      // Calculate the length of the video or audio
      const endTime = new Date()

      console.log('startTime: ' + startTimeRef.current!.getTime())
      const length = (endTime.getTime() - startTimeRef.current!.getTime()) / 1000
      console.log('Recording length: ' + length + 's')

      return length
    } catch (err: any) {
      setVideoRecordingError({ type: 'Recording-Error', message: err.message })
      Logger.error(err)
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
