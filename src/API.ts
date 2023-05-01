/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type OperationResult = {
  __typename: "OperationResult",
  isSuccessful: boolean,
  error?: string | null,
};

export type User = {
  __typename: "User",
  userEmailAddress: string,
  userRole: string,
  userName: string,
  allowPublicInterview: boolean,
};

export type addUserProfileInput = {
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
};

export type WorkHistories = {
  __typename: "WorkHistories",
  workHistory?:  Array<WorkHistory | null > | null,
};

export type WorkHistory = {
  __typename: "WorkHistory",
  workHistoryJobTitle?: string | null,
  workHistoryEmployer?: string | null,
  workHistoryStartDate?: string | null,
  workHistoryEndDate?: string | null,
  workHistoryJobDescription?: string | null,
};

export type Educations = {
  __typename: "Educations",
  educations?:  Array<Education | null > | null,
};

export type Education = {
  __typename: "Education",
  eduDegree?: string | null,
  eduFieldStudy?: string | null,
  eduSchool?: string | null,
  eduStartDate?: string | null,
  eduEndDate?: string | null,
};

export type PaginatedInterviewList = {
  __typename: "PaginatedInterviewList",
  interviewList?:  Array<Interview | null > | null,
  nextToken?: string | null,
  totalRecords?: number | null,
};

export type InterviewList = {
  __typename: "InterviewList",
  interviewList?:  Array<Interview | null > | null,
};

export type UserInterviewUsageMetaData = {
  __typename: "UserInterviewUsageMetaData",
  userInterviewNumCount?: number | null,
  userInterviewQuestionSet?: Array< number | null > | null,
  userInterviewQuestionMap?: string | null,
};

export type QuestionUsageMetaData = {
  __typename: "QuestionUsageMetaData",
  totalNumOfQuestion?: number | null,
};

export type Question = {
  __typename: "Question",
  GSI1PK?: string | null,
  interviewQuestion?: string | null,
  interviewQuestionSampleAns?: string | null,
  interviewQuestionType?: string | null,
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

export type CreateNewGuestUserMutationVariables = {
  emailAddress: string,
  userName?: string | null,
};

export type CreateNewGuestUserMutation = {
  createNewGuestUser:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
  },
};

export type AddNewGuestUserMutationVariables = {
  emailAddress: string,
  userName: string,
};

export type AddNewGuestUserMutation = {
  addNewGuestUser?:  {
    __typename: "User",
    userEmailAddress: string,
    userRole: string,
    userName: string,
    allowPublicInterview: boolean,
  } | null,
};

export type AddProfileToUserMutationVariables = {
  emailAddress: string,
  input: addUserProfileInput,
};

export type AddProfileToUserMutation = {
  addProfileToUser?:  {
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
  } | null,
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
  },
};

export type CreateInterviewWithQuestionMutationVariables = {
  emailAddress: string,
  questionID: string,
};

export type CreateInterviewWithQuestionMutation = {
  createInterviewWithQuestion:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
    interviewQuestion?: string | null,
    interviewQuestionTitle?: string | null,
    interviewQuestionType?: string | null,
  },
};

export type UpdateInterviewVideoKeyMutationVariables = {
  emailAddress: string,
  interviewID: string,
  questionID: string,
  interviewVideoKey: string,
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
  },
};

export type RemoveUserInterviewsByIDMutationVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
};

export type RemoveUserInterviewsByIDMutation = {
  removeUserInterviewsByID:  {
    __typename: "OperationResult",
    isSuccessful: boolean,
    error?: string | null,
  },
};

export type GetUserQueryVariables = {
  emailAddress: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    userEmailAddress: string,
    userRole: string,
    userName: string,
    allowPublicInterview: boolean,
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
      workHistoryJobTitle?: string | null,
      workHistoryEmployer?: string | null,
      workHistoryStartDate?: string | null,
      workHistoryEndDate?: string | null,
      workHistoryJobDescription?: string | null,
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
      eduDegree?: string | null,
      eduFieldStudy?: string | null,
      eduSchool?: string | null,
      eduStartDate?: string | null,
      eduEndDate?: string | null,
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
    } | null > | null,
  },
};

export type GetUserInterviewMetaDataQueryVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
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
    userInterviewNumCount?: number | null,
    userInterviewQuestionSet?: Array< number | null > | null,
    userInterviewQuestionMap?: string | null,
  },
};

export type GetQuestionUsageMetaDataQuery = {
  getQuestionUsageMetaData:  {
    __typename: "QuestionUsageMetaData",
    totalNumOfQuestion?: number | null,
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
    } | null > | null,
  },
};
