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
import { getUserInterviewUsageMetaData, getUserProfile } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import Tutorial from 'src/components/tutorial/Tutorial'
import { updateNewUserStatus } from 'src/graphql/mutations'

const InterviewPage = () => {
  const auth = useAuth()
  const cardRef = React.useRef<HTMLElement>(null)
  const [cardHeight, setCardHeight] = React.useState(0)
  const [userProfileData] = React.useState<any>(auth.user)
  const [userInterviewUsageMetaData, setUserInterviewUsageMetaData] = React.useState<UserInterviewUsageMetaData | null>(
    null
  )
  const [tutorialDialogOpen, setTutorialDialogOpen] = React.useState(false)

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

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await API.graphql(graphqlOperation(getUserProfile, { emailAddress: auth.user?.userEmailAddress }))
      if ('data' in data) {
        setTutorialDialogOpen(data.data.getUserProfile.isNewUser)
      }
    }

    const resetResult = async () => {
      const data = await API.graphql(
        graphqlOperation(updateNewUserStatus, { userEmail: auth.user?.userEmailAddress, isNewUser: false })
      )
      if ('data' in data) {
        console.log('data', data)
      }
    }

    fetchUserProfile()

    // Reset isNewUser to false in DB
    resetResult()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {tutorialDialogOpen && (
        <Tutorial tutorialDialogOpen={tutorialDialogOpen} setTutorialDialogOpen={setTutorialDialogOpen} />
      )}
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
