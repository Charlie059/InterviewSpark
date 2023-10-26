/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const startInterviewVideoAnalysis = /* GraphQL */ `mutation StartInterviewVideoAnalysis(
  $emailAddress: AWSEmail!
  $interviewID: String!
  $interviewQuestionID: String!
  $interviewQuestionType: String!
) {
  startInterviewVideoAnalysis(
    emailAddress: $emailAddress
    interviewID: $interviewID
    interviewQuestionID: $interviewQuestionID
    interviewQuestionType: $interviewQuestionType
  )
}
` as GeneratedMutation<
  APITypes.StartInterviewVideoAnalysisMutationVariables,
  APITypes.StartInterviewVideoAnalysisMutation
>;
export const createNewGuestUser = /* GraphQL */ `mutation CreateNewGuestUser(
  $emailAddress: AWSEmail!
  $userName: String!
  $fName: String!
  $lName: String!
) {
  createNewGuestUser(
    emailAddress: $emailAddress
    userName: $userName
    fName: $fName
    lName: $lName
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNewGuestUserMutationVariables,
  APITypes.CreateNewGuestUserMutation
>;
export const createUserInterviewQuestionList = /* GraphQL */ `mutation CreateUserInterviewQuestionList(
  $emailAddress: AWSEmail!
  $questionTag: String!
  $numOfBQ: Int!
  $numOfTech: Int!
  $isDisableInterviewAnalysis: Boolean
) {
  createUserInterviewQuestionList(
    emailAddress: $emailAddress
    questionTag: $questionTag
    numOfBQ: $numOfBQ
    numOfTech: $numOfTech
    isDisableInterviewAnalysis: $isDisableInterviewAnalysis
  ) {
    interviewList {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
      interviewQuestion
      interviewQuestionTitle
      interviewQuestionType
      interviewFeedback
      interviewAnalysis
      interviewEstimatedSeconds
      interviewVideoLength
      interviewVideoPath
      isDisableInterviewAnalysis
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserInterviewQuestionListMutationVariables,
  APITypes.CreateUserInterviewQuestionListMutation
>;
export const createUserInterviewWithQuestion = /* GraphQL */ `mutation CreateUserInterviewWithQuestion(
  $emailAddress: AWSEmail!
  $questionID: String!
) {
  createUserInterviewWithQuestion(
    emailAddress: $emailAddress
    questionID: $questionID
  ) {
    interviewID
    interviewDateTime
    interviewQuestionID
    interviewVideoKey
    interviewQuestion
    interviewQuestionTitle
    interviewQuestionType
    interviewFeedback
    interviewAnalysis
    interviewEstimatedSeconds
    interviewVideoLength
    interviewVideoPath
    isDisableInterviewAnalysis
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserInterviewWithQuestionMutationVariables,
  APITypes.CreateUserInterviewWithQuestionMutation
>;
export const updateUserInterview = /* GraphQL */ `mutation UpdateUserInterview(
  $emailAddress: AWSEmail!
  $interviewID: String!
  $interviewQuestionID: String!
  $interviewQuestionType: String!
  $interviewFeedback: String
  $interviewAnalysis: String
  $interviewVideoKey: String
  $interviewVideoPath: String
  $interviewVideoLength: String
) {
  updateUserInterview(
    emailAddress: $emailAddress
    interviewID: $interviewID
    interviewQuestionID: $interviewQuestionID
    interviewQuestionType: $interviewQuestionType
    interviewFeedback: $interviewFeedback
    interviewAnalysis: $interviewAnalysis
    interviewVideoKey: $interviewVideoKey
    interviewVideoPath: $interviewVideoPath
    interviewVideoLength: $interviewVideoLength
  ) {
    interviewID
    interviewDateTime
    interviewQuestionID
    interviewVideoKey
    interviewQuestion
    interviewQuestionTitle
    interviewQuestionType
    interviewFeedback
    interviewAnalysis
    interviewEstimatedSeconds
    interviewVideoLength
    interviewVideoPath
    isDisableInterviewAnalysis
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserInterviewMutationVariables,
  APITypes.UpdateUserInterviewMutation
>;
export const updateInterviewVideoKey = /* GraphQL */ `mutation UpdateInterviewVideoKey(
  $emailAddress: AWSEmail!
  $interviewID: String!
  $questionID: String!
  $interviewVideoKey: String!
  $interviewFeedback: String!
) {
  updateInterviewVideoKey(
    emailAddress: $emailAddress
    interviewID: $interviewID
    questionID: $questionID
    interviewVideoKey: $interviewVideoKey
    interviewFeedback: $interviewFeedback
  ) {
    interviewID
    interviewDateTime
    interviewQuestionID
    interviewVideoKey
    interviewQuestion
    interviewQuestionTitle
    interviewQuestionType
    interviewFeedback
    interviewAnalysis
    interviewEstimatedSeconds
    interviewVideoLength
    interviewVideoPath
    isDisableInterviewAnalysis
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInterviewVideoKeyMutationVariables,
  APITypes.UpdateInterviewVideoKeyMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $emailAddress: AWSEmail!
  $addressLine1: String
  $addressLine2: String
  $city: String
  $contact: String
  $country: String
  $coverImgKey: String
  $fName: String
  $lName: String
  $photoImgKey: String
  $postalCode: String
  $resumeKey: String
  $state: String
  $isPublic: String
  $userIndustry: String
  $userDreamJob: String
) {
  updateUserProfile(
    emailAddress: $emailAddress
    addressLine1: $addressLine1
    addressLine2: $addressLine2
    city: $city
    contact: $contact
    country: $country
    coverImgKey: $coverImgKey
    fName: $fName
    lName: $lName
    photoImgKey: $photoImgKey
    postalCode: $postalCode
    resumeKey: $resumeKey
    state: $state
    isPublic: $isPublic
    userIndustry: $userIndustry
    userDreamJob: $userDreamJob
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
export const removeUserInterviewsByID = /* GraphQL */ `mutation RemoveUserInterviewsByID(
  $emailAddress: AWSEmail!
  $interviewID: String!
  $interviewQuestionID: String!
  $interviewQuestionType: String!
) {
  removeUserInterviewsByID(
    emailAddress: $emailAddress
    interviewID: $interviewID
    interviewQuestionID: $interviewQuestionID
    interviewQuestionType: $interviewQuestionType
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveUserInterviewsByIDMutationVariables,
  APITypes.RemoveUserInterviewsByIDMutation
>;
export const removeUserResumeScanByID = /* GraphQL */ `mutation RemoveUserResumeScanByID(
  $emailAddress: AWSEmail!
  $resumeScanID: String!
) {
  removeUserResumeScanByID(
    emailAddress: $emailAddress
    resumeScanID: $resumeScanID
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveUserResumeScanByIDMutationVariables,
  APITypes.RemoveUserResumeScanByIDMutation
>;
export const createUserResumeScan = /* GraphQL */ `mutation CreateUserResumeScan(
  $emailAddress: AWSEmail!
  $resumeUrl: String!
  $displayName: String!
  $jobName: String!
  $resumeName: String!
  $resumeResults: String!
) {
  createUserResumeScan(
    emailAddress: $emailAddress
    resumeUrl: $resumeUrl
    displayName: $displayName
    jobName: $jobName
    resumeName: $resumeName
    resumeResults: $resumeResults
  ) {
    displayName
    jobName
    resumeName
    resumeResults
    resumeUrl
    resumeScanID
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserResumeScanMutationVariables,
  APITypes.CreateUserResumeScanMutation
>;
export const updateUserResumeScanURL = /* GraphQL */ `mutation UpdateUserResumeScanURL(
  $emailAddress: AWSEmail!
  $resumeID: String
  $resumeUrl: String!
) {
  updateUserResumeScanURL(
    emailAddress: $emailAddress
    resumeID: $resumeID
    resumeUrl: $resumeUrl
  ) {
    displayName
    jobName
    resumeName
    resumeResults
    resumeUrl
    resumeScanID
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserResumeScanURLMutationVariables,
  APITypes.UpdateUserResumeScanURLMutation
>;
export const createUserEducation = /* GraphQL */ `mutation CreateUserEducation(
  $emailAddress: AWSEmail!
  $eduDegree: String!
  $eduFieldStudy: String!
  $eduSchool: String!
  $eduStartDate: AWSDate!
  $eduEndDate: AWSDate!
) {
  createUserEducation(
    emailAddress: $emailAddress
    eduDegree: $eduDegree
    eduFieldStudy: $eduFieldStudy
    eduSchool: $eduSchool
    eduStartDate: $eduStartDate
    eduEndDate: $eduEndDate
  ) {
    eduID
    eduDegree
    eduFieldStudy
    eduSchool
    eduStartDate
    eduEndDate
    eduIcon
    eduActivity
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserEducationMutationVariables,
  APITypes.CreateUserEducationMutation
>;
export const updateUserEducation = /* GraphQL */ `mutation UpdateUserEducation(
  $emailAddress: AWSEmail!
  $eduID: String!
  $eduDegree: String!
  $eduFieldStudy: String!
  $eduSchool: String!
  $eduStartDate: AWSDate!
  $eduEndDate: AWSDate!
) {
  updateUserEducation(
    emailAddress: $emailAddress
    eduID: $eduID
    eduDegree: $eduDegree
    eduFieldStudy: $eduFieldStudy
    eduSchool: $eduSchool
    eduStartDate: $eduStartDate
    eduEndDate: $eduEndDate
  ) {
    eduID
    eduDegree
    eduFieldStudy
    eduSchool
    eduStartDate
    eduEndDate
    eduIcon
    eduActivity
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserEducationMutationVariables,
  APITypes.UpdateUserEducationMutation
>;
export const removeUserEducationByID = /* GraphQL */ `mutation RemoveUserEducationByID($emailAddress: AWSEmail!, $eduID: String!) {
  removeUserEducationByID(emailAddress: $emailAddress, eduID: $eduID) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveUserEducationByIDMutationVariables,
  APITypes.RemoveUserEducationByIDMutation
>;
export const createUserWorkHistory = /* GraphQL */ `mutation CreateUserWorkHistory(
  $emailAddress: AWSEmail!
  $workCompany: String!
  $workPosition: String!
  $workStartDate: AWSDate!
  $workEndDate: AWSDate!
  $workDescription: String!
) {
  createUserWorkHistory(
    emailAddress: $emailAddress
    workCompany: $workCompany
    workPosition: $workPosition
    workStartDate: $workStartDate
    workEndDate: $workEndDate
    workDescription: $workDescription
  ) {
    workHistoryID
    workHistoryJobTitle
    workHistoryEmployer
    workHistoryStartDate
    workHistoryEndDate
    workHistoryJobDescription
    workHistoryIcon
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserWorkHistoryMutationVariables,
  APITypes.CreateUserWorkHistoryMutation
>;
export const updateUserWorkHistory = /* GraphQL */ `mutation UpdateUserWorkHistory(
  $emailAddress: AWSEmail!
  $workHistoryID: String!
  $workCompany: String!
  $workPosition: String!
  $workStartDate: AWSDate!
  $workEndDate: AWSDate!
  $workDescription: String!
) {
  updateUserWorkHistory(
    emailAddress: $emailAddress
    workHistoryID: $workHistoryID
    workCompany: $workCompany
    workPosition: $workPosition
    workStartDate: $workStartDate
    workEndDate: $workEndDate
    workDescription: $workDescription
  ) {
    workHistoryID
    workHistoryJobTitle
    workHistoryEmployer
    workHistoryStartDate
    workHistoryEndDate
    workHistoryJobDescription
    workHistoryIcon
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserWorkHistoryMutationVariables,
  APITypes.UpdateUserWorkHistoryMutation
>;
export const removeUserWorkHistoryByID = /* GraphQL */ `mutation RemoveUserWorkHistoryByID(
  $emailAddress: AWSEmail!
  $workHistoryID: String!
) {
  removeUserWorkHistoryByID(
    emailAddress: $emailAddress
    workHistoryID: $workHistoryID
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.RemoveUserWorkHistoryByIDMutationVariables,
  APITypes.RemoveUserWorkHistoryByIDMutation
>;
export const createUserSubscriptionRequest = /* GraphQL */ `mutation CreateUserSubscriptionRequest(
  $userEmail: AWSEmail!
  $planID: String!
) {
  createUserSubscriptionRequest(userEmail: $userEmail, planID: $planID) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserSubscriptionRequestMutationVariables,
  APITypes.CreateUserSubscriptionRequestMutation
>;
export const resumeUserSubscriptionRequest = /* GraphQL */ `mutation ResumeUserSubscriptionRequest(
  $userEmail: AWSEmail!
  $subscriptionId: String!
) {
  resumeUserSubscriptionRequest(
    userEmail: $userEmail
    subscriptionId: $subscriptionId
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ResumeUserSubscriptionRequestMutationVariables,
  APITypes.ResumeUserSubscriptionRequestMutation
>;
export const cancelUserSubscriptionRequest = /* GraphQL */ `mutation CancelUserSubscriptionRequest(
  $userEmail: AWSEmail!
  $subscriptionId: String!
) {
  cancelUserSubscriptionRequest(
    userEmail: $userEmail
    subscriptionId: $subscriptionId
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CancelUserSubscriptionRequestMutationVariables,
  APITypes.CancelUserSubscriptionRequestMutation
>;
export const verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage = /* GraphQL */ `mutation VerifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage(
  $userEmail: AWSEmail!
) {
  verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage(
    userEmail: $userEmail
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.VerifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsageMutationVariables,
  APITypes.VerifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsageMutation
>;
export const handleMixpanelEvent = /* GraphQL */ `mutation HandleMixpanelEvent(
  $userEmail: AWSEmail!
  $data: AWSJSON!
  $eventType: String!
) {
  handleMixpanelEvent(
    userEmail: $userEmail
    data: $data
    eventType: $eventType
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.HandleMixpanelEventMutationVariables,
  APITypes.HandleMixpanelEventMutation
>;
export const handleEvent = /* GraphQL */ `mutation HandleEvent(
  $operation: String!
  $name: String!
  $arguments: AWSJSON!
  $user: AWSEmail!
) {
  handleEvent(
    operation: $operation
    name: $name
    arguments: $arguments
    user: $user
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.HandleEventMutationVariables,
  APITypes.HandleEventMutation
>;
export const updateUserSubscriptionCancelReason = /* GraphQL */ `mutation UpdateUserSubscriptionCancelReason(
  $userEmail: AWSEmail!
  $subscriptionId: String!
  $cancelReason: AWSJSON!
) {
  updateUserSubscriptionCancelReason(
    userEmail: $userEmail
    subscriptionId: $subscriptionId
    cancelReason: $cancelReason
  ) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserSubscriptionCancelReasonMutationVariables,
  APITypes.UpdateUserSubscriptionCancelReasonMutation
>;
export const updateNewUserStatus = /* GraphQL */ `mutation UpdateNewUserStatus($userEmail: AWSEmail!, $isNewUser: Boolean!) {
  updateNewUserStatus(userEmail: $userEmail, isNewUser: $isNewUser) {
    isSuccessful
    error
    info
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNewUserStatusMutationVariables,
  APITypes.UpdateNewUserStatusMutation
>;
