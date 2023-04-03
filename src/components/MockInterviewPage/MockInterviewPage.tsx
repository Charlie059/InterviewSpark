import React, { useState, useEffect } from 'react'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

interface Props {
  interviews: Interview[]
}

const MockInterviewPage = (props: Props) => {
  const { interviews } = props
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    if (isRecording && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (isRecording && timeRemaining === 0) {
      handleNextQuestion()
    }
  }, [isRecording, timeRemaining])

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interviews.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeRemaining(30)
    } else {
      setIsRecording(false)
      alert('Interview finished!')
    }
  }

  const currentQuestion = interviews[currentQuestionIndex]

  return (
    <div>
      <h1>Mock Interview</h1>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion?.interviewQuestionID}</p>
      <p>{currentQuestion?.interviewVideoKey}</p>
      <p>{currentQuestion?.interviewDateTime}</p>
      <h3>Time Remaining: {timeRemaining} seconds</h3>

      {!isRecording ? (
        <button onClick={handleStartRecording}>Start Recording</button>
      ) : (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}

      {currentQuestionIndex === interviews.length - 1 && !isRecording && <h3>Interview finished!</h3>}
    </div>
  )
}

export default MockInterviewPage
