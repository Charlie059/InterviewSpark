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
export const getProfile = /* GraphQL */ `
  query GetProfile($emailAddress: AWSEmail!) {
    getProfile(emailAddress: $emailAddress) {
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
export const getWorkHistories = /* GraphQL */ `
  query GetWorkHistories($emailAddress: AWSEmail!) {
    getWorkHistories(emailAddress: $emailAddress) {
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
export const getEducations = /* GraphQL */ `
  query GetEducations($emailAddress: AWSEmail!) {
    getEducations(emailAddress: $emailAddress) {
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
export const getInterviewList = /* GraphQL */ `
  query GetInterviewList(
    $emailAddress: AWSEmail!
    $limit: Int
    $nextToken: String
  ) {
    getInterviewList(
      emailAddress: $emailAddress
      limit: $limit
      nextToken: $nextToken
    ) {
      interviewList {
        interviewID
        interviewDateTime
        interviewQuestionID
        interviewVideoKey
      }
      nextToken
      totalRecords
    }
  }
`;
export const getInterviewListByID = /* GraphQL */ `
  query GetInterviewListByID($emailAddress: AWSEmail!, $interviewID: String!) {
    getInterviewListByID(
      emailAddress: $emailAddress
      interviewID: $interviewID
    ) {
      interviewList {
        interviewID
        interviewDateTime
        interviewQuestionID
        interviewVideoKey
      }
    }
  }
`;
export const getInterviewMetaData = /* GraphQL */ `
  query GetInterviewMetaData(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $interviewQuestionID: String!
  ) {
    getInterviewMetaData(
      emailAddress: $emailAddress
      interviewID: $interviewID
      interviewQuestionID: $interviewQuestionID
    ) {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
    }
  }
`;
export const getNumOfQuestion = /* GraphQL */ `
  query GetNumOfQuestion {
    getNumOfQuestion {
      questionCount
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
    }
  }
`;
export const getQuestionList = /* GraphQL */ `
  query GetQuestionList($limit: Int, $nextToken: String) {
    getQuestionList(limit: $limit, nextToken: $nextToken) {
      questionList {
        GSI1PK
        interviewQuestion
        interviewQuestionSampleAns
        interviewQuestionType
        QuestionID
      }
      nextToken
      totalRecords
    }
  }
`;
