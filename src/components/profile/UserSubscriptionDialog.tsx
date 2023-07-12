// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

const UserSuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props

  // ** States
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

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
          <Button variant='contained' onClick={() => handleConfirmation('yes')}>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {userInput === 'yes' &&
        <Dialog
          fullWidth
          open={secondDialogOpen}
          onClose={handleSecondDialogClose}
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
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
              <Icon
                fontSize='5.5rem'
                icon={'mdi:check-circle-outline'}
              />
              <Typography variant='h4' sx={{ mb: 8 }}>
                Unsubscribed!
              </Typography>
              <Typography>
                Your subscription cancelled successfully.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  )
}

export default UserSuspendDialog
