import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Box, Button, Grid } from '@mui/material'
import ClampLines from 'react-clamp-lines'
import { FiCheckCircle, FiAlertCircle, FiCheck } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import Close from 'mdi-material-ui/Close'
import IconButton from '@mui/material/IconButton'

interface Props {
  cardName: string
  cardText?: string
  cardValue?: number | null
  extraInfo: any
  onDetailClick?: () => void
  videoUrl?: string
  isDetailPage?: boolean
  handleClose?: () => void
  interviewRealTimeFeedback?: string
  interviewPostFeedback?: string
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
  const { cardName, cardText, cardValue, extraInfo, videoUrl, isDetailPage, handleClose } = props

  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth)
    }
    console.log(containerWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              top: 0,
              left: 0,
              blur: 7,
              opacity: 0.1
            },
            selection: {
              enabled: false
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 7,
              opacity: 0.2
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

        // if cardValue is less than 5, set color to green, else if cardValue is greater than 5 and smaller than 10, set color to yellow, else set color to red

        colors:
          cardValue !== null && cardValue !== undefined && cardValue < 5
            ? ['#00E396'] // Green color when cardValue is less than 5
            : cardValue && cardValue >= 5 && cardValue < 10
            ? ['#FFB600'] // Yellow color when cardValue is greater than or equal to 5 and less than 10
            : ['#FF4560'] // Red color for any other case
      },
      labels: ['']
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    seriesRadial: [100]
  }

  // Define vocabularyOptions chart options
  const percentOptions: any = {
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
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
              top: 0,
              left: 0,
              blur: 7,
              opacity: 0.1
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              bottom: 5,
              blur: 7,
              opacity: 0.2
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
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
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
              top: 0,
              left: 0,
              blur: 7,
              opacity: 0.1
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 7,
              opacity: 0.2
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
        // if cardValue is less than -35, set color to yellow, else if -35 to -1, set color to green, else set color to yellow
        if (cardValue && cardValue < -35) {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        } else if (cardValue && cardValue >= -35 && cardValue < -1) {
          return (
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                border: '8px solid #00E396'
              }}
            >
              <FiCheck style={{ color: '#00E396', fontSize: '120px', strokeWidth: '1.7', marginTop: '8px' }} />
            </div>
          )
        } else {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        }
      case 'Lighting':
        // if cardValue >= 60, set color to green, else set color to yellow
        if (cardValue && cardValue >= 60) {
          return (
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                border: '8px solid #00E396'
              }}
            >
              <FiCheck style={{ color: '#00E396', fontSize: '120px', strokeWidth: '1.7', marginTop: '8px' }} />
            </div>
          )
        } else {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        }
      case 'Eye Contact':
        if (cardValue && cardValue >= 0.6) {
          return (
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                border: '8px solid #00E396'
              }}
            >
              <FiCheck style={{ color: '#00E396', fontSize: '120px', strokeWidth: '1.7', marginTop: '8px' }} />
            </div>
          )
        } else {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        }
      case 'Smile':
        if (cardValue && cardValue >= 0.6) {
          return (
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                border: '8px solid #00E396'
              }}
            >
              <FiCheck style={{ color: '#00E396', fontSize: '120px', strokeWidth: '1.7', marginTop: '8px' }} />
            </div>
          )
        } else {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        }
      case 'Calm':
        if (extraInfo && extraInfo === 'CALM') {
          return (
            <div
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                border: '8px solid #00E396'
              }}
            >
              <FiCheck style={{ color: '#00E396', fontSize: '120px', strokeWidth: '1.7', marginTop: '8px' }} />
            </div>
          )
        } else {
          return (
            <div
              style={{
                borderRadius: '50%',
                boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <FiAlertCircle style={{ color: '#FFB600', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
            </div>
          )
        }
      default:
        return (
          <div
            style={{
              borderRadius: '50%',
              boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FiCheckCircle style={{ color: '#00E396', fontSize: '150px', strokeWidth: '1.5', margin: '-7px' }} />
          </div>
        )
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
      case 'Power Words':
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

  return (
    <Card sx={{ height: cardName == 'Video' ? '100%' : '100%' }}>
      <CardContent>
        <Typography variant='h5' color='text.secondary'>
          {cardName}
        </Typography>
        {isDetailPage && (
          <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
            <Close />
          </IconButton>
        )}
      </CardContent>
      <CardContent>
        <Grid container spacing={6}>
          {videoUrl ? (
            <Grid item xs={12} lg={isDetailPage ? 12 : 8}>
              <Card>
                <ReactPlayer url={videoUrl} controls width='100%' height='400px' />
              </Card>
            </Grid>
          ) : shouldDisplayIcon ? (
            <Grid item xs={12} lg={12}>
              <Box style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>{getIcon()}</Box>
            </Grid>
          ) : (
            getChartOptions() && (
              <Grid item xs={12} lg={12}>
                <ReactApexcharts
                  options={getChartOptions().optionsRadial}
                  series={getChartOptions().seriesRadial}
                  height={200}
                  type='radialBar'
                />
              </Grid>
            )
          )}
          <Grid item xs={12} lg={videoUrl ? (isDetailPage ? 12 : 4) : 12}>
            {isDetailPage ? (
              <>
                {cardName === 'Video' && <Typography variant={'h6'}>Question</Typography>}

                <Typography variant={'body1'}>{cardText}</Typography>
                {props.interviewRealTimeFeedback && !props.interviewPostFeedback && (
                  <>
                    <br />
                    <Typography variant={'h6'}>Real Time Feedback</Typography>
                    <Typography variant={'body1'}>{props.interviewRealTimeFeedback}</Typography>
                    <br />
                  </>
                )}

                {props.interviewPostFeedback && (
                  <>
                    <br />
                    <Typography variant={'h6'}>Interview Feedback</Typography>
                    <Typography variant={'body1'}>{props.interviewPostFeedback}</Typography>
                    <br />
                  </>
                )}
                <br />

                {getHintText() && (
                  <>
                    <Typography variant={'h6'}>Hint</Typography>
                    <Typography variant={'body1'}>{getHintText()}</Typography>
                    <br />
                  </>
                )}
              </>
            ) : (
              <Box height={75}>
                <Typography variant={videoUrl ? 'h6' : 'body1'}>
                  <ClampLines
                    buttons={false}
                    text={cardText!}
                    id='really-unique-id'
                    lines={videoUrl ? 10 : 3}
                    ellipsis='...'
                    innerElement='p'
                  />
                </Typography>
              </Box>
            )}
            {videoUrl && (
              <Box display={{ md: 'none', lg: 'block' }}>
                <div style={{ height: isDetailPage ? '' : videoUrl ? '200px' : '75px' }}></div>
              </Box>
            )}
            {!isDetailPage && (
              <CardActions sx={{ justifyContent: 'center', mb: '-10px' }}>
                <Button variant={'outlined'} onClick={props.onDetailClick}>
                  More
                </Button>
              </CardActions>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
