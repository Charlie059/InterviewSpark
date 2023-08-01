// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewsByMonth } from 'src/graphql/queries'
import Logger from 'src/middleware/loggerMiddleware'

interface InterviewPromotionProps {
  height: number
}

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled Card component
const StyledCard = styled(Card)<{ height: number }>(({ theme, height }) => ({
  position: 'relative',
  height: `${height}px`,
  [theme.breakpoints.down('sm')]: {
    height: '100%'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: '15%',
  position: 'absolute',
  opacity: 0.15,
  [theme.breakpoints.down('sm')]: {
    width: '25%'
  }
}))

const InterviewPromotion: React.FC<InterviewPromotionProps> = ({ height }) => {
  // ** Hook
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
        Logger.error('Error', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledCard height={height} style={{ borderRadius: '25px' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              {percentageIncrease >= 0 ? 'Keep up the great work,' : "It's okay,"}{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {auth.user?.userName}
              </Box>
              {percentageIncrease >= 0 ? ' 🚀' : ' 🙌'}
            </Typography>
            <Typography variant='body2'>{encouragementMessage}</Typography>
          </Grid>
          <StyledGrid item xs={0} sm={0} md={0} lg={0}>
            <Img alt='Encouragement Illustration' src={'/images/certification/Medallions.png'} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </StyledCard>
  )
}

export default InterviewPromotion
