// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Logger
import Logger from 'src/middleware/loggerMiddleware'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    const getAuth = async () => {
      Logger.info('GuestGuard')
      try {
        const userData = await auth.currUser()
        Logger.info('GuestGuard', userData)

        if (!router.isReady) return

        // Return to home page
        if (userData) router.replace('/')
      } catch (error) {
        Logger.error('GuestGuard: no curr user')
      }
    }
    getAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
