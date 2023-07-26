import React, { useEffect, useState } from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import MuiTypography, { TypographyProps } from '@mui/material/Typography'
import { NavBar } from 'src/components/interview/createInterview/navigation-bar'
import InterviewCard from 'src/components/interview/createInterview/interview-card'
import StartInterviewDialog from 'src/components/interview/createInterview/start-interview-dialog'
import { styled } from '@mui/material/styles'
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
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Select from 'react-select'
import { CSSObject } from '@emotion/react'

const responsive = {
  superLargeDesktop: {
    // these breakpoint values can cover screen widths with devices like large screens, 4k TVs
    breakpoint: { max: 4000, min: 2600 },
    items: 6
  },
  largeDesktop: {
    // these breakpoint values can cover screen widths with devices like laptops, desktops
    breakpoint: { max: 2600, min: 1800 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 1800, min: 1200 },
    items: 5
  },
  laptop: {
    breakpoint: { max: 1200, min: 900 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2
  },
  mobileL: {
    // large mobile devices like iPhone X, etc.
    breakpoint: { max: 600, min: 375 },
    items: 1
  },
  mobileM: {
    // medium mobile devices like iPhone 6/7, etc.
    breakpoint: { max: 375, min: 320 },
    items: 1
  },
  mobileS: {
    // small mobile devices like iPhone 5, etc.
    breakpoint: { max: 320, min: 0 },
    items: 1
  }
}

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

const Typography = styled(MuiTypography)<TypographyProps>(() => ({
  fontFamily: 'Montserrat',
  color: 'black',
  fontWeight: 600
}))

interface CardItem {
  jobTitle: string
  imageSrc: string
}

interface CreateQuestionsComponentProps {
  setInterviews: React.Dispatch<React.SetStateAction<Interview[]>>
  setInfo: React.Dispatch<React.SetStateAction<Info | undefined>>
  setDisableInterviewAnalysis: React.Dispatch<React.SetStateAction<boolean>>
  setDisableInterviewInteractiveFeedback: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateQuestionsComponent = (createQuestionsComponentProps: CreateQuestionsComponentProps) => {
  const { setInterviews, setInfo, setDisableInterviewAnalysis, setDisableInterviewInteractiveFeedback } =
    createQuestionsComponentProps
  const auth = useAuth()
  const [loading, setLoading] = useState(false)
  const [user] = useState(auth.user)
  const [recommendations, setRecommendations] = useState<CardItem[]>([])
  const [allTags, setAllTags] = useState<CardItem[]>([])
  const [startDialogOpen, setStartDialogOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>('')

  useEffect(() => {
    const fetchInterviewTags = async () => {
      const result = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))

      if ('data' in result) {
        const tags = result.data.getQuestionUsageMetaData.questionTags
        const allTagsFromDB = tags.map((item: { tag: string }) => {
          return { jobTitle: item.tag, imageSrc: '/images/cards/pexels-luis-quintero-2471234.jpg' }
        })

        const recommendationsFromDB = result.data.getQuestionUsageMetaData.recommendations

        // Mapping the recommendations from DB to the recommendations state
        const recommendationsFromDBToState = recommendationsFromDB.map((item: string) => {
          return { jobTitle: item, imageSrc: '/images/cards/pexels-luis-quintero-2471234.jpg' }
        })

        // Set the recommendations state
        setRecommendations(recommendationsFromDBToState)

        // Sort the job titles by alphabetical order
        allTagsFromDB.sort((a: any, b: any) => {
          if (a.jobTitle < b.jobTitle) {
            return -1
          }
          if (a.jobTitle > b.jobTitle) {
            return 1
          }

          return 0
        })

        setAllTags(allTagsFromDB)
      }
    }

    fetchInterviewTags()
  }, [])

  const options = allTags.map(tag => ({
    value: tag.jobTitle,
    label: tag.jobTitle
  }))

  const customStyles = {
    control: (provided: CSSObject) => ({
      ...provided,
      marginTop: '20px',
      marginBottom: '10px',
      borderRadius: '10px',
      boxShadow: 'none'
    }),
    option: (provided: CSSObject, state: any) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white'
    })
  }

  const handleChange = (selectedOption: any) => {
    handleChooseJobTitle(selectedOption.value)
  }

  const handleChooseJobTitle = (jobTitle: string) => {
    setSelectedTag(jobTitle)
    setStartDialogOpen(true)
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

        // Set up hot toast
        console.log(info)

        toast.success(info.message, { duration: 3000 })
      }
    }
  }

  const handleStartInterview = async (info: Info) => {
    console.log(info)
    setLoading(true)

    const numOfBQ = info.questionNum
    const numOfTech = 0

    try {
      // Use graphql to crate a new interview
      const result = await API.graphql(
        graphqlOperation(createUserInterviewQuestionList, {
          emailAddress: auth.user?.userEmailAddress,
          numOfBQ: numOfBQ,
          numOfTech: numOfTech,
          questionTag: info.interviewTopic
        })
      )

      if ('data' in result) {
        setInterviews(result.data.createUserInterviewQuestionList.interviewList)
        setInfo(info)

        // Verify and update the product usage
        await handleVerifyAndUpdateProductUsage()

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
        <Box sx={{ padding: 5, backgroundColor: '#F2F7FE' }}>
          <NavBar
            navBarElements={[
              { name: 'HomePage', path: '/interview' },
              { name: 'Create Practice Interview', path: undefined }
            ]}
            closeNavLink='/interview'
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: 36, mt: 2 }}>Practice Interview Topic</Typography>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt={(user?.fName || '') + (user?.lName || '') || 'john doe'}
              src={
                (process?.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL || '') + (user?.photoImgKey || '') ||
                'public/images/avatars/1.png'
              }
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Select
              options={options}
              isSearchable
              onChange={handleChange}
              placeholder='Search by topic name'
              styles={customStyles}
            />
          </Box>
          <Typography sx={{ fontSize: 20, mt: 6, mb: 6 }}>Recommendations</Typography>
          <Carousel responsive={responsive}>
            {recommendations.map((item, index) => (
              <div key={index}>
                <InterviewCard
                  sx={{ width: '260px' }}
                  jobTitle={item.jobTitle}
                  imageSrc={item.imageSrc}
                  onClick={handleChooseJobTitle}
                />
              </div>
            ))}
          </Carousel>

          <Typography sx={{ fontSize: 20, mt: 6 }}>All Topics</Typography>
          <Grid container spacing={6} sx={{ mt: 0 }}>
            {allTags.map((item, index) => (
              <Grid item xs={12} md={3} lg={3} xl={2} key={index}>
                <InterviewCard
                  sx={{ width: '220px' }}
                  jobTitle={item.jobTitle}
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
