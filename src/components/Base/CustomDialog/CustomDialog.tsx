/* eslint-disable lines-around-comment */
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, SxProps, Theme } from '@mui/material'

/**
 * Properties for the CustomDialogProps.
 */
export interface CustomDialogProps {
  /** Indicates whether the dialog is open or not. */
  open: boolean

  /** Callback function invoked when the dialog needs to be closed. */
  onClose: () => void

  /** The title displayed at the top of the dialog. */
  title?: string

  /** The content displayed at the top of the dialog. */
  content?: React.ReactNode

  /** The actions displayed at the bottom of the dialog. */
  actions?: React.ReactNode

  /** The sx props for the dialog. */
  sx?: SxProps<Theme>
}

function CustomDialog(customDialogProps: CustomDialogProps) {
  const { open, onClose, title, content, actions, sx } = customDialogProps

  return (
    <Dialog open={open} onClose={onClose} fullWidth sx={sx}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
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
  title: 'Default Title',
  content: 'Default Content'
}

export default CustomDialog
