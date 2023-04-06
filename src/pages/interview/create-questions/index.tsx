import React, { useEffect, useState } from 'react'
import { Box, CardContent, Typography, Button, Card } from '@mui/material'
import { ReactNode } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {
  InterviewQuestionList,
  InterviewQuestion
} from 'src/components/interview-question-list/interview-question-list'
import Logo from 'src/components/logo/logo'
import InterviewQuestionSummary from 'src/components/interview-question-summary/interview-question-summary'
import QuestionList from 'src/components/question-list/question-list'
import router from 'next/router'
import { API, graphqlOperation } from 'aws-amplify'
import { createInterviewWithQuestion } from 'src/graphql/mutations'

const CreateQuestionsPage = () => {
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([])
  const [questionListSelectedRows, setQuestionListSelectedRows] = useState<InterviewQuestion[]>([])
  const { user } = useAuth()

  const handleAddSelectedQuestions = () => {
    // If questionListSelectedRows has elements which is repeated in interviewQuestions, remove them
    const questionListSelectedRowsFiltered = questionListSelectedRows.filter(
      question => !interviewQuestions.some(interviewQuestion => interviewQuestion.QuestionID === question.QuestionID)
    )
    setInterviewQuestions(prevQuestions => [...prevQuestions, ...questionListSelectedRowsFiltered])
  }

  const handleNextButtonClick = async () => {
    const emailAddress = user?.userEmailAddress || ''

    const fetchedInterviews: any[] = []

    for (const question of interviewQuestions) {
      const questionID = question.QuestionID
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
        console.error('Failed to create interview with question:', questionID)
      }
    }

    const interviewsString = JSON.stringify(fetchedInterviews)

    router.push({
      pathname: '/interview/mock-interview',
      query: { interviews: interviewsString }
    })
  }

  return (
    <div>
      <Logo />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2.5, color: 'black' }}>
              Add Interview Questions
            </Typography>
            <Typography variant='subtitle1'>Add Existing Questions from Question List</Typography>
          </CardContent>
          <Box sx={{ marginLeft: 180 }}>
            <Button
              variant='contained'
              sx={{ backgroundColor: '#3888FF', color: 'white', borderRadius: 5, textTransform: 'none' }}
              onClick={handleNextButtonClick}
            >
              Next
            </Button>
          </Box>
        </Box>
        <Box display='flex' justifyContent='center'>
          <InterviewQuestionList interviewQuestions={interviewQuestions} />
          <Box>
            <Card sx={{ width: 435, height: 107, marginBottom: 3 }}>
              <InterviewQuestionSummary
                interviewQuestions={interviewQuestions}
                questionListSelectedRows={questionListSelectedRows}
                onAddSelectedQuestions={handleAddSelectedQuestions}
              />
            </Card>
            <Card sx={{ width: 435, height: 410 }}>
              <QuestionList setSelectedRows={setQuestionListSelectedRows} />
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

CreateQuestionsPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

CreateQuestionsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CreateQuestionsPage
