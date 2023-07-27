// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { DialogSelectParam } from 'src/context/types'
import { UserSubscription } from 'src/context/types'
import { useSubscription } from 'src/hooks/useSubscription'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { API, graphqlOperation } from 'aws-amplify'
import { updateUserSubscriptionCancelReason } from 'src/graphql/mutations'
import { useAuth } from 'src/hooks/useAuth'

interface UserSuspendDialogInterface {
  dialogParams: DialogSelectParam
  setDialogParams: (dialogParams: DialogSelectParam) => void
  userSubscription: UserSubscription
}

const surveyOptions = [
  'I did not understand how to use this product',
  'I did not find the product useful',
  'I had a bad experience (bugs, delay, support, etc.)',
  'I found an alternative tool',
  'It is too expensive',
  'Just taking a break, will be back soon',
  'Other reasons'
]

const initialSurveyOptions = surveyOptions.map(option => ({
  label: option,
  checked: false
}))

const UserSuspendDialog = (userSuspendDialogInterface: UserSuspendDialogInterface) => {
  const { dialogParams, setDialogParams, userSubscription } = userSuspendDialogInterface
  const { handleUserConfirmCancelSubscription } = useSubscription(userSubscription)
  const [isLoading, setIsLoading] = useState(false)
  const [survey, setSurvey] = useState(initialSurveyOptions)
  const auth = useAuth()

  const handleChange = (event: { target: { name: string; checked: any } }) => {
    setSurvey(prevSurvey =>
      prevSurvey.map(option =>
        option.label === event.target.name ? { ...option, checked: event.target.checked } : option
      )
    )
  }

  const handleClose = async () => {
    setDialogParams({
      ...dialogParams,
      confirmCancel: false,
      cancel: false
    })

    // Update user cancel subscription survey to graphql

    try {
      // Use graphql to crate a new interview
      await API.graphql(
        graphqlOperation(updateUserSubscriptionCancelReason, {
          userEmail: auth.user?.userEmailAddress,
          subscriptionId: userSubscription.subscriptionID,

          // Transform the survey array to AWSJSON type
          cancelReason: JSON.stringify(survey)
        })
      )
    } catch (error) {
      console.log('Error updateUserSubscriptionCancelReason', error)
    }

    // Refresh the page
    window.location.reload()
  }

  const userConfirmCancelHandler = async () => {
    setIsLoading(true)
    const result = await handleUserConfirmCancelSubscription()
    setIsLoading(false)
    if (result) {
      toast.success('Subscription cancelled successfully')
      setDialogParams({
        ...dialogParams,
        cancel: false,
        confirmCancel: true
      })
    } else {
      toast.error('Error cancelling subscription')
    }
  }

  const userConfirmNotCancelHandler = () => {
    setDialogParams({
      ...dialogParams,
      cancel: false
    })
  }

  return (
    <>
      <Dialog
        fullWidth
        open={dialogParams.cancel}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 1, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>Are you sure you would like to cancel your Premium subscription?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={userConfirmCancelHandler} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Yes'}
          </Button>
          <Button variant='outlined' color='secondary' onClick={userConfirmNotCancelHandler} disabled={isLoading}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      {dialogParams.confirmCancel && (
        <Dialog
          fullWidth
          open={dialogParams.confirmCancel}
          onClose={handleClose}
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
        >
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& svg': {
                  mb: 0,
                  color: 'success.main'
                }
              }}
            >
              <Icon fontSize='5.5rem' icon={'mdi:check-circle-outline'} />
              <Typography variant='h4' sx={{ m: 4 }}>
                Unsubscribed
              </Typography>
              <Typography variant='body1'>
                We're sorry to see you go, but we'd love to have you back whenever you're ready.
              </Typography>
              <FormControl sx={{ mt: 4, mr: 4 }}>
                <Typography variant='body1'>What made you cancel your subscription?</Typography>
                <Grid container sx={{ mt: 1, mb: 2 }}>
                  {survey.map((option, index) => (
                    <Grid item xs={12} sm={12} md={12} key={index}>
                      <FormControlLabel
                        label={<Typography variant='body2'>{option.label}</Typography>}
                        control={<Checkbox checked={option.checked} onChange={handleChange} name={option.label} />}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' color='success' onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default UserSuspendDialog
