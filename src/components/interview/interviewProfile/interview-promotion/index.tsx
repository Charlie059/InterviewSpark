// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useState, useEffect } from 'react'
import { getUserInterviewsByMonth } from 'src/graphql/queries'
import Logger from 'src/middleware/loggerMiddleware'
import { useGraphQLQuery } from 'src/hooks/useGraphQLQuery'
import { GetUserInterviewsByMonthVariables } from 'src/types/graphqlTypes'


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
  width: '15%',
  position: 'absolute',
  opacity: 0.15,
  [theme.breakpoints.down('sm')]: {
    width: '25%'
  }
}))

const InterviewPromotion = () => {
  // ** Hook
  const auth = useAuth()
  const [percentageIncrease, setPercentageIncrease] = useState<number>(0)
  const { data, error } = useGraphQLQuery<GetUserInterviewsByMonthVariables>(getUserInterviewsByMonth, { emailAddress: auth.user?.userEmailAddress });

  // Determine the appropriate encouragement message
  // ** Encouragement message determination
  const getEncouragementMessage = (percentage: number): string => {
    const goal = 10;

    if (percentage >= 100) {
      return `Congratulations! 🎉 You've reached or surpassed your goal of ${goal} interviews this month. Keep up the great work!`;
    } else if (percentage >= 75) {
      return `You're almost there! You've completed ${percentage}% of your goal of ${goal} interviews this month. Keep pushing forward! 💪`;
    } else if (percentage > 0) {
      return `You're making progress! You've completed ${percentage}% of your goal of ${goal} interviews this month. Stay focused and keep going! 💪`;
    } else {
      return `Let's get started! Your goal is to complete ${goal} interviews this month. You can do it! 💪`;
    }
  };


  const calculatePercentageProgress = (currentValue: number, goal: number): number => {
    return goal === 0 ? 0 : Math.round((currentValue / goal) * 100);
  };
  useEffect(() => {
    if (data && 'getUserInterviewsByMonth' in data) {
      const interviewListInCurrentMonth = data.getUserInterviewsByMonth.interviewList;
      const goal = 10;
      const newPercentageIncrease = calculatePercentageProgress(interviewListInCurrentMonth.length, goal);
      setPercentageIncrease(newPercentageIncrease);
    }

    if (error) {
      Logger.error('Error', error); // Ensure Logger is imported or define how you handle errors
    }
  }, [data, error]);

  return (
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              {percentageIncrease >= 0 ? 'Keep up the great work,' : "It's okay,"}{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {auth.user?.fName}
              </Box>
              {percentageIncrease >= 0 ? ' 🚀' : ' 🙌'}
            </Typography>
            <Typography variant='body2'>{getEncouragementMessage(percentageIncrease)}</Typography>
          </Grid>
          <StyledGrid item xs={0}>
            <Img alt='Encouragement Illustration' src={'/images/certification/Medallions.png'} />
          </StyledGrid>
        </Grid>
      </CardContent>
  )
}

export default InterviewPromotion
