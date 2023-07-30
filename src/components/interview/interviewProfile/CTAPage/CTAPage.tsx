import React from 'react'
import { Box, Grid, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'

interface CTAPagePropsInterface {
  isTutorial?: boolean
  selectedTopic?: string
}

const CTAPage = (CTAPageProps: CTAPagePropsInterface) => {
  const { isTutorial, selectedTopic } = CTAPageProps
  const auth = useAuth()
  const mixPanelEventTracker = (info: object) => {
    //Transfer the object to JSON
    const infoJSON = JSON.stringify(info)

    // Log the event
    auth.trackEvent('UserClickTutorial', {
      action: 'User Clicked CTA Button',
      info: infoJSON
    })

    // Log the event user
    auth.setMixpanelPeople({
      action: 'User Clicked CTA Button',
      info: infoJSON
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2
      }}
    >
      <Grid container spacing={10}>
        {/* Image section */}
        <Grid item xs={12}>
          <img src='/images/banners/interviewCTA.svg' alt='AI-powered Interview' style={{ maxWidth: '30%' }} />
        </Grid>

        {/* Text section */}
        <Grid item xs={12}>
          <Typography variant='h5' component='div'>
            Unlock your interview potential and land your dream job with confidence!
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
          {isTutorial ? (
            <Link
              href={`/interview/practice-interview?topicTag=${selectedTopic}`}
              passHref
              onClick={() => {
                mixPanelEventTracker({ selectedTopic: selectedTopic })
              }}
            >
              <Button variant='contained' color='primary' size='large'>
                Practice Now
              </Button>
            </Link>
          ) : (
            <Link href='/interview/practice-interview' passHref>
              <Button variant='contained' color='primary' size='large'>
                Practice Now
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CTAPage
