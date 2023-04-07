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
import { getInterviewList } from 'src/graphql/queries'

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
  const encouragementMessage =
    percentageIncrease >= 0
      ? `Your interviews in the last 30 days have increased by ${percentageIncrease}%. Keep pushing forward! 💪`
      : `Don't worry! It's not too late to bounce back. Stay positive and focused. You've got this! 💪`

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the email address of the current user
        const emailAddress = auth.user?.userEmailAddress

        // Fetch the interview list for the user
        const result = await API.graphql(
          graphqlOperation(getInterviewList, {
            emailAddress
          })
        )

        if ('data' in result) {
          // Get the list of interviews from the result data
          const interviewList = result.data.getInterviewList.interviewList

          // Filter out the interviews that are in 30 days
          const currentDate = new Date()

          // Filter out the interviews that are in the last 30 days
          const filteredInterviewsLast30Days = interviewList.filter((interview: { interviewDateTime: string }) => {
            const interviewDate = new Date(interview.interviewDateTime)
            const dateDifference = Math.abs(currentDate.getTime() - interviewDate.getTime())
            const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24))

            return daysDifference <= 30
          })

          // Filter out the interviews that happened between 30 to 60 days ago
          const filteredInterviews30To60Days = interviewList.filter((interview: { interviewDateTime: string }) => {
            const interviewDate = new Date(interview.interviewDateTime)
            const dateDifference = Math.abs(currentDate.getTime() - interviewDate.getTime())
            const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24))

            return daysDifference > 30 && daysDifference <= 60
          })

          const last30DaysCount = filteredInterviewsLast30Days.length
          const last30To60DaysCount = filteredInterviews30To60Days.length
          const percentageIncrease =
            last30To60DaysCount > 0
              ? Math.round(((last30DaysCount - last30To60DaysCount) / last30To60DaysCount) * 100)
              : 100

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
