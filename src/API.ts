/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  emailAddress: string,
  userRole: string,
  userName: string,
  hasProfile: boolean,
  allowPublishInterview: boolean,
};

export type addUserProfileInput = {
  fName?: string | null,
  lName?: string | null,
  resumeURL?: string | null,
  photoProfile?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
};

export type Profile = {
  __typename: "Profile",
  profileID?: string | null,
  fName?: string | null,
  lName?: string | null,
  resumeURL?: string | null,
  photoProfile?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
};

export type updateUserProfileInput = {
  fName?: string | null,
  lName?: string | null,
  resumeURL?: string | null,
  photoProfile?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  city?: string | null,
  state?: string | null,
  postalCode?: string | null,
  country?: string | null,
};

export type updateUserDataInput = {
  userRole?: string | null,
  userName?: string | null,
  allowPublishInterview?: boolean | null,
  hasProfile?: boolean | null,
};

export type AddNewGuestUserMutationVariables = {
  emailAddress: string,
  userName: string,
};

export type AddNewGuestUserMutation = {
  // This function will add an initial user if the user mailbox does not exist
  addNewGuestUser?:  {
    __typename: "User",
    emailAddress: string,
    userRole: string,
    userName: string,
    hasProfile: boolean,
    allowPublishInterview: boolean,
  } | null,
};

export type AddProfileToUserMutationVariables = {
  emailAddress: string,
  input: addUserProfileInput,
};

export type AddProfileToUserMutation = {
  // This function adds a Profile to an already existing user when no Profile exists
  addProfileToUser?:  {
    __typename: "Profile",
    profileID?: string | null,
    fName?: string | null,
    lName?: string | null,
    resumeURL?: string | null,
    photoProfile?: string | null,
    addressLine1?: string | null,
    addressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    postalCode?: string | null,
    country?: string | null,
  } | null,
};

export type UpdateProfileMutationVariables = {
  emailAddress: string,
  input: updateUserProfileInput,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    profileID?: string | null,
    fName?: string | null,
    lName?: string | null,
    resumeURL?: string | null,
    photoProfile?: string | null,
    addressLine1?: string | null,
    addressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    postalCode?: string | null,
    country?: string | null,
  } | null,
};

export type UpdateUserDataMutationVariables = {
  emailAddress: string,
  input: updateUserDataInput,
};

export type UpdateUserDataMutation = {
  updateUserData?:  {
    __typename: "User",
    emailAddress: string,
    userRole: string,
    userName: string,
    hasProfile: boolean,
    allowPublishInterview: boolean,
  } | null,
};

export type GetUserQueryVariables = {
  emailAddress: string,
};

export type GetUserQuery = {
  // This function retrieves user information based on the provided email address. It returns a User object containing details about the user. If user not exist, it will return an error
  getUser?:  {
    __typename: "User",
    emailAddress: string,
    userRole: string,
    userName: string,
    hasProfile: boolean,
    allowPublishInterview: boolean,
  } | null,
};

export type GetProfileQueryVariables = {
  emailAddress: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    profileID?: string | null,
    fName?: string | null,
    lName?: string | null,
    resumeURL?: string | null,
    photoProfile?: string | null,
    addressLine1?: string | null,
    addressLine2?: string | null,
    city?: string | null,
    state?: string | null,
    postalCode?: string | null,
    country?: string | null,
  } | null,
};
