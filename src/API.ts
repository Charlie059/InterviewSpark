/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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

export type InterviewList = {
  __typename: "InterviewList",
  interviewList?:  Array<Interview | null > | null,
};

export type Test_deactiveSubscriptionMutationVariables = {
  id: string,
};

export type Test_deactiveSubscriptionMutation = {
  // This function is made for testing, it will create a new subscription to user and set to active and then set a lambda function to call Task Timer after 2 mins to set subscription inactive
  test_deactiveSubscription?: string | null,
};

export type AddNewGuestUserMutationVariables = {
  emailAddress: string,
  userName: string,
};

export type AddNewGuestUserMutation = {
  // This function will add an initial guest user if the user does not exist
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
  // This function adds a Profile to an already existing user with no profile
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
  // This function will one question to the new Interview
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
  // This function help update interview's interviewVideoKey with questionID
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
  // This function retrieves user information based on the provided email address. It returns a User object containing details about the user. If user not exist, it will return an error
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
  // This query function will get user profile if user exist and profile exist
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
  // This query function will get user working histories if user exist and any working histories exist
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
  // This query function will get user education histories if user exist and any education histories exist
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
};

export type GetInterviewListQuery = {
  // This query will get interview list with if user exist
  getInterviewList:  {
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

export type GetInterviewByIDQueryVariables = {
  emailAddress: string,
  interviewID: string,
};

export type GetInterviewByIDQuery = {
  // This query will get all interview and questions with interviewID
  getInterviewByID:  {
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

export type GetInterviewDataQueryVariables = {
  emailAddress: string,
  interviewID: string,
  interviewQuestionID: string,
};

export type GetInterviewDataQuery = {
  // This query will get one Interview#Question
  getInterviewData?:  {
    __typename: "Interview",
    interviewID?: string | null,
    interviewDateTime?: string | null,
    interviewQuestionID?: string | null,
    interviewVideoKey?: string | null,
  } | null,
};
