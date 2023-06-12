/***********************************************************************************************
  Name: UseMockInterview.tsx
  Description: This file contains the custom hook for mock interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/04
  Update Date: 2023/06/12
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
import useChatGPTStream from './useChatGPTStream'

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

// Define an interface for the Interview object
interface Interview {
  interviewID: string
  interviewQuestionTitle: string
  estimatedSecond: number
  interviewQuestion: string
  interviewQuestionID: string
  interviewFeedback: string
}

// Define the error state for the reducer
interface ErrorState {
  type:
    | 'AWS-Polly-Error'
    | 'AWS-Transcribe-Error'
    | 'ChatGPT-Error'
    | 'AWS-S3-Error'
    | 'Recording-Error'
    | 'AWS-DynamoDB-Error'
    | 'Invalid-State-Error'
  message?: string
}

// Define the state for the interview process
interface InterviewState {
  currentQuestionIndex: number
  status: InterviewStatus
  error: ErrorState | null
}

// Define constants for action types
const START_QUESTION = 'START_QUESTION'
const FINISH_QUESTION = 'FINISH_QUESTION'
const START_REVIEW = 'START_REVIEW'
const SAVED_QUESTION = 'SAVED_QUESTION'
const MOVE_TO_NEXT = 'MOVE_TO_NEXT'
const FINISH_INTERVIEW = 'FINISH_INTERVIEW'
const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SET_ERROR = 'SET_ERROR'
const RETRY_QUESTION = 'RETRY_QUESTION'

// Define the action types for the reducer
type InterviewAction =
  | { type: typeof START_QUESTION }
  | { type: typeof FINISH_QUESTION }
  | { type: typeof START_REVIEW }
  | { type: typeof SAVED_QUESTION }
  | { type: typeof MOVE_TO_NEXT }
  | { type: typeof FINISH_INTERVIEW }
  | { type: typeof TOGGLE_LOADING }
  | { type: typeof SET_ERROR; error: ErrorState }
  | { type: typeof RETRY_QUESTION }

// Define constants for other strings
const WELCOME_WORDS = 'Welcome to the mock interview.'

// Define the reducer for handling actions
const interviewReducer = (state: InterviewState, action: InterviewAction) => {
  switch (action.type) {
    case START_QUESTION:
      return { ...state, status: InterviewStatus.Interviewing }

    case FINISH_QUESTION:
      return { ...state, status: InterviewStatus.FinishedQuestion }

    case START_REVIEW:
      return { ...state, status: InterviewStatus.Reviewing }

    case SAVED_QUESTION:
      return { ...state, status: InterviewStatus.SavedQuestion }

    case MOVE_TO_NEXT:
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, status: InterviewStatus.NotStarted }

    case FINISH_INTERVIEW:
      return { ...state, status: InterviewStatus.FinishedInterview }

    case TOGGLE_LOADING:
      return {
        ...state,
        status: state.status === InterviewStatus.Loading ? InterviewStatus.NotStarted : InterviewStatus.Loading
      }

    case SET_ERROR:
      return { ...state, error: action.error }

    case RETRY_QUESTION:
      // Handle retry here. This could involve resetting some fields and setting the status back to 'Interviewing'
      return { ...state, status: InterviewStatus.Interviewing }

    default:
      return state
  }
}

// Define the custom hook for mock interview
const useMockInterview = (interviews: Interview[]) => {
  // Add error check for the interviews array
  if (!interviews || !Array.isArray(interviews) || interviews.length === 0) {
    throw new Error('The interviews array is either not an array or is empty.')
  }

  // Use the reducer to manage the interview state
  const [interviewState, dispatch] = useReducer(interviewReducer, {
    currentQuestionIndex: 0,
    status: InterviewStatus.NotStarted,
    error: null
  })

  // Using the custom hooks
  const { audioRef, addToQueue, pollyError } = usePollyByQueue() // Use the custom hook for Polly
  const { transcribedText, handleStartTranscribe, handleStopTranscribe, transcribeError } = useTranscribe() // Use the custom hook for transcribing audio
  const {
    webcamRef,
    setVideoOn,
    setVideoOff,
    isVideoEnabled,
    isCapturing,
    handleStartCapture,
    handleStopCapture,
    getVideoBlob,
    videoRecordingError
  } = useVideoRecording() // Use the custom hook for video recording
  const { save, s3Error } = useS3Video() // Use the custom s3 saver hook for uploading video to S3
  const { generateResponse, chatGPTStreamError } = useChatGPTStream(addToQueue) // Use the useChatGPTStream Hook here
  const auth = useAuth() // Use the custom auth hook for authentication

  /* Define helper functions for the interview process */

  // Helper function to start transcribing and recording
  function startTranscribingAndRecording() {
    handleStartTranscribe() // Start transcribing
    handleStartCapture() // Start recording
  }

  // Helper function to start transcribing and recording
  function stopTranscribingAndRecording() {
    handleStopTranscribe() // Stop transcribing
    handleStopCapture() // Stop recording
  }

  // Helper function to upload the video to S3
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

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // Define a function to start the interview
  const startInterview = async () => {
    if (interviewState.currentQuestionIndex === 0) addToQueue(WELCOME_WORDS)
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    startTranscribingAndRecording()
    dispatch({ type: START_QUESTION })
  }

  // Define a function to start the review
  const startReview = async () => {
    dispatch({ type: START_REVIEW })
  }

  // Define a function to move to the next question
  const moveToNextQuestion = async () => {
    // If the currentQuestionIndex is the last question, finish the interview
    if (interviewState.currentQuestionIndex === interviews.length - 1) dispatch({ type: FINISH_INTERVIEW })
    else dispatch({ type: MOVE_TO_NEXT })
  }

  // Define a function to finish the current interview question
  const finishQuestion = async () => {
    stopTranscribingAndRecording()
    generateResponse(transcribedText)
    dispatch({ type: FINISH_QUESTION })
  }

  // Retry the current interview question
  const retryQuestion = async () => {
    // Check if the interview process has started
    if (interviewState.status === InterviewStatus.Interviewing) {
      stopTranscribingAndRecording() // Stop recording and capturing, then play the audio again
    }
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    startTranscribingAndRecording()
    dispatch({ type: RETRY_QUESTION })
  }

  // Save Video to S3 and upload to DynamoDB
  const saveVideo = async () => {
    return new Promise<void>((resolve, reject) => {
      save(getVideoBlob())
        .then(uniqueFileName => {
          updateVideoToDynamoDB(uniqueFileName!)
            .then(() => {
              dispatch({ type: SAVED_QUESTION })
              resolve()
            })
            .catch(error => {
              Logger.error('An error occurred while updating the video key and feedback in DynamoDB:', error)
              dispatch({ type: SET_ERROR, error: { type: 'AWS-DynamoDB-Error' } })
              reject(error)
            })
        })
        .catch(error => {
          Logger.error('An error occurred while saving the video to S3:', error)
          reject(error)
        })
    })
  }

  // Catch errors
  useEffect(() => {
    // Using Switch statements to catch errors
    if (pollyError) {
      dispatch({ type: 'SET_ERROR', error: { type: 'AWS-Polly-Error' } })
    } else if (transcribeError) {
      dispatch({ type: 'SET_ERROR', error: { type: 'AWS-Transcribe-Error' } })
    } else if (videoRecordingError) {
      dispatch({ type: 'SET_ERROR', error: { type: 'Recording-Error' } })
    } else if (chatGPTStreamError) {
      dispatch({ type: 'SET_ERROR', error: { type: 'ChatGPT-Error' } })
    } else if (s3Error) {
      dispatch({ type: 'SET_ERROR', error: { type: 'AWS-S3-Error' } })
    }

    // No need to handle AWS-DynamoDB-Error here because it is handled in the saveVideo function
  }, [chatGPTStreamError, pollyError, s3Error, transcribeError, videoRecordingError])

  // TODO Testing
  useEffect(() => {
    Logger.debug(transcribedText)
  }, [transcribedText])

  useEffect(() => {
    console.log(interviewState)
  }, [interviewState])

  // Return necessary states and functions for the component to use this hook
  return {
    // Actions
    startQuestion: startInterview,
    finishQuestion,
    startReview,
    retryQuestion,
    moveToNextQuestion,
    saveVideo,
    setVideoOn,
    setVideoOff,

    // States
    getInterviewState: interviewState,
    getAudioRef: audioRef,
    getWebcamRef: webcamRef,
    getVideoBlob: getVideoBlob,
    isCapturing: isCapturing,
    isVideoEnabled
  }
}

export default useMockInterview
