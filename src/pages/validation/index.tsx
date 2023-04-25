import React, { ReactNode, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input'

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

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { Auth } from 'aws-amplify'
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

interface VerifyCodeProps {
  username: string
}

export default function VerifyCode({ username }: VerifyCodeProps) {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const AuthInputRef = useRef<AuthCodeRef>(null)
  const [, setResult] = useState<string>('')

  const router = useRouter()

  // ** Vars
  const { skin } = settings

  const handleOnChange = async (res: string) => {
    setResult(res)
    Log.info('res', res)

    // If res length is 6, then submit the code
    if (res.length === 6) {
      await handleSubmit(res)
    }
  }

  async function handleSubmit(code: string) {
    try {
      await Auth.confirmSignUp(username, code)

      // If the code is valid, tell user operation is successful
      setError(null)
      setSuccess('Success! You can now log in')

      // Wait 2 seconds and redirect to login page
      setTimeout(() => {
        router.replace('/login')
      }, 2000)
    } catch (err) {
      setError('Error confirming sign up')
      Log.error('error confirming sign up', err)
    }
  }

  async function resendCode() {
    try {
      Log.info('resendCode', username)
      await Auth.resendSignUp(username)

      // resend code if the user is not comfirmed.
      setError(null)
      setSuccess('Verification code resent successfully!')
    } catch (err) {
      setError('Error resending verification code')
      Log.error('Error resending verification code', err)
    }
  }

  return (
    <Box className='content-center' data-testid='confirmation-page'>
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

                        {error !== null && <Alert severity='error'>{error}</Alert>}
                        {success !== null && <Alert severity='success'>{success}</Alert>}
                      </div>
                    </div>
                  </div>
                </BoxWrapper>
              </Box>
            </RightWrapper>
          </Box>
        </div>
      </Box>
    </Box>
  )
}

VerifyCode.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
VerifyCode.guestGuard = true
