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

interface MenuIconButtonProps {
  onButtonClick: () => void
}

const TopAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 13vh;
  position: relative;
  margin-bottom: 20px;
`

const MenuCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.4);
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

// For the CloseIcon, you can do something similar, but the width and height values would be different.
// e.g., for a small screen, it might be "12px", for a medium screen "16px", for a large screen "18px", and for an extra large screen "24px".

interface TimerProps {
  initialTime: number
  onComplete: () => void
}

interface TopAreaProps extends TimerProps, MenuIconButtonProps {
  onExit: () => void
}

function getWindowDimensions() {
  const { innerWidth: width } = window

  return width
}
const TopArea = forwardRef<TimerHandle, TopAreaProps>((props, ref) => {
  const handleButtonClick = props.onButtonClick
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
      <Timer ref={ref} initialTime={props.initialTime} onComplete={props.onComplete} />
      <MenuCard>
        <IconButton onClick={handleButtonClick}>
          <CloseIcon sx={{ width: iconSize }} />
        </IconButton>
      </MenuCard>
    </TopAreaContainer>
  )
})

export default TopArea
