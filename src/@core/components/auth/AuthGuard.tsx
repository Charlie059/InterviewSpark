// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Logger
import Log from '../../../middleware/loggerMiddleware'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  Log.info('AuthGuard')
  useEffect(
    () => {
      const getAuth = async () => {
        const userData = await auth.currUser()
        console.log(userData)
        if (!router.isReady) return

        if (!userData) {
          if (router.asPath !== '/') {
            router.replace({
              pathname: '/login',
              query: { returnUrl: router.asPath }
            })
          } else {
            router.replace('/login')
          }
        }
      }
      getAuth()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
