// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
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
import { getUserProfileByUsername } from 'src/graphql/queries'

// ** Step Components Imports
import UserProfile from 'src/components/profile/UserProfile'
import ResumeScanPage from '../resume'
import InterviewPage from '../interview'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { useAuth } from 'src/hooks/useAuth'

const steps = [
  {
    title: 'Profile',
    subtitle: 'Fill out user profile'
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

  async function getData() {
    const userName = auth.user?.userName

    // Get userProfile data from GraphQL
    let data = null
    const userDatastore = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: userName }))
    if ('data' in userDatastore) {
      data = userDatastore.data.getUserProfileByUsername

      return data
    }
  }

  const [stepContent, setStepContent] = useState<React.ReactNode>()

  useEffect(() => {
    const getStepContent = async step => {
      switch (step) {
        case 0:
          const userData = await getData()
          setStepContent(<UserProfile user={user} data={userData} type={'tutorial'} />)
          break
        case 1:
          setStepContent(<ResumeScanPage type={'tutorial'} />)
          break
        case 2:
          setStepContent(<InterviewPage />)
          break
        default:
          setStepContent(null)
          break
      }
    }
    getStepContent(activeStep)
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
      <div>
        <CardContent>
          {stepContent}
          {renderFooter()}
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
