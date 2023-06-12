import Logger from 'src/middleware/loggerMiddleware'
import React, { ReactNode, useCallback, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import useMockInterview from 'src/hooks/useMockInterview'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'

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
        'Describe a situation where you had to handle a difficult customer. How did you manage the situation?',
      interviewQuestionID: '1',
      interviewQuestionTitle: 'Difficult Customer',
      interviewQuestionType: 'Behavioral',
      interviewVideoKey: '',
      estimatedSecond: 120,
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
    isVideoEnabled
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

  return (
    <div>
      <Webcam audio={true} muted={true} ref={getWebcamRef} width='100%' height='100%' />
      <h1>Mock Interview Page</h1>
      {getInterviewState.currentQuestionIndex < interviews.length && (
        <div>
          <h2>Question: {interviews[getInterviewState.currentQuestionIndex].interviewQuestion}</h2>
          <p>Estimated Time: {interviews[getInterviewState.currentQuestionIndex].estimatedSecond}</p>
        </div>
      )}

      <p>Is Interviewing: {getInterviewState.status === InterviewStatus.Interviewing ? 'Yes' : 'No'}</p>
      <p>Is Finished: {getInterviewState.status === InterviewStatus.FinishedInterview ? 'Yes' : 'No'}</p>
      <p>Is Reviewing: {getInterviewState.status === InterviewStatus.Reviewing ? 'Yes' : 'No'}</p>
      <p>Is Saved: {getInterviewState.status === InterviewStatus.SavedQuestion ? 'Yes' : 'No'}</p>

      {getInterviewState.status === InterviewStatus.NotStarted && (
        <button onClick={handleStartCaptureClick}>Start Question</button>
      )}
      {getInterviewState.status === InterviewStatus.SavedQuestion && (
        <button onClick={handleMoveToNextQuestion}>Next Question</button>
      )}
      {getInterviewState.status === InterviewStatus.Interviewing && (
        <button onClick={finishQuestion}>Finish Question</button>
      )}
      {getInterviewState.status === InterviewStatus.Reviewing && (
        <button onClick={retryQuestion}>Retry Question</button>
      )}
      {(getInterviewState.status === InterviewStatus.Reviewing ||
        getInterviewState.status === InterviewStatus.FinishedQuestion) && (
        <button onClick={handleSaveVideo}>Save Video</button>
      )}
      {getInterviewState.status === InterviewStatus.FinishedQuestion && (
        <button onClick={startReview}>Review Question</button>
      )}
      {!isVideoEnabled && <button onClick={setVideoOn}>Video On</button>}
      {isVideoEnabled && <button onClick={setVideoOff}>Video Off</button>}

      {getInterviewState.status === InterviewStatus.Loading && <p>Loading...</p>}
      {getInterviewState.status === InterviewStatus.Reviewing && (
        <video src={URL.createObjectURL(getVideoBlob()!)} controls={true} autoPlay={true} />
      )}

      <audio ref={getAudioRef} />
    </div>
  )
}

MockInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
