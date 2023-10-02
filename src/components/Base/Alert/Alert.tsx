/* eslint-disable lines-around-comment */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

/**
 * Properties for the AlertComponent.
 */
export interface AlertProps {
  /** Indicates whether the alert is open or not. */
  open: boolean

  /** The title displayed at the top of the alert. */
  title: string

  /** The main message content of the alert, it can be React.ReactNode. */
  message: string | React.ReactNode

  /** Callback function invoked when the alert needs to be closed. */
  onClose: () => void

  /** Callback function invoked when the alert is confirmed. */
  onConfirm: () => void

  /** Callback function invoked when the alert is canceled. */
  onCancel: () => void
}

const AlertComponent = (props: AlertProps) => {
  const { open, message, title, onClose, onConfirm, onCancel } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AlertComponent.defaultProps = {
  open: false,
  title: 'Default Title',
  message: 'Default Message'
}

export default AlertComponent
