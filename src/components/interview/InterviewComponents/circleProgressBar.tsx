import React from 'react'

interface CircleProgressBarProps {
  size: number
  progress: number
  strokeWidth: number
  circleOneStroke: string
  circleTwoStroke: string
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  size,
  progress,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke
}) => {
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = ((100 - progress) / 100) * circumference

  return (
    <svg width={size} height={size}>
      <circle cx={center} cy={center} r={radius} strokeWidth={strokeWidth} stroke={circleOneStroke} fill='none' />
      <circle
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={circleTwoStroke}
        fill='none'
        strokeLinecap='round'
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}

export default CircleProgressBar
