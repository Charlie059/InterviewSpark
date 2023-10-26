/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUserProfile = /* GraphQL */ `query GetUserProfile($emailAddress: AWSEmail!) {
  getUserProfile(emailAddress: $emailAddress) {
    fName
    lName
    photoImgKey
    coverImgKey
    resumeKey
    addressLine1
    addressLine2
    city
    state
    postalCode
    country
    joiningDate
    contact
    isPublic
    userName
    userEmailAddress
    userRole
    isNewUser
    userDreamJob
    userIndustry
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const getUserProfileByUsername = /* GraphQL */ `query GetUserProfileByUsername($userName: String!) {
  getUserProfileByUsername(userName: $userName) {
    fName
    lName
    photoImgKey
    coverImgKey
    resumeKey
    addressLine1
    addressLine2
    city
    state
    postalCode
    country
    joiningDate
    contact
    isPublic
    userName
    userEmailAddress
    userRole
    isNewUser
    userDreamJob
    userIndustry
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileByUsernameQueryVariables,
  APITypes.GetUserProfileByUsernameQuery
>;
export const getUserWorkHistories = /* GraphQL */ `query GetUserWorkHistories($emailAddress: AWSEmail!) {
  getUserWorkHistories(emailAddress: $emailAddress) {
    workHistory {
      workHistoryID
      workHistoryJobTitle
      workHistoryEmployer
      workHistoryStartDate
      workHistoryEndDate
      workHistoryJobDescription
      workHistoryIcon
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserWorkHistoriesQueryVariables,
  APITypes.GetUserWorkHistoriesQuery
>;
export const getUserEducations = /* GraphQL */ `query GetUserEducations($emailAddress: AWSEmail!) {
  getUserEducations(emailAddress: $emailAddress) {
    educations {
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
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserEducationsQueryVariables,
  APITypes.GetUserEducationsQuery
>;
export const getUserInterviewList = /* GraphQL */ `query GetUserInterviewList($emailAddress: AWSEmail!) {
  getUserInterviewList(emailAddress: $emailAddress) {
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
` as GeneratedQuery<
  APITypes.GetUserInterviewListQueryVariables,
  APITypes.GetUserInterviewListQuery
>;
export const getUserInterviewsPaginated = /* GraphQL */ `query GetUserInterviewsPaginated(
  $emailAddress: AWSEmail!
  $limit: Int
  $nextToken: String
) {
  getUserInterviewsPaginated(
    emailAddress: $emailAddress
    limit: $limit
    nextToken: $nextToken
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
    nextToken
    totalRecords
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserInterviewsPaginatedQueryVariables,
  APITypes.GetUserInterviewsPaginatedQuery
>;
export const getUserInterviewsByMonth = /* GraphQL */ `query GetUserInterviewsByMonth($emailAddress: AWSEmail!) {
  getUserInterviewsByMonth(emailAddress: $emailAddress) {
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
` as GeneratedQuery<
  APITypes.GetUserInterviewsByMonthQueryVariables,
  APITypes.GetUserInterviewsByMonthQuery
>;
export const getUserInterviewMetaData = /* GraphQL */ `query GetUserInterviewMetaData(
  $emailAddress: AWSEmail!
  $interviewID: String!
  $interviewQuestionID: String!
  $interviewQuestionType: String!
) {
  getUserInterviewMetaData(
    emailAddress: $emailAddress
    interviewID: $interviewID
    interviewQuestionID: $interviewQuestionID
    interviewQuestionType: $interviewQuestionType
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
` as GeneratedQuery<
  APITypes.GetUserInterviewMetaDataQueryVariables,
  APITypes.GetUserInterviewMetaDataQuery
>;
export const searchUserInterviews = /* GraphQL */ `query SearchUserInterviews($emailAddress: AWSEmail!, $keyword: String!) {
  searchUserInterviews(emailAddress: $emailAddress, keyword: $keyword) {
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
` as GeneratedQuery<
  APITypes.SearchUserInterviewsQueryVariables,
  APITypes.SearchUserInterviewsQuery
>;
export const searchUserInterviewsPaginated = /* GraphQL */ `query SearchUserInterviewsPaginated(
  $emailAddress: AWSEmail!
  $keyword: String!
) {
  searchUserInterviewsPaginated(
    emailAddress: $emailAddress
    keyword: $keyword
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
    nextToken
    totalRecords
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchUserInterviewsPaginatedQueryVariables,
  APITypes.SearchUserInterviewsPaginatedQuery
>;
export const getUserInterviewUsageMetaData = /* GraphQL */ `query GetUserInterviewUsageMetaData($emailAddress: AWSEmail!) {
  getUserInterviewUsageMetaData(emailAddress: $emailAddress) {
    userInterviewNumTotalCount
    userInterviewNumUniqueCount
    userInterviewQuestionMap
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserInterviewUsageMetaDataQueryVariables,
  APITypes.GetUserInterviewUsageMetaDataQuery
>;
export const getQuestionUsageMetaData = /* GraphQL */ `query GetQuestionUsageMetaData {
  getQuestionUsageMetaData {
    totalNumOfQuestion
    questionTypes
    questionTags {
      tag
      BQ
      TECH
      __typename
    }
    recommendations
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionUsageMetaDataQueryVariables,
  APITypes.GetQuestionUsageMetaDataQuery
>;
export const getQuestionMetaData = /* GraphQL */ `query GetQuestionMetaData($questionID: String!) {
  getQuestionMetaData(questionID: $questionID) {
    GSI1PK
    interviewQuestion
    interviewQuestionSampleAns
    interviewQuestionType
    interviewQuestionTitle
    QuestionID
    difficulty
    estimatedSecond
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionMetaDataQueryVariables,
  APITypes.GetQuestionMetaDataQuery
>;
export const getQuestionsPaginated = /* GraphQL */ `query GetQuestionsPaginated($limit: Int, $nextToken: String) {
  getQuestionsPaginated(limit: $limit, nextToken: $nextToken) {
    questionList {
      GSI1PK
      interviewQuestion
      interviewQuestionSampleAns
      interviewQuestionType
      interviewQuestionTitle
      QuestionID
      difficulty
      estimatedSecond
      __typename
    }
    nextToken
    totalRecords
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetQuestionsPaginatedQueryVariables,
  APITypes.GetQuestionsPaginatedQuery
>;
export const searchQuestions = /* GraphQL */ `query SearchQuestions($keyword: String!) {
  searchQuestions(keyword: $keyword) {
    questionList {
      GSI1PK
      interviewQuestion
      interviewQuestionSampleAns
      interviewQuestionType
      interviewQuestionTitle
      QuestionID
      difficulty
      estimatedSecond
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchQuestionsQueryVariables,
  APITypes.SearchQuestionsQuery
>;
export const searchQuestionsPaginated = /* GraphQL */ `query SearchQuestionsPaginated(
  $keyword: String!
  $limit: Int!
  $nextToken: String
) {
  searchQuestionsPaginated(
    keyword: $keyword
    limit: $limit
    nextToken: $nextToken
  ) {
    questionList {
      GSI1PK
      interviewQuestion
      interviewQuestionSampleAns
      interviewQuestionType
      interviewQuestionTitle
      QuestionID
      difficulty
      estimatedSecond
      __typename
    }
    nextToken
    totalRecords
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchQuestionsPaginatedQueryVariables,
  APITypes.SearchQuestionsPaginatedQuery
>;
export const getUserInterviewsByQuestionID = /* GraphQL */ `query GetUserInterviewsByQuestionID(
  $emailAddress: AWSEmail!
  $questionID: String!
) {
  getUserInterviewsByQuestionID(
    emailAddress: $emailAddress
    questionID: $questionID
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
` as GeneratedQuery<
  APITypes.GetUserInterviewsByQuestionIDQueryVariables,
  APITypes.GetUserInterviewsByQuestionIDQuery
>;
export const getUserResumeScans = /* GraphQL */ `query GetUserResumeScans($emailAddress: AWSEmail!) {
  getUserResumeScans(emailAddress: $emailAddress) {
    resumeScanList {
      displayName
      jobName
      resumeName
      resumeResults
      resumeUrl
      resumeScanID
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserResumeScansQueryVariables,
  APITypes.GetUserResumeScansQuery
>;
export const getUserEducationByID = /* GraphQL */ `query GetUserEducationByID($emailAddress: AWSEmail!, $eduID: String!) {
  getUserEducationByID(emailAddress: $emailAddress, eduID: $eduID) {
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
` as GeneratedQuery<
  APITypes.GetUserEducationByIDQueryVariables,
  APITypes.GetUserEducationByIDQuery
>;
export const getUserWorkHistoryByID = /* GraphQL */ `query GetUserWorkHistoryByID(
  $emailAddress: AWSEmail!
  $workHistoryID: String!
) {
  getUserWorkHistoryByID(
    emailAddress: $emailAddress
    workHistoryID: $workHistoryID
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
` as GeneratedQuery<
  APITypes.GetUserWorkHistoryByIDQueryVariables,
  APITypes.GetUserWorkHistoryByIDQuery
>;
export const getUserCurrentActiveSubscriptionAndProducts = /* GraphQL */ `query GetUserCurrentActiveSubscriptionAndProducts($emailAddress: AWSEmail!) {
  getUserCurrentActiveSubscriptionAndProducts(emailAddress: $emailAddress) {
    userSubscriptionProductsArray {
      userSubscription {
        cancelAtPeriodEnd
        currentPeriodEnd
        currentPeriodStart
        GSI1SK
        planPeriod
        planPeriodAmount
        planStatus
        planType
        stripeCustomerID
        subscriptionID
        __typename
      }
      userSubscriptionProduct {
        GSI1SK
        productDetail
        productID
        productName
        productNumUsage
        productTotalNumUsage
        subscriptionID
        __typename
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserCurrentActiveSubscriptionAndProductsQueryVariables,
  APITypes.GetUserCurrentActiveSubscriptionAndProductsQuery
>;
