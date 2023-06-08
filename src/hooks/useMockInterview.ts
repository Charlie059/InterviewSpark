/***********************************************************************************************
  Name: UseMockInterview.tsx
  Description: This file contains the custom hook for mock interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/04
  Update Date: 2023/06/04

  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

// Import necessary react hooks and custom hooks
import { useEffect, useReducer } from 'react'
import useTranscribe from './useTranscribe'
import useVideoRecording from './useVideoRecording'
import Logger from '../middleware/loggerMiddleware'
import useS3Video from './useS3Video'
import { useAuth } from './useAuth'
import { API, graphqlOperation } from 'aws-amplify'
import { updateInterviewVideoKey } from 'src/graphql/mutations'
import { usePollyByQueue } from './usePollyByQueue'

// Define an interface for the Interview object
interface Interview {
  interviewID: string
  interviewName: string
  estimatedSecond: number
  interviewQuestion: string
  interviewQuestionID: string
  interviewFeedback: string
}

// Define the state for the interview process
interface InterviewState {
  currentQuestionIndex: number
  isInterviewing: boolean
  isFinished: boolean
  isLoading: boolean
}

// Define the action types for the reducer
type InterviewAction =
  | { type: 'START_INTERVIEW' }
  | { type: 'FINISH_QUESTION' }
  | { type: 'MOVE_TO_NEXT' }
  | { type: 'FINISH_INTERVIEW' }
  | { type: 'TOGGLE_LOADING' }

// Define constants for action types
const START_INTERVIEW = 'START_INTERVIEW'
const FINISH_QUESTION = 'FINISH_QUESTION'
const MOVE_TO_NEXT = 'MOVE_TO_NEXT'
const FINISH_INTERVIEW = 'FINISH_INTERVIEW'
const TOGGLE_LOADING = 'TOGGLE_LOADING'

// Define constants for other strings
const WELCOME_WORDS = 'Welcome to the mock interview.'

// Define the reducer for handling actions
const interviewReducer = (state: InterviewState, action: InterviewAction) => {
  switch (action.type) {
    // Start the interview, set isInterviewing to true
    case START_INTERVIEW:
      return { ...state, isInterviewing: true }

    // Finish the question, set isInterviewing to false
    case FINISH_QUESTION:
      return { ...state, isInterviewing: false }

    // Move to the next question, increment currentQuestionIndex, and set isInterviewing to false
    case MOVE_TO_NEXT:
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 }

    // Finish the interview, set isFinished to true
    case FINISH_INTERVIEW:
      return { ...state, isFinished: true }

    // Toggle the loading state
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading }
    default:
      return state
  }
}

// Define the custom hook for mock interview
const useMockInterview = (interviews: Interview[]) => {
  // Add error check for the interviews array
  if (!Array.isArray(interviews) || interviews.length === 0) {
    throw new Error('The interviews array is either not an array or is empty.')
  }

  // Use the reducer to manage the interview state
  const [interviewState, dispatch] = useReducer(interviewReducer, {
    currentQuestionIndex: 0,
    isInterviewing: false,
    isFinished: false,
    isLoading: false
  })

  const { audioRef, addToQueue } = usePollyByQueue() // Use the custom hook for Polly
  const { transcribedText, handleStartRecording, handleStopRecording } = useTranscribe() // Use the custom hook for transcribing audio
  const { webcamRef, capturing, handleStartCapture, handleStopCapture, getVideoBlob } = useVideoRecording() // Use the custom hook for video recording
  const { save } = useS3Video() // Use the custom s3 saver hook for uploading video to S3
  const auth = useAuth() // Use the custom auth hook for authentication

  /* Define helper functions for the interview process */

  // Define a function to use ChatGPT to generate a response and add it to the Polly's queue
  const generateResponse = async (question: string) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: question,
        history: []
      })
    })

    const stream = res.body
    if (!stream) return
    const reader = stream.getReader()

    let partialText = ''
    let cachedText = ''

    const addToQueueIfSentenceComplete = (decodedValue: string) => {
      cachedText += decodedValue
      const lastPunctuationIndex = Math.max(
        cachedText.lastIndexOf('.'),
        cachedText.lastIndexOf(','),
        cachedText.lastIndexOf('!'),
        cachedText.lastIndexOf('?')
      )

      if (lastPunctuationIndex !== -1) {
        const completeSentence = cachedText.slice(0, lastPunctuationIndex + 1)
        cachedText = cachedText.slice(lastPunctuationIndex + 1)

        if (completeSentence.trim() !== '') {
          addToQueue(completeSentence)
        }
      }
    }

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        const decodedValue = new TextDecoder().decode(value)
        partialText += decodedValue
        addToQueueIfSentenceComplete(decodedValue)
        console.log('partialText', partialText)
      }
    } catch (error) {
      console.error(error)
    } finally {
      reader.releaseLock()
    }
  }

  // Define a function to start the interview
  const startInterview = async () => {
    if (interviewState.currentQuestionIndex === 0) {
      addToQueue(WELCOME_WORDS)
    }
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    handleStartRecording()
    handleStartCapture()
    dispatch({ type: START_INTERVIEW })
  }

  // Define a function to move to the next question
  const moveToNextQuestion = async () => {
    dispatch({ type: MOVE_TO_NEXT })
  }

  // Define a function to finish the current interview question
  const finishQuestion = async () => {
    handleStopRecording()
    handleStopCapture()
    handleStopRecording()
    handleStopCapture()
    console.log('transcribedText', transcribedText)
    generateResponse(transcribedText)
    dispatch({ type: FINISH_QUESTION })
  }

  // Retry the current interview question
  const retryQuestion = async () => {
    // Check if the interview process has started
    if (!interviewState.isInterviewing) {
      // You can log an error message or display a notification to the user here
      Logger.error('Interview has not started yet. Cannot retry question.')

      return
    }

    // Stop recording and capturing, then play the audio again
    handleStopRecording()
    handleStopCapture()
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    handleStartRecording()
    handleStartCapture()
  }

  // Save Video to S3 and upload to DynamoDB
  const saveVideo = async () => {
    const updateVideoToDynamoDB = async (uniqueFileName: string) => {
      try {
        const currInterview = interviews[interviewState.currentQuestionIndex]

        // TODO: Change the updateInterviewVideoKey mutation to updateInterview
        await API.graphql(
          graphqlOperation(updateInterviewVideoKey, {
            emailAddress: auth.user?.userEmailAddress,
            interviewID: currInterview.interviewID,
            questionID: currInterview.interviewQuestionID,
            interviewVideoKey: uniqueFileName,
            interviewFeedback: currInterview.interviewFeedback
          })
        )
      } catch (error) {
        Logger.error('An error occurred while updating the video key and feedback in DynamoDB:', error)
      }
    }
    try {
      // Save the video to S3
      save(getVideoBlob()).then(uniqueFileName => {
        updateVideoToDynamoDB(uniqueFileName) // Update the video key and feedback in DynamoDB
      })
    } catch (error) {
      Logger.error('An error occurred while saving the video to S3 or saving to DynamoDB:', error)
    }
  }

  // Use effect to finish the interview when all questions have been asked
  useEffect(() => {
    if (interviewState.currentQuestionIndex >= interviews.length) dispatch({ type: FINISH_INTERVIEW })
  }, [interviewState.currentQuestionIndex, interviews.length])

  // Return necessary states and functions for the component to use this hook
  return {
    startInterview,
    retryQuestion,
    finishQuestion,
    moveToNextQuestion,
    saveVideo,
    getInterviewState: interviewState,
    getAudioRef: audioRef,
    getWebcamRef: webcamRef,
    getVideoBlob: getVideoBlob,
    isCapturing: capturing
  }
}

export default useMockInterview
