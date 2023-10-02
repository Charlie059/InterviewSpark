import { FormControl, TextField } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ReviewFieldContainer } from './ReviewField.styled'

interface ReviewFieldProps {
  control: any
  errors: any
  name: string
  label: string
}

const ReviewField: FC<ReviewFieldProps> = ({ control, errors, name, label }) => (
  <ReviewFieldContainer item xs={12}>
    <FormControl fullWidth error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant='outlined'
            multiline
            rows={4}
            helperText={errors[name]?.message}
            error={!!errors[name]}
          />
        )}
      />
    </FormControl>
  </ReviewFieldContainer>
)

export default ReviewField
