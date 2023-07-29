import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Dialog, IconButton } from '@mui/material'
import InterviewFeedbackCard from 'src/components/interviewFeedback/FeedbackCard'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewMetaData } from 'src/graphql/queries'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { Storage } from '@aws-amplify/storage'
import FeedbackAnalysisPage from 'src/components/interviewFeedback/Feedback404Page'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-hot-toast'

type CardDataType = {
  cardName: string
  cardText?: string
  cardValue?: number | null
  extraInfo: any
  onDetailClick?: () => void
  videoUrl?: string
  isDetailPage?: boolean
}

const InterviewDetails = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [cardData, setCardData] = useState<CardDataType[]>([])
  const [currentCard, setCurrentCard] = useState<CardDataType>(cardData[0])
  const [showLoadingPage, setShowLoadingPage] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  const handleCardClick = (index: number) => {
    setCurrentCard(cardData[index])
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const interviewsParam = router.query.interview as any
    const interviews = JSON.parse(interviewsParam)
    const interviewID = interviewsParam ? interviews.interviewID : null
    const interviewQuestionID = interviewsParam ? interviews.interviewQuestionID : null
    const interviewQuestionType = interviewsParam ? interviews.interviewQuestionType : null
    let haveAnalysis = false

    const fetchInterviewDetails = async () => {
      const userEmailAddress = auth.user?.userEmailAddress

      // Fetch interview from the router query
      try {
        const result = await API.graphql(
          graphqlOperation(getUserInterviewMetaData, {
            emailAddress: userEmailAddress,
            interviewID: interviewID,
            interviewQuestionID: interviewQuestionID,
            interviewQuestionType: interviewQuestionType
          })
        )
        if ('data' in result) {
          console.log('Interview details:', result.data.getUserInterviewMetaData)
          const videoKey = result.data.getUserInterviewMetaData.interviewVideoKey.replace('.webm', '.mp4')

          // Get interview video URL from S3
          const videoUrl = await Storage.get(videoKey, {
            level: 'private'
          })

          haveAnalysis = result.data.getUserInterviewMetaData.interviewAnalysis

          // Decode string by JSON.parse
          if (!haveAnalysis) {
            // If isDisableInterviewAnalysis false, toasts the user that the analysis is not ready yet
            if (!result.data.getUserInterviewMetaData.isDisableInterviewAnalysis) {
              toast.error(
                'Analysis is not ready yet. Please try again later. It may take up to 30 minutes to process the video.',
                {
                  duration: 10000,
                  position: 'top-center'
                }
              )
            } else {
              // Custom info toast message for when the user has disabled interview analysis
              toast('Interview analysis is disabled. Please upgrade to premium to enable it.', {
                duration: 10000,
                position: 'top-center'
              })
            }
            setCardData([
              {
                cardName: 'Video',
                cardText: result.data.getUserInterviewMetaData.interviewQuestion,
                cardValue: null,
                extraInfo: null,
                videoUrl: videoUrl
              }
            ])
          } else {
            const interviewDetails = JSON.parse(result.data.getUserInterviewMetaData.interviewAnalysis)
            console.log('Interview details:', interviewDetails)
            setCardData([
              {
                cardName: 'Video',
                cardText: result.data.getUserInterviewMetaData.interviewQuestion,
                cardValue: null,
                extraInfo: null,
                videoUrl: videoUrl
              },

              // {
              //   cardName: 'UM Counter',
              //   cardText: interviewDetails.umFeedback,
              //   cardValue: interviewDetails.umCounter,
              //   extraInfo: null
              // },

              {
                cardName: 'Vocabulary',
                cardText: interviewDetails.vocabularyFeedback,
                cardValue: interviewDetails.vocabularyScore,
                extraInfo: interviewDetails.vocabularyKeywords
              },
              {
                cardName: 'Power Words',
                cardText: interviewDetails.powerWordsFeedback,
                cardValue: interviewDetails.powerWordsScore,
                extraInfo: interviewDetails.powerWords
              },
              {
                cardName: 'Answer Relevance',
                cardText: interviewDetails.answerRelevanceFeedback,
                cardValue: interviewDetails.answerRelevanceScore,
                extraInfo: null
              },
              {
                cardName: 'Authenticity Score',
                cardText: interviewDetails.authenticityFeedback,
                cardValue: interviewDetails.authenticityScore,
                extraInfo: null
              },
              {
                cardName: 'Filler Words',
                cardText: interviewDetails.fillerWordsFeedback,
                cardValue: interviewDetails.fillerWordsScore,
                extraInfo: null
              },
              {
                cardName: 'Negative Tone',
                cardText: interviewDetails.negativeToneFeedback,
                cardValue: interviewDetails.negativeToneScore,
                extraInfo: null
              },
              {
                cardName: 'Volume',
                cardText: interviewDetails.volumeFeedback,
                cardValue: interviewDetails.volume,
                extraInfo: null
              },
              {
                cardName: 'Pace of Speech',
                cardText: interviewDetails.paceOfSpeechFeedback,
                cardValue: interviewDetails.paceOfSpeech,
                extraInfo: null
              }

              // {
              //   cardName: 'Lighting',
              //   cardText: interviewDetails.rekognitionScores.brightness_score_feedback,
              //   cardValue: interviewDetails.rekognitionScores.brightness_score,
              //   extraInfo: null
              // },
              // {
              //   cardName: 'Eye Contact',
              //   cardText: interviewDetails.rekognitionScores.eye_contact_score_feedback,
              //   cardValue: interviewDetails.rekognitionScores.eye_contact_score,
              //   extraInfo: null
              // },

              // {
              //   cardName: 'Smile',
              //   cardText: interviewDetails.rekognitionScores.smile_score_feedback,
              //   cardValue: interviewDetails.rekognitionScores.smile_score,
              //   extraInfo: null
              // },
              // {
              //   cardName: 'Calm',
              //   cardText: interviewDetails.rekognitionScores.emotions_feedback,
              //   cardValue: null,
              //   extraInfo: interviewDetails.rekognitionScores.emotions
              // }
            ])
          }
        }
      } catch (error) {
        console.error('Error fetching interview details:', error)
        setShowLoadingPage(true)

        console.log('Interview not found')
      }
    }

    if (interviewID) {
      fetchInterviewDetails()
    }
  }, [auth.user?.userEmailAddress, router.query.interview, showLoadingPage])

  return (
    <>
      {showLoadingPage ? (
        <FeedbackAnalysisPage />
      ) : (
        <Grid container spacing={6}>
          {/*<Grid item xs = {12}>*/}
          {/*  <NavBar*/}
          {/*    navBarElements={[*/}
          {/*      { name: 'HomePage', path: '/interview' },*/}
          {/*      { name: 'Interview Question Review', path: undefined }*/}
          {/*    ]}*/}
          {/*    closeNavLink='/interview'*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant={'h4'}>Question Review</Typography>
              <IconButton
                onClick={() => {
                  router.push('/interview')
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              {cardData.map((card, index) => (
                <Grid
                  item
                  xs={card.cardName === 'Video' ? 12 : 12}
                  sm={card.cardName === 'Video' ? 12 : 6}
                  md={card.cardName === 'Video' ? 12 : 4}
                  lg={card.cardName === 'Video' ? 12 : 3}
                  key={index}
                >
                  <InterviewFeedbackCard {...card} onDetailClick={() => handleCardClick(index)} />
                </Grid>
              ))}
            </Grid>
            <Dialog
              open={modalOpen}
              onClose={handleClose}
              scroll='body'
              sx={{
                '& .MuiPaper-root': {
                  width: '100%',
                  maxWidth: 1000
                }
              }}
            >
              <InterviewFeedbackCard {...currentCard} isDetailPage={true} handleClose={handleClose} />
            </Dialog>
          </Grid>
        </Grid>
      )}
    </>
  )
}

InterviewDetails.acl = {
  action: 'read',
  subject: 'acl-page'
}

// InterviewDetails.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default InterviewDetails
