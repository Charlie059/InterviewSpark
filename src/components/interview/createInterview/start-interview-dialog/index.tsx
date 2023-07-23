import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** MUI Imports
import { Box, IconButton, Button, Grid, Avatar, Select, MenuItem } from '@mui/material'
import { Typography as MuiTypography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArticleIcon from '@mui/icons-material/Article'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MicIcon from '@mui/icons-material/Mic'
import SpeakerIcon from '@mui/icons-material/Speaker'

import React, { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CloseIcon from '@mui/icons-material/Close'

import DeviceSelector from 'src/components/interview/createInterview/device_selector/device_selector'

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
  fontWeight: 200
}))

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
const StartInterviewDialog = (props: {
  interviewTopic: string
  open: boolean
  setOpen: (v: boolean) => void
  startInterview: (info: Info) => void
}) => {
  const questionNumChoice = [3, 4, 5, 6]
  const [questionNum, setQuestionNum] = useState(3)
  const [currentStep, setCurrentStep] = useState(0)
  const [videoinput, setVideoinput] = useState('')
  const [audioinput, setAudioinput] = useState('')
  const [audiooutput, setAudiooutput] = useState('')

  const stepContent = [
    {
      content: `Please select the number of interview questions for the mock interview and indicate whether you would like to generate questions based on resume.`,
      selectors: [
        {
          title: 'Choose Number of Questions',
          subtitle: 'Based on your own needs',
          icon: <ArticleIcon />,
          selector: (
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
          selector: (
            <DeviceSelector
              deviceType='videoinput'
              onChange={id => {
                setVideoinput(id)
                console.log(id)
              }}
              defaultDevice={videoinput}
            />
          )
        },
        {
          title: 'Choose Microphone',
          subtitle: 'Make Sure Microphone is Working',
          icon: <MicIcon />,
          selector: (
            <DeviceSelector
              deviceType='audioinput'
              onChange={id => {
                setAudioinput(id)
                console.log(id)
              }}
              defaultDevice={audioinput}
            />
          )
        },
        {
          title: 'Choose Speaker',
          subtitle: 'Make Sure Speaker is Working',
          icon: <SpeakerIcon />,
          selector: (
            <DeviceSelector
              deviceType='audiooutput'
              onChange={id => {
                setAudiooutput(id)
              }}
              defaultDevice={audiooutput}
            />
          )
        }
      ]
    }
  ]

  const handleNext = () => {
    if (currentStep === stepContent.length - 1) {
      const Info = {
        questionNum: questionNum,
        videoinput: videoinput,
        audioinput: audioinput,
        audiooutput: audiooutput,
        interviewTopic: props.interviewTopic
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

  return (
    <Box>
      <Dialog
        open={props.open}
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
            <Typography sx={{ fontSize: 36, mt: -2, fontWeight: 600, color: 'black' }} align='center'>
              {`Start Interview: ${props.interviewTopic}`}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ mr: 5, ml: 15 }}>
            <Typography sx={{ fontSize: 24, mt: 2 }}>{stepContent[currentStep].content}</Typography>
            <Box sx={{ mt: 10, mb: 2 }}>
              {stepContent[currentStep].selectors.map((s, i) => (
                <Box sx={{ mb: 4 }} key={i}>
                  <SelectModule title={s.title} subtitle={s.subtitle} icon={s.icon} selectElement={s.selector} />
                </Box>
              ))}
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
  )
}
StartInterviewDialog.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default StartInterviewDialog
