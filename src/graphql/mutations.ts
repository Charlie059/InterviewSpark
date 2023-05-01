/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNewGuestUser = /* GraphQL */ `
  mutation CreateNewGuestUser($emailAddress: AWSEmail!, $userName: String) {
    createNewGuestUser(emailAddress: $emailAddress, userName: $userName) {
      isSuccessful
      error
    }
  }
`;
export const addNewGuestUser = /* GraphQL */ `
  mutation AddNewGuestUser($emailAddress: AWSEmail!, $userName: String!) {
    addNewGuestUser(emailAddress: $emailAddress, userName: $userName) {
      userEmailAddress
      userRole
      userName
      allowPublicInterview
    }
  }
`;
export const addProfileToUser = /* GraphQL */ `
  mutation AddProfileToUser(
    $emailAddress: AWSEmail!
    $input: addUserProfileInput!
  ) {
    addProfileToUser(emailAddress: $emailAddress, input: $input) {
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
export const createUserInterviewWithQuestion = /* GraphQL */ `
  mutation CreateUserInterviewWithQuestion(
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
    }
  }
`;
export const createInterviewWithQuestion = /* GraphQL */ `
  mutation CreateInterviewWithQuestion(
    $emailAddress: AWSEmail!
    $questionID: String!
  ) {
    createInterviewWithQuestion(
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
    }
  }
`;
export const updateInterviewVideoKey = /* GraphQL */ `
  mutation UpdateInterviewVideoKey(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $questionID: String!
    $interviewVideoKey: String!
  ) {
    updateInterviewVideoKey(
      emailAddress: $emailAddress
      interviewID: $interviewID
      questionID: $questionID
      interviewVideoKey: $interviewVideoKey
    ) {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
      interviewQuestion
      interviewQuestionTitle
      interviewQuestionType
    }
  }
`;
export const removeUserInterviewsByID = /* GraphQL */ `
  mutation RemoveUserInterviewsByID(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $interviewQuestionID: String!
  ) {
    removeUserInterviewsByID(
      emailAddress: $emailAddress
      interviewID: $interviewID
      interviewQuestionID: $interviewQuestionID
    ) {
      isSuccessful
      error
    }
  }
`;
