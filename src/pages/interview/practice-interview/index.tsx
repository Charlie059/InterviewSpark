import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CreateQuestionsComponent from 'src/components/interview/InterviewComponents/createQuestions'
import InterviewComponent from 'src/components/interview/InterviewComponents/PracticeInterview'
import { Interview } from 'src/types/types'
import { API, graphqlOperation } from 'aws-amplify'
import { getQuestionUsageMetaData } from 'src/graphql/queries'

// Define states for the interview process

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

function PracticeInterviewPage() {
  const router = useRouter()
  const [interviews, setInterviews] = React.useState<Interview[]>([])
  const [info, setInfo] = React.useState<Info>()
  const [disableInterviewAnalysis, setDisableInterviewAnalysis] = React.useState<boolean>(true)
  const [disableInterviewInteractiveFeedback, setDisableInterviewInteractiveFeedback] = React.useState<boolean>(true)
  const [topicTag, setTopicTag] = React.useState<string | null>(null)
  const [allTags, setAllTags] = React.useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchInterviewTags = async () => {
      const result = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))
      console.log(result)
      if ('data' in result) {
        const tags = result.data.getQuestionUsageMetaData.questionTags
        const allTagsFromDB = new Set<string>(tags.map((item: { tag: string }) => item.tag))
        console.log(allTagsFromDB)
        setAllTags(allTagsFromDB)
      }
    }

    fetchInterviewTags()
  }, [])

  useEffect(() => {
    if (router.query.topicTag) {
      const urlTopicTag = router.query.topicTag as string
      if (allTags.has(urlTopicTag)) {
        setTopicTag(urlTopicTag)
      }
    }
  }, [router.query, allTags])

  // Print the value of topicTag when it changes
  useEffect(() => {
    console.log(topicTag)
  }, [topicTag])

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
          initialTag={topicTag}
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
