/***********************************************************************************************
  Name: MenuIconButton.tsx
  Description: This file contains the custom hook for chatGPTStream.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/13
  Update Date: 2023/06/14
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { FC } from 'react'
import { IconButton, Card } from '@mui/material'
import styled from 'styled-components'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'

interface MenuIconButtonProps {
  onButtonClick: () => void
}

const MenuCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

const VideoIconButton: FC<MenuIconButtonProps> = ({ onButtonClick }) => {
  const [open, setOpen] = React.useState(false)
  const handleButtonClick = () => {
    onButtonClick()
    setOpen(!open)
  }

  return (
    <MenuCard>
      <IconButton onClick={handleButtonClick}>
        {open ? <VideocamIcon sx={{ width: '25px' }} /> : <VideocamOffIcon sx={{ width: '25px' }} />}
      </IconButton>
    </MenuCard>
  )
}

export default VideoIconButton
