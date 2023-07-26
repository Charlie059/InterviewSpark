/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type OperationResult = {
  __typename: "OperationResult",
  isSuccessful: boolean,
  error?: string | null,
  info?: string | null,
};

export type InterviewList = {
  __typename: "InterviewList",
  interviewList?:  Array<Interview | null > | null,
};

export type Interview = {
  __typename: "Interview",
  interviewID?: string | null,
  interviewDateTime?: string | null,
  interviewQuestionID?: string | null,
  interviewVideoKey?: string | null,
  interviewQuestion?: string | null,
  interviewQuestionTitle?: string | null,
  interviewQuestionType?: string | null,
  interviewFeedback?: string | null,
  interviewAnalysis?: string | null,
  interviewEstimatedSeconds?: number | null,
  interviewVideoLength?: string | null,
  interviewVideoPath?: string | null,
};

export type ResumeScan = {
  __typename: "ResumeScan",
  displayName?: string | null,
  jobName?: string | null,
  resumeName?: string | null,
  resumeResults?: string | null,
  resumeUrl?: string | null,
  resumeScanID: string,
};

export type Education = {
  __typename: "Education",
  eduID?: string | null,
  eduDegree?: string | null,
  eduFieldStudy?: string | null,
  eduSchool?: string | null,
  eduStartDate?: string | null,
  eduEndDate?: string | null,
  eduIcon?: string | null,
  eduActivity?: string | null,
};

export type WorkHistory = {
  __typename: "WorkHistory",
  workHistoryID?: string | null,
  workHistoryJobTitle?: string | null,
  workHistoryEmployer?: string | null,
  workHistoryStartDate?: string | null,
  workHistoryEndDate?: string | null,
  workHistoryJobDescription?: string | null,
  workHistoryIcon?: string | null,
};

export type Profile = {
  __typename: "Profile",
  fName?: string | null,
  lName?: string | null,
  photoImgKey?: string | null,
  coverImgKey?: string | null,
  resumeKey?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
  joiningDate?: string | null,
  contact?: string | null,
  isPublic?: boolean | null,
  userName?: string | null,
  userEmailAddress?: string | null,
  userRole?: string | null,
};

export type WorkHistories = {
  __typename: "WorkHistories",
  workHistory?:  Array<WorkHistory | null > | null,
};

export type Educations = {
  __typename: "Educations",
  educations?:  Array<Education | null > | null,
};

export type PaginatedInterviewList = {
  __typename: "PaginatedInterviewList",
  interviewList?:  Array<Interview | null > | null,
  nextToken?: string | null,
  totalRecords?: number | null,
};

export type UserInterviewUsageMetaData = {
  __typename: "UserInterviewUsageMetaData",
  userInterviewNumTotalCount?: number | null,
  userInterviewNumUniqueCount?: number | null,
  userInterviewQuestionMap?: string | null,
};

export type QuestionUsageMetaData = {
  __typename: "QuestionUsageMetaData",
  totalNumOfQuestion?: number | null,
  questionTypes?: Array< string | null > | null,
  questionTags?:  Array<QuestionTag | null > | null,
  recommendations?: Array< string | null > | null,
};

export type QuestionTag = {
  __typename: "QuestionTag",
  tag?: string | null,
  BQ?: Array< number | null > | null,
  TECH?: Array< number | null > | null,
};

export type Question = {
  __typename: "Question",
  GSI1PK?: string | null,
  interviewQuestion?: string | null,
  interviewQuestionSampleAns?: string | null,
  interviewQuestionType?: string | null,
  interviewQuestionTitle?: string | null,
  QuestionID?: string | null,
  difficulty?: string | null,
  estimatedSecond?: number | null,
};

export type PaginatedQuestionList = {
  __typename: "PaginatedQuestionList",
  questionList?:  Array<Question | null > | null,
  nextToken?: string | null,
  totalRecords?: number | null,
};

