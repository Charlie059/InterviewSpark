import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API, graphqlOperation } from 'aws-amplify'
import { Box, Card, Typography } from '@mui/material'
import { getUserInterviewMetaData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { Storage } from 'aws-amplify'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
  interviewQuestion: string
  interviewQuestionTitle: string
  interviewQuestionType: string
}

interface InterviewDetailsProps {
  interview: Interview
}

const InterviewDetails = ({}: InterviewDetailsProps) => {
  const auth = useAuth()
  const [interviewDetails, setInterviewDetails] = useState<Interview | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const interviewsParam = router.query.interview as any

    console.log('interviewsParam:', interviewsParam)
    const interviews = JSON.parse(interviewsParam)
    const interviewID = interviewsParam ? interviews.interviewID : null
    const interviewQuestionID = interviewsParam ? interviews.interviewQuestionID : null

    console.log('interviewID:', interviewID)
    console.log('interviewQuestionID:', interviewQuestionID)

    const fetchInterviewDetails = async () => {
      const userEmailAddress = auth.user?.userEmailAddress
      console.log('userEmailAddress:', userEmailAddress)

      // Fetch interview from the router query
      try {
        const result = await API.graphql(
          graphqlOperation(getUserInterviewMetaData, {
            emailAddress: userEmailAddress,
            interviewID: interviewID,
            interviewQuestionID: interviewQuestionID
          })
        )
        if ('data' in result) {
          console.log('Interview details:', result.data.getUserInterviewMetaData)
          setInterviewDetails(result.data.getUserInterviewMetaData)
        }
      } catch (error) {
        console.error('Error fetching interview details:', error)
      }
    }

    if (interviewID) {
      fetchInterviewDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (interviewDetails?.interviewVideoKey) {
      Storage.get(interviewDetails.interviewVideoKey, { level: 'private' })
        .then(url => setVideoUrl(url))
        .catch(error => console.error('Error getting video URL:', error))
    }
  }, [interviewDetails])

  return (
    <Box>
      {interviewDetails && (
        <Card sx={{ width: '1060px', borderRadius: '20px', padding: '24px' }}>
          <Typography variant='h4' component='div' gutterBottom>
            Interview Details
          </Typography>
          <Typography variant='body1' gutterBottom>
            Interview ID: {interviewDetails.interviewID}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Interview Date Time: {interviewDetails.interviewDateTime}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Interview Question ID: {interviewDetails.interviewQuestionID}
          </Typography>
          {videoUrl ? (
            <video src={videoUrl} controls width='100%' height='auto' />
          ) : (
            <Typography variant='body1' gutterBottom>
              Interview Video Key: {interviewDetails.interviewVideoKey}
            </Typography>
          )}
        </Card>
      )}
    </Box>
  )
}

InterviewDetails.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewDetails
