/***********************************************************************************************
 * Interview Page
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date:
 * Update Date: 19/10/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/
import CTAPage from 'src/components/interview/interviewProfile/CTAPage/CTAPage'
import { getUserInterviewUsageMetaData } from 'src/graphql/queries'
import Tutorial from 'src/components/tutorial/Tutorial'
import { useUserProfile } from 'src/hooks/useUserProfile'
import InterviewPageLoading from 'src/components/loading/InterviewPageLoading'

import { useGraphQLQuery } from 'src/hooks/useGraphQLQuery'
import { GetUserInterviewUsageMetaDataVariables } from 'src/types/graphqlTypes'
import InterviewAssembled from 'src/components/AssembledUI/interview/InterviewAssembled'

const InterviewPage = () => {
  /* Hooks */
  const {profile: userProfile, email: emailAddress} = useUserProfile()
  const { data: userInterviewUsageMetaData} = useGraphQLQuery <GetUserInterviewUsageMetaDataVariables>(getUserInterviewUsageMetaData,  {emailAddress} );


return (
    <div>
      {!userProfile || !userInterviewUsageMetaData ? (
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
