// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { DialogSelectParam } from 'src/context/types'
import { UserSubscription } from 'src/context/types'
import { useSubscription } from 'src/hooks/useSubscription'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface UserSuspendDialogInterface {
  dialogParams: DialogSelectParam
  setDialogParams: (dialogParams: DialogSelectParam) => void
  userSubscription: UserSubscription
}
const UserSuspendDialog = (userSuspendDialogInterface: UserSuspendDialogInterface) => {
  const { dialogParams, setDialogParams, userSubscription } = userSuspendDialogInterface
  const { handleUserConfirmCancelSubscription } = useSubscription(userSubscription)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setDialogParams({
      ...dialogParams,
      confirmCancel: false,
      cancel: false
    })

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
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 400 } }}
        >
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& svg': {
                  mb: 14,
                  color: 'success.main'
                }
              }}
            >
              <Icon fontSize='5.5rem' icon={'mdi:check-circle-outline'} />
              <Typography variant='h4' sx={{ mb: 8 }}>
                Unsubscribed
              </Typography>
              <Typography variant='body1'>
                We're sorry to see you go, but we'd love to have you back whenever you're ready.
              </Typography>
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
