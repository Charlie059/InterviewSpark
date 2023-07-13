// ** React Imports
import {useState, useEffect} from 'react'

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
import {getUserEducations, getUserProfileByUsername, getUserWorkHistories} from 'src/graphql/queries'

// ** Step Components Imports
import UserProfile from 'src/components/profile/UserProfile'
import ResumeScanPage from '../resume'
import InterviewPage from '../interview'
import TutorialEduCard from 'src/components/tutorial/TutorialEduCard'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useAuth } from 'src/hooks/useAuth'
import {Education, WorkHistory} from "../../context/types";
import {Profile} from "../../API";

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
    title: 'Resume',
    subtitle: 'Upload resume'
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
  let userData: Profile;
  let eduDatas: Education[]=[];
  let workDatas: WorkHistory[]=[];

  async function getData() {

    // Get userProfile data from GraphQL
    const userDatastore = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: user }))
    if ('data' in userDatastore) {
      userData=userDatastore.data.getUserProfileByUsername
      const eduData = await API.graphql(graphqlOperation(getUserEducations, { emailAddress: auth.user?.userEmailAddress }))
      const workData = await API.graphql(
        graphqlOperation(getUserWorkHistories, { emailAddress: auth.user?.userEmailAddress  })
      )
      if ('data' in eduData) {
        eduDatas = eduData.data.getUserEducations.educations
        console.log("eduData get", eduData)
      }
      if ('data' in workData) {
        workDatas = workData.data.getUserWorkHistories.workHistory
      }

    }
  }


  const handleRefresh = () =>{
    getData().then(()=>{
      getStepContent(activeStep)
    })
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        setStepContent(<UserProfile user={user} data={userData} type={'tutorial'} />)
        break
      case 1:
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setStepContent(<TutorialEduCard eduDatas={eduDatas} type={'tutorial'} refresh={handleRefresh}/>)
        break
      case 2:
        setStepContent(<ResumeScanPage type={'tutorial'} />)
        break
      case 3:
        setStepContent(<InterviewPage />)
        break
      default:
        setStepContent(null)
        break
    }
  }

  useEffect(() => {
    getData().then(()=>{
      console.log(userData,eduDatas,workDatas)
      getStepContent(activeStep)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

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
            <Grid item xs={12}>{stepContent}</Grid>
            <Grid item xs={12}>{renderFooter()}</Grid>
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

export default Tutorial
