import { FormControl, Rating } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ErrorText, RatingFieldContainer } from './RatingField.styled'

interface RatingFieldProps {
  control: any
  errors: any
  name: string
}

const RatingField: FC<RatingFieldProps> = ({ control, errors, name }) => (
  <RatingFieldContainer item xs={12}>
    <FormControl error={!!errors[name]} component='fieldset'>
      <Controller
        name={name}
        control={control}
        defaultValue={0}
        render={({ field }) => <Rating {...field} value={Number(field.value)} />}
      />
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </FormControl>
  </RatingFieldContainer>
)

export default RatingField
