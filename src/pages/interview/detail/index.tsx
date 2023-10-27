import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Dialog, IconButton } from '@mui/material'
import InterviewFeedbackCard from 'src/components/interviewFeedback/FeedbackCard'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewMetaData } from 'src/graphql/queries'
import { handleEvent } from 'src/graphql/mutations'
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
  interviewRealTimeFeedback?: string
  interviewPostFeedback?: string
}

const InterviewDetails = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [cardData, setCardData] = useState<CardDataType[]>([])
  const [currentCard, setCurrentCard] = useState<CardDataType>(cardData[0])
  const [showLoadingPage, setShowLoadingPage] = useState(false)
  const router = useRouter()
  const auth = useAuth()

  // Define the mixPanel event tracker
  function mixPanelTracker(data: object, action: string, desc: string) {
    auth.trackEvent('InterviewEvent', {
      action: action,
      desc: desc,
      ...data
    })
  }

  const handleCardClick = (index: number) => {
    // Mixpanel track event
    mixPanelTracker(
      cardData[index],
      'Interview_Review_Card_Clicked',
      'User clicked on a card in the interview review page.'
    )

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
        // Push event to SNS
        try {
          const res = await API.graphql(
            graphqlOperation(handleEvent, {
              operation: 'mutation',
              name: 'InterviewEvent',
              arguments: JSON.stringify({
                action: 'Interview_Review_Page_Loaded'
              }),
              user: userEmailAddress!
            })
          )
          console.log('res: ', res)
        } catch (error) {
          console.log('Error pushing event to SNS: ', error)
        }

        console.log('interviewID: ', interviewID)
        const result = await API.graphql(
          graphqlOperation(getUserInterviewMetaData, {
            emailAddress: userEmailAddress,
            interviewID: interviewID,
            interviewQuestionID: interviewQuestionID,
            interviewQuestionType: interviewQuestionType
          })
        )

        console.log('result: ', result)
        if ('data' in result) {
          const videoKey = result.data.getUserInterviewMetaData.interviewVideoKey

          // Get interview video URL from S3
          let videoUrl = await Storage.get(videoKey, {
            level: 'private'
          })

          // Try to get .mp4 video from S3
          try {
            if (videoKey.includes('.webm')) {
              const mp4VideoUrl = await Storage.get(videoKey.replace('.webm', '.mp4'), {
                level: 'private'
              })
              videoUrl = mp4VideoUrl
            }
          } catch (error) {
            console.log('Error fetching mp4 video from S3: ', error)
          }

          haveAnalysis = result.data.getUserInterviewMetaData.interviewAnalysis

          // Setup mixpanel tracker
          mixPanelTracker(
            result.data.getUserInterviewMetaData,
            'Interview_Review_Page_Loaded',
            'User loaded the interview review page.'
          )

          // Decode string by JSON.parse
          if (!haveAnalysis) {
            // If isDisableInterviewAnalysis false, toasts the user that the analysis is not ready yet
            if (!result.data.getUserInterviewMetaData.isDisableInterviewAnalysis) {
              toast.loading(
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
                videoUrl: videoUrl,
                interviewRealTimeFeedback: result.data.getUserInterviewMetaData.interviewFeedback
              }
            ])
          } else {
            const interviewDetails = JSON.parse(result.data.getUserInterviewMetaData.interviewAnalysis)
            setCardData([
              {
                cardName: 'Video',
                cardText: result.data.getUserInterviewMetaData.interviewQuestion,
                cardValue: null,
                extraInfo: null,
                videoUrl: videoUrl,
                interviewRealTimeFeedback: result.data.getUserInterviewMetaData.interviewFeedback,
                interviewPostFeedback: interviewDetails.interviewFeedback
              },
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
            ])
          }
        }
      } catch (error) {
        setShowLoadingPage(true)
        console.error('Error fetching interview details: ', error)
      }
    }

    if (interviewID) {
      fetchInterviewDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.userEmailAddress, router.query.interview])

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
