/***********************************************************************************************
 * This file with UserProfileContext(src/context/)defines the UserProfileContext and a custom hook
 * 'useUserProfile' for fetching and providing user profile data throughout the application.
 * The context maintains the state related to the user's profile, email, and any associated
 * errors during data fetching.
 *
 * Usage:
 * The corresponding context's provider has been wrapped in _app.tsx, under AuthProvider
 * use the 'useUserProfile' hook in your components to access the user profile, email and error.
 *
 * @file: Defines the useUserProfile hook
 * @module: useUserProfile
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 19/10/2023
 * Update Date: 19/10/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import {useContext} from 'react'
import { UserProfileContext } from 'src/context/UserProfileContext';

export const useUserProfile = () => useContext(UserProfileContext);
