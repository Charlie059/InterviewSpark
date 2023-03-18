import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

interface TopicTagProps {
  text: string
  imageUrl: string
}

const TopicTag = ({ text, imageUrl }: TopicTagProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'relative',
        width: '180px',
        height: '80px',
        margin: '6px',
        borderRadius: '9px',
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
        overflow: 'hidden'
      }}
    >
      <img
        src={imageUrl}
        alt='My Image'
        style={{
          width: '60%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          marginLeft: '100px'
        }}
      />
      <Typography
        variant='subtitle1'
        component='div'
        sx={{
          position: 'absolute',
          top: '8px',
          left: '16px',
          color: theme.palette.text.primary
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default TopicTag
