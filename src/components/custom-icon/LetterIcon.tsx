import React from 'react'
import { Paper, Typography } from '@mui/material'

const getRandomColor = (letter: string) => {
  const index = letter.toUpperCase().charCodeAt(0) - 65;
  const colors: string[] = [
    'rgb(250, 200, 100)',
    'rgb(250, 200, 250)',
    'rgb(150, 200, 210)',
    'rgb(200, 200, 240)',
    'rgb(255, 155, 100)',
    'rgb(255, 170, 255)',
    'rgb(255, 255, 150)',
    'rgb(170, 230, 230)',
    'rgb(100, 210, 100)',
    'rgb(190, 180, 100)',
    'rgb(250, 235, 215)',
    'rgb(100, 210, 255)',
    'rgb(160, 240, 240)',
    'rgb(230, 230, 250)',
    'rgb(200, 255, 230)',
    'rgb(200, 200, 255)',
    'rgb(200, 200, 0)',
    'rgb(255, 200, 180)',
    'rgb(255, 100, 180)',
    'rgb(155, 200, 255)',
    'rgb(255, 215, 0)',
    'rgb(220, 220, 210)',
    'rgb(222,184, 140)',
    'rgb(155, 210, 100)',
    'rgb(240, 255, 240)',
    'rgb(250, 120, 120)'
  ];

  return colors[index];
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
