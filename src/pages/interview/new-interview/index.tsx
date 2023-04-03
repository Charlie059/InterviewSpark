import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify'
import { createInterviewWithQuestion, updateInterviewVideoKey } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'

interface RecordedChunks {
  data: Blob[]
}

function NewInterview() {
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [capturing, setCapturing] = useState<boolean>(false)
  const [recordedChunks, setRecordedChunks] = useState<RecordedChunks>({ data: [] })
  const auth = useAuth()

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks(prev => ({ data: [...prev.data, data] }))
      }
    },
    [setRecordedChunks]
  )

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    const mediaStream = webcamRef.current?.stream
    if (mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm'
      })
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
      mediaRecorderRef.current.start()
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop()
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  // Upload to S3
  const handleUpload = useCallback(async () => {
    if (recordedChunks.data.length) {
      const currentUser = await Auth.currentAuthenticatedUser()
      const userId = currentUser.attributes.sub
      const timestamp = new Date().getTime()
      const uniqueFilename = `${userId}-${timestamp}-interview.webm`

      const blob = new Blob(recordedChunks.data, { type: 'video/webm' })
      await Storage.put(uniqueFilename, blob, {
        contentType: 'video/webm',
        level: 'private'
      })

      // Call the createNewInterview GraphQL mutation with the required input parameters:
      // TODO: Replace these with the actual values

      // Get current user's email address

      const emailAddress = auth.user?.userEmailAddress
      console.log(emailAddress)
      const questionID = '234' // Replace this with the actual question ID

      const result = await API.graphql(
        graphqlOperation(createInterviewWithQuestion, {
          emailAddress,
          questionID
        })
      )

      if ('data' in result) {
        const interviewID = result.data.createInterviewWithQuestion.interviewID
        const updateResult = await API.graphql(
          graphqlOperation(updateInterviewVideoKey, {
            emailAddress: emailAddress,
            interviewID: interviewID,
            questionID: questionID,
            interviewVideoKey: uniqueFilename
          })
        )

        console.log('Interview updated:', updateResult)

        console.log('New interview created:', result, uniqueFilename)

        setRecordedChunks({ data: [] })
      } else {
        // Handle the case where result does not have a 'data' property
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedChunks.data])

  return (
    <>
      <Webcam audio={true} muted={true} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.data.length > 0 && <button onClick={handleUpload}>Upload</button>}
    </>
  )
}

export default NewInterview

NewInterview.acl = {
  action: 'read',
  subject: 'discuss-page'
}
