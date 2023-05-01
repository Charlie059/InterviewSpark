import React, { useState } from 'react'
import { Box, Typography, Button, Grid, Card } from '@mui/material'
import { ReactNode } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {
  InterviewQuestionList,
  InterviewQuestion
} from 'src/components/interview/createInterview/interview-question-selection-result-list'
import Logo from 'src/components/interview/createInterview/logo'
import InterviewQuestionSummary from 'src/components/interview/createInterview/interview-question-summary'
import QuestionList from 'src/components/interview/createInterview/question-list'
import router from 'next/router'
import { API, graphqlOperation } from 'aws-amplify'
import { createUserInterviewWithQuestion } from 'src/graphql/mutations'
import QuickViewQuestion from 'src/components/interview/createInterview/quick-view-question'

const CreateQuestionsPage = () => {
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([])
  const [questionListSelectedRows, setQuestionListSelectedRows] = useState<InterviewQuestion[]>([])
  const { user } = useAuth()
  const [showQuickViewQuestion, setShowQuickViewQuestion] = useState<boolean>(false)

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
        graphqlOperation(createUserInterviewWithQuestion, {
          emailAddress,
          questionID
        })
      )

      if ('data' in result) {
        fetchedInterviews.push(result.data.createUserInterviewWithQuestion)
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

  const handleDeleteInterviewInQuestionList = (id: number) => {
    setInterviewQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id))
  }

  return (
    <div>
      <Logo />
      <Box display='flex' marginBottom={4}>
        <Box sx={{ marginLeft: 10, marginTop: 5 }}>
          <Typography variant='h6' sx={{ mb: 2.5, color: 'black' }}>
            Add Questions
          </Typography>
          <Typography variant='subtitle1'>Add Existing Questions from Question List</Typography>
        </Box>
        <Box flex={1} />
        <Box display='flex' alignItems='center' sx={{ marginRight: 10, marginTop: 2 }}>
          <Button
            variant='contained'
            disabled={interviewQuestions.length === 0}
            sx={{
              backgroundColor: interviewQuestions.length === 0 ? 'grey' : '#3888FF',
              color: 'white',
              borderRadius: 5,
              textTransform: 'none'
            }}
            onClick={handleNextButtonClick}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Grid container justifyContent='center' spacing={2} mx={3}>
        <Grid item xs={12} sm={12} md={7}>
          <QuestionList
            setSelectedRows={setQuestionListSelectedRows}
            setShowQuickViewQuestion={setShowQuickViewQuestion}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3.5}>
          <InterviewQuestionSummary
            interviewQuestions={interviewQuestions}
            questionListSelectedRows={questionListSelectedRows}
            onAddSelectedQuestions={handleAddSelectedQuestions}
          />

          <div style={{ margin: 8 }}></div>

          <Card>
            <InterviewQuestionList
              interviewQuestions={interviewQuestions}
              onDeleteInterview={handleDeleteInterviewInQuestionList}
            />
          </Card>
        </Grid>
      </Grid>
      {showQuickViewQuestion && (
        <QuickViewQuestion
          onOpen={() => true}
          onClose={() => setShowQuickViewQuestion(false)}
          row={questionListSelectedRows}
        />
      )}
    </div>
  )
}

CreateQuestionsPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

CreateQuestionsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CreateQuestionsPage
