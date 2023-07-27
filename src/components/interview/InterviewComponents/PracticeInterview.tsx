/***********************************************************************************************
  Name: PracticeInterview
  Description: This file contains the UI for interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/19
  Update Date: 2023/06/19
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import Logger from 'src/middleware/loggerMiddleware'
import React, { useCallback, useEffect, useRef } from 'react'
import useInterview from 'src/hooks/useInterview'
import { useRouter } from 'next/router'
import { RoundedMediaLeft } from 'src/components/interview/InterviewComponents/roundedMediaLeft'
import PaginationBarWithNumber from 'src/components/interview/InterviewComponents/paginationBarWithNumber'
import { Box, Grid } from '@mui/material'
import MenuIconButton from 'src/components/interview/InterviewComponents/menuIconButton'
import BlurDrawer from 'src/components/interview/InterviewComponents/blurDrawer'
import TopArea from 'src/components/interview/InterviewComponents/topArea'
import RoundedMediaRight from 'src/components/interview/InterviewComponents/roundedMediaRight'
import InterviewButton from 'src/components/interview/InterviewComponents/interviewButton'
import LoadingScreen from 'src/components/loading/Loading'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { Interview } from 'src/types/types'

// Define states for the interview process
enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

interface TimerHandle {
  start: () => void
  stop: () => void
  reset: () => void
}

interface InterviewComponentProps {
  interviews: Interview[]
  info: Info
  disableInterviewAnalysis: boolean
  disableInterviewInteractiveFeedback: boolean
}

function InterviewComponent(interviewComponentProps: InterviewComponentProps) {
  const { interviews, info, disableInterviewAnalysis, disableInterviewInteractiveFeedback } = interviewComponentProps
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const timerRef = useRef<TimerHandle | null>(null)
  const lastInvocationTime = useRef(0)
  const {
    getInterviewState,
    getCaption,
    startQuestion,
    finishQuestion,
    startReview,
    moveToNextQuestion,
    setQuestionIndex,
    retryQuestion,
    saveVideo,
    setVideoOn,
    setVideoOff,
    getAudioRef,
    getWebcamRef,
    getVideoBlob,
    isVideoEnabled,
    isReading,
    videoInput,
    audioInput
  } = useInterview({
    interviews: interviews,
    disableInterviewAnalysis: disableInterviewAnalysis,
    disableInterviewInteractiveFeedback: disableInterviewInteractiveFeedback,
    info: info
  })

  // Helper function to guard against multiple invocations of finishQuestion
  function guardedFinishQuestion() {
    const now = Date.now()
    const timeSinceLastInvocation = now - lastInvocationTime.current

    if (timeSinceLastInvocation > 10000) {
      lastInvocationTime.current = now
      finishQuestion()
    }
  }

  // Timer helper functions
  const startTimer = function (): void {
    timerRef.current && timerRef.current.start()
  }

  const stopTimer = function (): void {
    timerRef.current && timerRef.current.stop()
  }
  const resetTimer = function (): void {
    timerRef.current && timerRef.current.reset()
  }

  // Handle start interview
  const handleStartCaptureClick = useCallback(() => {
    Logger.debug('Start Interview')
    startQuestion()
  }, [startQuestion])

  // Handle finish question and move to next question
  const handleMoveToNextQuestion = useCallback(() => {
    moveToNextQuestion()
  }, [moveToNextQuestion])

  // Handle Save video
  const handleSaveVideo = useCallback(() => {
    saveVideo()
      .then(() => {
        Logger.info('Video successfully saved.')
      })
      .catch(error => {
        Logger.info('Failed to save video:', error)
      })
  }, [saveVideo])

  // Handle the toggle drawer
  const handleToggleDrawer = function (): void {
    setDrawerOpen(!drawerOpen)
  }

  // Handle the close interview
  const handleCloseInterview = function (): void {
    Logger.debug('Close Interview')
    setDialogOpen(true) // Open the dialog
  }

  // Handle the handleDialogClose
  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  // Handle the handleDialogConfirm
  const handleDialogConfirm = () => {
    setDialogOpen(false)
    router.push('/interview') // Redirect to the homepage
  }

  // Handle the retry question
  const handleRetryQuestion = function (): void {
    retryQuestion()
    resetTimer()
    startTimer()
  }

  // Handle the click of the interview button
  const handleClickInterviewButton = async function (status: InterviewStatus): Promise<void> {
    Logger.debug('Click Interview Button')
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
          guardedFinishQuestion()
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
  }

  // Handle change the page
  const handlePageChange = function (newPage: number): void {
    Logger.info('page change', newPage)

    // If current status is not started, then we can change the page
    if (getInterviewState.status === InterviewStatus.NotStarted) {
      setQuestionIndex(newPage - 1)
    }
  }

  // Handle the timeout
  const handleTimeout = function (): void {
    finishQuestion()
    resetTimer()
  }

  // Define the UseEffect

  // Reset the timer when the question index changes
  useEffect(() => {
    resetTimer()
  }, [getInterviewState.currentQuestionIndex])

  // If finished, redirect to the result page
  useEffect(() => {
    if (getInterviewState.status === InterviewStatus.FinishedInterview) {
      router.push('/interview/finish')
    }
  }, [getInterviewState.status, router])

  // If hooks encountered an error, show the error message
  useEffect(() => {
    if (getInterviewState.error) {
      Logger.error('Error:', getInterviewState.error)

      // TODO: Based on the error type, show the error message and handle the error
      alert(getInterviewState.error.type)
    }
  }, [getInterviewState.error])

  // If the status is SavedQuestion, move to the next question
  useEffect(() => {
    if (getInterviewState.status === InterviewStatus.SavedQuestion) {
      handleMoveToNextQuestion()
    }
  }, [getInterviewState.status, handleMoveToNextQuestion])

  return (
    <div style={{ backgroundColor: '#F2F7FE', minHeight: '100vh' }}>
      <audio ref={getAudioRef} />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{'Close the Interview'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to close the interview? If you confirm, you will be redirected to the homepage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary'>
            No
          </Button>
          <Button onClick={handleDialogConfirm} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        {getInterviewState.status === InterviewStatus.Loading && (
          <LoadingScreen
            smText={
              "You're stepping closer to your goals, one question at a time. Please hang tight while we process your video."
            }
            lgText={'Uploading Video'}
          />
        )}
        <BlurDrawer isOpen={drawerOpen} toggleDrawer={handleToggleDrawer} interviews={interviews} />
        <Box>
          <TopArea
            ref={timerRef}
            onExit={handleCloseInterview}
            initialTime={interviews[getInterviewState.currentQuestionIndex].interviewEstimatedSeconds}
            onComplete={handleTimeout}
            status={getInterviewState.status}
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
                videoInput={videoInput}
                audioInput={audioInput}
                getWebcamRef={getWebcamRef}
                getVideoBlob={getVideoBlob}
                isVideoEnabled={isVideoEnabled}
                setVideoOn={setVideoOn}
                setVideoOff={setVideoOff}
                status={getInterviewState.status}
                startReview={startReview}
                isReading={isReading}
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
            onButtonClick={handleClickInterviewButton}
            onRetryClick={handleRetryQuestion}
          />
        </Box>

        <Box mt={'20px'} sx={{ display: 'flex', justifyContent: 'center' }}>
          <MenuIconButton onButtonClick={handleToggleDrawer} />
          <PaginationBarWithNumber
            totalPages={interviews.length}
            currentPage={getInterviewState.currentQuestionIndex + 1}
            onPageChange={handlePageChange}
            enableSelect={true}
          />
        </Box>
      </Box>
    </div>
  )
}

export default InterviewComponent
