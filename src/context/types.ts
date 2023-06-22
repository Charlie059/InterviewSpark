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
  fName: string
  lName: string
}

export type UserDataType =
  | {
      __typename: 'Profile'
      fName?: string | null
      lName?: string | null
      photoImgURL?: string | null
      coverImgURL?: string | null
      resumeKey?: string | null
      addressLine1?: string | null
      addressLine2?: string | null
      city?: string | null
      state?: string | null
      postalCode?: string | null
      country?: string | null
      joiningDate?: string | null
      contact?: string | null
      isPublic?: boolean | null
      userName?: string | null
      userEmailAddress?: string | null
      userRole?: string | null
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
