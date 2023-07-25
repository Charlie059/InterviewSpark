import React from 'react'
import { Box, Grid, Button, Typography } from '@mui/material'
import Link from 'next/link'

const CTAPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2
      }}
    >
      <Grid container spacing={12}>
        {/* Image section */}
        <Grid item xs={12}>
          <img
            src='/images/banners/interviewCTA.svg'
            alt='AI-powered Interview'
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </Grid>

        {/* Text section */}
        <Grid item xs={12}>
          <Typography variant='h5' component='div'>
            Ace Your Interviews with AI-Powered Simulations
          </Typography>
        </Grid>

        {/* Hint Text section */}
        <Grid item xs={12}>
          <Typography variant='subtitle1' color='text.secondary'>
            Our AI-powered interview simulator provides you with interactive feedback and comprehensive analysis,
            helping you to excel in your upcoming interviews.
          </Typography>
        </Grid>

        {/* Button */}
        <Grid item xs={12}>
          <Link href='/interview/mock-interview' passHref>
            <Button variant='contained' color='primary' size='large'>
              Start First Interview
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CTAPage
