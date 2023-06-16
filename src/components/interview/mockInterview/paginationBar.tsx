import React, { FC, useState, useEffect, memo } from 'react'
import styled from 'styled-components'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (newPage: number) => void
  enable: boolean
}

const Dot = styled(motion.div)<{ active: string }>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${props => (props.active === 'true' ? '#FFFFFF' : '#C4C4C4')};
  margin: 0 5px;
  cursor: 'pointer';
`

const Bar = styled.div`
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 25px;
  padding: 10px;
  position: relative;
  width: 130px;
`

const PaginationBar: FC<PaginationProps> = memo(({ totalPages, currentPage, onPageChange, enable }) => {
  const [activeDot, setActiveDot] = useState(currentPage)

  useEffect(() => {
    setActiveDot(currentPage)
  }, [currentPage])

  const handleDotClick = (page: number) => {
    if (!enable) return
    setActiveDot(page)
    console.log('page', page)
    onPageChange(page)
  }

  return (
    <Box sx={{ display: 'flex', margin: '15px', justifyContent: 'center' }}>
      <Bar>
        {Array.from({ length: totalPages }, (_, i) => (
          <Dot
            key={i}
            active={i === activeDot ? 'true' : 'false'}
            initial={false}
            animate={{ scale: i === activeDot ? 2 : 1 }}
            whileHover={{ scale: enable ? 1.5 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 50, mass: 20 }}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </Bar>
    </Box>
  )
})

export default PaginationBar
