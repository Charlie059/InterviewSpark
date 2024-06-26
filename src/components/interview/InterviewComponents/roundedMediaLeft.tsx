/***********************************************************************************************
  Name: RoundedMediaLeft.tsx
  Description: This file contains the custom hook for interview.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/16
  Update Date: 2023/06/16
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { FC, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import styled from 'styled-components'
import VideoIconButton from './videobutton'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import {
  Card
} from '@mui/material'

enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}

interface RoundedMediaProps {
  videoInput: string
  audioInput: string
  status: InterviewStatus
  getWebcamRef: any
  getVideoBlob: () => Blob | null
  isVideoEnabled: boolean
  isReading: boolean
  setVideoOn: () => void
  setVideoOff: () => void
  startReview: () => void
}

const ReviewButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
`

const FrostedGlassEffect = styled.div`
  backdrop-filter: blur(8px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`

const RoundedDiv = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 70%;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledWebcamContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ isVisible }) => (isVisible ? 2 : -1)};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Img = styled('img')(({}) => ({
  position:'absolute',
  bottom: 0,
  width: '70%',
  opacity: 1,
  userSelect: 'none',
  userDrag: 'none',
  zIndex: 1
}))

const Layer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 3;
`

export const RoundedMediaLeft: FC<RoundedMediaProps> = ({
  videoInput,
  audioInput,
  status,
  getWebcamRef,
  getVideoBlob,
  isVideoEnabled,
  isReading,
  setVideoOn,
  setVideoOff,
  startReview
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [videoInterview] = useState<boolean>(videoInput !== '')

  const handleReviewClick = () => {
    startReview()
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const shouldShowWebcam =
    isVideoEnabled && [InterviewStatus.FinishedQuestion, InterviewStatus.Reviewing].indexOf(status) === -1

  const shouldShowImg =
    !isVideoEnabled && [InterviewStatus.FinishedQuestion, InterviewStatus.Reviewing].indexOf(status) === -1

  const videoConstraints = {
    deviceId: videoInput
  }

  const audioConstraints = {
    deviceId: audioInput
  }

  return (
    <Card sx={{width:"100%"}}>
      <RoundedDiv>

      {videoInterview ? (
        <>
          <StyledWebcamContainer isVisible={shouldShowWebcam}>
            <Webcam
              audio={true}
              muted={true}
              ref={getWebcamRef}
              videoConstraints={videoConstraints}
              audioConstraints={audioConstraints}
            />{' '}
          </StyledWebcamContainer>
          {shouldShowImg && (
            <Img alt='Encouragement Illustration' src='/images/pages/create-app-dialog-illustration-light.png' />
          )}
        </>
      ) : (
        <Img alt='Encouragement Illustration' src='/images/pages/create-app-dialog-illustration-light.png' />
      )}

      {status !== InterviewStatus.FinishedQuestion && status !== InterviewStatus.Reviewing && videoInterview && (
        <Layer>
          <VideoIconButton
            onButtonClick={function (): void {
              if (isVideoEnabled) {
                setVideoOff()
              } else {
                setVideoOn()
              }
            }}
          />
        </Layer>
      )}
      {status === InterviewStatus.Reviewing && (
        <video
          style={{ position: 'absolute', top: '0', left: '0', zIndex: 2, objectFit: 'cover' }}
          width='100%'
          height='100%'
          src={URL.createObjectURL(getVideoBlob()!)}
          controls
          autoPlay={true}
        />
      )}
      {status === InterviewStatus.FinishedQuestion && (
        <>
          {!isReading && (
            <>
              <ReviewButton onClick={handleReviewClick}>
                <PlayCircleIcon sx={{ width: '100%', height: '100%', color: '#EBEBEB' }} />
              </ReviewButton>
              <FrostedGlassEffect />
            </>
          )}
          <Img alt='Encouragement Illustration' src='/images/pages/create-app-dialog-illustration-light.png' />
        </>
      )}
      </RoundedDiv>
    </Card>
  )
}
