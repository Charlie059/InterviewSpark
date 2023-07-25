import { Box, Grid, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import React from 'react'
import CTAPage from 'src/components/interview/interviewProfile/CTAPage/CTAPage'
import InterviewList from 'src/components/interview/interviewProfile/interview-list'
import InterviewUsageSummaryThisMonth from 'src/components/interview/interviewProfile/Interview-monthly-summary-card'
import InterviewPromotion from 'src/components/interview/interviewProfile/interview-promotion'
import InterviewTotalSummaryCard from 'src/components/interview/interviewProfile/interview-total-summary-card/index'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import { UserInterviewUsageMetaData } from 'src/context/types'
import { getUserInterviewUsageMetaData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'

const InterviewPage = () => {
  const auth = useAuth()
  const cardRef = React.useRef<HTMLElement>(null)
  const [cardHeight, setCardHeight] = React.useState(0)
  const [userProfileData] = React.useState<any>(auth.user)
  const [userInterviewUsageMetaData, setUserInterviewUsageMetaData] = React.useState<UserInterviewUsageMetaData | null>(
    null
  )

  React.useEffect(() => {
    const fetchUserInterviewUsageMetaData = async () => {
      try {
        const userInterviewUsageMetaData = await API.graphql(
          graphqlOperation(getUserInterviewUsageMetaData, { emailAddress: auth.user?.userEmailAddress })
        )

        console.log(userInterviewUsageMetaData)

        if ('data' in userInterviewUsageMetaData) {
          setUserInterviewUsageMetaData(userInterviewUsageMetaData.data.getUserInterviewUsageMetaData)
        }
      } catch (error) {
        console.error('Error fetching user interview usage meta data', error)
      }
    }

    fetchUserInterviewUsageMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight)
      }
    }

    // Set initial height
    handleResize()

    // Listen for window resize events
    window.addEventListener('resize', handleResize)

    // Clean up function
    return () => {
      // Stop listening for window resize events
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  React.useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight)
    }
  }, [cardRef])

  return (
    <div>
      {!userInterviewUsageMetaData || userInterviewUsageMetaData.userInterviewNumTotalCount !== 0 ? (
        <>
          <UserProfileHeader data={userProfileData} />
          <Grid container spacing={3.5}>
            <Grid item xs={6} sm={3.8} md={2.3} lg={2.4}>
              <Box sx={{ position: 'relative', paddingBottom: '100%' }}>
                <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <InterviewUsageSummaryThisMonth />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3.8} md={2.3} lg={2.4}>
              <Box sx={{ position: 'relative', paddingBottom: '100%' }} ref={cardRef}>
                <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <InterviewTotalSummaryCard />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4.4} md={7.4} lg={7.2}>
              <InterviewPromotion height={cardHeight} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant='h6' sx={{ marginTop: '20px', marginBottom: '15px' }}>
                Interview History
              </Typography>
              <InterviewList />
            </Grid>
          </Grid>
        </>
      ) : (
        <CTAPage />
      )}
    </div>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
