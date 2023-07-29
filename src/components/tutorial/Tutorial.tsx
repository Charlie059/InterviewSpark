// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStep from '@mui/material/Step'
import CloseIcon from '@mui/icons-material/Close'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { API, graphqlOperation } from 'aws-amplify'
import { getUserProfileByUsername } from 'src/graphql/queries'

// ** Step Components Imports
import TutorialEduCard from 'src/components/tutorial/TutorialEduCard'
import TutorialTopicCard from '../../components/tutorial/TutorialTopicCard'
import CTAPage from '../../components/interview/interviewProfile/CTAPage/CTAPage'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useAuth } from 'src/hooks/useAuth'
import { Education, UserProfileViewTypes } from '../../context/types'
import { Profile } from '../../API'
import UserOverview from '../../components/profile/UserOverview'
import { createUserEducation } from 'src/graphql/mutations'
import { Dialog, IconButton } from '@mui/material'
import Logger from 'src/middleware/loggerMiddleware'

const steps = [
  {
    title: 'Profile',
    subtitle: 'Fill out user profile'
  },
  {
    title: 'Education',
    subtitle: 'Fill out education'
  },
  {
    title: 'Topic Interested',
    subtitle: 'Select an interested topic'
  },
  {
    title: 'Interview',
    subtitle: 'Start a mock interview'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(4)
  },
  '& .MuiStepLabel-root': {
    padding: 0,
    cursor: 'pointer'
  }
}))

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  minWidth: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

interface TutorialProps {
  tutorialDialogOpen: boolean
  setTutorialDialogOpen: (open: boolean) => void
}
const Tutorial = (tutorialProps: TutorialProps) => {
  // ** Props
  const { tutorialDialogOpen, setTutorialDialogOpen } = tutorialProps

  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [stepContent, setStepContent] = useState<React.ReactNode>()
  const [eduData, setEduData] = useState<Education[]>([])
  const auth = useAuth()
  const user = auth.user?.userName
  let userData: Profile
  const [width, setWidth] = useState(0)

  // ** Ref
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      setWidth(gridRef.current.getBoundingClientRect().width)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridRef.current, width])

  useEffect(() => {
    function handleResize() {
      if (gridRef.current !== null) {
        setWidth(gridRef.current.getBoundingClientRect().width)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const updateEduProfile = async (eduData: Education) => {
    // If no existing education entry is found, create a new one
    const eduInput = {
      emailAddress: auth.user?.userEmailAddress,
      eduDegree: eduData && eduData.eduDegree ? eduData.eduDegree : '',
      eduFieldStudy: eduData && eduData.eduFieldStudy ? eduData.eduFieldStudy : '',
      eduSchool: eduData && eduData.eduSchool ? eduData.eduSchool : '',
      eduStartDate: new Date(Date.now()).toISOString().split('T')[0],
      eduEndDate: new Date(Date.now()).toISOString().split('T')[0]
    }

    try {
      const eduResult = await API.graphql(graphqlOperation(createUserEducation, eduInput))
      Logger.info('created edu data', eduResult)
    } catch (e) {
      Logger.error('Error creating education entry:', e)
    }
  }

  async function getData() {
    // Get userProfile data from GraphQL
    const userDatastore = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: user }))
    if ('data' in userDatastore) {
      userData = userDatastore.data.getUserProfileByUsername
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        setStepContent(<UserOverview user={user} data={userData} type={UserProfileViewTypes.tutorial} />)
        break
      case 1:
        setStepContent(<TutorialEduCard setEduData={setEduData} />)
        break
      case 2:
        setStepContent(<TutorialTopicCard setSelectedTopic={setSelectedTopic} />)
        break
      case 3:
        setStepContent(<CTAPage isTutorial={true} selectedTopic={selectedTopic} />)
        break
      default:
        setStepContent(null)
        break
    }
  }

  useEffect(() => {
    getData().then(() => {
      if (activeStep === 2 && eduData && eduData[0]) updateEduProfile(eduData[0])

      getStepContent(activeStep)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {activeStep !== 3 ? (
          <Button
            variant='contained'
            color={stepCondition ? 'success' : 'primary'}
            {...(!stepCondition ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
            onClick={() => (stepCondition ? alert('Submitted..!!') : handleNext())}
          >
            {'Next'}
          </Button>
        ) : (
          <></>
        )}
      </Box>
    )
  }

  return (
    <Dialog
      open={tutorialDialogOpen}
      scroll='body'
      PaperProps={{
        sx: {
          width: { sm: '100%', md: '60%', lg: '70%' },
          maxWidth: '95%!important',
          height: 'auto'
        }
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box display='flex' justifyContent='center' position='relative'>
            <Typography variant='h4' marginTop={'40px'}>
              Welcome to the InterviewSpark
            </Typography>
            <IconButton
              edge='end'
              color='inherit'
              onClick={() => {
                setTutorialDialogOpen(false)
              }}
              sx={{ position: 'absolute', right: '20px', top: '10px' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box display='flex' justifyContent='center' position='relative'>
            <Typography variant='body1'>Your guide to acing the next big interview!</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <StepperHeaderContainer>
            <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'pointer' } }}>
              <Stepper connector={<></>} activeStep={activeStep} orientation='vertical'>
                {steps.map((step, index) => {
                  return (
                    <Step key={index} sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}>
                      <StepLabel>
                        <div className='step-label'>
                          <Typography className='step-number'>{`0${index + 1}`}</Typography>
                          <div>
                            <Typography className='step-title'>{step.title}</Typography>
                            <Typography className='step-subtitle'>{step.subtitle}</Typography>
                          </div>
                        </div>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </StepperWrapper>
          </StepperHeaderContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} ref={gridRef}>
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Box sx={{ padding: '32px', width: width }}>{stepContent}</Box>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginLeft: '20px', marginRight: '20px', marginBottom: '10px' }}>
          {renderFooter()}
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default Tutorial
