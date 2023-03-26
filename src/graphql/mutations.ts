/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addNewGuestUser = /* GraphQL */ `
  mutation AddNewGuestUser($emailAddress: AWSEmail!, $userName: String!) {
    addNewGuestUser(emailAddress: $emailAddress, userName: $userName) {
      emailAddress
      userRole
      userName
      hasProfile
      allowPublishInterview
    }
  }
`;
export const addProfileToUser = /* GraphQL */ `
  mutation AddProfileToUser(
    $emailAddress: AWSEmail!
    $input: addUserProfileInput!
  ) {
    addProfileToUser(emailAddress: $emailAddress, input: $input) {
      profileID
      fName
      lName
      resumeURL
      photoProfile
      addressLine1
      addressLine2
      city
      state
      postalCode
      country
    }
  }
`;
export const createNewInterview = /* GraphQL */ `
  mutation CreateNewInterview(
    $emailAddress: AWSEmail
    $interviewID: String!
    $questionID: String!
    $interviewType: String!
    $videoURL: AWSURL!
  ) {
    createNewInterview(
      emailAddress: $emailAddress
      interviewID: $interviewID
      questionID: $questionID
      interviewType: $interviewType
      videoURL: $videoURL
    ) {
      questionID
      interviewVideoURL
      interviewType
      interviewTime
      interviewID
    }
  }
`;
