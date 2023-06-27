import React from 'react'
import { Paper, Typography } from '@mui/material'

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 155 + 100) // Random value between 100 and 255
  const g = Math.floor(Math.random() * 155 + 100) // Random value between 100 and 255
  const b = Math.floor(Math.random() * 155 + 100) // Random value between 100 and 255

  return `rgb(${r}, ${g}, ${b})`
}

const SquareWithLetter = ({ letter }: { letter: string }) => {
  const randomColor = getRandomColor()

  const squareStyle = {
    width: 56,
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: randomColor,
    borderRadius: 2
  }

  const letterStyle = {
    fontSize: 24,
    fontWeight: 'bold'
  }

  return (
    <Paper style={squareStyle} elevation={3}>
      <Typography variant='h6' component='span' style={letterStyle}>
        {letter}
      </Typography>
    </Paper>
  )
}

const LetterIcon = ({ letter }: { letter: string }) => {
  return <SquareWithLetter letter={letter} />
}

export default LetterIcon
