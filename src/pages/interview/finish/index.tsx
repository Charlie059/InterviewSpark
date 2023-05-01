import React, { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Button, Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Confetti from 'react-confetti'

function FinishedInterviewPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)

  const handleGoToHomePage = () => {
    router.push('/interview')
  }

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Grid container direction='column' alignItems='center'>
      {showConfetti && <Confetti />}
      <Box sx={{ margin: 20 }}></Box>
      <Grid item xs={12}>
        <Typography variant='h3' gutterBottom>
          Congratulations on completing your mock interview!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom>
          You've taken an important step towards your career goals. By practicing mock interviews, you're improving your
          communication skills and learning how to present yourself effectively.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' gutterBottom>
          Don't forget to review the feedback you received and work on any areas that need improvement. Keep practicing,
          and soon you'll be more confident and better prepared for real interviews.
        </Typography>
      </Grid>
      <Box sx={{ margin: 20 }}></Box>
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={handleGoToHomePage}>
          Back to Interview Page
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
