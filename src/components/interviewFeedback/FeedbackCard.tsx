import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Button } from '@mui/material'
import ClampLines from 'react-clamp-lines'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

interface Props {
  cardName: string
  cardText?: string
  cardValue?: number | null
  extraInfo: any
  onDetailClick?: () => void
}

export default function InterviewFeedbackCard(props: Props) {
  const { cardName, cardText, cardValue, extraInfo } = props

  const shouldDisplayIcon = ['Volume', 'Lighting', 'Eye Contact', 'Smile', 'Calm'].includes(cardName)

  // Define UM Counter chart options
  const umCounterOptions: any = {
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            showOn: 'always',
            name: {
              offsetY: -20,
              show: false,
              color: '#888',
              fontSize: '13px',
              fontFamily: 'Montserrat'
            },
            value: {
              offsetY: 10,
              formatter: function () {
                return cardValue
              },
              color: '#111',
              fontSize: '25px',
              fontFamily: 'Montserrat',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid',

        // if cardValue is less than 5, set color to green, else if cardValue is greater than 5 smaller than 10, set color to yellow, else set color to red
        colors:
          cardValue && cardValue < 5
            ? ['#00E396']
            : cardValue && cardValue > 5 && cardValue < 10
            ? ['#FFB600']
            : ['#FF4560']
      },
      labels: ['']
    },
    seriesRadial: [100]
  }

  // Define vocabularyOptions chart options
  const percentOptions: any = {
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            showOn: 'always',
            name: {
              offsetY: -20,
              show: true,
              color: '#888',
              fontSize: '12px',
              fontFamily: 'Montserrat'
            },
            value: {
              formatter: function (val: any) {
                return val
              },
              color: '#111',
              fontSize: '25px',
              fontFamily: 'Montserrat',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent']
    },
    seriesRadial: [cardValue]
  }

  // Define pace of speech chart options
  const paceOptions: any = {
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            showOn: 'always',
            name: {
              offsetY: -20,
              show: false,
              color: '#888',
              fontSize: '13px',
              fontFamily: 'Montserrat'
            },
            value: {
              offsetY: 10,
              formatter: function () {
                return Math.round(cardValue!)
              },
              color: '#111',
              fontSize: '25px',
              fontFamily: 'Montserrat',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid',

        colors:
          cardValue && cardValue < 100
            ? ['#FF4560'] // red
            : cardValue && cardValue >= 100 && cardValue < 160
            ? ['#00E396'] // green
            : ['#FFB600'] // yellow
      },
      labels: ['']
    },
    seriesRadial: [100]
  }

  const getChartOptions = () => {
    switch (cardName) {
      case 'UM Counter':
        return umCounterOptions
      case 'Pace of Speech':
        return paceOptions
      default:
        return percentOptions
    }
  }

  const getIcon = () => {
    switch (cardName) {
      case 'Volume':
        // if cardValue is less than -23, set color to yellow, else if -23 to -10, set color to green, else set color to yellow
        if (cardValue && cardValue < -23) {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        } else if (cardValue && cardValue >= -23 && cardValue < -10) {
          return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
        } else {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        }
      case 'Lighting':
        // if cardValue >= 60, set color to green, else set color to yellow
        if (cardValue && cardValue >= 60) {
          return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
        } else {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        }
      case 'Eye Contact':
        if (cardValue && cardValue >= 0.6) {
          return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
        } else {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        }
      case 'Smile':
        if (cardValue && cardValue >= 0.6) {
          return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
        } else {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        }
      case 'Calm':
        if (extraInfo && extraInfo === 'CALM') {
          return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
        } else {
          return <FiAlertCircle style={{ color: '#FFB600', fontSize: '140px', strokeWidth: '1.2' }} />
        }
      default:
        return <FiCheckCircle style={{ color: '#00E396', fontSize: '140px', strokeWidth: '1.2' }} />
    }
  }

  return (
    <Card sx={{ margin: 10 }}>
      <CardContent>
        <Typography
          variant='h5'
          color='text.secondary'
          sx={{ fontFamily: 'Montserrat', fontSize: 32, fontWeight: 400 }}
        >
          {cardName}
        </Typography>
      </CardContent>

      {shouldDisplayIcon ? (
        <Box style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>{getIcon()}</Box>
      ) : (
        getChartOptions() && (
          <ReactApexcharts
            options={getChartOptions().optionsRadial}
            series={getChartOptions().seriesRadial}
            height={200}
            type='radialBar'
          />
        )
      )}

      <CardContent sx={{ height: '125px' }}>
        <p style={{ fontFamily: 'Montserrat', fontSize: '12px' }}>
          <ClampLines
            buttons={false}
            text={cardText!}
            id='really-unique-id'
            lines={4}
            ellipsis='...'
            innerElement='p'
          />
        </p>
      </CardContent>

      <CardActions disableSpacing>
        <Button sx={{ fontFamily: 'Montserrat', fontSize: 14 }} onClick={props.onDetailClick}>
          Detail
        </Button>
      </CardActions>
    </Card>
  )
}
