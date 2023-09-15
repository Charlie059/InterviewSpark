import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { NavBar } from 'src/components/interview/createInterview/navigation-bar'
import InterviewCard from 'src/components/interview/createInterview/interview-card'
import StartInterviewDialog from 'src/components/interview/createInterview/start-interview-dialog'
import { useAuth } from 'src/hooks/useAuth'
import LoadingScreen from 'src/components/loading/Loading'
import { API, graphqlOperation } from 'aws-amplify'
import {
  createUserInterviewQuestionList,
  verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage
} from 'src/graphql/mutations'
import Logger from 'src/middleware/loggerMiddleware'
import { Interview } from 'src/types/types'
import toast from 'react-hot-toast'
import { getQuestionUsageMetaData } from 'src/graphql/queries'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

interface CardItem {
  title: string
  imageSrc: string
}

interface CreateQuestionsComponentProps {
  setInterviews: React.Dispatch<React.SetStateAction<Interview[]>>
  setInfo: React.Dispatch<React.SetStateAction<Info | undefined>>
  setDisableInterviewAnalysis: React.Dispatch<React.SetStateAction<boolean>>
  setDisableInterviewInteractiveFeedback: React.Dispatch<React.SetStateAction<boolean>>
  initialTag?: string | null
}

const CreateQuestionsComponent = (createQuestionsComponentProps: CreateQuestionsComponentProps) => {
  const { setInterviews, setInfo, setDisableInterviewAnalysis, setDisableInterviewInteractiveFeedback } =
    createQuestionsComponentProps
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recommendations, setRecommendations] = useState<CardItem[]>([])
  const [allTags, setAllTags] = useState<CardItem[]>([])
  const [startDialogOpen, setStartDialogOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>('')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (createQuestionsComponentProps.initialTag) {
      setSelectedTag(createQuestionsComponentProps.initialTag)
      setStartDialogOpen(true)
    }
  }, [createQuestionsComponentProps.initialTag])

  useEffect(() => {
    const fetchInterviewTags = async () => {
      const result = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))
      if ('data' in result) {
        const tags = result.data.getQuestionUsageMetaData.questionTags
        const allTagsFromDB = tags.map((item: { tag: string }) => {
          return { title: item.tag }
        })

        const recommendationsFromDB = result.data.getQuestionUsageMetaData.recommendations

        // Mapping the recommendations from DB to the recommendations state
        const recommendationsFromDBToState = recommendationsFromDB.map((item: string) => {
          return { title: item }
        })

        // Set the recommendations state
        setRecommendations(recommendationsFromDBToState)

        // Sort the job titles by alphabetical order
        allTagsFromDB.sort((a: any, b: any) => {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }

          return 0
        })
        setAllTags(allTagsFromDB)
      }
    }

    fetchInterviewTags()
  }, [])

  const handleChooseJobTitle = (title: string) => {
    setSelectedTag(title)
    setStartDialogOpen(true)
    auth.trackEvent('InterviewEvent', {
      action: 'Start_Interview_Dialog',
      desc: 'User clicked on a title and previewed to start the interview.',
      title: title
    })
  }

  const handleVerifyAndUpdateProductUsage = async () => {
    const result = await API.graphql(
      graphqlOperation(verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage, {
        userEmail: auth.user?.userEmailAddress
      })
    )

    if ('data' in result) {
      // Get the result from the backend
      const res = result.data.verifyAndUpdateInteractiveFeedbackWithVideoAnalysisUsage
      const isSuccessful = res.isSuccessful
      const info = res.info

      if (isSuccessful) {
        setDisableInterviewAnalysis(false)
        setDisableInterviewInteractiveFeedback(false)
      } else if (info) {
        // Translate to JSON object
        const info = JSON.parse(res.info)

        toast.success(info.message, {
          position: 'top-center',
          duration: 10000
        })
      }

      return res
    }
  }

  const handleStartInterview = async (info: Info) => {
    setLoading(true)

    const numOfBQ = info.questionNum
    const numOfTech = 0

    try {
      // Verify and update the product usage
      const res = await handleVerifyAndUpdateProductUsage()
      let isDisableInterviewAnalysis = true
      if (res.isSuccessful) {
        isDisableInterviewAnalysis = false
      }

      // Use graphql to crate a new interview
      const result = await API.graphql(
        graphqlOperation(createUserInterviewQuestionList, {
          emailAddress: auth.user?.userEmailAddress,
          numOfBQ: numOfBQ,
          numOfTech: numOfTech,
          questionTag: info.interviewTopic,
          isDisableInterviewAnalysis: isDisableInterviewAnalysis
        })
      )

      if ('data' in result) {
        setInterviews(result.data.createUserInterviewQuestionList.interviewList)
        setInfo(info)
        setLoading(false)

        // lllll

        // Event tracking
        mixPanelTracker(isDisableInterviewAnalysis)
      }
    } catch (error) {
      Logger.error('Error in creating interview', error)
    }

    function mixPanelTracker(isDisableInterviewAnalysis: boolean) {
      auth.trackEvent('InterviewEvent', {
        action: 'Start_Interview',
        desc: 'User started a interview.',
        ...info,
        isDisableInterviewAnalysis: isDisableInterviewAnalysis,
        numOfBQ: numOfBQ,
        numOfTech: numOfTech,
        questionTag: info.interviewTopic
      })
    }
  }

  return (
    <>
      {loading ? (
        <LoadingScreen
          smText={
            'We are working on creating a list of thoughtful and relevant questions that will help you prepare for your interview.'
          }
          lgText={'Generating interview questions'}
        />
      ) : (
        <Box sx={{ padding: 20 }}>
          <NavBar
            navBarElements={[
              { name: 'Home', path: '/interview' },
              { name: 'Create Practice Interview', path: undefined }
            ]}
            closeNavLink='/interview'
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography variant={'h4'}>Practice Interview Topic</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography variant={'h6'}>All Topics</Typography>
          </Box>
          <Grid container columns={8} spacing={6} sx={{ mt: 0, alignItems: 'center', justifyContent: 'center' }}>
            {allTags.map((item, index) => (
              <Grid item xs={4} md={4} lg={2} xl={2} key={index}>
                <InterviewCard
                  sx={{ width: isSmallScreen ? '100%' : '100%' }}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  onClick={handleChooseJobTitle}
                />
              </Grid>
            ))}
          </Grid>

          <StartInterviewDialog
            open={startDialogOpen}
            setOpen={setStartDialogOpen}
            interviewTopic={selectedTag}
            startInterview={handleStartInterview}
          />
        </Box>
      )}
    </>
  )
}

export default CreateQuestionsComponent
