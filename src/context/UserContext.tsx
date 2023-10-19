import React from 'react';
import { UserDataType } from './types';


interface UserProfileContextProps {
  userProfile: UserDataType | null;
  error: Error | null;
}

// Create the context with default values
const UserProfileContext = React.createContext<UserProfileContextProps>({
  userProfile: null,
  error: null,
});



export default UserProfileContext;
