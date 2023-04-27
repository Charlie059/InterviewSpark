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
        width: '189px',
        height: '110px',
        margin: '1px',
        borderRadius: '9px',
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
        overflow: 'hidden',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', // Add this line for shadow effect
        '@media (max-width: 600px)': {
          width: '100%',
          height: 'auto'
        }
      }}
    >
      <img
        src={imageUrl}
        alt='My Image'
        style={{
          width: '70%',
          height: '60%',
          objectFit: 'cover',
          borderRadius: '12px',
          marginLeft: '65px'
        }}
      />
      <Typography
        variant='h6'
        component='div'
        sx={{
          position: 'absolute',
          top: '8px',
          left: '16px',
          color: theme.palette.text.primary,
          fontWeight: 250,
          fontSize: '1rem', // Add this line for responsive font size
          '@media (max-width: 600px)': {
            fontSize: '0.8rem' // Change the font size for small screens
          }
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default TopicTag
