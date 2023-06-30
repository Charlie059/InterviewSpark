// ** MUI Imports
import { Typography} from '@mui/material'

import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { Card, CardActionArea,CardMedia } from '@mui/material'

interface Props {
  jobTitle: string
  imageSrc: string
  onClick: (s: string) => void
}

const MockInterviewCard = (props: Props) => {

  return (
    <Card sx={{}}>
      <CardActionArea
        onClick={() => {
          props.onClick(props.jobTitle)
        }}
      >
        <CardMedia component='img' height='120' image={props.imageSrc} alt={props.jobTitle}></CardMedia>

        <Typography
          variant='h6'
          sx={{ fontFamily: 'lato', fontWeight: 600 }}
          align='center'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '3px'
          }}
        >
          {props.jobTitle.toLocaleUpperCase()}
        </Typography>
      </CardActionArea>
    </Card>
  )
}
MockInterviewCard.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default MockInterviewCard
