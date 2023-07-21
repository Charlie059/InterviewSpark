// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import FormHelperText from '@mui/material/FormHelperText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CheckIcon from '@mui/icons-material/Check'

// ** Third Party Imports
import * as yup from 'yup'

interface State {
  currentPassword: string
  showCurrentPassword: boolean
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

const UserSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    currentPassword: '',
    showCurrentPassword: false,
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ** Validation Schema
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .notOneOf([yup.ref('currentPassword')], 'New password must be different from the current password')
      .min(8, 'New password must be at least 8 characters')
      .required('New password is required'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
      .required('Confirm new password is required')
  })

  // Define a function to handle form submission
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        // Form is valid
      })
      .catch(validationErrors => {
        // Form is invalid, set the errors state
        const newErrors: Record<string, string> = {}
        validationErrors.inner.forEach((error: { path: string | number; message: any }) => {
          newErrors[error.path] = error.message
        })
        setErrors(newErrors)
      })
  }

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Change Password' sx={{ m: 2 }} />
          <CardContent sx={{ ml: 5, mr: 5 }}>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors}>
                        <InputLabel htmlFor='user-view-security-current-password'>Current Password</InputLabel>
                        <OutlinedInput
                          label='Current Password'
                          value={values.currentPassword}
                          id='user-view-security-current-password'
                          onChange={handleCurrentPasswordChange('currentPassword')}
                          type={values.showCurrentPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowCurrentPassword}
                                aria-label='toggle password visibility'
                                onMouseDown={handleMouseDownCurrentPassword}
                              >
                                <Icon icon={values.showCurrentPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.currentPassword && <FormHelperText>{errors.currentPassword}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.newPassword}>
                        <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                        <OutlinedInput
                          label='New Password'
                          value={values.newPassword}
                          id='user-view-security-new-password'
                          onChange={handleNewPasswordChange('newPassword')}
                          type={values.showNewPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowNewPassword}
                                aria-label='toggle password visibility'
                                onMouseDown={handleMouseDownNewPassword}
                              >
                                <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.newPassword && <FormHelperText>{errors.newPassword}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.confirmNewPassword}>
                        <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                        <OutlinedInput
                          label='Confirm New Password'
                          value={values.confirmNewPassword}
                          id='user-view-security-confirm-new-password'
                          type={values.showConfirmNewPassword ? 'text' : 'password'}
                          onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                aria-label='toggle password visibility'
                                onClick={handleClickShowConfirmNewPassword}
                                onMouseDown={handleMouseDownConfirmNewPassword}
                              >
                                <Icon
                                  icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.confirmNewPassword && <FormHelperText>{errors.confirmNewPassword}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' sx={{ mb: [0, 0, 5, 5] }}>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Alert icon={false} severity='warning' sx={{ mb: 6 }}>
                  <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                    Ensure that these requirements are met
                  </AlertTitle>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color='warning' fontSize='small'></CheckIcon>
                      </ListItemIcon>
                      <ListItemText primary='Minimum 8 characters long' disableTypography />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color='warning' fontSize='small'></CheckIcon>
                      </ListItemIcon>
                      <ListItemText primary='New password must be different from current password' disableTypography />
                    </ListItem>
                  </List>
                </Alert>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserSecurity
