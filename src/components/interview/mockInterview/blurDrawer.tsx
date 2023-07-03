/***********************************************************************************************
  Name: BlueDrawer.tsx
  Description: This file contains the UI of the BlueDrawer.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/19
  Update Date: 2023/06/19
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React from 'react'
import { Box, Drawer, Slide } from '@mui/material'
import styled from 'styled-components'
import QuestionCard from './QuestionCard'
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp'
import { Interview } from 'src/types/types'

interface BlurryDrawerProps {
  isOpen: boolean
  toggleDrawer: () => void
  interviews: Interview[]
}

const GradientDrawer = styled(({ ...props }) => <Drawer {...props} />)`
  .MuiDrawer-paper {
    width: 35%;
    max-width: 450px;
    backdrop-filter: blur(20px);
    background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    border-radius: 0 10px 10px 0;
    box-shadow: 2px 2px 2px rgba(30, 30, 30, 0.2);
  }

  @media (max-width: 768px) {
    .MuiDrawer-paper {
      width: 80%;
    }
  }

  .MuiBackdrop-root {
    background: transparent;
  }
`

const BlurryDrawer: React.FC<BlurryDrawerProps> = ({ isOpen, toggleDrawer, interviews }) => {
  return (
    <GradientDrawer
      open={isOpen}
      onClose={toggleDrawer}
      ModalProps={{ BackdropProps: { style: { backgroundColor: 'transparent' } } }}
    >
      <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
        <ChevronLeftSharpIcon onClick={toggleDrawer} />
      </Box>
      <Slide direction='right' in={isOpen} mountOnEnter unmountOnExit>
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', margin: '20px' }}>
          <QuestionCard interviews={interviews} />
        </Box>
      </Slide>
    </GradientDrawer>
  )
}

export default BlurryDrawer
