import { Button, Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedSecond: number
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
  const [averageDifficulty, setAverageDifficulty] = useState(0)

  useEffect(() => {
    const difficultyValue = { easy: 1, medium: 2, hard: 3 }
    let totalDifficulty = 0
    let totalTime = 0

    interviewQuestions.forEach(question => {
      totalDifficulty += difficultyValue[question.difficulty]
      totalTime += question.estimatedSecond
    })

    if (interviewQuestions.length === 0) setAverageDifficulty(0)
    else {
      const avgDifficulty = totalDifficulty / interviewQuestions.length
      setAverageDifficulty(Math.round(avgDifficulty * 10) / 10)
    }

    setQuestionCount(interviewQuestions.length)
    setEstimatedTime(Math.round(totalTime / 60))
  }, [interviewQuestions])

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ width: '33%', textAlign: 'center' }}>
            <Box margin={2}>
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
              {averageDifficulty}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px', width: '100%' }}>
          <div style={{ margin: '10px' }}></div>
          <Button
            onClick={onAddSelectedQuestions}
            variant='contained'
            sx={{
              backgroundColor: questionCount >= 6 ? '#BDBDBD' : '#3888FF',
              color: 'white',
              borderRadius: 1,
              width: '100%',
              textTransform: 'none',
              fontSize: '12px'
            }}
            disabled={questionCount >= 6}
          >
            Add New Question
          </Button>
          <div style={{ margin: '10px' }}></div>
        </Box>
      </Box>
    </Card>
  )
}

export default InterviewQuestionSummary
