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
import MenuIcon from '@mui/icons-material/Menu'

interface MenuIconButtonProps {
  onButtonClick: () => void
}

const MenuCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.4);
  border-radius: 30px;
  border-radius: 50%;
  margin: 10px -25px 5px 0px;
  width: 40px;
  height: 40px;
`

const MenuIconButton: FC<MenuIconButtonProps> = ({ onButtonClick }) => {
  const handleButtonClick = () => {
    onButtonClick()
  }

  return (
    <MenuCard>
      <IconButton onClick={handleButtonClick}>
        <MenuIcon sx={{ width: '18px' }} />
      </IconButton>
    </MenuCard>
  )
}

export default MenuIconButton
