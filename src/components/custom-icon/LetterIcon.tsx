import React from 'react'
import { Paper, Typography } from '@mui/material'

const SquareWithLetter = (letter: string) => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  const squareStyle = {
    width: 56,
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: randomColor,
    border: '4px solid'
  }

  const letterStyle = {
    color: squareStyle.border,
    fontSize: 24,
    fontWeight: 'bold'
  }

  return (
    <Paper style={squareStyle} elevation={3}>
      <Typography variant='h6' component='span' style={letterStyle}>
        A
      </Typography>
    </Paper>
  )
}

export default SquareWithLetter
