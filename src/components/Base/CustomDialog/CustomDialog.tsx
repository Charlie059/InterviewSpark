/* eslint-disable lines-around-comment */
import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, SxProps, Theme } from '@mui/material'

/**
 * Properties for the CustomDialogProps.
 */
export interface CustomDialogProps {
  /** Indicates whether the dialog is open or not. */
  open: boolean

  /** Callback function invoked when the dialog needs to be closed. */
  onClose: () => void

  /** The content to be displayed in the dialog. */
  children?: React.ReactNode

  /** The actions displayed at the bottom of the dialog. */
  actions?: React.ReactNode

  /** The sx props for the dialog. */
  sx?: SxProps<Theme>
}

const CustomDialog = (props: CustomDialogProps) => {
  const { open, onClose, children, actions, sx } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth sx={sx}>
      <DialogContent>{children}</DialogContent>
      {actions || (
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

// Default props for the CustomDialog component.
CustomDialog.defaultProps = {
  open: false,
  onClose: () => {
    console.log('onClose')
  },
  children: <div>Default content</div>
}

export default CustomDialog
