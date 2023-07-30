/***********************************************************************************************
  Name: TopArea.tsx
  Description: This file contains the UI for interview top area.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/19
  Update Date: 2023/06/19
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { forwardRef } from 'react'
import styled from 'styled-components'
import Timer from './timer'
import { Card, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface TimerHandle {
  start: () => void
  stop: () => void
  reset: () => void
}

// Define states for the interview process
enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}

const TopAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13vh;
  position: relative;
`

const MenuCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: 20px;

  /* Small screens */
  @media screen and (max-width: 600px) {
    width: 25px;
    height: 25px;
  }

  /* Medium screens */
  @media screen and (min-width: 601px) and (max-width: 900px) {
    width: 30px;
    height: 30px;
  }

  /* Large screens */
  @media screen and (min-width: 901px) and (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }

  /* Extra Large screens */
  @media screen and (min-width: 1201px) {
    width: 45px;
    height: 45px;
  }
`

interface TimerProps {
  initialTime: number
  onComplete: () => void
  status: InterviewStatus
}

interface TopAreaProps extends TimerProps {
  onExit: () => void
}

function getWindowDimensions() {
  const { innerWidth: width } = window

  return width
}

const TopArea = forwardRef<TimerHandle, TopAreaProps>((props, ref) => {
  const screenWidth = getWindowDimensions()

  let iconSize
  if (screenWidth <= 600) {
    // Small screens
    iconSize = '19px'
  } else if (screenWidth <= 900) {
    // Medium screens
    iconSize = '20px'
  } else if (screenWidth <= 1200) {
    // Large screens
    iconSize = '20px'
  } else {
    // Extra Large screens
    iconSize = '25px'
  }

  return (
    <TopAreaContainer>
      <Timer ref={ref} initialTime={props.initialTime} onComplete={props.onComplete} status={props.status} />
      <MenuCard>
        <IconButton onClick={props.onExit}>
          <CloseIcon sx={{ width: iconSize }} />
        </IconButton>
      </MenuCard>
    </TopAreaContainer>
  )
})

export default TopArea
