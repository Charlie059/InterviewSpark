// ** MUI Imports

import { Grid, Typography } from '@mui/material'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import PageHeader from 'src/@core/components/page-header'

// import ResumeScan from "src/components/resume/ResumeScan";
// import ResumeList from "src/components/resume/ResumeList";

// import { useState } from "react";
// import ResumeScanPage from "../index";

const ResumeList = () => {
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={<Typography variant='h5'>Resume Analysis</Typography>}
          subtitle={<Typography variant='body2'>Upload Your Resume Here</Typography>}
        />
        <Grid item xs={12}>
          {/* <ResumeScan nocollapse={false} refreshResume={refreshResume} setRefreshResume={setRefreshResume}/> */}
        </Grid>
        <Grid item xs={12}>
          <ResumeList />
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

ResumeList.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ResumeList
