import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createInterviewWithQuestion } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'
import MockInterviewPage from 'src/components/MockInterviewPage/MockInterviewPage'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

const Home = () => {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const auth = useAuth()

  const fetchInterviews = async () => {
    const emailAddress = auth.user?.userEmailAddress
    const questionIDs = ['123', '234'] // Replace with actual question IDs

    const fetchedInterviews = []

    for (const questionID of questionIDs) {
      const result = await API.graphql(
        graphqlOperation(createInterviewWithQuestion, {
          emailAddress,
          questionID
        })
      )

      if ('data' in result) {
        fetchedInterviews.push(result.data.createInterviewWithQuestion)
      } else {
        // Handle the case where result does not have a 'data' property
      }
    }

    setInterviews(fetchedInterviews)
  }

  useEffect(() => {
    fetchInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <MockInterviewPage interviews={interviews} />
    </div>
  )
}

Home.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default Home
