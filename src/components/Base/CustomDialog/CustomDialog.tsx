/* eslint-disable lines-around-comment */
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, SxProps, Theme } from '@mui/material'
import Typography from '@mui/material/Typography';
import { Box } from 'mdi-material-ui';
import Rating from '../../rating';

/**
 * Properties for the CustomDialogProps.
 */
export interface CustomDialogProps {
  /** Indicates whether the dialog is open or not. */
  open: boolean

  /** Callback function invoked when the dialog needs to be closed. */
  onClose: () => void

  /** List of React components to be displayed in the content section. */
  contentList?: React.ReactNode[];

  /** The actions displayed at the bottom of the dialog. */
  actions?: React.ReactNode

  /** The sx props for the dialog. */
  sx?: SxProps<Theme>
}

const CustomDialog = (props: CustomDialogProps) => {
  const { open, onClose, contentList , actions, sx } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth sx={sx}>
      <DialogContent>
        {contentList?.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </DialogContent>
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
  contentList:[
    <div>Default content</div>,
    ]
}


export default CustomDialog;
