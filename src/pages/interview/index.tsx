// ** MUI Imports
import Grid from '@mui/material/Grid'

import NewInterview from 'src/views/pages/dialog/new-interview'

const InterviewPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item md={4} sm={6} xs={12}>
        <NewInterview />
      </Grid>
    </Grid>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
