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

// import Select from 'react-select'
// import { CSSObject } from '@emotion/react'

// const responsive = {
//   superLargeDesktop: {
//     // these breakpoint values can cover screen widths with devices like large screens, 4k TVs
//     breakpoint: { max: 4000, min: 2600 },
//     items: 6
//   },
//   largeDesktop: {
//     // these breakpoint values can cover screen widths with devices like laptops, desktops
//     breakpoint: { max: 2600, min: 1800 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 1800, min: 1200 },
//     items: 5
//   },
//   laptop: {
//     breakpoint: { max: 1200, min: 900 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 900, min: 600 },
//     items: 2
//   },
//   mobileL: {
//     // large mobile devices like iPhone X, etc.
//     breakpoint: { max: 600, min: 375 },
//     items: 1
//   },
//   mobileM: {
//     // medium mobile devices like iPhone 6/7, etc.
//     breakpoint: { max: 375, min: 320 },
//     items: 1
//   },
//   mobileS: {
//     // small mobile devices like iPhone 5, etc.
//     breakpoint: { max: 320, min: 0 },
//     items: 1
//   }
// }

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
      console.log(result)
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

        console.log(allTagsFromDB)

        setAllTags(allTagsFromDB)
      }
    }

    fetchInterviewTags()
  }, [])

  // const options = allTags.map(tag => ({
  //   value: tag.title,
  //   label: tag.title
  // }))

  // const customStyles = {
  //   control: (provided: CSSObject) => ({
  //     ...provided,
  //     marginTop: '20px',
  //     marginBottom: '10px',
  //     borderRadius: '10px',
  //     boxShadow: 'none'
  //   }),
  //   option: (provided: CSSObject, state: any) => ({
  //     ...provided,
  //     color: state.isSelected ? 'white' : 'black',
  //     backgroundColor: state.isSelected ? 'blue' : 'white'
  //   })
  // }

  // const handleChange = (selectedOption: any) => {
  //   handleChooseJobTitle(selectedOption.value)
  // }

  const handleChooseJobTitle = (title: string) => {
    setSelectedTag(title)
    setStartDialogOpen(true)
    auth.trackEvent('User_Interview_Functionality_Used', {
      action: 'Start_Mock_Interview_Dialog',
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

      auth.trackEvent('User_Interview_Functionality_Used', {
        action: 'Start_Mock_Interview',
        desc: 'User started a mock interview.',
        ...info
      })

      if (isSuccessful) {
        setDisableInterviewAnalysis(false)
        setDisableInterviewInteractiveFeedback(false)
      } else if (info) {
        // Translate to JSON object
        const info = JSON.parse(res.info)

        // Set up hot toast
        console.log(info)

        toast.success(info.message, {
          position: 'top-center',
          duration: 10000
        })
      }

      return res
    }
  }

  const handleStartInterview = async (info: Info) => {
    console.log(info)
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
      }
    } catch (error) {
      Logger.error(error)
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
            {/*<Avatar*/}
            {/*  sx={{ width: 40, height: 40 }}*/}
            {/*  alt={(user?.fName || '') + (user?.lName || '') || 'john doe'}*/}
            {/*  src={*/}
            {/*    (process?.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL || '') + (user?.photoImgKey || '') ||*/}
            {/*    'public/images/avatars/1.png'*/}
            {/*  }*/}
            {/*/>*/}
          </Box>
          {/* <Box sx={{ width: '100%' }}>
            <Select
              options={options}
              isSearchable
              onChange={handleChange}
              placeholder='Search by topic name'
              styles={customStyles}
            />
          </Box> */}
          {/* <Typography sx={{ fontSize: 20, mt: 6, mb: 6 }}>Recommendations</Typography>
          <Carousel responsive={responsive}>
            {recommendations.map((item, index) => (
              <div key={index}>
                <InterviewCard
                  sx={{ width: '260px' }}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  onClick={handleChooseJobTitle}
                />
              </div>
            ))}
          </Carousel> */}
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
