/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($emailAddress: AWSEmail!) {
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
    }
  }
`;
export const getUserProfileByUsername = /* GraphQL */ `
  query GetUserProfileByUsername($userName: String!) {
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
    }
  }
`;
export const getUserWorkHistories = /* GraphQL */ `
  query GetUserWorkHistories($emailAddress: AWSEmail!) {
    getUserWorkHistories(emailAddress: $emailAddress) {
      workHistory {
        workHistoryID
        workHistoryJobTitle
        workHistoryEmployer
        workHistoryStartDate
        workHistoryEndDate
        workHistoryJobDescription
        workHistoryIcon
      }
    }
  }
`;
export const getUserEducations = /* GraphQL */ `
  query GetUserEducations($emailAddress: AWSEmail!) {
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
      }
    }
  }
`;
export const getUserInterviewsPaginated = /* GraphQL */ `
  query GetUserInterviewsPaginated(
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
        interviewPerformance
      }
      nextToken
      totalRecords
    }
  }
`;
export const getUserInterviewsByMonth = /* GraphQL */ `
  query GetUserInterviewsByMonth($emailAddress: AWSEmail!) {
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
        interviewPerformance
      }
    }
  }
`;
export const getUserInterviewMetaData = /* GraphQL */ `
  query GetUserInterviewMetaData(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $interviewQuestionID: String!
  ) {
    getUserInterviewMetaData(
      emailAddress: $emailAddress
      interviewID: $interviewID
      interviewQuestionID: $interviewQuestionID
    ) {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
      interviewQuestion
      interviewQuestionTitle
      interviewQuestionType
      interviewFeedback
      interviewPerformance
    }
  }
`;
export const searchUserInterviews = /* GraphQL */ `
  query SearchUserInterviews($emailAddress: AWSEmail!, $keyword: String!) {
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
        interviewPerformance
      }
    }
  }
`;
export const searchUserInterviewsPaginated = /* GraphQL */ `
  query SearchUserInterviewsPaginated(
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
        interviewPerformance
      }
      nextToken
      totalRecords
    }
  }
`;
export const getUserInterviewUsageMetaData = /* GraphQL */ `
  query GetUserInterviewUsageMetaData($emailAddress: AWSEmail!) {
    getUserInterviewUsageMetaData(emailAddress: $emailAddress) {
      userInterviewNumCount
      userInterviewQuestionSet
      userInterviewQuestionMap
    }
  }
`;
export const getQuestionUsageMetaData = /* GraphQL */ `
  query GetQuestionUsageMetaData {
    getQuestionUsageMetaData {
      totalNumOfQuestion
    }
  }
`;
export const getQuestionMetaData = /* GraphQL */ `
  query GetQuestionMetaData($questionID: String!) {
    getQuestionMetaData(questionID: $questionID) {
      GSI1PK
      interviewQuestion
      interviewQuestionSampleAns
      interviewQuestionType
      interviewQuestionTitle
      QuestionID
      difficulty
      estimatedSecond
    }
  }
`;
export const getQuestionsPaginated = /* GraphQL */ `
  query GetQuestionsPaginated($limit: Int, $nextToken: String) {
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
      }
      nextToken
      totalRecords
    }
  }
`;
export const searchQuestions = /* GraphQL */ `
  query SearchQuestions($keyword: String!) {
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
      }
    }
  }
`;
export const searchQuestionsPaginated = /* GraphQL */ `
  query SearchQuestionsPaginated(
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
      }
      nextToken
      totalRecords
    }
  }
`;
export const getUserInterviewsByQuestionID = /* GraphQL */ `
  query GetUserInterviewsByQuestionID(
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
        interviewPerformance
      }
    }
  }
`;
export const getUserResumeScans = /* GraphQL */ `
  query GetUserResumeScans($emailAddress: AWSEmail!) {
    getUserResumeScans(emailAddress: $emailAddress) {
      resumeScanList {
        displayName
        jobName
        resumeName
        resumeResults
        resumeUrl
        resumeScanID
      }
    }
  }
`;
export const getUserEducationByID = /* GraphQL */ `
  query GetUserEducationByID($emailAddress: AWSEmail!, $eduID: String!) {
    getUserEducationByID(emailAddress: $emailAddress, eduID: $eduID) {
      eduID
      eduDegree
      eduFieldStudy
      eduSchool
      eduStartDate
      eduEndDate
      eduIcon
      eduActivity
    }
  }
`;
export const getUserWorkHistoryByID = /* GraphQL */ `
  query GetUserWorkHistoryByID(
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
    }
  }
`;
