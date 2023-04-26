// ** MUI Imports
import { Box } from '@mui/material'
import InterviewList from 'src/components/interview/interviewProfile/interview-list'

// import NewInterview from 'src/views/pages/dialog/new-interview'

import InterviewUsageSummaryThisMonth from 'src/components/interview/interviewProfile/Interview-monthly-summary-card'
import InterviewProfileHeader from 'src/components/interview/interviewProfile/interview-profile-header'
import InterviewPromotion from 'src/components/interview/interviewProfile/interview-promotion'
import InterviewTotalSummaryCard from 'src/components/interview/interviewProfile/interview-total-summary-card/index'

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
