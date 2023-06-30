import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Button } from '@mui/material'
import ClampLines from 'react-clamp-lines'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

interface Props {
  cardName: string
  cardText?: string
  cardValue?: number | null
  extraInfo: any
  onDetailClick?: () => void
  videoUrl?: string
  isDetailPage?: boolean
}

const videoTranscriptionHint =
  'Our video transcription tool uses sophisticated artificial intelligence to convert your spoken words into written text. This is a critical part of our system since it enables other functionalities, such as answer relevance, to perform their analysis. If your video transcription score is commendable, it means our technology was able to fully and accurately transcribe your speech. The clarity of speech, pronunciation, and the absence of heavy accents play major roles in achieving a high score. If the score is low, the transcription may have encountered problems like extensive use of filler words, mumbling, or an accent that the AI had difficulty processing. This may also hinder the effectiveness of other analyses such as Authenticity Score or Answer Relevance. To improve, consider speaking more clearly and directly. Enunciate and avoid use of excessive slang or colloquial language. Practising can improve your spoken English skills and ultimately, your transcription score.'

const umCounterHint =
  'Our Um Counter uses artificial intelligence to track how often you use filler words such as "um", "uh", "like", etc. These words, while a natural part of speech, can become distracting if overused. A low score on the Um Counter is excellent performance. It shows you speak fluently and confidently without leaning on filler words. A high score suggests excessive use of filler words, which can muddle your message and detract from the clarity of your presentation. To improve, start by consciously noticing your use of filler words in everyday life. Giving speeches or presentations in front of others can provide feedback and help reduce filler word usage.'

const vocabularyHint =
  'Our Vocabulary tool analyzes the range and complexity of the words you use in your speaking. A varied and advanced vocabulary demonstrates a strong command of language, boosting your credibility and engagement. A high score indicates a broad vocabulary and excellent word choice in your answers. A low score might reveal a limited vocabulary or a reliance on simple, repetitive language. To improve, work on expanding your vocabulary. This can be done by reading a diverse range of materials, learning new words, and practicing them in your speech.'

const powerWordHint =
  'The Power Word analysis aspect of our AI system checks the use of words that display confidence, decisiveness, and, thus, convey a powerful message.'

const answerRelevanceHint =
  'Your answer relevance score is based on the analysis of an artificial intelligence program that has been trained on a massive data set of text from a wide range of sources, fine tuned by human feedback.'

const authenticityScoreHint =
  'Our system measures the authenticity of your answers, assessing whether they sound genuine, honest and convincing or if they sound rehearsed and exaggerated.'

const fillerWordsHint =
  'Our filler words counter identifies and enumerates every time you say "um," "uh," "like," etc., in your speech, which while natural in conversation, can become distracting when overused.'

const negativeToneHint =
  'Our technology scans the tone of your voice, focusing on whether your tone is positive, neutral or negative. The more positive your tone, the more engaging and professional your message seems.'

const volumeHint =
  'Volume here refers to the loudness or quietness of your speaking voice. An appropriate volume is crucial for clarity, audibility, and effectiveness in conversations and presentations.'

const paceOfSpeechHint =
  'This looks at your speaking speed, counting the number of words spoken per minute. Speaking too fast can lead to confusion for the listener, while speaking too slow can bore the audience.'

const lightingHint =
  'Lighting quality is crucial for video calls or virtual meetings. Good lighting enhances visibility and clarity, making you look more professional.'

const eyeContactHint =
  'Eye contact during speeches or presentations is important as it builds trust and engagement with your audience.'

const smileHint =
  'Smiling has been scientifically proven to show positivity and create an appealing and friendly perception.'

const calmHint =
  'Calmness is a trait that exudes composure, confidence and credibility. Staying calm during presentations or speeches creates a peaceful, engaging and positive atmosphere.'

export default function InterviewFeedbackCard(props: Props) {
  const { cardName, cardText, cardValue, extraInfo, videoUrl, isDetailPage } = props

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

  const getHintText = () => {
    switch (cardName) {
      case 'Video':
        return videoTranscriptionHint
      case 'UM Counter':
        return umCounterHint
      case 'Vocabulary':
        return vocabularyHint
      case 'Power Word':
        return powerWordHint
      case 'Answer Relevance':
        return answerRelevanceHint
      case 'Authenticity Score':
        return authenticityScoreHint
      case 'Filler Words':
        return fillerWordsHint
      case 'Negative Tone':
        return negativeToneHint
      case 'Volume':
        return volumeHint
      case 'Pace of Speech':
        return paceOfSpeechHint
      case 'Lighting':
        return lightingHint
      case 'Eye Contact':
        return eyeContactHint
      case 'Smile':
        return smileHint
      case 'Calm':
        return calmHint

      default:
        return ''
    }
  }

  const StyledDiv = styled.div`
    max-height: 300px;
    overflow-y: auto;
  `

  return (
    <Card sx={{ margin: 10, boxShadow: '2px 3px 2px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Typography
          variant='h5'
          color='text.secondary'
          sx={{ fontFamily: 'Montserrat', fontSize: 32, fontWeight: 400 }}
        >
          {cardName}
        </Typography>
      </CardContent>

      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls width='100%' height='179px' />
      ) : shouldDisplayIcon ? (
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

      <CardContent sx={{ height: isDetailPage ? '100%' : '125px', maxHeight: '300px' }}>
        {isDetailPage ? (
          <StyledDiv>
            <Typography color='text.secondary' sx={{ fontSize: 16, fontFamily: 'Montserrat', fontWeight: 400 }}>
              {getHintText()}
              <br />
              <br />
              {cardText}
            </Typography>
          </StyledDiv>
        ) : (
          <p style={{ fontFamily: 'Montserrat', fontSize: '12px' }}>
            <ClampLines
              buttons={false}
              text={cardText!}
              id='really-unique-id'
              lines={3}
              ellipsis='...'
              innerElement='p'
            />
          </p>
        )}
      </CardContent>

      <CardActions disableSpacing>
        {!isDetailPage && (
          <Button sx={{ fontFamily: 'Montserrat', fontSize: 14 }} onClick={props.onDetailClick}>
            Detail
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
