// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Aws-amplify
import { API, Auth, graphqlOperation } from 'aws-amplify'

// ** Logger
import Log from 'src/middleware/loggerMiddleware'

// ** Get user
import { getUserProfileData } from '../utils/getUser'
import { createNewGuestUser } from 'src/graphql/mutations'

const handleCurrUser = async (): Promise<UserDataType | null> => {
  try {
    const currentSession = await Auth.currentSession()
    console.log('currentSession', currentSession)

    if (currentSession.isValid()) {
      const userInfo = await Auth.currentUserInfo()

      // Check if Auth return empty
      if (Object.keys(userInfo).length === 0) return null

      const user = await getUserProfileData(userInfo.attributes.email)
      Log.error(user)

      return user
    } else {
      return null
    }
  } catch (error) {
    Log.info('Error getting session')

    return null
  }
}

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  currUser: handleCurrUser
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      Log.info('AuthProvider')

      // Check if there is a valid session in the browser.
      const session = await Auth.currentSession()

      if (session.isValid()) {
        // If there is a session, set the loading state to true and get the current authenticated user.
        setLoading(true)
        console.log('setLoading(true)')

        const user = await handleCurrUser()

        Log.debug('user', user)
        if (user) {
          // Set the loading state to false and the user data to the local state.
          setLoading(false)
          console.log('setLoading(false)')
          setUser({ ...user })
        } else {
          // If there is no user, set the loading state to false.
          setLoading(false)
          console.log('setLoading(false)')
          setUser(null)
        }
      } else {
        // If there is no session, set the loading state to false.
        setLoading(false)
        console.log('setLoading(false)')
        setUser(null)
      }
    }

    initAuth().catch(err => {
      Log.info(err)
      setLoading(false)
      console.log('setLoading(false)')
    })
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    // Use the `Auth.signIn` method to sign in the user with the provided username and password.
    try {
      Auth.signIn(params.email, params.password)
        .then(async userData => {
          const emailAddress = userData.attributes.email
          const user = await getUserProfileData(emailAddress)

          setUser(user)
          Log.info(user)

          // if user is null, return error
          if (!user) {
            errorCallback ? errorCallback({ Error: 'User not found in database' }) : null

            return
          }

          // Get the return URL from the router query, if it exists, and redirect the user to the specified URL or to the root URL if no return URL was specified.
          const redirectURL = router.query.returnUrl || '/'
          router.replace(redirectURL as string)
        })
        .catch(err => {
          errorCallback ? errorCallback(err) : null
          Log.info(err)
        })
    } catch (err: any) {
      errorCallback ? errorCallback(err) : null
      Log.info(err)
    }
  }

  const handleLogout = () => {
    // Use the Auth.signOut method to sign out the current user.
    Auth.signOut()
      .then(() => {
        // Set the user to null
        setUser(null)

        // Redirect the user to the login page.
        router.push('/login')
      })
      .catch(err => {
        Log.info(err)
      })
  }

  const handleRegister = async (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    console.log('handleRegister', params)

    // Use the Auth.signUp method to register a new user with the provided username, password, and email address.
    try {
      const { user } = await Auth.signUp({
        password: params.password,
        username: params.email
      })

      // TODO error condition check
      try {
        const response = await API.graphql(
          graphqlOperation(createNewGuestUser, {
            emailAddress: params.email,
            userName: params.username,
            fName: params.fName,
            lName: params.lName
          })
        )

        console.log('response', response)
      } catch (error) {
        console.error('Error adding new guest user:', error)

        return null
      }

      Log.info('Verify email sent', user)
    } catch (err: any) {
      // If an error occurred, throw it so it can be handled by the caller.
      errorCallback ? errorCallback(err) : null
      Log.error(err)
    }
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    currUser: handleCurrUser
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
