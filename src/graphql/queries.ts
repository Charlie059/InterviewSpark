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
  query GetInterviewList($emailAddress: AWSEmail!) {
    getInterviewList(emailAddress: $emailAddress) {
      interviewList {
        interviewID
        interviewDateTime
        interviewQuestionID
        interviewVideoKey
      }
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
export const getInterviewListThisMonth = /* GraphQL */ `
  query GetInterviewListThisMonth($emailAddress: AWSEmail!) {
    getInterviewListThisMonth(emailAddress: $emailAddress) {
      interviewList {
        interviewID
        interviewDateTime
        interviewQuestionID
        interviewVideoKey
      }
    }
  }
`;
