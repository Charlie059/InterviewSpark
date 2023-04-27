// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewsByMonth } from 'src/graphql/queries'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const InterviewPromotion = () => {
  // ** Hook
  const theme = useTheme()
  const auth = useAuth()
  const [percentageIncrease, setPercentageIncrease] = useState<number>(0)

  // Determine the appropriate encouragement message
  const encouragementMessage = (() => {
    const goal = 10

    if (percentageIncrease >= 100) {
      return `Congratulations! 🎉 You've reached or surpassed your goal of ${goal} interviews this month. Keep up the great work!`
    } else if (percentageIncrease >= 75) {
      return `You're almost there! You've completed ${percentageIncrease}% of your goal of ${goal} interviews this month. Keep pushing forward! 💪`
    } else if (percentageIncrease > 0) {
      return `You're making progress! You've completed ${percentageIncrease}% of your goal of ${goal} interviews this month. Stay focused and keep going! 💪`
    } else {
      return `Let's get started! Your goal is to complete ${goal} interviews this month. You can do it! 💪`
    }
  })()

  useEffect(() => {
    const calculatePercentageProgress = (currentValue: number, goal: number): number => {
      if (goal === 0) return 0

      return Math.round((currentValue / goal) * 100)
    }

    const fetchData = async () => {
      try {
        // Get the email address of the current user
        const emailAddress = auth.user?.userEmailAddress

        // Fetch the interview list for the user
        const result = await API.graphql(
          graphqlOperation(getUserInterviewsByMonth, {
            emailAddress
          })
        )

        if ('data' in result) {
          const interviewListInCurrentMonth = result.data.getUserInterviewsByMonth.interviewList
          const goal = 10

          // Calculate the percentage increase
          const percentageIncrease = calculatePercentageProgress(interviewListInCurrentMonth.length, goal)

          // Update state with the calculated percentage increase
          setPercentageIncrease(percentageIncrease)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card sx={{ position: 'relative' }} style={{ borderRadius: '25px', height: '220px', width: '580px' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              {percentageIncrease >= 0 ? 'Keep up the great work,' : "It's okay,"}{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {auth.user?.userName}
              </Box>
              {percentageIncrease >= 0 ? ' 🚀' : ' 🙌'}
            </Typography>
            <Typography variant='body2'>{encouragementMessage}</Typography>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Encouragement Illustration' src={`/images/cards/illustration-john-${theme.palette.mode}.png`} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InterviewPromotion
