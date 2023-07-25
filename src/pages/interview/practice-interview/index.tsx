/***********************************************************************************************
  Name: PracticeInterview
  Description: This file contains the UI for practice interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/19
  Update Date: 2023/06/19
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CreateQuestionsComponent from 'src/components/interview/InterviewComponents/createQuestions'
import InterviewComponent from 'src/components/interview/InterviewComponents/PracticeInterview'
import { Interview } from 'src/types/types'

// Define states for the interview process

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

function PracticeInterviewPage() {
  const [interviews, setInterviews] = React.useState<Interview[]>([])
  const [info, setInfo] = React.useState<Info>()
  const [disableInterviewAnalysis, setDisableInterviewAnalysis] = React.useState<boolean>(true)
  const [disableInterviewInteractiveFeedback, setDisableInterviewInteractiveFeedback] = React.useState<boolean>(true)

  return (
    <>
      {info && interviews.length > 0 ? (
        <InterviewComponent
          interviews={interviews}
          info={info}
          disableInterviewAnalysis={disableInterviewAnalysis}
          disableInterviewInteractiveFeedback={disableInterviewInteractiveFeedback}
        />
      ) : (
        <CreateQuestionsComponent
          setInterviews={setInterviews}
          setInfo={setInfo}
          setDisableInterviewAnalysis={setDisableInterviewAnalysis}
          setDisableInterviewInteractiveFeedback={setDisableInterviewInteractiveFeedback}
        />
      )}
    </>
  )
}

PracticeInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

PracticeInterviewPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default PracticeInterviewPage
