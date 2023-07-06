/***********************************************************************************************
  Name: UseMockInterview.tsx
  Description: This file contains the custom hook for mock interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/04
  Update Date: 2023/06/18
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

// Import necessary react hooks and custom hooks
import { useEffect, useReducer, useRef, useState } from 'react'
import useTranscribe from './useTranscribe'
import useVideoRecording from './useVideoRecording'
import Logger from '../middleware/loggerMiddleware'
import useS3Video from './useS3Video'
import { useAuth } from './useAuth'
import { API, graphqlOperation } from 'aws-amplify'
import { startInterviewVideoAnalysis, updateUserInterview } from 'src/graphql/mutations'
import { Interview } from 'src/types/types'

// import { usePollyByQueue } from './usePollyByQueue'
import useChatGPTStream from './useChatGPTStream'
import { usePollyByQueueTest } from './usePollyTest'

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
const SET_QUESTION_INDEX = 'SET_QUESTION_INDEX'

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
  | { type: typeof SET_QUESTION_INDEX; newIndex: number }

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

    case SET_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.newIndex }

    case FINISH_INTERVIEW:
      return { ...state, status: InterviewStatus.FinishedInterview }

    case TOGGLE_LOADING:
      return {
        ...state,
        status: InterviewStatus.Loading
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

  const [isReading, setReading] = useState(false)

  // Using the custom hooks
  const { caption, audioRef, addToQueue, start, end, pollyError } = usePollyByQueueTest({}, () => {
    setReading(false)

    // If the interview is in the interviewing state, start transcribing and recording
    if (interviewState.status === InterviewStatus.Interviewing) {
      startTranscribingAndRecording()
    }
  })
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
  const { generateResponse, chatGPTStreamError } = useChatGPTStream(addToQueue, start, end) // Use the useChatGPTStream Hook here

  const auth = useAuth() // Use the custom auth hook for authentication

  const interviewVideoLength = useRef(0) // Use ref to store the video length

  /* Define helper functions for the interview process */

  // Helper function to start transcribing and recording
  function startTranscribingAndRecording() {
    handleStartTranscribe() // Start transcribing
    handleStartCapture() // Start recording
  }

  // Helper function to start transcribing and recording
  function stopTranscribingAndRecording() {
    handleStopTranscribe() // Stop transcribing
    interviewVideoLength.current = handleStopCapture() as number // Stop recording
  }

  // Helper function to upload the video to S3
  const updateVideoToDynamoDB = async (uniqueFileName: string, filePath: string) => {
    try {
      const currInterview = interviews[interviewState.currentQuestionIndex]

      await API.graphql(
        graphqlOperation(updateUserInterview, {
          emailAddress: auth.user?.userEmailAddress,
          interviewID: currInterview.interviewID,
          interviewQuestionID: currInterview.interviewQuestionID,
          interviewQuestionType: currInterview.interviewQuestionType,
          interviewVideoKey: uniqueFileName,
          interviewFeedback: currInterview.interviewFeedback,
          interviewVideoLength: interviewVideoLength.current,
          interviewVideoPath: filePath
        })
      )

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // Define a function to start the interview
  const startInterview = async () => {
    setReading(true)
    start()
    if (interviewState.currentQuestionIndex === 0) addToQueue(WELCOME_WORDS)
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    end()

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

  // Define a function to set the question index
  const setQuestionIndex = (newIndex: number) => {
    dispatch({ type: SET_QUESTION_INDEX, newIndex })
  }

  // Define a function to finish the current interview question
  const finishQuestion = async () => {
    stopTranscribingAndRecording()
    setReading(true)

    const interviewQuestion = interviews[interviewState.currentQuestionIndex].interviewQuestion
    const interviewAnswer = transcribedText.current
    generateResponse(interviewQuestion, interviewAnswer)
    dispatch({ type: FINISH_QUESTION })
  }

  // Retry the current interview question
  const retryQuestion = async () => {
    setReading(true)

    // Check if the interview process has started
    if (interviewState.status === InterviewStatus.Interviewing) {
      stopTranscribingAndRecording() // Stop recording and capturing, then play the audio again
    }
    start()
    addToQueue(interviews[interviewState.currentQuestionIndex].interviewQuestion)
    end()
    startTranscribingAndRecording()
    dispatch({ type: RETRY_QUESTION })
  }

  // Save Video to S3 and upload to DynamoDB
  const saveVideo = async () => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: TOGGLE_LOADING })
      save(getVideoBlob())
        .then(({ uniqueFilename, filePath }: any) => {
          updateVideoToDynamoDB(uniqueFilename!, filePath!)
            .then(() => {
              dispatch({ type: SAVED_QUESTION })

              // Start an analysis job
              API.graphql(
                graphqlOperation(startInterviewVideoAnalysis, {
                  emailAddress: auth.user?.userEmailAddress,
                  interviewID: interviews[interviewState.currentQuestionIndex].interviewID,
                  interviewQuestionID: interviews[interviewState.currentQuestionIndex].interviewQuestionID,
                  interviewQuestionType: interviews[interviewState.currentQuestionIndex].interviewQuestionType
                })
              )

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
    setQuestionIndex,
    saveVideo,
    setVideoOn,
    setVideoOff,

    // States
    getInterviewState: interviewState,
    getAudioRef: audioRef,
    getWebcamRef: webcamRef,
    getVideoBlob: getVideoBlob,
    getCaption: caption,
    isCapturing: isCapturing,
    isVideoEnabled,
    isReading: isReading
  }
}

export default useMockInterview
