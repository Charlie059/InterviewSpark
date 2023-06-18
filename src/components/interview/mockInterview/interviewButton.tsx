import React, { FC, useEffect, useState } from 'react'
import { IconButton, Card } from '@mui/material'
import styled from 'styled-components'
import PlayButtonIcon from '@mui/icons-material/PlayArrowSharp'
import StopButtonIcon from '@mui/icons-material/StopSharp'
import NextButtonIcon from '@mui/icons-material/SkipNextSharp'
import RetryButtonIcon from '@mui/icons-material/ReplaySharp'

export enum InterviewStatus {
  Interviewing = 'INTERVIEWING',
  FinishedQuestion = 'FINISHED_QUESTION',
  Reviewing = 'REVIEWING',
  SavedQuestion = 'SAVED_QUESTION',
  FinishedInterview = 'FINISHED_INTERVIEW',
  Loading = 'LOADING',
  NotStarted = 'NOT_STARTED'
}

interface InterviewButtonProps {
  status: InterviewStatus
  isReading: boolean
  onButtonClick: (status: InterviewStatus) => void
  onRetryClick: () => void
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonCard = styled(Card)<{ color: string; size: number; status: InterviewStatus }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  ${props => (props.status === InterviewStatus.Loading ? 'display: none' : '')}
  margin: 0 5px;
`

const InterviewButton: FC<InterviewButtonProps> = ({ status, isReading, onButtonClick, onRetryClick }) => {
  const [buttonSize, setButtonSize] = useState(40)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setButtonSize(50) // Phones
      } else if (window.innerWidth < 768) {
        setButtonSize(40) // Tablets
      } else if (window.innerWidth < 1024) {
        setButtonSize(40) // Laptops
      } else {
        setButtonSize(50) // Large displays
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleButtonClick = (buttonStatus: InterviewStatus) => {
    onButtonClick(buttonStatus)
  }

  let buttonIcon = null
  let buttonDisabled = false
  let ButtonCardColor = ''

  switch (status) {
    case InterviewStatus.NotStarted:
      buttonIcon = <PlayButtonIcon sx={{ width: '100%', height: '100%', color: '#FFFFFF' }} />
      ButtonCardColor = '#787EFF'
      break
    case InterviewStatus.Interviewing:
      buttonIcon = isReading ? (
        <StopButtonIcon sx={{ width: '100%', height: '100%', color: '#F3F3F3' }} />
      ) : (
        <StopButtonIcon sx={{ width: '100%', height: '100%', color: '#FF6C4B' }} />
      )
      ButtonCardColor = isReading ? '#E2E2E2' : '#DFDFDF'
      buttonDisabled = isReading
      break
    case InterviewStatus.FinishedQuestion:
      buttonIcon = <NextButtonIcon sx={{ width: '100%', height: '100%', color: '#FFFFFF' }} />
      ButtonCardColor = isReading ? '#E2E2E2' : '#666CFF'
      buttonDisabled = isReading
      break

    case InterviewStatus.Reviewing:
      buttonIcon = <NextButtonIcon sx={{ width: '100%', height: '100%', color: '#FFFFFF' }} />
      ButtonCardColor = '#666CFF'
      buttonDisabled = false
      break

    default:
      break
  }

  return (
    <ButtonContainer>
      <ButtonCard color={ButtonCardColor} size={buttonSize} status={status}>
        <IconButton
          sx={{ width: '100%', height: '100%' }}
          onClick={() => handleButtonClick(status)}
          disabled={buttonDisabled}
        >
          {buttonIcon}
        </IconButton>
      </ButtonCard>

      {(status === InterviewStatus.FinishedQuestion || status === InterviewStatus.Reviewing) && !isReading && (
        <ButtonCard color='#666CFF' size={buttonSize} status={status}>
          <IconButton sx={{ width: '100%', height: '100%' }} onClick={onRetryClick}>
            <RetryButtonIcon sx={{ width: '100%', height: '100%', color: '#FFFFFF' }} />
          </IconButton>
        </ButtonCard>
      )}
    </ButtonContainer>
  )
}

export default InterviewButton
