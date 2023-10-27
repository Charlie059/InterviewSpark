/***********************************************************************************************
 * UserProfileContext context
 *
 * This file with useUserProfile(src/hooks/)defines the UserProfileContext and a custom hook
 * 'useUserProfile' for fetching and providing user profile data throughout the application.
 * The context maintains the state related to the user's profile, email, and any associated
 * errors during data fetching.
 *
 * The 'UserProfileProvider' component uses the 'useAuth' hook to retrieve the current user's email
 * address and attempts to fetch the user's profile data from the GraphQL API. The fetched data,
 * or any errors encountered, are stored in the context's state. The 'useUserProfile' hook provides
 * a way for components to access the user profile data stored in the context.
 *
 * Please check error state to handle corresponding error pages
 *
 * Usage:
 * Wrap your component tree with <UserProfileProvider> to provide user profile data to all child components.
 * It must be wrapped under AuthProvider(default in _app.tsx).
 * In this project it has been wrapped in _app.tsx under Guard.
 * use the 'useUserProfile' hook in your components to access the user profile, email and error.
 *
 * @file: Defines the UserProfileContext context
 * @module: UserProfileContext UserProfileContextProvider
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 19/10/2023
 * Update Date: 19/10/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import { API, graphqlOperation } from 'aws-amplify';
import React, {useEffect, useState } from 'react';
import { getUserProfile } from 'src/graphql/queries';
import { useAuth } from 'src/hooks/useAuth';
import {UserDataType, UserProfileContextProps, UserProfileProviderProps } from './types';

/* Default */
const defaultUser: UserDataType = {
  __typename: 'Profile',
  fName: '',
  lName: '',
  photoImgKey: '',
  coverImgKey: '',
  resumeKey: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  joiningDate: '',
  contact: '',
  isPublic: false,
  userName: '',
  userEmailAddress: '',
  userRole: '',
  userIndustry: '',
  userDreamJob: '',
  isNewUser: false,
};

/* Context */
const UserProfileContext = React.createContext<UserProfileContextProps>({
  profile: defaultUser,
  email: null,
  error: null,
});

/* Provider */
const UserProfileProvider: React.FC<UserProfileProviderProps> = ({children})=>{
  const [data,setData] = useState<UserProfileContextProps>({
    profile:defaultUser,
    email:null,
    error:null
  })
  const auth = useAuth();
  const emailAddress = auth.user?.userEmailAddress;
  useEffect(()=>{

    console.log("userProfileContext:", emailAddress)
    const fetchData = async () => {
      try {
        /* Check Email */
        if(!emailAddress){
          const errMessage = "Error fetching emailAddress from auth.ser.serEmailAddress!"
          console.error(errMessage);
          setData(prevState =>({...prevState, email:emailAddress,error: new Error(errMessage)}))
        }

        /* Fetch GraphQL Data */
        const result = await API.graphql(
          graphqlOperation(getUserProfile, { emailAddress })
        );
        if ('data' in result) {
          const fetchedProfile = result.data.getUserProfile;

          //Here we use fetchedProfile to replace defaultUser
          setData(prevState =>({...prevState, profile:{...defaultUser,...fetchedProfile},email:emailAddress, error:null}))
        }

        /* Catch Error */
      } catch (err) {
        const error = err instanceof Error ? err: new Error('Error fetching User Profile from graphql:getUserProfile');
        setData(prevState=>({...prevState, error,}))
        console.error(error);
      }
    };

    /* Execute */
     (async ()=>{
       await       fetchData();
     })();

  },[emailAddress]);

  return(
    <UserProfileContext.Provider value={data}>
      {children}
    </UserProfileContext.Provider>
  )
}

export {UserProfileContext, UserProfileProvider}

