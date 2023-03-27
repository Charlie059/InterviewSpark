/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const test_deactiveSubscription = /* GraphQL */ `
  mutation Test_deactiveSubscription($id: String!) {
    test_deactiveSubscription(id: $id)
  }
`;
export const addNewGuestUser = /* GraphQL */ `
  mutation AddNewGuestUser($emailAddress: AWSEmail!, $userName: String!) {
    addNewGuestUser(emailAddress: $emailAddress, userName: $userName) {
      userEmailAddress
      userRole
      userName
      hasProfile
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
    }
  }
`;
