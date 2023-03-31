// ** MUI Imports
import { Box, Card } from '@mui/material'
import Grid from '@mui/material/Grid'

// import InterviewList from 'src/components/interview-list/interview-list'

import InterviewUsageSummaryThisMonth from 'src/components/Interview-monthly-summary-card/Interview-monthly-summary-card'
import InterviewProfileHeader from 'src/components/interview-profile-header/interview-profile-header'
import InterviewTotalSummaryCard from 'src/components/interview-total-summary-card/interview-total-summary-card'

import NewInterview from 'src/views/pages/dialog/new-interview'

const InterviewPage = () => {
  return (
    <Grid container spacing={4} columns={12}>
      <InterviewProfileHeader />
      <Box sx={{ display: 'flex', marginRight: 5, flexWrap: 'nowrap', paddingBottom: 1, paddingRight: 20 }}>
        <Box sx={{ marginLeft: 5, marginBottom: 1 }}>
          <InterviewUsageSummaryThisMonth />
        </Box>
        <Box sx={{ marginLeft: 5, marginRight: 5 }}>
          <InterviewTotalSummaryCard />
        </Box>
        <Box sx={{ marginLeft: 5, marginRight: 5 }}>
          <Card>AAA</Card>
        </Box>
      </Box>
    </Grid>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
