import React from 'react'
import { Box, Button, Drawer, Slide } from '@mui/material'
import styled from 'styled-components'

interface BlurryDrawerProps {
  isOpen: boolean
  toggleDrawer: () => void
}

const GradientDrawer = styled(({ ...props }) => <Drawer {...props} />)`
  .MuiDrawer-paper {
    width: 32%;
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

const BlurryDrawer: React.FC<BlurryDrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <GradientDrawer
      open={isOpen}
      onClose={toggleDrawer}
      ModalProps={{ BackdropProps: { style: { backgroundColor: 'transparent' } } }}
    >
      <Slide direction='right' in={isOpen} mountOnEnter unmountOnExit>
        <Box sx={{ display: 'flex' }}>
          <Button onClick={toggleDrawer}>Close</Button>
          aaa
        </Box>
      </Slide>
    </GradientDrawer>
  )
}

export default BlurryDrawer
