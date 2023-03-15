/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($emailAddress: AWSEmail!) {
    getUser(emailAddress: $emailAddress) {
      emailAddress
      userRole
      userName
      hasProfile
      allowPublishInterview
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($emailAddress: AWSEmail!) {
    getProfile(emailAddress: $emailAddress) {
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
