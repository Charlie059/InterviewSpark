/* eslint-disable @typescript-eslint/no-unused-vars */
// ignore all errors and warnings in this file
// @ts-nocheck

// ignore all var not used errors in this file
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'

import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'

// import InterviewList from 'src/components/interview-list/interview-list'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import NewInterview from 'src/views/pages/dialog/new-interview'
import { SelectChangeEvent } from '@mui/material/Select'
import DeviceSelector from 'src/components/device_selector/device_selector'

type DeviceSelectorProps = {
  deviceType: 'videoinput' | 'audioInput' | 'audioOutput'
  onChange: (deviceId: string) => void
}

const WebcamConfirm: React.FC<DeviceSelectorProps> = ({ deviceType, onChange }) => {
  const [open, setOpen] = useState(false)

  const webcamRef = useRef<Webcam>(null)
  const [videoDeviceId, setVideoDeviceId] = useState('')
  const [audioInputDeviceId, setAudioInputDeviceId] = useState('')
  const [audioOutputDeviceId, setAudioOutputDeviceId] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleVideoDeviceChange = (deviceId: string) => {
    setVideoDeviceId(deviceId)
  }

  const handleAudioInputDeviceChange = (deviceId: string) => {
    setAudioInputDeviceId(deviceId)
  }

  const handleAudioOutputDeviceChange = (deviceId: string) => {
    setAudioOutputDeviceId(deviceId)
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Next
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Webcam audio={true} muted={true} ref={webcamRef} />
        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'></IconButton>
        <DialogTitle>Start Interview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For your best experience, Select and configure your camera, microphone and speakers.
          </DialogContentText>

          <DeviceSelector deviceType='videoinput' onChange={handleVideoDeviceChange} />
          <DeviceSelector deviceType='audioinput' onChange={handleAudioInputDeviceChange} />
          <DeviceSelector deviceType='audiooutput' onChange={handleAudioOutputDeviceChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

WebcamConfirm.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default WebcamConfirm
