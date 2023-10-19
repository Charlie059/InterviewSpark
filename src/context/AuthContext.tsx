// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Aws-amplify
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'

// ** Logger
import Logger from 'src/middleware/loggerMiddleware'

// ** Get user
import { getUserProfileData } from '../utils/getUser'
import { handleMixpanelEvent } from 'src/graphql/mutations'

const handleCurrUser = async (): Promise<UserDataType | null> => {
  try {
    const currentSession = await Auth.currentSession()

    if (currentSession.isValid()) {
      const userInfo = await Auth.currentUserInfo()

      // Check if Auth return empty
      if (Object.keys(userInfo).length === 0) return null

      const user = await getUserProfileData(userInfo.attributes.email)

      return user
    } else {
      return null
    }
  } catch (error) {
    Logger.info('Error getting session')

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
  currUser: handleCurrUser,
  trackEvent: () => Promise.resolve(),
  setMixpanelPeople: () => Promise.resolve()
}

/* context */

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

/* provider */

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
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
      Logger.info(err)
      setLoading(false)
      console.error(err)
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
          Logger.info(user)

          //set default S3 level to private
          Storage.configure({ level: 'private' })

          // if user is null, return error
          if (!user) {
            errorCallback ? errorCallback({ Error: 'User not found in database' }) : null

            return
          }

          // Mixpanel event
          try {
            await API.graphql(
              graphqlOperation(handleMixpanelEvent, {
                userEmail: user?.userEmailAddress,
                data: JSON.stringify({
                  eventName: 'UserLoginEvent',
                  eventParams: {
                    desc: 'User logged in'
                  }
                }),
                eventType: 'trackEvent'
              })
            )
          } catch (err: any) {
            console.log(err)
          }

          // Get the return URL from the router query, if it exists, and redirect the user to the specified URL or to the root URL if no return URL was specified.
          const redirectURL = router.query.returnUrl || '/'
          router.replace(redirectURL as string)
        })
        .catch(err => {
          errorCallback ? errorCallback(err) : null
          Logger.info(err)
        })
    } catch (err: any) {
      errorCallback ? errorCallback(err) : null
      Logger.info(err)
    }
  }

  const handleLogout = () => {
    // Use the Auth.signOut method to sign out the current user.
    Auth.signOut()
      .then(() => {
        // Mixpanel event
        const userEmailAddress = user?.userEmailAddress
        try {
          API.graphql(
            graphqlOperation(handleMixpanelEvent, {
              userEmail: userEmailAddress,
              data: JSON.stringify({
                eventName: 'UserLoginEvent',
                eventParams: {
                  desc: 'User logged out'
                }
              }),
              eventType: 'trackEvent'
            })
          )
        } catch (err: any) {
          console.log(err)
        }

        // Set the user to null
        setUser(null)

        // Redirect the user to the login page.
        router.push('/login')
      })
      .catch(err => {
        Logger.info(err)
      })
  }

  const handleRegister = async (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    // Use the Auth.signUp method to register a new user with the provided username, password, and email address.
    try {
      await Auth.signUp({
        username: params.email,
        password: params.password,
        attributes: {
          'custom:emailAddress': params.email,
          'custom:fName': params.fName,
          'custom:lName': params.lName,
          'custom:userName': params.username
        }
      }).then(async user => {
        Logger.info('Verify email sent', user)
        errorCallback ? errorCallback({ name: 'success' }) : null
      })
    } catch (err: any) {
      // If an error occurred, throw it so it can be handled by the caller.
      errorCallback ? errorCallback(err) : null
      Logger.error(err)
    }
  }

  // eventName: Any string to identify the event
  // eventParams: Any object to describe the event
  const trackEvent = async (eventName: string, eventParams?: { [key: string]: any }) => {
    Logger.info('Tracking event', eventName, eventParams)
    await API.graphql(
      graphqlOperation(handleMixpanelEvent, {
        userEmail: user?.userEmailAddress,
        data: JSON.stringify({
          eventName,
          eventParams: { ...eventParams, email: user?.userEmailAddress, firstName: user?.fName, lastName: user?.lName } // Any built-in event properties that every call needs
        }),
        eventType: 'trackEvent'
      })
    )
  }

  // profileParams: Any object to describe the user profile
  const setMixpanelPeople = async (profileParams: { [key: string]: any }) => {
    await API.graphql(
      graphqlOperation(handleMixpanelEvent, {
        userEmail: user?.userEmailAddress,
        data: JSON.stringify({
          ...profileParams,
          $email: user?.userEmailAddress,
          $first_name: user?.fName,
          $last_name: user?.lName // Any built-in profile properties that every call needs
        }),
        eventType: 'setPeople'
      })
    )
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    currUser: handleCurrUser,
    trackEvent,
    setMixpanelPeople
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
