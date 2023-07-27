import React, { ReactNode, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// @ts-ignore
import styles from 'styles/authInput.module.css'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import InputLabel from '@mui/material/InputLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { Auth } from 'aws-amplify'
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import Log from 'src/middleware/loggerMiddleware'

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

interface FormData {
  password: string
}

export default function PasswordResetValidation() {
  // ** Router
  const router = useRouter()

  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Hooks
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const AuthInputRef = useRef<AuthCodeRef>(null)
  const [code, setCode] = useState<string>('')
  const { email } = router.query

  // ** Vars
  const { skin } = settings

  // ** Vars
  const passwordValidation = yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'
    )

  const schema = yup.object().shape({
    password: passwordValidation
  })

  const defaultValues = {
    password: '',
    code: ''
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

  const handleOnChange = async (code: string) => {
    setCode(code)
  }
  async function onSubmit(data: FormData) {
    const { password } = data
    try {
      await Auth.forgotPasswordSubmit(email as string, code, password)

      // if successful, redirect to login page
      router.push('/login')
    } catch (error) {
      Log.error(error)
      setError('code', { message: 'Invalid code' })
    }
  }

  async function resendCode() {
    try {
      await Auth.forgotPassword(email as string)

      // resend code if the user is not comfirmed.
      setSuccess('Verification code successfully sent')
    } catch (err) {
      setError('code', { message: 'Error resending verification code' })
      Log.error(err)
    }
  }

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div>
          <Box className='content-right'>
            <RightWrapper
              sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}
            >
              <Box
                sx={{
                  p: 7,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BoxWrapper data-testid='auth-input-container'>
                  <Box sx={{ mb: 6 }}>
                    <TypographyStyled variant='h4'>Two-Factor Authentication</TypographyStyled>
                    <div className={styles.pageWrapper}>
                      <div>
                        <div>
                          <br />
                          <Typography variant='body2'>
                            A message with a verification code has been sent to your email address. Enter the code to
                            continue.
                          </Typography>
                          <br />
                          <Box sx={{ mb: 6 }}>
                            <AuthCode
                              allowedCharacters='numeric'
                              ref={AuthInputRef}
                              onChange={handleOnChange}
                              containerClassName={styles.container}
                              inputClassName={styles.input}
                            />
                            <br />
                            <div
                              style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                              }}
                            >
                              <Typography variant='body2'>Click </Typography>
                              <span>&nbsp;</span>
                              <Typography component='a' href='#' onClick={resendCode} variant='body2'>
                                Here
                              </Typography>
                              <span>&nbsp;</span>
                              <Typography variant='body2'>to resend verification code.</Typography>
                            </div>

                            <br />
                            <Typography variant='body2'>
                              Please enter the new password you would like to use for your account.
                            </Typography>
                            <br />

                            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                                      sx={{
                                        backgroundColor: '#fff'
                                      }}
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
                                  <FormHelperText sx={{ color: 'error.main' }}>
                                    {errors.password.message}
                                  </FormHelperText>
                                )}

                                <br />

                                {errors.code?.message !== undefined && (
                                  <Alert severity='error'>{errors.code?.message}</Alert>
                                )}
                                {success !== null && <Alert severity='success'>{success}</Alert>}

                                <br />

                                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                  Reset
                                </Button>
                              </FormControl>
                            </form>
                            <br />
                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                </BoxWrapper>
              </Box>
            </RightWrapper>
          </Box>
        </div>
      </Box>
    </Box>
  )
}

PasswordResetValidation.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
PasswordResetValidation.guestGuard = true
