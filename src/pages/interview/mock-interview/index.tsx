import React, { useCallback, useRef, useState, useEffect, ReactNode } from 'react'
import Webcam from 'react-webcam'
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Log from 'src/middleware/loggerMiddleware'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import useTranscribe from 'src/hooks/useTranscribe'
import axios from 'axios'
import { usePolly } from 'src/hooks/usePolly'

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
  const [timeLeft, setTimeLeft] = useState(300)
  const { transcribedText, handleStartRecording, handleStopRecording } = useTranscribe()
  const auth = useAuth()
  const [messageToSpeak, setMessageToSpeak] = useState<string | null>(null)
  const { audioRef } = usePolly(messageToSpeak)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks(prev => ({ data: [...prev.data, data] }))
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = async () => {
    Log.info('handleStartCaptureClick')
    setCapturing(true)

    handleStartRecording()

    // Play the audio of the question
    console.log(interviews)
    console.log(currentQuestionIndex)
    console.log('Interview question: ', interviews[currentQuestionIndex].interviewQuestion)
    setMessageToSpeak('The question is ' + interviews[currentQuestionIndex].interviewQuestion)

    // Wait for the audio to end
    await waitForAudioToEnd()

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

  const waitForAudioToEnd = () => {
    return new Promise(resolve => {
      setIsAudioPlaying(true)
      audioRef.current?.addEventListener('ended', () => {
        setIsAudioPlaying(false)
        resolve(true)
      })
    })
  }

  const handleUploadAndMoveToNextQuestion = async () => {
    // If the media recorder state is not 'inactive', then stop it
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }

    // Pass the text to the ChatGPT API
    const transcribedText_ = transcribedText

    const prompt =
      'This is a mock interview. You are interviewer, the candidate is asked to' +
      interviews[currentQuestionIndex].interviewQuestion +
      ' And the candidate answer is : " ' +
      transcribedText_ +
      ' " ' +
      ' Please give your response to this answer and please do not ask any question! no more than 300 words.'

    console.log(prompt)
    try {
      const res = await axios.post('/api/chatgpt', {
        message: prompt
      })
      console.log(res.data.text)

      // Use polly to speak the response
      setMessageToSpeak(res.data.text)

      // Wait for the audio to end
      await waitForAudioToEnd()

      console.log('Audio ended')
    } catch (error) {
      console.error(error)
    }

    // Stop the transcription
    handleStopRecording()

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
          handleStartCaptureClick()
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

  useEffect(() => {
    let interval: any | undefined

    if (capturing && !isAudioPlaying) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    }

    if (timeLeft === 0 && capturing) {
      handleUploadAndMoveToNextQuestion()
    }

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturing, timeLeft, isAudioPlaying])

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
      <p>{transcribedText}</p>
      <audio ref={audioRef} />
    </>
  )
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
