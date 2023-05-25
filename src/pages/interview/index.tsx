import { Box, Grid } from '@mui/material'
import InterviewList from 'src/components/interview/interviewProfile/interview-list'
import InterviewUsageSummaryThisMonth from 'src/components/interview/interviewProfile/Interview-monthly-summary-card'
import InterviewProfileHeader from 'src/components/interview/interviewProfile/interview-profile-header'
import InterviewPromotion from 'src/components/interview/interviewProfile/interview-promotion'
import InterviewTotalSummaryCard from 'src/components/interview/interviewProfile/interview-total-summary-card/index'

const InterviewPage = () => {
  return (
    <div>
      <InterviewProfileHeader />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3.8} md={2.3} lg={2}>
          <Box sx={{ position: 'relative', paddingBottom: '100%' }}>
            <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
              <InterviewUsageSummaryThisMonth />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3.8} md={2.3} lg={2}>
          <Box sx={{ position: 'relative', paddingBottom: '100%' }}>
            <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
              <InterviewTotalSummaryCard />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7.4} lg={8}>
          <InterviewPromotion />
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
