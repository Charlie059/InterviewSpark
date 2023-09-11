import React, { useState } from 'react'
import {
  Button,
  Typography,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAuth } from 'src/hooks/useAuth'
import Logger from 'src/middleware/loggerMiddleware'
import { useSubscription } from 'src/hooks/useSubscription'
import toast from 'react-hot-toast'

const UpgradePage = () => {
  const [isLoading, setIsLoading] = useState(false)

  // Hooks
  const auth = useAuth()
  const { handleUserClickPlanUpgrade } = useSubscription(null)

  const handleClickToSubscribe = async () => {
    // Call GraphQL API to subscribe
    try {
      setIsLoading(true)

      // Check if we have user's email
      if (!auth.user?.userEmailAddress) {
        throw new Error('No user email found')
      }

      Logger.debug('User email found', auth.user?.userEmailAddress)

      const result = await handleUserClickPlanUpgrade()
      setIsLoading(false)
      if (result.isSuccessful) {
        toast.success('Redirecting to Stripe payment page')

        // Redirect to the stripe payment page
        window.location.href = result.infoJSON.url
      } else {
        toast.error('Error upgrading plan')
        Logger.error('Error upgrading plan', result)
      }
    } catch (error) {
      Logger.error('Error in subscription request', error)
      toast.error('Subscription request failed. Please try again later.', {
        position: 'top-center',
        duration: 5000
      })

      return { isSuccessful: false }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Box mt={8} mb={6} textAlign='center'>
        <Typography variant='h3' gutterBottom>
          InterviewSpark Premium Plan
        </Typography>
        <Typography variant='h6' gutterBottom>
          Enhance Your Interview Skills for only $9.99/mo
        </Typography>
        <Typography variant='subtitle1' paragraph>
          Navigate the job market with confidence, prepare for any interview scenario, and receive real-time AI feedback
          with InterviewSpark.
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Unlimited interview practice' />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Unlimited AI feedback' />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='24/7 support' />
          </ListItem>
        </List>

        <Box my={4}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={handleClickToSubscribe}
            disabled={isLoading}
          >
            Upgrade Now
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box my={6}>
        <Typography variant='h5' gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How does the AI feedback system work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Our AI Interview Coach analyzes your recorded responses and provides actionable feedback to help you
              refine your approach.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>What’s included in the Premium subscription?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Enjoy unlimited interview practice, unlimited AI feedback, and 24/7 support.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  )
}

UpgradePage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default UpgradePage
