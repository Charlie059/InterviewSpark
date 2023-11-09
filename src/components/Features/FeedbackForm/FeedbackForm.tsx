/***********************************************************************************************
  Name: FeedbackForm.tsx
  Description: FeedbackForm component
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/10/02
  Update Date: 2023/10/02
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { Grid, IconButton, Typography } from '@mui/material'
import CustomDialog from 'src/components/Base/CustomDialog/CustomDialog'
import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react'
import { useFeedbackForm } from 'src/hooks/useForm/useFeedbackForm'
import FinishView from './FinishView'
import RatingField from './RatingField'
import ReviewField from './ReviewField'
import FeedbackButton from './FeedbackButton'

const TITLE = 'Leave your feedback'
const SUBTITLE = 'How would you rate your experience?*'

interface FeedbackDialogProps {
  open: boolean
  onClose: () => void
}

interface FeedbackDialogContentProps {
  onClose: () => void
  control: any
  errors: any
}

const Title: FC = () => <Typography variant={'h5'}>{TITLE}</Typography>
const Subtitle: FC = () => <Typography variant={'body2'}>{SUBTITLE}</Typography>

/**
 * FeedbackForm Component
 * @param {FeedbackDialogProps} props
 * @returns
 */
const FeedbackForm: FC<FeedbackDialogProps> = ({ open, onClose }) => {
  const { isSubmitted, control, handleSubmit, errors, onSubmit } = useFeedbackForm()

  return (
    <form>
      <CustomDialog
        open={open}
        onClose={onClose}
        actions={
          isSubmitted ? (
            <FeedbackButton text={'Close'} onClick={onClose} />
          ) : (
            <FeedbackButton text={'Submit'} onClick={handleSubmit(onSubmit)} />
          )
        }
      >
        {isSubmitted ? <FinishView /> : <FeedbackDialogContent onClose={onClose} control={control} errors={errors} />}
      </CustomDialog>
    </form>
  )
}

const FeedbackDialogContent: FC<FeedbackDialogContentProps> = ({ onClose, control, errors }) => (
  <Grid container direction='column' justifyContent='center' alignItems='center' spacing={1}>
    <Grid container justifyContent={'flex-end'}>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Grid>
    <Grid item xs={12}>
      <Title />
    </Grid>
    <Grid item xs={12}>
      <Subtitle />
    </Grid>
    <RatingField control={control} errors={errors} name={'rating'} />
    <ReviewField control={control} errors={errors} name={'review'} label={'Product Review'} />
  </Grid>
)

export default FeedbackForm
