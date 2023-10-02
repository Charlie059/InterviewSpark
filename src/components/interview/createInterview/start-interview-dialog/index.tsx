import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** MUI Imports
import {
  Box,
  IconButton,
  Button,
  Grid,
  Avatar,
  Select,
  MenuItem,
  LinearProgress,
  Typography,
  useTheme,
  ButtonBase,
  Link
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MicIcon from '@mui/icons-material/Mic'
import SpeakerIcon from '@mui/icons-material/Speaker'
import StorageIcon from '@mui/icons-material/Storage'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import DeviceSelector from 'src/components/interview/createInterview/device_selector/device_selector'
import Logger from 'src/middleware/loggerMiddleware'
import { useAuth } from 'src/hooks/useAuth'
import { useFetchSubscription } from 'src/hooks/useFetchSubscription'
import toast from 'react-hot-toast'
import { useSubscription } from 'src/hooks/useSubscription'
import AlertComponent from 'src/components/Base/Alert/Alert'

interface Info {
  questionNum: number
  videoinput: string
  audioinput: string
  audiooutput: string
  interviewTopic: string
}
const SelectModule = (props: {
  title: string
  subtitle: string
  icon: React.ReactElement
  selectElement: JSX.Element
}) => {
  return (
    <Grid container spacing={4} width={'95%'}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: '3.5rem', height: '3.5rem' }}>{props.icon}</Avatar>
          <Box sx={{ ml: 5 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{props.title}</Typography>
            <Typography sx={{ fontSize: 15 }}>{props.subtitle}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        {props.selectElement}
      </Grid>
    </Grid>
  )
}

const stepContent = [
  {
    content: `Please select the number of interview questions for the practice interview`,
    selectors: [
      {
        title: 'Choose Number of Questions',
        subtitle: 'Based on your own needs',
        icon: <ArticleIcon />,
        type: 'questionNum'
      },
      {
        title: 'Usage',
        subtitle: 'Your current usage',
        icon: <StorageIcon />,
        type: 'usage'
      }
    ]
  },
  {
    content: `For your best experience, select and configure your camera, microphone and speakers.`,
    selectors: [
      {
        title: 'Choose Camera',
        subtitle: 'Make Sure Camera is Working',
        icon: <CameraAltIcon />,
        type: 'videoinput'
      },
      {
        title: 'Choose Microphone',
        subtitle: 'Make Sure Microphone is Working',
        icon: <MicIcon />,
        type: 'audioinput'
      },
      {
        title: 'Choose Speaker',
        subtitle: 'Make Sure Speaker is Working',
        icon: <SpeakerIcon />,
        type: 'audiooutput'
      }
    ]
  }
]

const ToastContent = () => (
  <div>
    No Microphone Found: Please allow access to your microphone to start interview and refresh the page. Please refer to
    the{' '}
    <Link href={process.env.NEXT_PUBLIC_FAQ_LINK}>
      <a>FAQ</a>
    </Link>{' '}
    for more information.
  </div>
)

const StartInterviewDialog = (props: {
  interviewTopic: string
  open: boolean
  setOpen: (v: boolean) => void
  startInterview: (info: Info) => void
}) => {
  const theme = useTheme()
  const questionNumChoice = [1, 2, 3, 4, 5, 6]
  const [questionNum, setQuestionNum] = useState<number>(3)
  const [currentStep, setCurrentStep] = useState(0)
  const [videoinput, setVideoinput] = useState('')
  const [audioinput, setAudioinput] = useState('')
  const [audiooutput, setAudiooutput] = useState('')
  const [planType, setPlanType] = useState('Free')
  const [currentUsage, setCurrentUsage] = useState(1)
  const [totalUsage, setTotalUsage] = useState(10)
  const auth = useAuth()
  const { userSubscriptionProductsList } = useFetchSubscription(auth.user?.userEmailAddress || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // Hooks
  const { handleUserClickPlanUpgrade } = useSubscription(null)

  useEffect(() => {
    const fetchUsage = () => {
      try {
        const productNumUsage =
          userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscriptionProduct[0].productNumUsage
        const productTotalNumUsage =
          userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscriptionProduct[0].productTotalNumUsage
        const planType = userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscription.planType

        setPlanType(planType)
        setCurrentUsage(productNumUsage)
        setTotalUsage(productTotalNumUsage)
      } catch (err) {
        Logger.error('Error in fetching usage', err)
      }
    }

    fetchUsage()
  }, [userSubscriptionProductsList])

  // Get device list
  useEffect(() => {
    toast.loading('Loading Devices', {
      duration: 3000
    })
    const getDeviceList = async () => {
      try {
        // Request both permissions
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      } catch (initialError) {
        console.log('Error when requesting both permissions:', initialError)

        // If both permissions are denied, try requesting only audio
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true })
        } catch (audioError) {
          console.log('Audio error:', audioError)
          toast.error(<ToastContent />, {
            duration: 8000
          })
        }

        // If both permissions are denied, try requesting only video
        try {
          await navigator.mediaDevices.getUserMedia({ video: true })
        } catch (videoError) {
          console.log('Video error:', videoError)
          toast.error(
            'No Camera Found: You can do the interview without a camera. If you want to use one, allow camera access and refresh the page.',
            {
              duration: 8000
            }
          )
        }
      }
    }

    getDeviceList()
  }, [])

  const handleNext = () => {
    if (currentStep === stepContent.length - 1) {
      const Info = {
        questionNum: questionNum,
        videoinput: videoinput,
        audioinput: audioinput,
        audiooutput: audiooutput,
        interviewTopic: props.interviewTopic
      }

      // If user is not guarantee microphone then don't start the interview
      if (audioinput === '' || !audioinput || audiooutput === '' || !audiooutput) {
        setIsAlertOpen(true)

        return
      }

      props.startInterview(Info)
      handleClose()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      props.setOpen(false)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    props.setOpen(false)
    setTimeout(() => {
      setCurrentStep(0)
    }, 300)
  }

  const handleClickToSubscribe = async () => {
    // Call GraphQL API to subscribe
    try {
      setIsLoading(true)

      // Log the event
      Logger.info('User clicked plan upgrade')

      // Check if we have user's email
      if (!auth.user?.userEmailAddress) {
        throw new Error('No user email found')
      }

      Logger.debug('User email found', auth.user?.userEmailAddress)

      const result = await handleUserClickPlanUpgrade()
      setIsLoading(false)
      if (result.isSuccessful) {
        toast.success('Redirecting to Stripe payment page')

        // Redirect to the stripe payment page
        window.location.href = result.infoJSON.url
      } else {
        toast.error('Error upgrading plan')
        Logger.error('Error upgrading plan', result)
      }
    } catch (error) {
      Logger.error('Error in subscription request', error)
      toast.error('Subscription request failed. Please try again later.', {
        position: 'top-center',
        duration: 5000
      })

      return { isSuccessful: false }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertComponent
        open={isAlertOpen}
        title={'Cannot Start Interview'}
        message={
          <>
            Please make sure you have a microphone and speaker connected to your computer. If you cannot access a
            microphone, please refer to our{' '}
            <Link href={process.env.NEXT_PUBLIC_FAQ_LINK}>
              <a>FAQ Page</a>
            </Link>{' '}
            for more information.
          </>
        }
        onClose={function (): void {
          setIsAlertOpen(false)
        }}
        onCancel={function (): void {
          setIsAlertOpen(false)
        }}
        onConfirm={function (): void {
          setIsAlertOpen(false)
        }}
      />

      <Box>
        <Dialog
          open={props.open}
          scroll='body'
          disableEscapeKeyDown
          maxWidth='md'
          fullWidth={true}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose()
            }
          }}
        >
          <Box>
            <DialogTitle>
              <Grid container justifyContent='flex-end'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Typography variant={'body1'} align='center' sx={{ fontSize: '35px', fontWeight: 600 }}>
                {`Start Interview: ${props.interviewTopic}`}
              </Typography>
              <Typography sx={{ fontSize: 18, mt: 2, color: 'black', fontWeight: 600 }} align='center'>
                <Button
                  variant='contained'
                  disabled={true}
                  style={{
                    marginLeft: '8px',
                    color: 'white',
                    backgroundColor: planType === 'Free' ? '#6c757d' : '#3f51b5',
                    textTransform: 'none'
                  }}
                >
                  {planType}
                </Button>
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ mr: 5, ml: 15 }}>
              <Typography sx={{ fontSize: 24, mt: 2 }}>{stepContent[currentStep].content}</Typography>
              <Box sx={{ mt: 10, mb: 2 }}>
                {stepContent[currentStep].selectors.map((s, i) => {
                  let selector
                  switch (s.type) {
                    case 'questionNum':
                      selector = (
                        <Select
                          sx={{ width: '100%' }}
                          value={questionNum}
                          onChange={e => {
                            setQuestionNum(e.target.value as number)
                          }}
                        >
                          {questionNumChoice.map(n => (
                            <MenuItem key={n} value={n}>
                              {`${n} Questions`}
                            </MenuItem>
                          ))}
                        </Select>
                      )
                      break
                    case 'usage':
                      selector = (
                        <Grid container direction='column' justifyContent='center'>
                          <Grid item style={{ position: 'relative', height: '28px' }}>
                            {planType === 'Free' && (
                              <LinearProgress
                                style={{ height: '100%' }}
                                variant='determinate'
                                value={(currentUsage / totalUsage) * 100}
                              />
                            )}
                            {planType === 'Premium' && (
                              <LinearProgress style={{ height: '100%' }} variant='determinate' value={0} />
                            )}
                            <Typography
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '13px',
                                color: '#D4D4D4',
                                fontWeight: 600
                              }}
                              align='center'
                            >
                              {planType === 'Free' ? `${currentUsage} / ${totalUsage}` : 'Infinite'}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant={'body2'}
                              sx={{
                                fontSize: 14,
                                marginTop: '8px',
                                fontWeight: 500,
                                color:
                                  planType === 'Free'
                                    ? theme.palette.mode === 'light'
                                      ? theme.palette.error.light
                                      : theme.palette.error.dark
                                    : theme.palette.mode === 'light'
                                    ? theme.palette.info.light
                                    : theme.palette.info.light
                              }}
                              align='center'
                            >
                              {planType === 'Free'
                                ? currentUsage / totalUsage !== 1
                                  ? 'Limited AI practices available on Free Tier.'
                                  : 'AI feedback depleted! '
                                : 'Enjoy unlimited interviews with AI feedback.'}
                              {planType === 'Free' && currentUsage / totalUsage === 1 && (
                                <ButtonBase onClick={handleClickToSubscribe} disabled={isLoading}>
                                  <Typography
                                    variant='body2'
                                    sx={{
                                      color: '#3f51b5',
                                      textDecoration: 'underline',
                                      cursor: 'pointer',
                                      fontSize: 11,
                                      fontWeight: 800
                                    }}
                                  >
                                    Click here to upgrade.
                                  </Typography>
                                </ButtonBase>
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                      break
                    case 'videoinput':
                      selector = (
                        <DeviceSelector
                          deviceType='videoinput'
                          onChange={id => {
                            setVideoinput(id)
                          }}
                          defaultDevice={videoinput}
                        />
                      )
                      break
                    case 'audioinput':
                      selector = (
                        <DeviceSelector
                          deviceType='audioinput'
                          onChange={id => {
                            setAudioinput(id)
                          }}
                          defaultDevice={audioinput}
                        />
                      )
                      break
                    case 'audiooutput':
                      selector = (
                        <DeviceSelector
                          deviceType='audiooutput'
                          onChange={id => {
                            setAudiooutput(id)
                          }}
                          defaultDevice={audiooutput}
                        />
                      )
                      break
                    default:
                      selector = <div>Default selector</div>
                  }

                  return (
                    <Box sx={{ mb: 4 }} key={i}>
                      <SelectModule title={s.title} subtitle={s.subtitle} icon={s.icon} selectElement={selector} />
                    </Box>
                  )
                })}
              </Box>
            </DialogContent>

            <DialogActions className='dialog-actions-dense'>
              <Box sx={{ my: 6, mx: 15, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button onClick={handleBack} variant='contained' color='secondary'>
                  {currentStep === 0 ? 'Cancel' : 'Back'}
                </Button>
                <Button onClick={handleNext} variant='contained'>
                  {currentStep === 0 ? 'Next' : 'Start Interview'}
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </>
  )
}

export default StartInterviewDialog
