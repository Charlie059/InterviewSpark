// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === 'guest') return '/interview'
  else if (role === 'admin') return '/admin'
  else return '/interview'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user && auth.user.userRole === 'admin') {
      const homeRoute = getHomeRoute(auth.user.userRole)

      // Redirect user to Admin URL
      router.replace(homeRoute)
    } else if (auth.user && auth.user.userRole === 'guest') {
      const homeRoute = getHomeRoute(auth.user.userRole)

      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