export type QuestionList = {
  __typename: "QuestionList",
  questionList?:  Array<Question | null > | null,
};

export type ResumeScanList = {
  __typename: "ResumeScanList",
  resumeScanList?:  Array<ResumeScan | null > | null,
};

export type UserSubscriptionProductsList = {
  __typename: "UserSubscriptionProductsList",
  userSubscriptionProductsArray:  Array<UserSubscriptionProducts | null >,
};

export type UserSubscriptionProducts = {
  __typename: "UserSubscriptionProducts",
  userSubscription: UserSubscription,
  userSubscriptionProduct:  Array<UserSubscriptionProduct | null >,
};

export type UserSubscription = {
  __typename: "UserSubscription",
  cancelAtPeriodEnd?: boolean | null,
  currentPeriodEnd?: string | null,
  currentPeriodStart?: string | null,
  GSI1SK?: string | null,
  planPeriod?: string | null,
  planPeriodAmount?: string | null,
  planStatus?: string | null,
  planType?: string | null,
  stripeCustomerID?: string | null,
  subscriptionID: string,
};

export type UserSubscriptionProduct = {
  __typename: "UserSubscriptionProduct",
  GSI1SK?: string | null,
  productDetail?: string | null,
  productID?: string | null,
  productName: string,
  productNumUsage: number,
  productTotalNumUsage: number,
  subscriptionID: string,
};

export type StartInterviewVideoAnalysisMutationVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
  interviewQuestionType: string,
};

export type StartInterviewVideoAnalysisMutation = {
  startInterviewVideoAnalysis: string,
};

export type CreateNewGuestUserMutationVariables = {
  emailAddress: string,
  userName: string,
  fName: string,
  lName: string,
};

export type CreateNewGuestUserMutation = {
  createNewGuestUser:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type CreateUserInterviewQuestionListMutationVariables = {
  emailAddress: string,
  questionTag: string,
  numOfBQ: number,
  numOfTech: number,
};

export type CreateUserInterviewQuestionListMutation = {
  createUserInterviewQuestionList:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
  },
};

export type CreateUserInterviewWithQuestionMutationVariables = {
  emailAddress: string,
  questionID: string,
};

export type CreateUserInterviewWithQuestionMutation = {
  createUserInterviewWithQuestion:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionTitle?: string | null,
    interviewQuestionType?: string | null,
    interviewFeedback?: string | null,
    interviewAnalysis?: string | null,
    interviewEstimatedSeconds?: number | null,
    interviewVideoLength?: string | null,
    interviewVideoPath?: string | null,
  },
};

export type UpdateUserInterviewMutationVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
  interviewQuestionType: string,
  interviewFeedback?: string | null,
  interviewAnalysis?: string | null,
  interviewVideoKey?: string | null,
  interviewVideoPath?: string | null,
  interviewVideoLength?: string | null,
};

export type UpdateUserInterviewMutation = {
  updateUserInterview:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionTitle?: string | null,
    interviewQuestionType?: string | null,
    interviewFeedback?: string | null,
    interviewAnalysis?: string | null,
    interviewEstimatedSeconds?: number | null,
    interviewVideoLength?: string | null,
    interviewVideoPath?: string | null,
  },
};

export type UpdateInterviewVideoKeyMutationVariables = {
  emailAddress: string,
  interviewID: string,
  questionID: string,
  interviewVideoKey: string,
  interviewFeedback: string,
};

export type UpdateInterviewVideoKeyMutation = {
  updateInterviewVideoKey:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionTitle?: string | null,
    interviewQuestionType?: string | null,
    interviewFeedback?: string | null,
    interviewAnalysis?: string | null,
    interviewEstimatedSeconds?: number | null,
    interviewVideoLength?: string | null,
    interviewVideoPath?: string | null,
  },
};

