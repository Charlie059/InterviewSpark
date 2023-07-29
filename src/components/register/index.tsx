// ** React Imports
import React, { ReactNode, useState, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import TermsDialog from 'src/components/register/termsDialog'

interface FormData {
  email: string
  terms: boolean
  username: string
  password: string
  fName: string
  lName: string
}

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface Props {
  onRegister: (username: string) => void
}

const Register = ({ onRegister }: Props) => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')

  // ** Hooks
  const theme = useTheme()
  const { register } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  // ** Vars
  const { skin } = settings
  const schema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long'
      )
      .required('Password is required'),
    username: yup
      .string()
      .matches(/^[^\s_]+$/, 'Username cannot contain spaces or underscores')
      .min(3, 'Username must be at least 3 characters long')
      .required('Username is required'),
    email: yup.string().email().required(),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms'),
    fName: yup.string().required('first name is a required field'),
    lName: yup.string().required('last name is a required field')
  })

  const defaultValues = {
    email: '',
    username: '',
    password: '',
    terms: false,
    fName: '',
    lName: ''
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { username, email, password, fName, lName } = data
    const err = await new Promise<any>(resolve => {
      register({ email, username, password, fName, lName }, err => {
        if (err.name !== 'success') {
          console.log(err)
          resolve(err)
        } else {
          console.log('success')
          resolve(undefined)
        }
      })
    })
    console.log(err) // Access the err value here
    console.log(err?.name)
    if (err) {
      //general err handling
      setError('email', {
        type: 'manual',
        message: err.message
      })
    } else {
      onRegister(email)
      toast.success('Email sent! Please check your inbox or spam folder.')
    }
  }

  // Terms & Policies
  const handleClickOpen = (scrollType: DialogProps['scroll']) => (event: React.MouseEvent) => {
    event.preventDefault()
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={12} sx={{ mt: 30, ml: 20, textAlign: 'center' }}>
            <TypographyStyled variant='h4' color='primary.main'>
              {' '}
              Accelerate Your Interview Success
            </TypographyStyled>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            >
              <RegisterIllustrationWrapper>
                <RegisterIllustration
                  alt='register-illustration'
                  src={`/images/pages/sign-up-page-new-color.png`}
                  sx={{ width: '100%' }}
                />
              </RegisterIllustrationWrapper>
              {/* <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} /> */}
            </Box>
          </Grid>
        </Grid>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Adventure starts here 🚀</TypographyStyled>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label='Username'
                      onChange={onChange}
                      placeholder='johndoe'
                      error={Boolean(errors.username)}
                      data-testid='username-input'
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='Email'
                      onBlur={onBlur}
                      defaultValue={router.query?.email}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='user@email.com'
                      data-testid='email-input'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='fName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='First Name'
                      onChange={onChange}
                      placeholder='John'
                      error={Boolean(errors.fName)}
                      data-testid='fName-input'
                    />
                  )}
                />
                {errors.fName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fName.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='lName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      onBlur={onBlur}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='John'
                      error={Boolean(errors.lName)}
                      data-testid='lName-input'
                    />
                  )}
                />
                {errors.lName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lName.message}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      data-testid='password-input'
                      value={value}
                      label='Password'
                      onBlur={onBlur}
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
                <Controller
                  name='terms'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <FormControlLabel
                        sx={{
                          ...(errors.terms ? { color: 'error.main' } : null),
                          '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                        }}
                        control={
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            sx={errors.terms ? { color: 'error.main' } : null}
                            data-testid='term-input'
                          />
                        }
                        label={
                          <Fragment>
                            <Typography
                              variant='body2'
                              component='span'
                              sx={{ color: errors.terms ? 'error.main' : '' }}
                            >
                              I agree to{' '}
                            </Typography>
                            <Typography
                              href='/'
                              variant='body2'
                              component={Link}
                              sx={{ color: 'primary.main', textDecoration: 'none' }}
                              onClick={handleClickOpen('paper')}
                            >
                              privacy policy & terms
                            </Typography>
                            <Dialog
                              sx={{
                                '& .MuiPaper-root': {
                                  width: '100%',
                                  height: '100%',
                                  maxWidth: 1000,
                                  maxHeight: 800,
                                  p: [2, 10]
                                }
                              }}
                              open={open}
                              onClose={handleClose}
                              scroll={scroll}
                              aria-labelledby='scroll-dialog-title'
                              aria-describedby='scroll-dialog-description'
                            >
                              <DialogTitle id='scroll-dialog-title'>Terms & Conditions</DialogTitle>
                              <DialogContent dividers={scroll === 'paper'}>
                                <TermsDialog />
                              </DialogContent>
                            </Dialog>
                          </Fragment>
                        }
                      />
                    )
                  }}
                />
                {errors.terms && (
                  <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
                )}
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
                <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Sign in instead
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
