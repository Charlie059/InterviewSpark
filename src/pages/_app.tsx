// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

// * Amplify
import { Amplify } from 'aws-amplify'
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import { Predictions } from 'aws-amplify'

if (!Predictions.getPluggable('AmazonAIPredictionsProvider')) {
  Amplify.addPluggable(new AmazonAIPredictionsProvider())
}

import config from '../aws-exports'

Amplify.configure(config)

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Config Imports

import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  const [width, height] = useWindowSize()
  const [scale, setScale] = useState(1)
  const [showLowResWarning, setShowLowResWarning] = useState(false)

  const handleResize = () => {
    const baseWidth = 1168
    const viewportWidth = width
    const maxScale = 1
    let newScale = viewportWidth / baseWidth
    const minSupportedWidth = 768

    if (viewportWidth < minSupportedWidth) {
      setShowLowResWarning(true)
    } else {
      setShowLowResWarning(false)
    }

    if (newScale > maxScale) {
      newScale = maxScale
    } else {
      newScale *= 0.7
    }

    setScale(newScale)
  }
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  // TODO: Change Hint

  return (
    <div className='app-scale' style={{ transform: `scale(${scale})` }}>
      {showLowResWarning ? (
        <Dialog open={showLowResWarning} maxWidth='sm' fullWidth disableEscapeKeyDown>
          <DialogTitle>Unsupported Screen Size</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you're having trouble viewing this application due to a low screen resolution, don't worry! You can
              improve your experience by using your browser's zoom feature. For Mac users, press CMD and the plus (+)
              key in Chrome to zoom in. For Windows users, press Ctrl and the plus (+) or minus (-) key in Chrome to
              zoom in or out, or adjust your screen resolution as needed.
            </DialogContentText>
          </DialogContent>

          <DialogActions></DialogActions>
        </Dialog>
      ) : (
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`HireBeat`}</title>
            <meta name='description' content={`${themeConfig.templateName} – HireBeat.Interview`} />
            <meta name='keywords' content='HireBeat.Interview' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      <WindowWrapper>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                      </WindowWrapper>
                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                      </ReactHotToast>
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </CacheProvider>
      )}
    </div>
  )
}

export default App
