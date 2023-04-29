/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($emailAddress: AWSEmail!) {
    getUser(emailAddress: $emailAddress) {
      userEmailAddress
      userRole
      userName
      hasProfile
      allowPublicInterview
    }
  }
`;
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
    }
  }
`;
export const getUserWorkHistories = /* GraphQL */ `
  query GetUserWorkHistories($emailAddress: AWSEmail!) {
    getUserWorkHistories(emailAddress: $emailAddress) {
      workHistory {
        workHistoryJobTitle
        workHistoryEmployer
        workHistoryStartDate
        workHistoryEndDate
        workHistoryJobDescription
      }
    }
  }
`;
export const getUserEducations = /* GraphQL */ `
  query GetUserEducations($emailAddress: AWSEmail!) {
    getUserEducations(emailAddress: $emailAddress) {
      educations {
        eduDegree
        eduFieldStudy
        eduSchool
        eduStartDate
        eduEndDate
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
        interviewQuestionType
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
        interviewQuestionType
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
      interviewQuestionType
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
        interviewQuestionType
      }
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
        interviewQuestionType
      }
    }
  }
`;
