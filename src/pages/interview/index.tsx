// ** MUI Imports
import { Box } from '@mui/material'
import InterviewList from 'src/components/interview-list/interview-list'

// import InterviewList from 'src/components/interview-list/interview-list'

import InterviewUsageSummaryThisMonth from 'src/components/Interview-monthly-summary-card/Interview-monthly-summary-card'
import InterviewProfileHeader from 'src/components/interview-profile-header/interview-profile-header'
import InterviewPromotion from 'src/components/interview-promotion/interview-promotion'
import InterviewTotalSummaryCard from 'src/components/interview-total-summary-card/interview-total-summary-card'

import NewInterview from 'src/views/pages/dialog/new-interview'

const InterviewPage = () => {
  return (
    <div>
      <div>
        <InterviewProfileHeader />
        <Box sx={{ display: 'flex', marginRight: 5, flexWrap: 'nowrap', paddingBottom: 1, paddingRight: 20 }}>
          <Box sx={{ marginLeft: 5, marginBottom: 1 }}>
            <InterviewUsageSummaryThisMonth />
          </Box>
          <Box sx={{ marginLeft: 5, marginRight: 5 }}>
            <InterviewTotalSummaryCard />
          </Box>
          <Box sx={{ marginRight: 5 }}>
            <InterviewPromotion />
          </Box>
        </Box>
      </div>
      <div>
        <Box sx={{ marginTop: 5, marginLeft: 5, marginBottom: 1 }}>
          <InterviewList />
        </Box>
      </div>
    </div>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
