import React, { useCallback, useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'

interface RecordedChunks {
  data: Blob[]
}

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

interface MockInterviewPageProps {
  interviews: Interview[]
}

function MockInterviewPage({ interviews }: MockInterviewPageProps) {
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [capturing, setCapturing] = useState<boolean>(false)
  const [recordedChunks, setRecordedChunks] = useState<RecordedChunks>({ data: [] })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState(30)

  const auth = useAuth()

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks(prev => ({ data: [...prev.data, data] }))
      }
    },
    [setRecordedChunks]
  )

  const handleUploadAndMoveToNextQuestion = useCallback(async () => {
    // If the media recorder state is not 'inactive', then stop it
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }

    console.log('handleUploadAndMoveToNextQuestion')
    console.log('recordedChunks.data.length:', recordedChunks.data.length)
    if (currentQuestionIndex < interviews.length) {
      const currentUser = await Auth.currentAuthenticatedUser()
      const userId = currentUser.attributes.sub
      const timestamp = new Date().getTime()
      const uniqueFilename = `${userId}-${timestamp}-interview.webm`

      const blob = new Blob(recordedChunks.data, { type: 'video/webm' })
      await Storage.put(uniqueFilename, blob, {
        contentType: 'video/webm',
        level: 'private'
      })

      const interview = interviews[currentQuestionIndex]

      const emailAddress = auth.user?.userEmailAddress
      const interviewID = interview.interviewID
      const questionID = interview.interviewQuestionID

      const updateResult = await API.graphql(
        graphqlOperation(updateInterviewVideoKey, {
          emailAddress: emailAddress,
          interviewID: interviewID,
          questionID: questionID,
          interviewVideoKey: uniqueFilename
        })
      )

      console.log('Interview updated:', updateResult)

      setCurrentQuestionIndex(prevIndex => prevIndex + 1)

      // Reset time left
      setTimeLeft(30)
    }
  }, [recordedChunks.data, currentQuestionIndex, interviews, auth.user?.userEmailAddress, handleDataAvailable])

  const handleStartCaptureClick = useCallback(() => {
    console.log('handleStartCaptureClick')
    setCapturing(true)

    // Reset the media recorder
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.removeEventListener('dataavailable', handleDataAvailable)
    }
    setRecordedChunks({ data: [] })

    const mediaStream = webcamRef.current?.stream
    if (mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm'
      })
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
      mediaRecorderRef.current.start(1000)
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (capturing) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    }

    if (timeLeft === 0 && capturing) {
      handleUploadAndMoveToNextQuestion()
    }

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturing, timeLeft])

  return (
    <>
      <Webcam audio={true} muted={true} ref={webcamRef} />
      {currentQuestionIndex < interviews.length && (
        <>
          <p>
            Question {currentQuestionIndex + 1} of {interviews.length}:{' '}
            {interviews[currentQuestionIndex].interviewDateTime}
          </p>
          <p>Time left: {timeLeft}s</p>
          {capturing ? (
            <>
              <button onClick={handleUploadAndMoveToNextQuestion}>Finish Early</button>
            </>
          ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
          )}
        </>
      )}
    </>
  )
}

export default MockInterviewPage
