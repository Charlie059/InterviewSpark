// ** MUI Imports
import { CSSObject, Typography } from '@mui/material'

import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { Card, CardActionArea } from '@mui/material'

interface Props {
  sx?: CSSObject
  jobTitle: string
  imageSrc: string
  onClick: (s: string) => void
}

const InterviewCard = (props: Props) => {
  return (
    <Card sx={props.sx ? props.sx : { width: '220px' }}>
      <CardActionArea
        onClick={() => {
          props.onClick(props.jobTitle)
        }}
        style={{
          backgroundColor: '#FFFFFF',
          height: '120px',
          position: 'relative'
        }}
      >
        <Typography
          variant='h6'
          sx={{ fontWeight: 900 }}
          align='center'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#6E6E6E',
            fontSize: '17px'
          }}
        >
          {props.jobTitle}
        </Typography>
      </CardActionArea>
    </Card>
  )
}
InterviewCard.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default InterviewCard
