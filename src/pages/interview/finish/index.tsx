import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Button } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

function FinishedInterviewPage() {
  const router = useRouter()

  const handleGoToHomePage = () => {
    router.push('/interview')
  }

  return (
    <Grid container direction='column' alignItems='center'>
      <Box sx={{ margin: 20 }}></Box>
      <Grid item xs={12}>
        <h1>Congratulations on completing your mock interview! </h1>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={handleGoToHomePage}>
          Interview Page
        </Button>
      </Grid>
    </Grid>
  )
}

FinishedInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

FinishedInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default FinishedInterviewPage
