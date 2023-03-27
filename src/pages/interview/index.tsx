// ** MUI Imports
import { Card } from '@mui/material'
import Grid from '@mui/material/Grid'

import InterviewList from 'src/components/interview-list/interview-list'

import NewInterview from 'src/views/pages/dialog/new-interview'

const InterviewPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item md={4} sm={6} xs={12}>
        <NewInterview />
      </Grid>
      <Grid item md={8} sm={6} xs={12}>
        <Card>
          <InterviewList />
        </Card>
      </Grid>
    </Grid>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
