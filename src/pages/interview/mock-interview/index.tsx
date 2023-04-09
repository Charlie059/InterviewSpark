import React, { useCallback, useRef, useState, useEffect, ReactNode } from 'react'

import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { usePolly } from 'src/hooks/usePolly'
import { getQuestionMetaData } from 'src/graphql/queries'

import Log from 'src/middleware/loggerMiddleware'
import Webcam from 'react-webcam'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import useTranscribe from 'src/hooks/useTranscribe'
import axios from 'axios'

interface RecordedChunks {
  data: Blob[]
}

// Variables
let currentQuestionIndex = 0

function MockInterviewPage() {
  // Router and authentication
  const router = useRouter()
  const auth = useAuth()

  // State variables
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [capturing, setCapturing] = useState<boolean>(false)
  const [recordedChunks, setRecordedChunks] = useState<RecordedChunks>({ data: [] })

  const [timeLeft, setTimeLeft] = useState(30)
  const [messageToSpeak, setMessageToSpeak] = useState<string | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [detailedInterviews, setDetailedInterviews] = useState<any[]>([])

  // Hooks for transcription and text-to-speech
  const { transcribedText, handleStartRecording, handleStopRecording } = useTranscribe()
  const { audioRef } = usePolly(messageToSpeak)

  // Fetch interview questions from the router query
  const interviewsParam = router.query.interviews
    ? Array.isArray(router.query.interviews)
      ? router.query.interviews[0]
      : router.query.interviews
    : JSON.stringify([])

  const interviews = JSON.parse(interviewsParam)

  useEffect(() => {
    // Helper function to fetch all the question details from the GraphQL API
    const fetchAllQuestionsDetails = async (interviews: any[]) => {
      try {
        const questionDetailsPromises = interviews.map(async interview => {
          const result = (await API.graphql(
            graphqlOperation(getQuestionMetaData, { questionID: interview.interviewQuestionID })
          )) as any

          const interviewQuestion = result.data.getQuestionMetaData.interviewQuestion

          console.log('Question details:', interviewQuestion)

          return { ...interview, interviewQuestion }
        })
        const newInterviews = await Promise.all(questionDetailsPromises)

        return newInterviews
      } catch (error) {
        console.error('Error fetching question details:', error)
      }
    }

    // Fetch all the question details
    const fetchAllDetails = async () => {
      const allDetails = await fetchAllQuestionsDetails(interviews)
      setDetailedInterviews(allDetails as any)
    }
    fetchAllDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Helper function to process the recorded chunks
  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks(prev => ({ data: [...prev.data, data] }))
      }
    },
    [setRecordedChunks]
  )

  // Helper function to save the recorded chunks to S3
  const saveToS3 = async () => {
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

      const interview = detailedInterviews[currentQuestionIndex]

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
    } catch (error) {
      console.error('Error saving to S3:', error)
    }
  }

  // Helper function to reset the media recorder
  const resetMediaRecorder = () => {
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
  }

  // Helper function to wait for the audio playing to end
  const waitForAudioToEnd = () => {
    return new Promise(resolve => {
      setIsAudioPlaying(true)
      audioRef.current?.addEventListener('ended', () => {
        setIsAudioPlaying(false)
        resolve(true)
      })
    })
  }

  // Helper function to send the transcribed text to GPT-3.5 Speak
  async function sendToGPT2Speak(transcribedText_: string) {
    const prompt =
      'This is a mock interview. You are interviewer, the candidate is asked to " ' +
      detailedInterviews[currentQuestionIndex].interviewQuestion +
      '". And the candidate answer is : " ' +
      transcribedText_ +
      ' " ' +
      'Please give your response to this answer with the following rules:' +
      ' 1. The response should not be a question and it should be a general feedback.' +
      ' 2. Ignore the grammar and spelling mistakes.' +
      ' 3. If the candidate answer is not clear, do not ask any questions to the candidate and say some general feedback.' +
      ' 4. The response should be a complete sentence and should like a real interview conversion between you and candidate.' +
      ' 5. If the candidate did not answer any question, just say I did not get you' +
      ' 6. Do not ask any follow up questions to the candidate.' +
      ' 7. Do not ask question!'

    console.log(prompt)
    try {
      const res = await axios.post('/api/chatgpt', {
        message: prompt
      })
      console.log(res.data.text)

      // Use polly to speak the response
      setMessageToSpeak(res.data.text)
      await waitForAudioToEnd()
    } catch (error) {
      console.error(error)
    }
  }

  // Handle the start of the recording
  const handleStartCaptureClick = async () => {
    setCapturing(true)

    // Play the audio of the question
    setMessageToSpeak('My question is, ' + detailedInterviews[currentQuestionIndex].interviewQuestion)
    await waitForAudioToEnd() // Wait for the audio playing to end

    // Start the transcription
    handleStartRecording()

    resetMediaRecorder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleUploadAndMoveToNextQuestion = async () => {
    // TODO - Add a loading indicator and it is not good to use a timeout here
    // Wait 4 seconds for the transcription to complete
    await new Promise(resolve => setTimeout(resolve, 4000))

    // Pass the text to the ChatGPT API
    const transcribedText_ = transcribedText

    // Stop the transcription
    handleStopRecording()

    // If the media recorder state is not 'inactive', then stop it
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }

    // Send the transcribed text to GPT-3.5 Speak
    await sendToGPT2Speak(transcribedText_)

    // Upload the video to S3
    await saveToS3()

    // Move to the next question
    currentQuestionIndex += 1

    // Reset time left
    setTimeLeft(30)

    if (currentQuestionIndex < interviews.length) {
      handleStartCaptureClick()
    } else {
      alert('You have completed all the mock interviews. Thank you!')
      setCapturing(false)

      // Turn off the webcam and stop the media recorder
      webcamRef.current?.stream?.getTracks().forEach(track => track.stop())
    }
  }

  useEffect(() => {
    let interval: any | undefined

    if (capturing && !isAudioPlaying) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    }

    if (timeLeft === 0 && !capturing) {
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
