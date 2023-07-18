// ** React Imports
import {Dispatch, SetStateAction, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {PlanPeriodAmount, PlanType, Subscription} from "../../context/types";

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
  subscriptionData: Subscription
  setSubscriptionData: Dispatch<SetStateAction<Subscription>>
}

const UserSuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen, subscriptionData, setSubscriptionData} = props

  // ** States
  const [userInput, setUserInput] = useState<string>('confirm')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = (cancel: boolean) => {
    setSecondDialogOpen(false)
    if (cancel) {
      premiumToFree(subscriptionData)
    }
  }

  const premiumToFree = (subscriptionData: Subscription) => {
    setSubscriptionData({
      ...subscriptionData,
      planType: PlanType.Free,
      planPeriodAmount: PlanPeriodAmount.Free,
    });
  }

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 1, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>Are you sure you would like to cancel your Premium subscription?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => handleConfirmation('confirm')}>
            Confirm
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {userInput === 'confirm' && (
        <Dialog
          fullWidth
          open={secondDialogOpen}
          onClose={()=>handleSecondDialogClose(false)}
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
              <Typography variant='body1'>We're sorry to see you go, but we'd love to have you back whenever you're ready.</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' color='success' onClick={()=>handleSecondDialogClose(true)}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default UserSuspendDialog
