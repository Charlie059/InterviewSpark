/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNewGuestUser = /* GraphQL */ `
  mutation CreateNewGuestUser(
    $emailAddress: AWSEmail!
    $userName: String!
    $fName: String!
    $lName: String!
  ) {
    createNewGuestUser(
      emailAddress: $emailAddress
      userName: $userName
      fName: $fName
      lName: $lName
    ) {
      isSuccessful
      error
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
      interviewFeedback
      interviewPerformance
    }
  }
`;
export const updateInterviewVideoKey = /* GraphQL */ `
  mutation UpdateInterviewVideoKey(
    $emailAddress: AWSEmail!
    $interviewID: String!
    $questionID: String!
    $interviewVideoKey: String!
    $interviewFeedback: String!
  ) {
    updateInterviewVideoKey(
      emailAddress: $emailAddress
      interviewID: $interviewID
      questionID: $questionID
      interviewVideoKey: $interviewVideoKey
      interviewFeedback: $interviewFeedback
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $emailAddress: AWSEmail!
    $addressLine1: String
    $addressLine2: String
    $city: String
    $contact: String
    $country: String
    $coverImgKey: String
    $fName: String
    $lName: String
    $photoImgKey: String
    $postalCode: String
    $resumeKey: String
    $state: String
    $isPublic: String
  ) {
    updateUserProfile(
      emailAddress: $emailAddress
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city: $city
      contact: $contact
      country: $country
      coverImgKey: $coverImgKey
      fName: $fName
      lName: $lName
      photoImgKey: $photoImgKey
      postalCode: $postalCode
      resumeKey: $resumeKey
      state: $state
      isPublic: $isPublic
    ) {
      isSuccessful
      error
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
export const removeUserResumeScanByID = /* GraphQL */ `
  mutation RemoveUserResumeScanByID(
    $emailAddress: AWSEmail!
    $resumeScanID: String!
  ) {
    removeUserResumeScanByID(
      emailAddress: $emailAddress
      resumeScanID: $resumeScanID
    ) {
      isSuccessful
      error
    }
  }
`;
export const createUserResumeScan = /* GraphQL */ `
  mutation CreateUserResumeScan(
    $emailAddress: AWSEmail!
    $resumeUrl: String!
    $displayName: String!
    $jobName: String!
    $resumeName: String!
    $resumeResults: String!
  ) {
    createUserResumeScan(
      emailAddress: $emailAddress
      resumeUrl: $resumeUrl
      displayName: $displayName
      jobName: $jobName
      resumeName: $resumeName
      resumeResults: $resumeResults
    ) {
      displayName
      jobName
      resumeName
      resumeResults
      resumeUrl
      resumeScanID
    }
  }
`;
export const updateUserResumeScanURL = /* GraphQL */ `
  mutation UpdateUserResumeScanURL(
    $emailAddress: AWSEmail!
    $resumeID: String
    $resumeUrl: String!
  ) {
    updateUserResumeScanURL(
      emailAddress: $emailAddress
      resumeID: $resumeID
      resumeUrl: $resumeUrl
    ) {
      displayName
      jobName
      resumeName
      resumeResults
      resumeUrl
      resumeScanID
    }
  }
`;
export const createUserEducation = /* GraphQL */ `
  mutation CreateUserEducation(
    $emailAddress: AWSEmail!
    $eduDegree: String!
    $eduFieldStudy: String!
    $eduSchool: String!
    $eduStartDate: AWSDate!
    $eduEndDate: AWSDate!
  ) {
    createUserEducation(
      emailAddress: $emailAddress
      eduDegree: $eduDegree
      eduFieldStudy: $eduFieldStudy
      eduSchool: $eduSchool
      eduStartDate: $eduStartDate
      eduEndDate: $eduEndDate
    ) {
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
export const updateUserEducation = /* GraphQL */ `
  mutation UpdateUserEducation(
    $emailAddress: AWSEmail!
    $eduID: String!
    $eduDegree: String!
    $eduFieldStudy: String!
    $eduSchool: String!
    $eduStartDate: AWSDate!
    $eduEndDate: AWSDate!
  ) {
    updateUserEducation(
      emailAddress: $emailAddress
      eduID: $eduID
      eduDegree: $eduDegree
      eduFieldStudy: $eduFieldStudy
      eduSchool: $eduSchool
      eduStartDate: $eduStartDate
      eduEndDate: $eduEndDate
    ) {
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
export const removeUserEducationByID = /* GraphQL */ `
  mutation RemoveUserEducationByID($emailAddress: AWSEmail!, $eduID: String!) {
    removeUserEducationByID(emailAddress: $emailAddress, eduID: $eduID) {
      isSuccessful
      error
    }
  }
`;
export const createUserWorkHistory = /* GraphQL */ `
  mutation CreateUserWorkHistory(
    $emailAddress: AWSEmail!
    $workCompany: String!
    $workPosition: String!
    $workStartDate: AWSDate!
    $workEndDate: AWSDate!
    $workDescription: String!
  ) {
    createUserWorkHistory(
      emailAddress: $emailAddress
      workCompany: $workCompany
      workPosition: $workPosition
      workStartDate: $workStartDate
      workEndDate: $workEndDate
      workDescription: $workDescription
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
export const updateUserWorkHistory = /* GraphQL */ `
  mutation UpdateUserWorkHistory(
    $emailAddress: AWSEmail!
    $workHistoryID: String!
    $workCompany: String!
    $workPosition: String!
    $workStartDate: AWSDate!
    $workEndDate: AWSDate!
    $workDescription: String!
  ) {
    updateUserWorkHistory(
      emailAddress: $emailAddress
      workHistoryID: $workHistoryID
      workCompany: $workCompany
      workPosition: $workPosition
      workStartDate: $workStartDate
      workEndDate: $workEndDate
      workDescription: $workDescription
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
export const removeUserWorkHistoryByID = /* GraphQL */ `
  mutation RemoveUserWorkHistoryByID(
    $emailAddress: AWSEmail!
    $workHistoryID: String!
  ) {
    removeUserWorkHistoryByID(
      emailAddress: $emailAddress
      workHistoryID: $workHistoryID
    ) {
      isSuccessful
      error
    }
  }
`;
