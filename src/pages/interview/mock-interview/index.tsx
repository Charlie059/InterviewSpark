import React, { useCallback, useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Log from 'src/middleware/loggerMiddleware'

interface RecordedChunks {
  data: Blob[]
}

function MockInterviewPage() {
  const router = useRouter()
  const interviewsParam = router.query.interviews
    ? Array.isArray(router.query.interviews)
      ? router.query.interviews[0]
      : router.query.interviews
    : JSON.stringify([])

  const interviews = JSON.parse(interviewsParam)

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

  const handleUploadAndMoveToNextQuestion = async () => {
    // If the media recorder state is not 'inactive', then stop it
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }

    Log.info('handleUploadAndMoveToNextQuestion')
    Log.info('recordedChunks.data.length:', recordedChunks.data.length)

    if (currentQuestionIndex < interviews.length) {
      try {
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

        Log.info('Interview updated:', updateResult)

        setCurrentQuestionIndex(prevIndex => prevIndex + 1)

        // Reset time left
        setTimeLeft(30)

        if (currentQuestionIndex < interviews.length - 1) {
          setTimeout(() => {
            handleStartCaptureClick()
          }, 500)
        } else {
          alert('You have completed all the mock interviews. Thank you!')

          // Set the capturing state to false
          setCapturing(false)

          // Turn off the webcam and stop the media recorder
          webcamRef.current?.stream?.getTracks().forEach(track => track.stop())
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleStartCaptureClick = async () => {
    Log.info('handleStartCaptureClick')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    let interval: any | undefined

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
