import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import styled from 'styled-components'

interface TimerProps {
  initialTime: number
  onComplete: () => void
}

const TimeCard = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isActive ? 'red' : '#D9D9D9')};
  color: white;
  border-radius: 30px;
  user-select: none;

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
    <TimeCard isActive={isActive}>
      <span>{formatTime(timeLeft)}</span>
    </TimeCard>
  )
})

export default Timer
