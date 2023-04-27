import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
}

interface Props {
  interviewQuestions: InterviewQuestion[]
  questionListSelectedRows: InterviewQuestion[]
  onAddSelectedQuestions: () => void
}

const InterviewQuestionSummary = (props: Props) => {
  const { interviewQuestions, onAddSelectedQuestions } = props
  const [questionCount, setQuestionCount] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)

  useEffect(() => {
    setQuestionCount(interviewQuestions.length)
    setEstimatedTime(interviewQuestions.length * 10)
  }, [interviewQuestions])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ width: '33%', textAlign: 'center' }}>
          <Box margin={3}>
            <Typography variant='body2' style={{ fontSize: '11px', color: 'rgba(76, 78, 100, 0.6)' }}>
              # Question
            </Typography>

            <Typography variant='body2' style={{ fontWeight: 'bold', color: 'rgba(76, 78, 100, 0.6)' }}>
              {questionCount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '33%', textAlign: 'center' }}>
          <Typography variant='body2' style={{ fontSize: '11px', color: 'rgba(76, 78, 100, 0.6)' }}>
            Estimated Time
          </Typography>
          <Typography variant='body2' style={{ fontWeight: 'bold', color: 'rgba(76, 78, 100, 0.6)' }}>
            {estimatedTime} mins
          </Typography>
        </Box>
        <Box sx={{ width: '33%', textAlign: 'center' }}>
          <Typography variant='body2' style={{ fontSize: '11px', color: 'rgba(76, 78, 100, 0.6)' }}>
            Difficulty
          </Typography>
          <Typography variant='body2' style={{ fontWeight: 'bold', color: 'rgba(76, 78, 100, 0.6)' }}>
            0.2
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={onAddSelectedQuestions}
          variant='contained'
          sx={{
            backgroundColor: '#3888FF',
            color: 'white',
            borderRadius: 1,
            width: 325,
            textTransform: 'none',
            fontSize: '12px'
          }}
        >
          Add New Question
        </Button>
      </Box>
    </Box>
  )
}

export default InterviewQuestionSummary
