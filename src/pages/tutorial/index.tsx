// ** React Imports
import { useState, useEffect, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStep from '@mui/material/Step'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { API, graphqlOperation } from 'aws-amplify'
import { getUserEducations, getUserProfileByUsername, getUserWorkHistories } from 'src/graphql/queries'

// ** Step Components Imports
import TutorialEduCard from 'src/components/tutorial/TutorialEduCard'
import TutorialTopicCard from '../../components/tutorial/TutorialTopicCard'
import CTAPage from '../../components/interview/interviewProfile/CTAPage/CTAPage'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useAuth } from 'src/hooks/useAuth'
import { Education, UserProfileViewTypes, WorkHistory } from '../../context/types'
import { Profile } from '../../API'
import UserOverview from '../../components/profile/UserOverview'
import BlankLayout from 'src/@core/layouts/BlankLayout'

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

const Tutorial = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const auth = useAuth()
  const user = auth.user?.userName

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }
  const [stepContent, setStepContent] = useState<React.ReactNode>()
  let userData: Profile
  const [eduDatas, setEduDatas] = useState<Education[]>([])
  let workDatas: WorkHistory[] = []

  async function getData() {
    // Get userProfile data from GraphQL
    const userDatastore = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: user }))
    if ('data' in userDatastore) {
      userData = userDatastore.data.getUserProfileByUsername
      const eduData = await API.graphql(
        graphqlOperation(getUserEducations, { emailAddress: auth.user?.userEmailAddress })
      )
      const workData = await API.graphql(
        graphqlOperation(getUserWorkHistories, { emailAddress: auth.user?.userEmailAddress })
      )
      if ('data' in eduData) {
        setEduDatas(eduData.data.getUserEducations.educations)
        console.log('eduData get', eduData)
      }
      if ('data' in workData) {
        workDatas = workData.data.getUserWorkHistories.workHistory
      }
    }
  }

  const handleRefresh = () => {
    getData().then(() => {
      getStepContent(activeStep)
    })
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        setStepContent(<UserOverview user={user} data={userData} type={UserProfileViewTypes.tutorial} />)
        break
      case 1:
        setStepContent(<TutorialEduCard eduDatas={eduDatas} setEduDatas={setEduDatas} type={'tutorial'} refresh={handleRefresh} />)
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
      console.log(userData, eduDatas, workDatas)
      getStepContent(activeStep)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    console.log("I got something!: ", event.target )
  }
  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon='mdi:arrow-left' />}
        >
          Previous
        </Button>
        <Button
          type="submit"
          variant='contained'
          color={stepCondition ? 'success' : 'primary'}
          {...(!stepCondition ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
          onClick={() => (stepCondition ? alert('Submitted..!!') : handleNext())}
        >
          {stepCondition ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'pointer' } }}>
          <Stepper connector={<></>} activeStep={activeStep} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                >
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
      <div style={{ width: '80%' }}>
        <CardContent>
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit}>


            <Grid item xs={12}>
              {stepContent}
            </Grid>
            <Grid item xs={12}>
              {renderFooter()}
            </Grid>
            </form>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}

Tutorial.acl = {
  action: 'read',
  subject: 'acl-page'
}

Tutorial.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Tutorial
