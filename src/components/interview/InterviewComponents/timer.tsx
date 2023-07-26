/***********************************************************************************************
  Name: Timer.tsx
  Description: This file contains the UI of the Timer.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/16
  Update Date: 2023/06/16
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp'
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp'

import Typography from "@mui/material/Typography";

interface TimerProps {
  initialTime: number
  onComplete: () => void
  status: InterviewStatus
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

const fade = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const TimeCard = styled.div<{ isActive: boolean; overLimit: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isActive ? 'red' : 'rgba(155, 155, 155, 0.3)')};
  //color: white;
  border-radius: 30px;
  user-select: none;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  animation: ${props => (props.overLimit ? 'blink 1s linear infinite' : 'none')};

  @keyframes blink {
    50% {
      background-color: red;
    }
  }

  /* Small screens */
  @media screen and (max-width: 600px) {
    width: 90px;
    height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  /* Medium screens */
  @media screen and (min-width: 601px) and (max-width: 900px) {
    width: 90px;
    height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  /* Large screens */
  @media screen and (min-width: 901px) and (max-width: 1200px) {
    width: 120px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
  }

  /* Extra Large screens */
  @media screen and (min-width: 1201px) {
    width: 150px;
    height: 50px;
    font-size: 22px;
    font-weight: 500;
  }
`

const TimerNumber = styled.span`
  transition: all 0.3s ease-in-out;
  animation: 0.5s ${fade} ease-in;
`

// Add styled component for the icons
const IconWrapper = styled.span`
  margin: 0 1px;

  /* Small screens */
  @media screen and (max-width: 600px) {
    svg {
      font-size: 10px;
    }
  }

  /* Medium screens */
  @media screen and (min-width: 601px) and (max-width: 900px) {
    svg {
      font-size: 10px;
    }
  }

  /* Large screens */
  @media screen and (min-width: 901px) and (max-width: 1200px) {
    svg {
      font-size: 14px;
    }
  }

  /* Extra Large screens */
  @media screen and (min-width: 1201px) {
    svg {
      font-size: 18px;
    }
  }
`

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = time - hours * 3600 - minutes * 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}
const Timer = forwardRef((props: TimerProps, ref: any) => {
  const { initialTime, onComplete } = props
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [, setClickCounter] = useState(1)
  const [lastAction, setLastAction] = useState<'add' | 'subtract' | null>(null)
  const [overLimit, setOverLimit] = useState(false)
  const intervalId = useRef<NodeJS.Timeout | null>(null)

  useImperativeHandle(ref, () => ({
    start: () => {
      setIsActive(true)
    },
    stop: () => {
      setIsActive(false)
      if (intervalId.current) clearInterval(intervalId.current)
    },
    reset: () => {
      setIsActive(false)
      if (intervalId.current) clearInterval(intervalId.current)
      setTimeLeft(initialTime)
    }
  }))

  const handleRemoveCircleOutlineSharpClick = () => {
    if (lastAction === 'add') {
      setClickCounter(0)
    }

    setClickCounter(prevCounter => {
      const newCounter = prevCounter + 1

      setTimeLeft(timeLeft => {
        let ans = 0
        if (newCounter <= 4) {
          ans = timeLeft - 60
        } else if (newCounter <= 8) {
          ans = timeLeft - 120
        } else {
          ans = timeLeft - 300
        }

        if (ans < 60) {
          setOverLimit(true)
          setTimeout(() => setOverLimit(false), 1000)
          ans = 60
        }

        return ans
      })
      setLastAction('subtract')
      console.log(newCounter)

      return newCounter
    })
  }

  const handleControlPointSharpClick = () => {
    if (lastAction === 'subtract') {
      setClickCounter(0)
    }

    setClickCounter(prevCounter => {
      const newCounter = prevCounter + 1

      setTimeLeft(timeLeft => {
        let ans = 0
        if (newCounter <= 4) {
          ans = timeLeft + 60
        } else if (newCounter <= 8) {
          ans = timeLeft + 120
        } else {
          ans = timeLeft + 300
        }

        if (ans > 1800) {
          setOverLimit(true)
          setTimeout(() => setOverLimit(false), 1000)
          ans = 1800
        }

        return ans
      })
      setLastAction('add')
      console.log(newCounter)

      return newCounter
    })
  }

  useEffect(() => {
    if (isActive) {
      intervalId.current = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    }

    if (timeLeft === -1) {
      onComplete()
      setIsActive(false)
      setTimeLeft(initialTime)
    }

    return () => {
      if (intervalId.current) clearInterval(intervalId.current)
    }
  }, [isActive, timeLeft, initialTime, onComplete])

  return (
    <TimeCard
      isActive={isActive}
      overLimit={overLimit}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {isMouseOver && props.status === InterviewStatus.NotStarted && (
        <IconWrapper>
          <RemoveCircleOutlineSharpIcon onClick={handleRemoveCircleOutlineSharpClick} />
        </IconWrapper>
      )}

      <TimerNumber><Typography variant={"h6"}>{formatTime(timeLeft)}</Typography></TimerNumber>

      {isMouseOver && props.status === InterviewStatus.NotStarted && (
        <IconWrapper>
          <ControlPointSharpIcon onClick={handleControlPointSharpClick} />
        </IconWrapper>
      )}
    </TimeCard>
  )
})

export default Timer
