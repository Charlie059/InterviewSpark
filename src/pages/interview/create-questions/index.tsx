import React, { useEffect, useState } from 'react'
import { Box, CardContent, Typography, Button, Card } from '@mui/material'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {
  InterviewQuestionList,
  InterviewQuestion
} from 'src/components/interview-question-list/interview-question-list'
import Logo from 'src/components/logo/logo'
import InterviewQuestionSummary from 'src/components/interview-question-summary/interview-question-summary'
import QuestionList from 'src/components/question-list/question-list'

const CreateQuestionsPage = () => {
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([])
  const [questionListSelectedRows, setQuestionListSelectedRows] = useState<InterviewQuestion[]>([])

  const handleAddSelectedQuestions = () => {
    setInterviewQuestions(prevQuestions => [...prevQuestions, ...questionListSelectedRows])
  }

  useEffect(() => {
    // If questionListSelectedRows changes, print it to the console
    console.log('questionListSelectedRows changed:', questionListSelectedRows)
  }, [questionListSelectedRows])

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
