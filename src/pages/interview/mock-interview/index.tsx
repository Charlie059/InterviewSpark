/***********************************************************************************************
  Name: MockInterview
  Description: This file contains the UI for mock interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/19
  Update Date: 2023/06/19
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CreateQuestionsComponent from 'src/components/interview/mockInterview/createQuestions'
import MockInterviewComponent from 'src/components/interview/mockInterview/mockInterview'
import { Interview } from 'src/types/types'

// Define states for the mock interview process

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

function MockInterviewPage() {
  const [interviews, setInterviews] = React.useState<Interview[]>([])
  const [info, setInfo] = React.useState<Info>()

  return (
    <>
      {info && interviews.length > 0 ? (
        <MockInterviewComponent interviews={interviews} info={info} />
      ) : (
        <CreateQuestionsComponent setInterviews={setInterviews} setInfo={setInfo} />
      )}
    </>
  )
}

MockInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

MockInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default MockInterviewPage
