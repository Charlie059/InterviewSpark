import React from 'react'
import { Paper, Typography } from '@mui/material'

const getRandomColor = letter => {
  const r = Math.floor(((letter.charCodeAt(0) % 26) / 25) * 15 + 100)
  const g = Math.floor(((letter.charCodeAt(0) % 26) / 25) * 55 + 100) // Random value between 100 and 255
  const b = Math.floor(((letter.charCodeAt(0) % 26) / 25) * 155 + 100) // Random value between 100 and 255

  return `rgb(${r}, ${g}, ${b})`
}

const SquareWithLetter = ({ letter }: { letter: string }) => {
  const randomColor = getRandomColor(letter)

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
