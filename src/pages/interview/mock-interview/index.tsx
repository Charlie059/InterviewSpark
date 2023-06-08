import Logger from 'src/middleware/loggerMiddleware'
import React, { ReactNode, useCallback, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import useMockInterview from 'src/hooks/useMockInterview'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'

interface Interview {
  interviewID: string
  interviewName: string
  estimatedSecond: number
  interviewQuestion: string
  interviewQuestionID: string
  interviewFeedback: string
}

function MockInterviewPage() {
  const interviews: Interview[] = [
    {
      interviewID: '1',
      interviewName: 'Question 1',
      estimatedSecond: 120,
      interviewQuestion: 'Tell me about yourself',
      interviewQuestionID: '1',
      interviewFeedback: 'Good'
    },
    {
      interviewID: '2',
      interviewName: 'Question 2',
      estimatedSecond: 120,
      interviewQuestion: 'Why should we hire you?',
      interviewQuestionID: '2',
      interviewFeedback: 'Good'
    }
  ]
  const router = useRouter()
  const {
    getInterviewState,
    startInterview,
    finishQuestion,
    moveToNextQuestion,
    retryQuestion,
    getAudioRef,
    getWebcamRef
  } = useMockInterview(interviews)

  const handleStartCaptureClick = useCallback(() => {
    Logger.debug('Start Interview')
    startInterview()
  }, [startInterview])

  const handleMoveToNextQuestion = useCallback(() => {
    moveToNextQuestion()
  }, [moveToNextQuestion])

  // If finished, redirect to the result page
  useEffect(() => {
    if (getInterviewState.isFinished) {
      router.push('/interview/finish')
    }
  }, [getInterviewState.isFinished, router])

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

      <p>Is Interviewing: {getInterviewState.isInterviewing ? 'Yes' : 'No'}</p>
      <p>Is Finished: {getInterviewState.isFinished ? 'Yes' : 'No'}</p>

      {!getInterviewState.isInterviewing && <button onClick={handleStartCaptureClick}>Start Interview</button>}
      {!getInterviewState.isInterviewing && <button onClick={handleMoveToNextQuestion}>Next Question</button>}
      {getInterviewState.isInterviewing && <button onClick={finishQuestion}>Finish Question</button>}
      {getInterviewState.isInterviewing && <button onClick={retryQuestion}>Retry Question</button>}

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
