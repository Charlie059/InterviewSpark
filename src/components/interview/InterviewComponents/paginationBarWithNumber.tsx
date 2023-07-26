/***********************************************************************************************
  Name: PaginationBarWithNumber.tsx
  Description: This file contains the UI of the PaginationBarWithNumber.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/13
  Update Date: 2023/06/14
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import React, { FC, useState, useEffect, memo } from 'react'
import styled from 'styled-components'
import { Box, Card, Typography } from '@mui/material'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (newPage: number) => void
  enableSelect: boolean
}

const PageNumber = styled(motion.div)<{ active: any }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 23px;
  color: ${props => (props.active ? '#FFFFFF' : '#2C434E')};
  background-color: ${props => (props.active ? '#8289F8' : 'transparent')};
  margin: 0 ${props => (props.active ? '10px' : '2px')};
  border-radius: 50%;
  margin-top: 2.3px;
  user-select: none;
`

const DotIndicator = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 0.1px;
  margin-bottom: 7.2px;
  color: #2c434e;
  opacity: 0.5;
  user-select: none;
`

const CardStyled = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  padding: 15px;
  user-select: none;
`

const PaginationBar: FC<PaginationProps> = memo(({ totalPages, currentPage, onPageChange, enableSelect }) => {
  const [displayNumbers, setDisplayNumbers] = useState<number[]>([])

  // Initialize the display numbers
  useEffect(() => {
    const initialNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1)
    setDisplayNumbers(initialNumbers)
    console.log('initialNumbers', initialNumbers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If onPageChange is called, update the display numbers
  useEffect(() => {
    // if the current page is not in the display numbers, shift the display numbers
    if (!displayNumbers.includes(currentPage) && displayNumbers[displayNumbers.length - 1] < currentPage) {
      handleDotIndicatorClick('R')
    } else if (!displayNumbers.includes(currentPage) && displayNumbers[0] > currentPage) {
      handleDotIndicatorClick('L')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onPageChange])

  const handleNumberClick = (page: number) => {
    if (enableSelect) onPageChange(page)
  }

  const calculatePageShift = () => {
    return 1
  }

  const handleDotIndicatorClick = (direction: string) => {
    if (!enableSelect) return
    if (direction === 'R' && displayNumbers[displayNumbers.length - 1] <= totalPages) {
      console.log('Shift right')
      const shift = calculatePageShift()
      if (shift + displayNumbers[displayNumbers.length - 1] <= totalPages) {
        setDisplayNumbers(displayNumbers.map(number => Math.min(number + shift, totalPages)))
      }
    } else if (direction === 'L' && displayNumbers[0] > 1) {
      const shift = calculatePageShift()
      if (shift + displayNumbers[0] >= 1) {
        setDisplayNumbers(displayNumbers.map(number => Math.max(number - shift, 1)))
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '60px', justifyContent: 'center', transform: 'scale(0.65)' }}>
      <CardStyled>
        {/*<DotIndicator*/}
        {/*  style={{ alignSelf: 'center' }}*/}
        {/*  onClick={() => handleDotIndicatorClick('L')}*/}
        {/*  whileHover={{*/}
        {/*    scale: enableSelect ? 1.1 : 1*/}
        {/*  }}*/}
        {/*>*/}
        {/*  ...*/}
        {/*</DotIndicator>*/}
        {displayNumbers.map((number, i) => (
          <Typography variant={"body1"}>
          <PageNumber
            key={i}
            active={number === currentPage ? 1 : 0}
            onClick={() => handleNumberClick(number)}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{
              scale:
                number === currentPage
                  ? 1.8
                  : displayNumbers.includes(currentPage)
                  ? Math.abs(i - displayNumbers.indexOf(currentPage)) === 1
                    ? 1.4
                    : 1.1
                  : 1,
              opacity:
                number === currentPage
                  ? 1
                  : displayNumbers.includes(currentPage)
                  ? Math.abs(i - displayNumbers.indexOf(currentPage)) === 1
                    ? 0.6
                    : 0.4
                  : 0.4
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 2, duration: 2 }}
            whileHover={{
              scale: enableSelect ? (number === currentPage ? 1.9 : 1.5) : number === currentPage ? 1.9 : 1.5
            }}
          >
            <div>{number}</div>
          </PageNumber>
          </Typography>
        ))}
        {/*<DotIndicator*/}
        {/*  style={{ alignSelf: 'center' }}*/}
        {/*  onClick={() => handleDotIndicatorClick('R')}*/}
        {/*  whileHover={{*/}
        {/*    scale: enableSelect ? 1.1 : 1*/}
        {/*  }}*/}
        {/*>*/}
        {/*  ...*/}
        {/*</DotIndicator>*/}
      </CardStyled>
    </Box>
  )
})

export default PaginationBar
