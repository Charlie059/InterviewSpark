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
      photoImgKey?: string | null
      coverImgKey?: string | null
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

export type Education = {
  eduID: string
  eduDegree: string
  eduSchool: string
  eduStartDate: Date
  eduFieldStudy: string
  eduEndDate: Date
  eduIcon?: string
  eduActivities?: string
  eduDescription?: string
}

export type WorkHistory = {
  workHistoryID: string
  workHistoryJobTitle: string
  workHistoryEmployer: string
  workHistoryStartDate: Date
  workHistoryEndDate: Date
  workHistoryJobDescription?: string
  workHistoryIcon?: string
}

export enum PlanType {
  Free = 'Free',
  Premium = 'Premium'
}

export enum PlanPeriod {
  M = 'Monthly',
  Y = 'Yearly'
}

export enum PlanPeriodAmount {
  Free = 0,
  Premium = 9.99
}

export enum ProductTotalNumUsage{
  Free = 10,
  Premium = Infinity
}

export type Product = {
  productDetail: string
  productID: string
  productName: string
  productNumUsage: number
  productTotalNumUsage: ProductTotalNumUsage
}

export type Subscription = {
  cancelAtPeriodEnd: boolean
  currentPeriodStart: Date
  currentPeriodEnd: Date | null
  planPeriodAmount: number
  planPeriod: PlanPeriod
  planType: PlanType
  products: Product[]
}