export type UpdateUserProfileMutationVariables = {
  emailAddress: string,
  addressLine1?: string | null,
  addressLine2?: string | null,
  city?: string | null,
  contact?: string | null,
  country?: string | null,
  coverImgKey?: string | null,
  fName?: string | null,
  lName?: string | null,
  photoImgKey?: string | null,
  postalCode?: string | null,
  resumeKey?: string | null,
  state?: string | null,
  isPublic?: string | null,
};

export type UpdateUserProfileMutation = {
  updateUserProfile:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type RemoveUserInterviewsByIDMutationVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
  interviewQuestionType: string,
};

export type RemoveUserInterviewsByIDMutation = {
  removeUserInterviewsByID:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type RemoveUserResumeScanByIDMutationVariables = {
  emailAddress: string,
  resumeScanID: string,
};

export type RemoveUserResumeScanByIDMutation = {
  removeUserResumeScanByID:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type CreateUserResumeScanMutationVariables = {
  emailAddress: string,
  resumeUrl: string,
  displayName: string,
  jobName: string,
  resumeName: string,
  resumeResults: string,
};

export type CreateUserResumeScanMutation = {
  createUserResumeScan:  {
    __typename: "ResumeScan",
    displayName?: string | null,
    jobName?: string | null,
    resumeName?: string | null,
    resumeResults?: string | null,
    resumeUrl?: string | null,
    resumeScanID: string,
  },
};

export type UpdateUserResumeScanURLMutationVariables = {
  emailAddress: string,
  resumeID?: string | null,
  resumeUrl: string,
};

export type UpdateUserResumeScanURLMutation = {
  updateUserResumeScanURL:  {
    __typename: "ResumeScan",
    displayName?: string | null,
    jobName?: string | null,
    resumeName?: string | null,
    resumeResults?: string | null,
    resumeUrl?: string | null,
    resumeScanID: string,
  },
};

export type CreateUserEducationMutationVariables = {
  emailAddress: string,
  eduDegree: string,
  eduFieldStudy: string,
  eduSchool: string,
  eduStartDate: string,
  eduEndDate: string,
};

export type CreateUserEducationMutation = {
  createUserEducation:  {
    __typename: "Education",
    eduID?: string | null,
    eduDegree?: string | null,
    eduFieldStudy?: string | null,
    eduSchool?: string | null,
    eduStartDate?: string | null,
    eduEndDate?: string | null,
    eduIcon?: string | null,
    eduActivity?: string | null,
  },
};

export type UpdateUserEducationMutationVariables = {
  emailAddress: string,
  eduID: string,
  eduDegree: string,
  eduFieldStudy: string,
  eduSchool: string,
  eduStartDate: string,
  eduEndDate: string,
};

export type UpdateUserEducationMutation = {
  updateUserEducation:  {
    __typename: "Education",
    eduID?: string | null,
    eduDegree?: string | null,
    eduFieldStudy?: string | null,
    eduSchool?: string | null,
    eduStartDate?: string | null,
    eduEndDate?: string | null,
    eduIcon?: string | null,
    eduActivity?: string | null,
  },
};

export type RemoveUserEducationByIDMutationVariables = {
  emailAddress: string,
  eduID: string,
};

export type RemoveUserEducationByIDMutation = {
  removeUserEducationByID:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type CreateUserWorkHistoryMutationVariables = {
  emailAddress: string,
  workCompany: string,
  workPosition: string,
  workStartDate: string,
  workEndDate: string,
  workDescription: string,
};

export type CreateUserWorkHistoryMutation = {
  createUserWorkHistory:  {
    __typename: "WorkHistory",
    workHistoryID?: string | null,
    workHistoryJobTitle?: string | null,
    workHistoryEmployer?: string | null,
    workHistoryStartDate?: string | null,
    workHistoryEndDate?: string | null,
    workHistoryJobDescription?: string | null,
    workHistoryIcon?: string | null,
  },
};

export type UpdateUserWorkHistoryMutationVariables = {
  emailAddress: string,
  workHistoryID: string,
  workCompany: string,
  workPosition: string,
  workStartDate: string,
  workEndDate: string,
  workDescription: string,
};

export type UpdateUserWorkHistoryMutation = {
  updateUserWorkHistory:  {
    __typename: "WorkHistory",
    workHistoryID?: string | null,
    workHistoryJobTitle?: string | null,
    workHistoryEmployer?: string | null,
    workHistoryStartDate?: string | null,
    workHistoryEndDate?: string | null,
    workHistoryJobDescription?: string | null,
    workHistoryIcon?: string | null,
  },
};

export type RemoveUserWorkHistoryByIDMutationVariables = {
  emailAddress: string,
  workHistoryID: string,
};

export type RemoveUserWorkHistoryByIDMutation = {
  removeUserWorkHistoryByID:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type CreateUserSubscriptionRequestMutationVariables = {
  userEmail: string,
  planID: string,
};

export type CreateUserSubscriptionRequestMutation = {
  createUserSubscriptionRequest:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type ResumeUserSubscriptionRequestMutationVariables = {
  userEmail: string,
  subscriptionId: string,
};

export type ResumeUserSubscriptionRequestMutation = {
  resumeUserSubscriptionRequest:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type CancelUserSubscriptionRequestMutationVariables = {
  userEmail: string,
  subscriptionId: string,
};

export type CancelUserSubscriptionRequestMutation = {
  cancelUserSubscriptionRequest:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type VerifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsageMutationVariables = {
  userEmail: string,
};

export type VerifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsageMutation = {
  verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type HandleMixpanelEventMutationVariables = {
  userEmail: string,
  data: string,
  eventType: string,
};

export type HandleMixpanelEventMutation = {
  handleMixpanelEvent:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
    info?: string | null,
  },
};

export type GetUserProfileQueryVariables = {
  emailAddress: string,
};

export type GetUserProfileQuery = {
  getUserProfile:  {
    __typename: "Profile",
    fName?: string | null,
    lName?: string | null,
    photoImgKey?: string | null,
    coverImgKey?: string | null,
    resumeKey?: string | null,
    addressLine1?: string | null,
    addressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    postalCode?: string | null,
    country?: string | null,
    joiningDate?: string | null,
    contact?: string | null,
    isPublic?: boolean | null,
    userName?: string | null,
    userEmailAddress?: string | null,
    userRole?: string | null,
  },
};

export type GetUserProfileByUsernameQueryVariables = {
  userName: string,
};

export type GetUserProfileByUsernameQuery = {
  getUserProfileByUsername:  {
    __typename: "Profile",
    fName?: string | null,
    lName?: string | null,
    photoImgKey?: string | null,
    coverImgKey?: string | null,
    resumeKey?: string | null,
    addressLine1?: string | null,
    addressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    postalCode?: string | null,
    country?: string | null,
    joiningDate?: string | null,
    contact?: string | null,
    isPublic?: boolean | null,
    userName?: string | null,
    userEmailAddress?: string | null,
    userRole?: string | null,
  },
};

export type GetUserWorkHistoriesQueryVariables = {
  emailAddress: string,
};

export type GetUserWorkHistoriesQuery = {
  getUserWorkHistories:  {
    __typename: "WorkHistories",
    workHistory?:  Array< {
      __typename: "WorkHistory",
      workHistoryID?: string | null,
      workHistoryJobTitle?: string | null,
      workHistoryEmployer?: string | null,
      workHistoryStartDate?: string | null,
      workHistoryEndDate?: string | null,
      workHistoryJobDescription?: string | null,
      workHistoryIcon?: string | null,
    } | null > | null,
  },
};

export type GetUserEducationsQueryVariables = {
  emailAddress: string,
};

export type GetUserEducationsQuery = {
  getUserEducations:  {
    __typename: "Educations",
    educations?:  Array< {
      __typename: "Education",
      eduID?: string | null,
      eduDegree?: string | null,
      eduFieldStudy?: string | null,
      eduSchool?: string | null,
      eduStartDate?: string | null,
      eduEndDate?: string | null,
      eduIcon?: string | null,
      eduActivity?: string | null,
    } | null > | null,
  },
};

export type GetUserInterviewListQueryVariables = {
  emailAddress: string,
};

export type GetUserInterviewListQuery = {
  getUserInterviewList:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
  },
};

export type GetUserInterviewsPaginatedQueryVariables = {
  emailAddress: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetUserInterviewsPaginatedQuery = {
  getUserInterviewsPaginated:  {
    __typename: "PaginatedInterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};

export type GetUserInterviewsByMonthQueryVariables = {
  emailAddress: string,
};

export type GetUserInterviewsByMonthQuery = {
  getUserInterviewsByMonth:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
  },
};

export type GetUserInterviewMetaDataQueryVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
  interviewQuestionType: string,
};

export type GetUserInterviewMetaDataQuery = {
  getUserInterviewMetaData:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionTitle?: string | null,
    interviewQuestionType?: string | null,
    interviewFeedback?: string | null,
    interviewAnalysis?: string | null,
    interviewEstimatedSeconds?: number | null,
    interviewVideoLength?: string | null,
    interviewVideoPath?: string | null,
  },
};

export type SearchUserInterviewsQueryVariables = {
  emailAddress: string,
  keyword: string,
};

export type SearchUserInterviewsQuery = {
  searchUserInterviews:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
  },
};

export type SearchUserInterviewsPaginatedQueryVariables = {
  emailAddress: string,
  keyword: string,
};

export type SearchUserInterviewsPaginatedQuery = {
  searchUserInterviewsPaginated:  {
    __typename: "PaginatedInterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};

export type GetUserInterviewUsageMetaDataQueryVariables = {
  emailAddress: string,
};

export type GetUserInterviewUsageMetaDataQuery = {
  getUserInterviewUsageMetaData:  {
    __typename: "UserInterviewUsageMetaData",
    userInterviewNumTotalCount?: number | null,
    userInterviewNumUniqueCount?: number | null,
    userInterviewQuestionMap?: string | null,
  },
};

export type GetQuestionUsageMetaDataQuery = {
  getQuestionUsageMetaData:  {
    __typename: "QuestionUsageMetaData",
    totalNumOfQuestion?: number | null,
    questionTypes?: Array< string | null > | null,
    questionTags?:  Array< {
      __typename: "QuestionTag",
      tag?: string | null,
      BQ?: Array< number | null > | null,
      TECH?: Array< number | null > | null,
    } | null > | null,
    recommendations?: Array< string | null > | null,
  },
};

export type GetQuestionMetaDataQueryVariables = {
  questionID: string,
};

export type GetQuestionMetaDataQuery = {
  getQuestionMetaData:  {
    __typename: "Question",
    GSI1PK?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionSampleAns?: string | null,
    interviewQuestionType?: string | null,
    interviewQuestionTitle?: string | null,
    QuestionID?: string | null,
    difficulty?: string | null,
    estimatedSecond?: number | null,
  },
};

export type GetQuestionsPaginatedQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type GetQuestionsPaginatedQuery = {
  getQuestionsPaginated:  {
    __typename: "PaginatedQuestionList",
    questionList?:  Array< {
      __typename: "Question",
      GSI1PK?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionSampleAns?: string | null,
      interviewQuestionType?: string | null,
      interviewQuestionTitle?: string | null,
      QuestionID?: string | null,
      difficulty?: string | null,
      estimatedSecond?: number | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};

export type SearchQuestionsQueryVariables = {
  keyword: string,
};

export type SearchQuestionsQuery = {
  searchQuestions:  {
    __typename: "QuestionList",
    questionList?:  Array< {
      __typename: "Question",
      GSI1PK?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionSampleAns?: string | null,
      interviewQuestionType?: string | null,
      interviewQuestionTitle?: string | null,
      QuestionID?: string | null,
      difficulty?: string | null,
      estimatedSecond?: number | null,
    } | null > | null,
  },
};

export type SearchQuestionsPaginatedQueryVariables = {
  keyword: string,
  limit: number,
  nextToken?: string | null,
};

export type SearchQuestionsPaginatedQuery = {
  searchQuestionsPaginated:  {
    __typename: "PaginatedQuestionList",
    questionList?:  Array< {
      __typename: "Question",
      GSI1PK?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionSampleAns?: string | null,
      interviewQuestionType?: string | null,
      interviewQuestionTitle?: string | null,
      QuestionID?: string | null,
      difficulty?: string | null,
      estimatedSecond?: number | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};

export type GetUserInterviewsByQuestionIDQueryVariables = {
  emailAddress: string,
  questionID: string,
};

export type GetUserInterviewsByQuestionIDQuery = {
  getUserInterviewsByQuestionID:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionTitle?: string | null,
      interviewQuestionType?: string | null,
      interviewFeedback?: string | null,
      interviewAnalysis?: string | null,
      interviewEstimatedSeconds?: number | null,
      interviewVideoLength?: string | null,
      interviewVideoPath?: string | null,
    } | null > | null,
  },
};

export type GetUserResumeScansQueryVariables = {
  emailAddress: string,
};

export type GetUserResumeScansQuery = {
  getUserResumeScans:  {
    __typename: "ResumeScanList",
    resumeScanList?:  Array< {
      __typename: "ResumeScan",
      displayName?: string | null,
      jobName?: string | null,
      resumeName?: string | null,
      resumeResults?: string | null,
      resumeUrl?: string | null,
      resumeScanID: string,
    } | null > | null,
  },
};

export type GetUserEducationByIDQueryVariables = {
  emailAddress: string,
  eduID: string,
};

export type GetUserEducationByIDQuery = {
  getUserEducationByID:  {
    __typename: "Education",
    eduID?: string | null,
    eduDegree?: string | null,
    eduFieldStudy?: string | null,
    eduSchool?: string | null,
    eduStartDate?: string | null,
    eduEndDate?: string | null,
    eduIcon?: string | null,
    eduActivity?: string | null,
  },
};

export type GetUserWorkHistoryByIDQueryVariables = {
  emailAddress: string,
  workHistoryID: string,
};

export type GetUserWorkHistoryByIDQuery = {
  getUserWorkHistoryByID:  {
    __typename: "WorkHistory",
    workHistoryID?: string | null,
    workHistoryJobTitle?: string | null,
    workHistoryEmployer?: string | null,
    workHistoryStartDate?: string | null,
    workHistoryEndDate?: string | null,
    workHistoryJobDescription?: string | null,
    workHistoryIcon?: string | null,
  },
};

export type GetUserCurrentActiveSubscriptionAndProductsQueryVariables = {
  emailAddress: string,
};

export type GetUserCurrentActiveSubscriptionAndProductsQuery = {
  getUserCurrentActiveSubscriptionAndProducts:  {
    __typename: "UserSubscriptionProductsList",
    userSubscriptionProductsArray:  Array< {
      __typename: "UserSubscriptionProducts",
      userSubscription:  {
        __typename: "UserSubscription",
        cancelAtPeriodEnd?: boolean | null,
        currentPeriodEnd?: string | null,
        currentPeriodStart?: string | null,
        GSI1SK?: string | null,
        planPeriod?: string | null,
        planPeriodAmount?: string | null,
        planStatus?: string | null,
        planType?: string | null,
        stripeCustomerID?: string | null,
        subscriptionID: string,
      },
      userSubscriptionProduct:  Array< {
        __typename: "UserSubscriptionProduct",
        GSI1SK?: string | null,
        productDetail?: string | null,
        productID?: string | null,
        productName: string,
        productNumUsage: number,
        productTotalNumUsage: number,
        subscriptionID: string,
      } | null >,
    } | null >,
  },
};
