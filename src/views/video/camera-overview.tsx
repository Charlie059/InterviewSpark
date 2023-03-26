import React from 'react'
import Webcam from 'react-webcam'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

const CameraContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'theme.palette.background.default'
}))

function CameraOverview() {
  const videoConstraints = {
    width: { min: 340, max: 520 },
    height: { min: 100, max: 230 },
    aspectRatio: 1
  }

  const StyledWebcam = styled(Webcam)(({ theme }) => ({
    borderRadius: theme.spacing(2), // Adjust the value for more or less rounded corners
    overflow: 'hidden'
  }))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          marginLeft: 25
        }}
      ></Box>
      <CameraContainer>
        <Typography variant='subtitle2' gutterBottom>
          Make sure your camera is working properly
        </Typography>
        <StyledWebcam audio={false} videoConstraints={videoConstraints} />
      </CameraContainer>
    </Box>
  )
}

export default CameraOverview
