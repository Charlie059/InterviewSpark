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

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { Auth } from 'aws-amplify'

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

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  const handleOnChange = async (res: string) => {
    setResult(res)
    console.log(res)

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
      console.log('error confirming sign up', err)
    }
  }

  // TODO add a resend code button and functionality

  return (
    <div>
      <Box className='content-right'>
        {!hidden ? (
          <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <RegisterIllustrationWrapper>
              <RegisterIllustration
                alt='register-illustration'
                src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
              />
            </RegisterIllustrationWrapper>
            <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
          </Box>
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
                <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fillOpacity='0.4'
                    fill='url(#paint0_linear_7821_79167)'
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fillOpacity='0.4'
                    fill='url(#paint1_linear_7821_79167)'
                    transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                  />
                  <rect
                    rx='25.1443'
                    width='50.2886'
                    height='143.953'
                    fill={theme.palette.primary.main}
                    transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                  />
                  <defs>
                    <linearGradient
                      y1='0'
                      x1='25.1443'
                      x2='25.1443'
                      y2='143.953'
                      id='paint0_linear_7821_79167'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop />
                      <stop offset='1' stopOpacity='0' />
                    </linearGradient>
                    <linearGradient
                      y1='0'
                      x1='25.1443'
                      x2='25.1443'
                      y2='143.953'
                      id='paint1_linear_7821_79167'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop />
                      <stop offset='1' stopOpacity='0' />
                    </linearGradient>
                  </defs>
                </svg>
                <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>
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
                        {error !== null && <Alert severity='error'>{error}</Alert>}
                        {success !== null && <Alert severity='success'>{success}</Alert>}
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
  )
}

VerifyCode.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
VerifyCode.guestGuard = true
