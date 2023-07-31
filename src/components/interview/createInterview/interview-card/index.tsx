// ** MUI Imports
import { CSSObject, Typography } from '@mui/material'


import { Card, CardActionArea } from '@mui/material'

interface Props {
  sx?: CSSObject
  title: string
  imageSrc: string
  onClick: (s: string) => void
}

const InterviewCard = (props: Props) => {
  return (
    <Card sx={props.sx ? props.sx : { width: '100%' , display:"flex"}}>
      <CardActionArea
        onClick={() => {
          props.onClick(props.title)
        }}
        style={{
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
            fontSize: 'calc(0.7vw + 9px)'
          }}
        >
          {props.title}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

export default InterviewCard
