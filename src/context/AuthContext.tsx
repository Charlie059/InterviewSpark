// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Aws-amplify
import { Auth } from 'aws-amplify'

// ** Logger
import Log from '../middleware/loggerMiddleware'

const handleCurrUser = async (): Promise<UserDataType | null> => {
  try {
    const currentSession = await Auth.currentSession()

    if (currentSession.isValid()) {
      const userInfo = await Auth.currentUserInfo()
      Log.info(userInfo)

      // Check if Auth return empty
      if (Object.keys(userInfo).length === 0) return null

      //TODO Add user detail
      const user: UserDataType = {
        role: 'admin',
        fullName: 'XG',
        username: 'XG',
        email: 'xg73@duke.edu'
      }

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

        const user = await handleCurrUser()
        if (user) {
          // Set the loading state to false and the user data to the local state.
          setLoading(false)
          setUser({ ...user })
        } else {
          // If there is no user, set the loading state to false.
          setLoading(false)
          setUser(null)
        }
      } else {
        // If there is no session, set the loading state to false.
        setLoading(false)
        setUser(null)
      }
    }

    initAuth().catch(err => {
      Log.info(err)
      setLoading(false)
    })
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    // Use the `Auth.signIn` method to sign in the user with the provided username and password.
    Auth.signIn(params.email, params.password)
      .then(async userData => {
        //TODO Check unconfirmed user
        //TODO Add user detail
        const user: UserDataType = {
          role: 'admin',
          fullName: 'XG',
          username: 'XG',
          email: 'xg73@duke.edu'
        }
        setUser({ ...user })
        Log.info(userData)

        // Get the return URL from the router query, if it exists, and redirect the user to the specified URL or to the root URL if no return URL was specified.
        const redirectURL = router.query.returnUrl || '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        errorCallback ? errorCallback(err) : null
        Log.info(err)
      })
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
    // Use the Auth.signUp method to register a new user with the provided username, password, and email address.
    console.log(params)
    try {
      const { user } = await Auth.signUp({
        password: params.password,
        username: params.email,
        attributes: {
          email: params.email
        }
      })
      console.log(user)
    } catch (err) {
      // If an error occurred, throw it so it can be handled by the caller.

      //errorCallback ? errorCallback(err) : null
      throw err
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
