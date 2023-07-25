import React, { useState } from 'react'
import { Box, Grid, IconButton, TextField } from '@mui/material'

import MuiTypography, { TypographyProps } from '@mui/material/Typography'

import { NavBar } from 'src/components/interview/createInterview/navigation-bar'
import MockInterviewCard from 'src/components/interview/createInterview/mock-interview-card'
import AlphabeticSelectList from 'src/components/interview/createInterview/alphabetic-select-list'
import StartInterviewDialog from 'src/components/interview/createInterview/start-interview-dialog'

import Avatar from '@mui/material/Avatar'
import Icon from 'src/@core/components/icon'

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

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}

// TODO: Get the list of job titles from the backend
const top100Films = [{ label: 'Software Engineer' }]

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
  const [recommendations] = useState<CardItem[]>([
    { jobTitle: 'Time Management', imageSrc: '/images/cards/pexels-luis-quintero-2471234.jpg' }
  ])

  const [allJobTitles] = useState<{ name: string }[]>(
    top100Films.map(item => {
      return { name: item.label }
    })
  )
  const [searchKeyWord, setSearchKeyWord] = useState<string>('')
  const [startDialogOpen, setStartDialogOpen] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('')

  const handleChooseJobTitle = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle)
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
        console.log('Verify and update product usage successfully')
      } else if (info) {
        // Translate to JSON object
        const info = JSON.parse(res.info)

        // Set up hot toast
        console.log(info)

        // if(info.)
        toast.success(info.message, { duration: 3000 })
      }
    }
  }

  const handleStartInterview = async (info: Info) => {
    console.log(info)
    setLoading(true)

    // Setup the 30 percent of BQ and 70 percent of Tech
    const numOfBQ = info.questionNum
    const numOfTech = 0

    // Change space to '-'
    // info.interviewTopic = info.interviewTopic.replace(/\s+/g, '-').toLowerCase()

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
              { name: 'Create Mock Interview', path: undefined }
            ]}
            closeNavLink='/interview'
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: 36, mt: 2 }}>Mock Interview Topic</Typography>
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt={(user?.fName || '') + (user?.lName || '') || 'john doe'}
              src={
                (process?.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL || '') + (user?.photoImgKey || '') ||
                'public/images/avatars/1.png'
              }
            />
          </Box>
          <TextField
            size='small'
            value={searchKeyWord}
            onChange={e => setSearchKeyWord(e.target.value)}
            placeholder='Search by Job Title'
            autoComplete={'search-job-title'}
            id={'search-job-title'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearchKeyWord('')}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              ),
              sx: { bgcolor: 'background.paper' }
            }}
            sx={{ mt: 9, mb: 0, width: '100%' }}
          />
          <Typography sx={{ fontSize: 20, mt: 6 }}>Recommendations</Typography>
          <Grid container spacing={6} sx={{ mt: 0 }}>
            {recommendations
              .filter(item => item.jobTitle.toLowerCase().includes(searchKeyWord.toLowerCase()))
              .map((item, index) => (
                <Grid item xs={12} md={3} lg={3} xl={2} key={index}>
                  <MockInterviewCard jobTitle={item.jobTitle} imageSrc={item.imageSrc} onClick={handleChooseJobTitle} />
                </Grid>
              ))}
          </Grid>
          <Typography sx={{ fontSize: 20, mt: 6, mb: 2 }}>Sort by Job Title</Typography>
          <AlphabeticSelectList
            list={allJobTitles.filter(item => item.name.toLowerCase().includes(searchKeyWord.toLowerCase()))}
            onClickItem={handleChooseJobTitle}
            imageSrc={[
              ...Array.from({ length: 26 }, (_, index) => `/images/cards/${String.fromCharCode(97 + index)}.jpg`),
              '/images/cards/all.jpg'
            ]}
          />

          <StartInterviewDialog
            open={startDialogOpen}
            setOpen={setStartDialogOpen}
            interviewTopic={selectedJobTitle}
            startInterview={handleStartInterview}
          />
        </Box>
      )}
    </>
  )
}

export default CreateQuestionsComponent
