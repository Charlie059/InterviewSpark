/***********************************************************************************************
 * Interview Page
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date:
 * Update Date: 19/10/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/
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

import { useGraphQLQuery } from 'src/hooks/useGraphQLQuery'
import { GetUserInterviewUsageMetaDataVariables } from 'src/types/graphqlTypes'
import InterviewAssembled from 'src/components/AssembledUI/interview/InterviewAssembled'

const InterviewPage = () => {
  /* States */
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false)

  /* Hooks */
  const {profile: userProfile, email: emailAddress, error: userProfileError} = useUserProfile()
  const { data: userInterviewUsageMetaData, error: interviewMetaDataError } = useGraphQLQuery
  <GetUserInterviewUsageMetaDataVariables>(getUserInterviewUsageMetaData, { emailAddress });
  return (
    <div>
      {!userProfile||!userInterviewUsageMetaData ? (
        <InterviewPageLoading/>
      ) : (
        <>
          <Tutorial/>
          {!userInterviewUsageMetaData || userInterviewUsageMetaData.userInterviewNumTotalCount !== 0 ? (
          <InterviewAssembled/>
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
