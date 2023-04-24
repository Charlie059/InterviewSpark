/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GuestUser = {
  __typename: "GuestUser",
  allowPublicInterview?: boolean | null,
  fName?: string | null,
  lName?: string | null,
  uniqueHandle?: string | null,
  userEmailAddress?: string | null,
  userRole?: string | null,
};

export type GuestProfile = {
  __typename: "GuestProfile",
  profilePhotoImgKey?: string | null,
  profileCoverImgKey?: string | null,
  profileResumeKey?: string | null,
  profileVideoKey?: string | null,
  profileLanguage?: string | null,
  profileIsPublic?: boolean | null,
  profileAddressLine1?: string | null,
  profileAddressLine2?: string | null,
  profileCity?: string | null,
  profileState?: string | null,
  profilePostalCode?: string | null,
  profileCountry?: string | null,
  profileJoiningDate?: string | null,
  profileContact?: string | null,
};

export type User = {
  __typename: "User",
  userEmailAddress: string,
  userRole: string,
  userName: string,
  hasProfile: boolean,
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

export type QuestionCount = {
  __typename: "QuestionCount",
  questionCount?: number | null,
};

export type Question = {
  __typename: "Question",
  GSI1PK?: string | null,
  interviewQuestion?: string | null,
  interviewQuestionSampleAns?: string | null,
  interviewQuestionType?: string | null,
  QuestionID?: string | null,
};

export type PaginatedQuestionList = {
  __typename: "PaginatedQuestionList",
  questionList?:  Array<Question | null > | null,
  nextToken?: string | null,
  totalRecords?: number | null,
};

export type CreateGuestUserMutationVariables = {
  emailAddress: string,
  uniqueHandle: string,
  fName: string,
  lName: string,
};

export type CreateGuestUserMutation = {
  createGuestUser:  {
    __typename: "GuestUser",
    allowPublicInterview?: boolean | null,
    fName?: string | null,
    lName?: string | null,
    uniqueHandle?: string | null,
    userEmailAddress?: string | null,
    userRole?: string | null,
  },
};

export type CreateGuestProfileMutationVariables = {
  emailAddress: string,
};

export type CreateGuestProfileMutation = {
  createGuestProfile:  {
    __typename: "GuestProfile",
    profilePhotoImgKey?: string | null,
    profileCoverImgKey?: string | null,
    profileResumeKey?: string | null,
    profileVideoKey?: string | null,
    profileLanguage?: string | null,
    profileIsPublic?: boolean | null,
    profileAddressLine1?: string | null,
    profileAddressLine2?: string | null,
    profileCity?: string | null,
    profileState?: string | null,
    profilePostalCode?: string | null,
    profileCountry?: string | null,
    profileJoiningDate?: string | null,
    profileContact?: string | null,
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
    hasProfile: boolean,
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
    hasProfile: boolean,
    allowPublicInterview: boolean,
  },
};

export type GetProfileQueryVariables = {
  emailAddress: string,
};

export type GetProfileQuery = {
  getProfile:  {
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

export type GetWorkHistoriesQueryVariables = {
  emailAddress: string,
};

export type GetWorkHistoriesQuery = {
  getWorkHistories:  {
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

export type GetEducationsQueryVariables = {
  emailAddress: string,
};

export type GetEducationsQuery = {
  getEducations:  {
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

export type GetInterviewListQueryVariables = {
  emailAddress: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetInterviewListQuery = {
  getInterviewList:  {
    __typename: "PaginatedInterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};

export type GetInterviewListByIDQueryVariables = {
  emailAddress: string,
  interviewID: string,
};

export type GetInterviewListByIDQuery = {
  getInterviewListByID:  {
    __typename: "InterviewList",
    interviewList?:  Array< {
      __typename: "Interview",
      interviewID?: string | null,
      interviewDateTime?: string | null,
      interviewQuestionID?: string | null,
      interviewVideoKey?: string | null,
    } | null > | null,
  },
};

export type GetInterviewMetaDataQueryVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
};

export type GetInterviewMetaDataQuery = {
  getInterviewMetaData:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
  },
};

export type GetNumOfQuestionQuery = {
  getNumOfQuestion:  {
    __typename: "QuestionCount",
    questionCount?: number | null,
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
  },
};

export type GetQuestionListQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type GetQuestionListQuery = {
  getQuestionList:  {
    __typename: "PaginatedQuestionList",
    questionList?:  Array< {
      __typename: "Question",
      GSI1PK?: string | null,
      interviewQuestion?: string | null,
      interviewQuestionSampleAns?: string | null,
      interviewQuestionType?: string | null,
      QuestionID?: string | null,
    } | null > | null,
    nextToken?: string | null,
    totalRecords?: number | null,
  },
};
