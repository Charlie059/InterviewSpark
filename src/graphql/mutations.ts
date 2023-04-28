/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGuestUser = /* GraphQL */ `
  mutation CreateGuestUser(
    $emailAddress: AWSEmail!
    $uniqueHandle: String!
    $fName: String!
    $lName: String!
  ) {
    createGuestUser(
      emailAddress: $emailAddress
      uniqueHandle: $uniqueHandle
      fName: $fName
      lName: $lName
    ) {
      allowPublicInterview
      fName
      lName
      uniqueHandle
      userEmailAddress
      userRole
    }
  }
`;
export const createGuestProfile = /* GraphQL */ `
  mutation CreateGuestProfile($emailAddress: AWSEmail!) {
    createGuestProfile(emailAddress: $emailAddress) {
      profilePhotoImgKey
      profileCoverImgKey
      profileResumeKey
      profileVideoKey
      profileLanguage
      profileIsPublic
      profileAddressLine1
      profileAddressLine2
      profileCity
      profileState
      profilePostalCode
      profileCountry
      profileJoiningDate
      profileContact
    }
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
      interviewQuestion
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
