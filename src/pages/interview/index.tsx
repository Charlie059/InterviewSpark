import { Box, Grid } from '@mui/material'
import React from 'react'
import InterviewList from 'src/components/interview/interviewProfile/interview-list'
import InterviewUsageSummaryThisMonth from 'src/components/interview/interviewProfile/Interview-monthly-summary-card'
import InterviewPromotion from 'src/components/interview/interviewProfile/interview-promotion'
import InterviewTotalSummaryCard from 'src/components/interview/interviewProfile/interview-total-summary-card/index'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import { useAuth } from 'src/hooks/useAuth'

const InterviewPage = () => {
  const cardRef = React.useRef<HTMLElement>(null)
  const [cardHeight, setCardHeight] = React.useState(0)
  const auth = useAuth()
  const [userProfileData] = React.useState<any>(auth.user)

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
          <InterviewList />
        </Grid>
      </Grid>
    </div>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
