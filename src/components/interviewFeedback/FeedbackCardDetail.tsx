import React, { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

interface CardProps {
  cardName: string
  cardText?: string | null
  chartOptions?: ApexOptions
  chartSeries?: any[]
  onDetailClick?: () => void
}

interface InterviewFeedbackCardDetailProps {
  card: CardProps | null
}

export default function InterviewFeedbackCardDetail(
  InterviewFeedbackCardDetailProps: InterviewFeedbackCardDetailProps
) {
  const { card } = InterviewFeedbackCardDetailProps

  return (
    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <Grid container justifyContent='center'>
        <Grid item xs={10} sm={8} md={8}>
          <Card sx={{ margin: 5 }}>
            <CardContent>
              <Typography
                variant='h5'
                color='text.secondary'
                sx={{ fontFamily: 'Montserrat', fontSize: 32, fontWeight: 400 }}
              >
                {card?.cardName}
              </Typography>
            </CardContent>

            {card?.chartOptions && card?.chartSeries ? (
              <ReactApexcharts options={card?.chartOptions} height={145} series={card?.chartSeries} type='donut' />
            ) : (
              card?.Icon
            )}

            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  webkitLineClamp: 2,
                  webkitBoxOrient: 'vertical'
                }}
              >
                {card?.cardText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
