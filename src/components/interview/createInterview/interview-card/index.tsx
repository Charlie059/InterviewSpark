// ** MUI Imports
import { Typography } from '@mui/material'

import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { Card, CardActionArea, CardMedia } from '@mui/material'

interface Props {
  jobTitle: string
  imageSrc: string
  onClick: (s: string) => void
}

const InterviewCard = (props: Props) => {
  return (
    <Card sx={{ width: '220px' }}>
      <CardActionArea
        onClick={() => {
          props.onClick(props.jobTitle)
        }}
      >
        <CardMedia
          component='img'
          height='120'
          image={props.imageSrc}
          alt={props.jobTitle}
          style={{
            filter: 'blur(4px) brightness(70%)'
          }}
        ></CardMedia>

        <Typography
          variant='h6'
          sx={{ fontWeight: 600 }}
          align='center'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff'
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