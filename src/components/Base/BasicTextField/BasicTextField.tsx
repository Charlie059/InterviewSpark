import { FormControl, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

interface BasicTextFieldProps {
  control: any
  errors: any
  name: string
  label: string
}

export const BasicTextField: React.FC<BasicTextFieldProps> = ({ control, errors, name, label }) => {
  return (
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
  )
}
