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

// MUI Components
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VideocamIcon from '@mui/icons-material/Videocam'
import MicIcon from '@mui/icons-material/Mic'
import { Box, Card, Grid, Typography, styled } from '@mui/material'
import CircleProgressBar from 'src/components/interview/mockInterview/circleProgressBar'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

interface RecordedChunks {
  data: Blob[]
}

type StyledIconButtonProps = IconButtonProps & {
  capturing?: boolean
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

  const [timeLeft, setTimeLeft] = useState(1000)
  const [messageToSpeak, setMessageToSpeak] = useState<string | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [detailedInterviews, setDetailedInterviews] = useState<any[]>([])

  // Hooks for transcription and text-to-speech
  const { transcribedText, handleStartRecording, handleStopRecording } = useTranscribe()
  const { audioRef } = usePolly(messageToSpeak)

  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [showCard, setShowCard] = useState(false)

  const StyledVideoRecordingButton = styled(({ ...props }: StyledIconButtonProps) => <IconButton {...props} />)(
    ({ theme }) => ({
      backgroundColor: videoEnabled ? '#72D868' : '#DFDDDD',

      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '2rem'
      },
      padding: theme.spacing(4.1),
      margin: theme.spacing(0, 1.2)
    })
  )

  const CircleProgressBarWrapper = styled(Box)(({}) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rotate: '270deg'
  }))

  const StyledNextButtonWrapper = styled(Box)(({}) => ({
    position: 'relative',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const StyledMicRecordingButton = styled(({ ...props }: StyledIconButtonProps) => <IconButton {...props} />)(
    ({ theme }) => ({
      backgroundColor: audioEnabled ? '#FF6C4B' : '#DFDDDD',

      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '2rem'
      },
      padding: theme.spacing(4.1),
      margin: theme.spacing(0, 1.2)
    })
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const StyledStartButton = styled(({ ...props }: StyledIconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
    backgroundColor: '#DFDDDD',
    '&:hover': {
      backgroundColor: '#3888FF'
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
      fontSize: '2rem'
    },
    padding: theme.spacing(4.1),
    margin: theme.spacing(0, 1.2)
  }))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const StyledNextButton = styled(({ ...props }: StyledIconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
    backgroundColor: '#DFDDDD',
    '&:hover': {
      backgroundColor: '#3888FF'
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
      fontSize: '2rem'
    },
    padding: theme.spacing(4.1),
    margin: theme.spacing(0, 1.2)
  }))

  const handleVideoToggle = () => {
    setVideoEnabled(prev => !prev)
    webcamRef.current?.stream?.getVideoTracks().forEach(track => (track.enabled = !track.enabled))
  }

  const handleAudioToggle = () => {
    setAudioEnabled(prev => !prev)
    webcamRef.current?.stream?.getAudioTracks().forEach(track => (track.enabled = !track.enabled))
  }

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
          const estimatedSecond = result.data.getQuestionMetaData.estimatedSecond

          return { ...interview, interviewQuestion, estimatedSecond }
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
      ' 1. The response should not be a question and it should be a general feedback about 300 words.' +
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

    const estimatedSecond = detailedInterviews[currentQuestionIndex]?.estimatedSecond || 1000
    console.log('detailedInterviews', detailedInterviews)
    setTimeLeft(estimatedSecond)

    // Play the audio of the question
    setMessageToSpeak('My question is, ' + detailedInterviews[currentQuestionIndex].interviewQuestion)
    await waitForAudioToEnd() // Wait for the audio playing to end

    // Start the transcription
    handleStartRecording()

    resetMediaRecorder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleUploadAndMoveToNextQuestion = async () => {
    setCapturing(true)
    setTimeLeft(NaN)

    // If the media recorder state is not 'inactive', then stop it
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }

    // TODO - Add a loading indicator and it is not good to use a timeout here
    // Wait 4 seconds for the transcription to complete
    await new Promise(resolve => setTimeout(resolve, 4000))

    // Pass the text to the ChatGPT API
    const transcribedText_ = transcribedText

    // Stop the transcription
    handleStopRecording()

    // Send the transcribed text to GPT-3.5 Speak
    await sendToGPT2Speak(transcribedText_)

    // Upload the video to S3
    await saveToS3()

    // Move to the next question
    currentQuestionIndex += 1

    if (currentQuestionIndex < interviews.length) {
      handleStartCaptureClick()
    } else {
      setCapturing(false)

      // Turn off the webcam and stop the media recorder
      webcamRef.current?.stream?.getTracks().forEach(track => track.stop())

      router.push('/interview/finish')
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
    <Grid container direction='column' alignItems='center'>
      <Box sx={{ margin: 20 }}></Box>
      <Grid item xs={12}>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={6}>
            <Box width='500px' height='380px' sx={{ position: 'relative' }}>
              <Webcam
                audio={true}
                muted={true}
                ref={webcamRef}
                width='100%'
                height='100%'
                style={{
                  borderRadius: '15px',
                  position: 'absolute',
                  zIndex: videoEnabled ? 1 : -1
                }}
              />
              <Box
                width='100%'
                height='100%'
                borderRadius={'15px'}
                style={{
                  backgroundColor: videoEnabled ? 'transparent' : 'rgba(128, 128, 128, 0.5)',
                  position: 'absolute',
                  zIndex: videoEnabled ? -1 : 1
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              width='500px'
              height='380px'
              borderRadius={'15px'}
              style={{ overflow: 'hidden', backgroundColor: '#EBEBEB', position: 'relative' }}
              onClick={() => setShowCard(!showCard)}
            >
              <MenuOpenIcon style={{ position: 'absolute', bottom: 0, right: 0, margin: 5, color: '#0f0f0f0f' }} />
              <Grid container alignItems='center' justifyContent='center' style={{ height: '100%' }}>
                <img src='/images/favicon.png' alt='logo' width={'15%'} height={'auto'} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {showCard && (
        <Card sx={{ marginTop: 8, marginLeft: 30, marginRight: 30, backgroundColor: '#EBEBEB' }}>
          {/* <p>{transcribedText}</p> */}
          <Typography variant='h6' sx={{ ml: 2, fontWeight: 200, margin: '10px 20px 10px 20px' }}>
            Question {currentQuestionIndex + 1}: {detailedInterviews[currentQuestionIndex]?.interviewQuestion}
          </Typography>
        </Card>
      )}

      <Box margin={2}></Box>
      <Box width='100%' height='100%' p={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {currentQuestionIndex < interviews.length && (
          <>
            <StyledVideoRecordingButton onClick={handleVideoToggle}>
              <VideocamIcon />
            </StyledVideoRecordingButton>

            <StyledMicRecordingButton onClick={handleAudioToggle}>
              <MicIcon />
            </StyledMicRecordingButton>
            {capturing ? (
              <>
                <StyledNextButtonWrapper>
                  <CircleProgressBarWrapper>
                    <CircleProgressBar
                      size={70}
                      progress={(timeLeft / detailedInterviews[currentQuestionIndex]?.estimatedSecond) * 100}
                      strokeWidth={8}
                      circleOneStroke='#D9D9D9'
                      circleTwoStroke='#4C4CFD'
                    />
                  </CircleProgressBarWrapper>
                  <StyledNextButton onClick={handleUploadAndMoveToNextQuestion}>
                    <ArrowForwardIosIcon />
                  </StyledNextButton>
                </StyledNextButtonWrapper>
              </>
            ) : (
              <StyledStartButton onClick={handleStartCaptureClick}>
                <PlayArrowIcon />
              </StyledStartButton>
            )}
          </>
        )}
      </Box>
      <audio ref={audioRef} />
    </Grid>
  )
}

MockInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
