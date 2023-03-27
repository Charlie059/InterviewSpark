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
export const getInterviewByID = /* GraphQL */ `
  query GetInterviewByID($emailAddress: AWSEmail!, $interviewID: String!) {
    getInterviewByID(emailAddress: $emailAddress, interviewID: $interviewID) {
      interviewList {
        interviewID
        interviewDateTime
        interviewQuestionID
        interviewVideoKey
      }
    }
  }
`;
export const getInterviewData = /* GraphQL */ `
  query GetInterviewData(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $interviewQuestionID: String!
  ) {
    getInterviewData(
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
