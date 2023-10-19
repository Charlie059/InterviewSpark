import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { API, graphqlOperation } from 'aws-amplify'
import CTAPage from 'src/components/interview/interviewProfile/CTAPage/CTAPage'
import { UserDataType, UserInterviewUsageMetaData } from 'src/context/types'
import { getUserInterviewUsageMetaData, getUserProfile } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import Tutorial from 'src/components/tutorial/Tutorial'
import Logger from 'src/middleware/loggerMiddleware'
import { useState,useEffect } from 'react'
import { useUserProfile } from 'src/hooks/useUserProfile'
import InterviewPageLoading from 'src/components/loading/InterviewPageLoading'
import InterviewPageInterviewContent from 'src/components/interview/InterviewPageInterviewContent'
import { useGraphQLQuery } from 'src/hooks/useGraphQLQuery'
import { GetUserInterviewUsageMetaDataVariables } from 'src/types/graphqlTypes'

const InterviewPage = () => {
  const auth = useAuth()
  const emailAddress=auth.user?.userEmailAddress
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false)

  const { data: userInterviewUsageMetaData, error: interviewMetaDataError } =
    useGraphQLQuery<GetUserInterviewUsageMetaDataVariables>(
    getUserInterviewUsageMetaData,
    { emailAddress }
  );

  const { profile: userProfile, error: pError } = emailAddress
    ? useUserProfile(emailAddress)
    : { profile: null as UserDataType|null, error: null };

  useEffect(()=>{
      if(userProfile && userProfile.isNewUser){
        setTutorialDialogOpen(true);
      }
  },[userProfile])


  return (
    <div>
      {!userProfile||!userInterviewUsageMetaData ? (
        <InterviewPageLoading/>
      ) : (
        <>
          {tutorialDialogOpen && (<Tutorial
              tutorialDialogOpen={tutorialDialogOpen}
              setTutorialDialogOpen={setTutorialDialogOpen}
              userProfileData={userProfile}/>)}
          {!userInterviewUsageMetaData || userInterviewUsageMetaData.userInterviewNumTotalCount !== 0 ? (
          <InterviewPageInterviewContent userProfile={userProfile}/>
          ) : (<CTAPage />)}
        </>
      )}
    </div>
  )
}

InterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewPage
