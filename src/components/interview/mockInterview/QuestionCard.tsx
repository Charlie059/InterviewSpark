import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

interface Interview {
  interviewID: string
  interviewQuestion: string
  interviewQuestionID: string
  interviewQuestionTitle: string
  interviewQuestionType: string
  interviewVideoKey: string
  estimatedSecond: number
  interviewDateTime: string
  interviewFeedback: string
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface QuestionCardProps {
  interviews: Interview[]
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export default function QuestionCard({ interviews }: QuestionCardProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const handleExpandClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {interviews.map((interview, index) => (
        <Card sx={{ maxWidth: 345 }} key={interview.interviewID}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: '#4C6FFF', color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}
                aria-label='interview-avatar'
              >
                {`Q${index + 1}`}
              </Avatar>
            }
            action={
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expandedId === interview.interviewID}
                  onClick={() => handleExpandClick(interview.interviewID)}
                  aria-expanded={expandedId === interview.interviewID}
                  aria-label='show more'
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            }
            title={
              <Typography variant='h6' style={{ fontWeight: 600, fontSize: 16 }}>
                {interview.interviewQuestionTitle}
              </Typography>
            }
            subheader={
              <Typography variant='body1' style={{ fontSize: 14 }}>
                {interview.interviewQuestionType}
              </Typography>
            }
          />

          <Collapse in={expandedId === interview.interviewID} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography paragraph>{interview.interviewQuestion}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  )
}
