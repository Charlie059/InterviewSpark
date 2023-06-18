import Logger from 'src/middleware/loggerMiddleware'
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import useMockInterview from 'src/hooks/useMockInterview'
import { useRouter } from 'next/router'
import { RoundedMediaLeft } from 'src/components/interview/mockInterview/roundedMediaLeft'
import PaginationBarWithNumber from 'src/components/interview/mockInterview/paginationBarWithNumber'
import { Box, Grid } from '@mui/material'
import MenuIconButton from 'src/components/interview/mockInterview/menuIconButton'
import BlurDrawer from 'src/components/interview/mockInterview/blurDrawer'
import TopArea from 'src/components/interview/mockInterview/topArea'
import RoundedMediaRight from 'src/components/interview/mockInterview/roundedMediaRight'
import InterviewButton from 'src/components/interview/mockInterview/interviewButton'
import LoadingScreen from 'src/components/loading/Loading'

// Define states for the mock interview process
enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}
interface Interview {
  interviewID: string
  interviewQuestion: string
  interviewQuestionID: string
  interviewQuestionTitle: string
  interviewQuestionType: string
  interviewVideoKey: string
  estimatedSecond: number
  interviewDateTime: string
  interviewFeedback: string
}

function MockInterviewPage() {
  const interviews: Interview[] = [
    {
      interviewID: '1686172082494',
      interviewQuestion:
        'Describe a situation where you had to handle a difficult customer. How did you manage the situation? ',
      interviewQuestionID: '1',
      interviewQuestionTitle: 'Difficult Customer',
      interviewQuestionType: 'Behavioral',
      interviewVideoKey: '',
      estimatedSecond: 200,
      interviewDateTime: '2021-07-01T00:00:00',
      interviewFeedback: 'Good'
    },
    {
      interviewID: '1686172082495',
      interviewQuestion: ' a XXXX. How did you manage the situation?',
      interviewQuestionID: '2',
      interviewQuestionTitle: ' Customer',
      interviewQuestionType: 'Behavioral',
      interviewVideoKey: '',
      estimatedSecond: 120,
      interviewDateTime: '2021-07-01T00:00:00',
      interviewFeedback: 'Good'
    }
  ]
  const router = useRouter()
  const {
    getInterviewState,
    getCaption,
    startQuestion,
    finishQuestion,
    startReview,
    moveToNextQuestion,
    retryQuestion,
    saveVideo,
    setVideoOn,
    setVideoOff,
    getAudioRef,
    getWebcamRef,
    getVideoBlob,
    isVideoEnabled,
    isReading
  } = useMockInterview(interviews)

  const handleStartCaptureClick = useCallback(() => {
    Logger.debug('Start Interview')
    startQuestion()
  }, [startQuestion])

  const handleMoveToNextQuestion = useCallback(() => {
    moveToNextQuestion()
  }, [moveToNextQuestion])

  const handleSaveVideo = useCallback(() => {
    saveVideo()
      .then(() => {
        console.log('Video successfully saved.')
      })
      .catch(error => {
        console.log('Failed to save video:', error)
      })
  }, [saveVideo])

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  interface TimerHandle {
    start: () => void
    stop: () => void
    reset: () => void
  }
  const timerRef = useRef<TimerHandle | null>(null)

  const startTimer = function (): void {
    timerRef.current && timerRef.current.start()
  }

  const stopTimer = function (): void {
    timerRef.current && timerRef.current.stop()
  }
  const resetTimer = function (): void {
    timerRef.current && timerRef.current.reset()
  }

  useEffect(() => {
    resetTimer()
  }, [getInterviewState.currentQuestionIndex])

  // If finished, redirect to the result page
  useEffect(() => {
    if (getInterviewState.status === InterviewStatus.FinishedInterview) {
      router.push('/interview/finish')
    }
  }, [getInterviewState.status, router])

  useEffect(() => {
    if (getInterviewState.error) {
      console.log('Error:', getInterviewState.error)
      alert(getInterviewState.error)
    }
  }, [getInterviewState.error])

  useEffect(() => {
    if (getInterviewState.status === InterviewStatus.SavedQuestion) {
      handleMoveToNextQuestion()
    }
  }, [getInterviewState.status, handleMoveToNextQuestion])

  return (
    <Box sx={{ bgcolor: '#F2F7FE' }}>
      {getInterviewState.status === InterviewStatus.Loading && <LoadingScreen />}
      <BlurDrawer
        isOpen={drawerOpen}
        toggleDrawer={function (): void {
          console.log('toggle')
          setDrawerOpen(!drawerOpen)
        }}
      />
      <Box>
        <TopArea
          ref={timerRef}
          onExit={() => console.log('Exit button clicked')}
          initialTime={interviews[getInterviewState.currentQuestionIndex].estimatedSecond}
          onComplete={() => {
            console.log('Timer completed')
            finishQuestion()
            resetTimer()
          }}
          onButtonClick={() => console.log('Menu button clicked')}
        />
      </Box>

      <Box mt={'5px'} mb={'40px'}>
        <Grid
          container
          spacing={10}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid item xs={0} sm={5} md={5.5} lg={4.5}>
            <RoundedMediaLeft
              getWebcamRef={getWebcamRef}
              getVideoBlob={getVideoBlob}
              isVideoEnabled={isVideoEnabled}
              setVideoOn={setVideoOn}
              setVideoOff={setVideoOff}
              status={getInterviewState.status}
              startReview={startReview}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5.5} lg={4.5}>
            <RoundedMediaRight
              status={getInterviewState.status}
              questionText={interviews[getInterviewState.currentQuestionIndex].interviewQuestion}
              questionTitle={interviews[getInterviewState.currentQuestionIndex].interviewQuestionTitle}
              skipQuestion={() => {
                moveToNextQuestion()
              }}
              caption={getCaption}
              isReading={isReading}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={'20px'}>
        <InterviewButton
          status={getInterviewState.status}
          isReading={isReading}
          onButtonClick={async function (status: InterviewStatus): Promise<void> {
            console.log('click')

            switch (status) {
              case InterviewStatus.NotStarted:
                handleStartCaptureClick()
                startTimer()

                break
              case InterviewStatus.Interviewing:
                if (!isReading) {
                  stopTimer()

                  // Wait 2 seconds to let transcription catch up
                  await new Promise(resolve => setTimeout(resolve, 2800))
                  finishQuestion()
                }
                resetTimer()

                break
              case InterviewStatus.FinishedQuestion:
                if (!isReading) {
                  handleSaveVideo()
                }
                break
              case InterviewStatus.Reviewing:
                if (!isReading) {
                  handleSaveVideo()
                }
                break
              default:
                break
            }
          }}
          onRetryClick={function (): void {
            retryQuestion()
            resetTimer()
            startTimer()
          }}
        />
      </Box>

      <Box mt={'20px'} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MenuIconButton
          onButtonClick={() => {
            setDrawerOpen(true)
          }}
        />
        <PaginationBarWithNumber
          totalPages={interviews.length}
          currentPage={getInterviewState.currentQuestionIndex + 1}
          onPageChange={function (newPage: number): void {
            console.log('page change', newPage)
          }}
          enableSelect={false}
        />
      </Box>

      <audio ref={getAudioRef} />
    </Box>
  )
}

MockInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
