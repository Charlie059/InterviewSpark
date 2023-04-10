import React, { useCallback, useRef, useState, useEffect, ReactNode } from 'react'
import Webcam from 'react-webcam'
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Grid, styled } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import VideocamIcon from '@mui/icons-material/Videocam'
import Spacing from 'src/@core/theme/spacing'

interface RecordedChunks {
  data: Blob[]
}

type StyledIconButtonProps = IconButtonProps & {
  capturing: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledVideoRecordingButton = styled(({ capturing, ...props }: StyledIconButtonProps) => (
  <IconButton {...props} />
))(({ theme }) => ({
  backgroundColor: '#72D868',
  '&:hover': {
    backgroundColor: '#72D868'
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
    fontSize: '2rem'
  },
  padding: theme.spacing(4.1),
  margin: theme.spacing(0, 1.2)
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledMicRecordingButton = styled(({ capturing, ...props }: StyledIconButtonProps) => <IconButton {...props} />)(
  ({ theme }) => ({
    backgroundColor: '#FF6C4B',
    '&:hover': {
      backgroundColor: '#FF6C4B'
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
      fontSize: '2rem'
    },
    padding: theme.spacing(4.1),
    margin: theme.spacing(0, 1.2)
  })
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledStartButton = styled(({ capturing, ...props }: StyledIconButtonProps) => <IconButton {...props} />)(
  ({ theme }) => ({
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
  })
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledNextButton = styled(({ capturing, ...props }: StyledIconButtonProps) => <IconButton {...props} />)(
  ({ theme }) => ({
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
  })
)

function MockInterviewPage() {
  const interviews = [
    {
      interviewQuestionID: '1',
      interviewDateTime: '2023-04-10T12:00:00Z',
      interviewQuestion: 'Tell me about yourself.'
    },
    {
      interviewQuestionID: '2',
      interviewDateTime: '2023-04-10T12:30:00Z',
      interviewQuestion: 'What is your greatest strength?'
    }
  ]

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

      setTimeout(() => {
        handleStartCaptureClick()
      }, 500)
    }
  }, [recordedChunks.data, currentQuestionIndex, auth.user?.userEmailAddress, handleDataAvailable])

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
    let interval: number | undefined

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
    <Grid container direction='column' alignItems='center'>
      <Box sx={{ margin: 20 }}></Box>
      <Grid item xs={12}>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={6}>
            <Box width='500px' height='380px'>
              <Webcam
                audio={true}
                muted={true}
                ref={webcamRef}
                width='100%'
                height='100%'
                style={{ borderRadius: '15px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              width='500px'
              height='380px'
              borderRadius={'15px'}
              style={{ overflow: 'hidden', backgroundColor: '#EBEBEB' }}
            >
              <Grid container alignItems='center' justifyContent='center' style={{ height: '100%' }}>
                <img src='/images/favicon.png' alt='logo' width={'15%'} height={'auto'} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ width: '100%', position: 'absolute', bottom: 0 }}>
        <Box
          width='100%'
          height='100%'
          p={2}
          borderRadius={'20px'}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {currentQuestionIndex < interviews.length && (
            <>
              <StyledVideoRecordingButton capturing={capturing}>
                <VideocamIcon />
              </StyledVideoRecordingButton>

              <StyledMicRecordingButton capturing={capturing}>
                <MicIcon />
              </StyledMicRecordingButton>
              {capturing ? (
                <>
                  <StyledNextButton capturing={capturing} onClick={handleUploadAndMoveToNextQuestion}>
                    <ArrowForwardIosIcon />
                  </StyledNextButton>
                </>
              ) : (
                <StyledStartButton capturing={capturing} onClick={handleStartCaptureClick}>
                  <PlayArrowIcon />
                </StyledStartButton>
              )}
            </>
          )}
        </Box>
        <Box sx={{ margin: 5 }}>
          {' '}
          <p>
            Question {currentQuestionIndex + 1} of {interviews.length}:{' '}
            {interviews[currentQuestionIndex].interviewDateTime}
          </p>
          <p>Time left: {timeLeft}s</p>
          <p>{transcribedText}</p>
          <audio ref={audioRef} />
        </Box>
      </Grid>
    </Grid>
  )
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
