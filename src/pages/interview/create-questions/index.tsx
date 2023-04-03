import React, { useState } from 'react'
import { Box, CardContent, Typography, Button, Card } from '@mui/material'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {
  InterviewQuestionList,
  InterviewQuestion
} from 'src/components/interview-question-list/interview-question-list'
import Logo from 'src/components/logo/logo'

const CreateQuestionsPage = () => {
  const [newQuestion, setNewQuestion] = useState<InterviewQuestion | null>(null)

  // Call this function when you want to add a new question to the list
  const addNewQuestion = (question: InterviewQuestion) => {
    setNewQuestion(question)
  }

  const handleClick = () => {
    addNewQuestion({
      // Create a random ID for the new question
      id: Math.floor(Math.random() * 100000),
      QuestionID: '1',
      interviewQuestion: 'What is your name?',
      interviewQuestionSampleAns: 'My name is John',
      interviewQuestionType: 'Behavioral'
    })
  }

  return (
    <div>
      <Logo />
      <Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2.5, color: 'black' }}>
              Add Interview Questions
            </Typography>
            <Typography variant='subtitle1'>Add Existing Questions from Question List</Typography>
          </CardContent>
          <Box sx={{ marginLeft: 180 }}>
            <Button variant='contained' sx={{ backgroundColor: '#3888FF', color: 'white', borderRadius: 5 }}>
              Next
            </Button>
          </Box>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Card sx={{ width: 800, height: 500, marginLeft: 5, marginRight: 2, borderRadius: '20px' }}>
            <InterviewQuestionList newQuestion={newQuestion} />
          </Card>
          <Box>
            <Card sx={{ width: 335, height: 100, marginBottom: 3 }}> aaa</Card>
            <Card sx={{ width: 335, height: 400 }}> aaa</Card>
          </Box>
        </Box>
      </Box>

      <Button onClick={handleClick}>aaa</Button>
    </div>
  )
}

CreateQuestionsPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

CreateQuestionsPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CreateQuestionsPage
