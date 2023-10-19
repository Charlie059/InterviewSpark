import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserProfile } from 'src/graphql/queries';
import Logger from 'src/middleware/loggerMiddleware'


export const useUserProfile = (emailAddress: string)=>{
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState<Error|null>(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const result = await API.graphql(
          graphqlOperation(getUserProfile, { emailAddress })
        );
        if ('data' in result) {
          setProfile(result.data.getUserProfile);
        }
      } catch (err) {
        if(err instanceof Error){
          setError(err);
        }else {
          setError(new Error((String(err))))
        }
        Logger.error('Error fetching User Profile',error)
      }
    };

    fetchData();
  },[emailAddress]);
  return{profile, error}
}
