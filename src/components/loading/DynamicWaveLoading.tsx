import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Wave from 'react-wavify'

interface DynamicWaveProps {
  size?: number
  paused?: boolean
}

const Tag = styled.div<{ size?: number }>`
  position: relative;
  width: ${props => (props.size ? `${props.size}px` : '160px')};
  height: ${props => (props.size ? `${props.size}px` : '160px')};
  outline: solid 3px #f7f7f8;
  outline-offset: -1px;
  border-radius: 260px;
  background-image: linear-gradient(0deg, #b2b2b2 0%, #ffffff 100%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.4);
`

const PositionedWave = styled(Wave)`
  position: absolute;
  bottom: -10px;
`

const DynamicWaveLoading: React.FC<DynamicWaveProps> = ({ size, paused = false }) => {
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(oldCountdown => {
        // console.log('oldCountdown', oldCountdown)
        if (oldCountdown <= 1) {
          clearInterval(interval)

          return 0
        }

        return oldCountdown - 0.05
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const calculatedHeight = 150 - countdown * (140 / 15)

  return (
    <>
      <Tag size={size}>
        <PositionedWave
          fill='rgba(120, 126, 255, 0.4)'
          paused={paused}
          options={{
            height: calculatedHeight,
            amplitude: 30,
            speed: 0.15,
            points: 6
          }}
        />
        <PositionedWave
          fill='rgba(120, 126, 255, 0.45)'
          paused={paused}
          options={{
            height: 10 + calculatedHeight,
            amplitude: 30,
            speed: 0.1,
            points: 2
          }}
        />
        <PositionedWave
          fill='rgba(120, 126, 255, 0.45)'
          paused={paused}
          options={{
            height: 15 + calculatedHeight,
            amplitude: 30,
            speed: 0.2,
            points: 3
          }}
        />
      </Tag>
    </>
  )
}

export default DynamicWaveLoading
