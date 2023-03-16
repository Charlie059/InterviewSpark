export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType =
  | {
      __typename: 'User'
      emailAddress: string
      userRole: string
      userName: string
      hasProfile: boolean
      allowPublishInterview: boolean
    }
  | null
  | undefined

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  currUser: () => Promise<UserDataType | null> // Check AWS currentSession
}
