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
      userIndustry?: string | null
      userDreamJob?: string | null
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
  trackEvent: (eventName: string, eventParams?: { [key: string]: any }) => void
  setMixpanelPeople: (params: { [key: string]: any }) => void
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

export enum ProductTotalNumUsage {
  Free = 10,
  Premium = Infinity
}

export type UserSubscription = {
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string
  currentPeriodStart: string
  GSI1SK: string
  planStatus: string
  planPeriod: string
  planPeriodAmount: number
  planType: string
  stripeCustomerID: string
  subscriptionID: string
}

export type UserSubscriptionProduct = {
  GSI1SK: string
  productDetail: string
  productID: string
  productName: string
  productNumUsage: number
  productTotalNumUsage: number
  subscriptionID: string
}

export type UserSubscriptionProducts = {
  userSubscription: UserSubscription
  userSubscriptionProduct: [UserSubscriptionProduct]
}

export type UserSubscriptionProductsList = {
  userSubscriptionProductsArray: [UserSubscriptionProducts]
}

export enum Tab {
  overview = 'overview',
  account_setting = 'account_setting',
  subscription = 'subscription'
}

export enum UserProfileViewTypes {
  tutorial = 'tutorial',
  profile = 'profile'
}

export enum TabType {
  overview = 'overview',
  account_setting = 'account-setting',
  subscription = 'subscription'
}

export interface DialogSelectParam {
  upgrade: boolean
  resume: boolean
  cancel: boolean
  confirmCancel: boolean
}

export enum SubscriptionActionType {
  upgrade = 'upgrade',
  resume = 'resume',
  cancel = 'cancel'
}

export enum Industry {
  Accounting = 'Accounting',
  Airlines_Aviation = 'Airlines/Aviation',
  Alternative_Dispute_Resolution = 'Alternative Dispute Resolution',
  Alternative_Medicine = 'Alternative Medicine',
  Animation = 'Animation',
  Apparel_Fashion = 'Apparel & Fashion',
  Architecture_Planning = 'Architecture & Planning'
}

export enum TopicsInterested {
  Adaptability = 'Adaptability',
  Commitment = 'Commitment',
  Communication = 'Communication',
  ConflictManagement = 'Conflict Management',
  CriticalThinking = 'Critical Thinking',
  Dependability = 'Dependability',
  DetailOrientation = 'Detail Orientation',
  Empathy = 'Empathy',
  IntegrityEthics = 'Integrity & Ethics',
  Leadership = 'Leadership',
  OpennessToLearning = 'Openness to Learning',
  ProblemSolving = 'Problem Solving',
  SelfMotivation = 'Self Motivation',
  StressManagement = 'Stress Management',
  Teamwork = 'Teamwork',
  TimeManagement = 'Time Management'
}

export type CareerGoal = {
  dreamJob: string
  industry: Industry
  topicsInterested: TopicsInterested[]
}

export type UserInterviewUsageMetaData = {
  userInterviewNumTotalCount: number
  userInterviewNumUniqueCount: number
  userInterviewQuestionMap: JSON
}
