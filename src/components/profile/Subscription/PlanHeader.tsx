import { Button, CardHeader, Grid, CircularProgress, Chip } from '@mui/material'
import { useState } from 'react'
import { DialogSelectParam, PlanType, UserSubscription } from 'src/context/types'
import { useSubscription } from 'src/hooks/useSubscription'
import Logger from 'src/middleware/loggerMiddleware'
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

interface PlanHeaderInterface {
  userSubscription: UserSubscription
  dialogParams: DialogSelectParam
  setDialogParams: (dialogParams: DialogSelectParam) => void
}

export const PlanHeader = (planHeaderInterface: PlanHeaderInterface) => {
  // ** Destructure the props
  const { userSubscription, dialogParams, setDialogParams } = planHeaderInterface
  const [isLoading, setIsLoading] = useState(false)
  const { trackEvent, setMixpanelPeople } = useAuth()

  // Hooks
  const { handleUserConfirmResumeSubscription } = useSubscription(userSubscription)

  const userConfirmResumeSubscriptionHandler = async () => {
    setIsLoading(true)
    const res = await handleUserConfirmResumeSubscription()
    setIsLoading(false)
    if (res) {
      setDialogParams({
        ...dialogParams,
        resume: false
      })
      toast.success('Subscription resumed successfully')

      // Refresh the page
      window.location.reload()
    } else {
      Logger.error('Error resuming subscription')
      toast.error('Error resuming subscription')
    }
  }

  const getPlanButton = (userSubscription: UserSubscription) => {
    if (userSubscription.planType === PlanType.Premium && userSubscription.cancelAtPeriodEnd) {
      return (
        <Button variant='contained' onClick={userConfirmResumeSubscriptionHandler} sx={{ mr: 6 }} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Resume'}
        </Button>
      )
    } else if (userSubscription.planType === PlanType.Premium && !userSubscription.cancelAtPeriodEnd) {
      return (
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            setDialogParams({
              ...dialogParams,
              cancel: true
            })
          }}
          sx={{ mr: 6 }}
          disabled={isLoading}
        >
          Cancel
        </Button>
      )
    } else if (userSubscription.planType === PlanType.Free) {
      return (
        <Button
          variant='contained'
          onClick={() => {
            setDialogParams({
              ...dialogParams,
              upgrade: true
            })
            trackEvent('User_view_plan', {
              category: 'Upgrade Plan',
              action: 'Click Upgrade Plan Button',
              label: 'Upgrade Plan Button Clicked'
            })
            setMixpanelPeople({
              plan: 'free'
            })
          }}
          sx={{ mr: 6 }}
          disabled={isLoading}
        >
          Upgrade
        </Button>
      )
    }
  }

  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <Grid item>
        <CardHeader
          title={
            <>
              Current Plan
              {userSubscription.planStatus === 'past_due' && (
                <Chip label='Past Due' sx={{ ml: 2, backgroundColor: '#f44336', color: '#fff' }} />
              )}
            </>
          }
          sx={{ m: 2 }}
        />
      </Grid>
      <Grid item>{getPlanButton(userSubscription)}</Grid>
    </Grid>
  )
}
