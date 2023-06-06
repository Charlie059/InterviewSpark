import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

// Constants
const VIDEO_MIME_TYPE = 'video/webm' // MIME type for the recorded video
const MEDIA_RECORDER_INTERVAL = 1000 // Interval for MediaRecorder's start method

export default function useVideoRecording() {
  // States
  const [capturing, setCapturing] = useState(false)

  // Refs
  const webcamRef = useRef<Webcam | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([])
  const videoBlobRef = useRef<Blob | null>(null)

  // Start capturing video
  const handleStartCapture = () => {
    if (!webcamRef.current || !webcamRef.current.stream) {
      return
    }

    setCapturing(true)
    const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
      mimeType: VIDEO_MIME_TYPE
    })
    mediaRecorderRef.current = mediaRecorder
    setRecordedChunks([]) // Clear previous recording
    mediaRecorderRef.current.start(MEDIA_RECORDER_INTERVAL)
    mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
  }

  // Handle new data available from the MediaRecorder
  const handleDataAvailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      setRecordedChunks(prev => prev.concat(e.data))
    }
  }

  // Stop capturing video
  const handleStopCapture = () => {
    if (!mediaRecorderRef.current) {
      return
    }

    mediaRecorderRef.current.stop()
    setCapturing(false)

    // Convert the recordedChunks into a single Blob
    const blob = new Blob(recordedChunks, { type: VIDEO_MIME_TYPE })
    videoBlobRef.current = blob // Store the Blob in the ref
  }

  // Get the Blob of the entire video
  const getVideoBlob = () => {
    return videoBlobRef.current // Return the Blob from the ref
  }

  return {
    webcamRef,
    capturing,
    handleStartCapture,
    handleStopCapture,
    getVideoBlob
  }
}
