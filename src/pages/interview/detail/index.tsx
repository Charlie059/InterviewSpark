import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Modal, Grid, Typography, Avatar } from '@mui/material'
import InterviewFeedbackCard from 'src/components/interviewFeedback/FeedbackCard'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { NavBar } from 'src/components/interview/createInterview/navigation-bar'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewMetaData } from 'src/graphql/queries'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { Storage } from '@aws-amplify/storage'

// // Mock data
// const feedbackData = {
//   umCounter: 29,
//   umFeedback:
//     "You used a significant number of 'um's and 'uh's in your speech. Try to be more conscious of these filler words and work on reducing them to sound more polished.",
//   vocabularyScore: 60,
//   vocabularyKeywords: ['graduation', 'recruiting', 'navigating', 'availability', 'real-time'],
//   vocabularyFeedback:
//     'Your vocabulary usage is average. To improve, try incorporating more sophisticated words and phrases into your speech.',
//   powerWordsScore: 55,
//   powerWords: ["master's student", 'networking', 'hiring manager', 'career coach', 'workshop'],
//   powerWordsFeedback:
//     'You used some power words, but there is room for improvement. Incorporate more positive and confident language to present yourself as a more capable and engaging candidate.',
//   answerRelevanceScore: 75,
//   answerRelevanceFeedback:
//     'Your answer was mostly relevant to the topic, but there were some instances where you veered off course. Stay focused on the main points to maintain relevance.',
//   authenticityScore: 70,
//   authenticityFeedback:
//     'Your speech was somewhat authentic, but there were moments where it sounded scripted or robotic. Practice speaking more naturally and conversationally to improve your authenticity.',
//   fillerWordsScore: 40,
//   fillerWordsFeedback:
//     'You used a significant number of filler words and speech disfluencies. Work on reducing these to improve the overall quality of your speech.',
//   negativeToneScore: 80,
//   negativeToneFeedback:
//     'Your speech had a few instances of negative tone, but overall it was mostly positive. Continue to focus on maintaining a positive and confident attitude.',
//   interviewFeedback: 'Overall, your interview had both advantages and disadvantages. .',
//   loudness: -30.0,
//   videoDuration: 486.15619,
//   paceOfSpeech: 147.23663191452937,
//   paceOfSpeechFeedback:
//     'Great job! Your pace of speech is within the optimal range for listener comprehension and engagement.',
//   volumeFeedback:
//     'Your volume is perceived as too low. Consider increasing it to ensure listeners can hear you clearly.',
//   transcribeText:
//     'Uh Hello everUh HelleverUh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyUh Hello everyone..UhryUh Hello everyone..UhUh Hello everyoryUh Hello everyone..UhUh Helloo everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyUh Hello everyone..UhryUh Hello everyone..UhUh Hello everyoryUh Hello everyone..UhUh Hello everyoryUh Hello everyone..UhUh Hello everyoUh Hello everyone.Uh Hello everyone.Uh Hello everyone.Uh Hello everyone. Hello everyone.yone..',
//   rekognitionScores: {
//     eye_contact_score: 0.7363847953413598,
//     eye_contact_score_feedback: 'Good eye contact. Try to focus a bit more on the camera.',
//     smile_score: 91.89256029891968,
//     smile_score_feedback: 'Great job on keeping a positive and engaging facial expression throughout!',
//     brightness_score: 75.98750651168824,
//     brightness_score_feedback:
//       'Good lighting. Consider improving the lighting conditions for an even better impression.',
//     emotions: 'CALM',
//     emotions_feedback: 'Excellent, your calm demeanor is impressive.'
//   }
// }

// const cardData = [
//   {
//     cardName: 'Video',
//     cardText:
//       'Your mock interview video is here. We have also included a transcript of your interview below: ' +
//       feedbackData.transcribeText,
//     cardValue: null,
//     extraInfo: null,
//     videoUrl: 'https://www.youtube.com/watch?v=7Xc5wIpUenQ'
//   },
//   {
//     cardName: 'UM Counter',
//     cardText: feedbackData.umFeedback,
//     cardValue: feedbackData.umCounter,
//     extraInfo: null
//   },
//   {
//     cardName: 'Vocabulary',
//     cardText: feedbackData.vocabularyFeedback,
//     cardValue: feedbackData.vocabularyScore,
//     extraInfo: feedbackData.vocabularyKeywords
//   },
//   {
//     cardName: 'Power Word',
//     cardText: feedbackData.powerWordsFeedback,
//     cardValue: feedbackData.powerWordsScore,
//     extraInfo: feedbackData.powerWords
//   },
//   {
//     cardName: 'Answer Relevance',
//     cardText: feedbackData.answerRelevanceFeedback,
//     cardValue: feedbackData.answerRelevanceScore,
//     extraInfo: null
//   },
//   {
//     cardName: 'Authenticity Score',
//     cardText: feedbackData.authenticityFeedback,
//     cardValue: feedbackData.authenticityScore,
//     extraInfo: null
//   },
//   {
//     cardName: 'Filler Words',
//     cardText: feedbackData.fillerWordsFeedback,
//     cardValue: feedbackData.fillerWordsScore,
//     extraInfo: null
//   },
//   {
//     cardName: 'Negative Tone',
//     cardText: feedbackData.negativeToneFeedback,
//     cardValue: feedbackData.negativeToneScore,
//     extraInfo: null
//   },
//   {
//     cardName: 'Volume',
//     cardText: feedbackData.volumeFeedback,
//     cardValue: feedbackData.loudness,
//     extraInfo: null
//   },
//   {
//     cardName: 'Pace of Speech',
//     cardText: feedbackData.paceOfSpeechFeedback,
//     cardValue: feedbackData.paceOfSpeech,
//     extraInfo: null
//   },
//   {
//     cardName: 'Lighting',
//     cardText: feedbackData.rekognitionScores.brightness_score_feedback,
//     cardValue: feedbackData.rekognitionScores.brightness_score,
//     extraInfo: null
//   },
//   {
//     cardName: 'Eye Contact',
//     cardText: feedbackData.rekognitionScores.eye_contact_score_feedback,
//     cardValue: feedbackData.rekognitionScores.eye_contact_score,
//     extraInfo: null
//   },
//   {
//     cardName: 'Smile',
//     cardText: feedbackData.rekognitionScores.smile_score_feedback,
//     cardValue: feedbackData.rekognitionScores.smile_score,
//     extraInfo: null
//   },
//   {
//     cardName: 'Calm',
//     cardText: feedbackData.rekognitionScores.emotions_feedback,
//     cardValue: null,
//     extraInfo: feedbackData.rekognitionScores.emotions
//   }
// ]

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

          // Decode string by JSON.parse
          const interviewDetails = JSON.parse(result.data.getUserInterviewMetaData.interviewAnalysis)
          console.log('Interview details:', interviewDetails)

          const videoKey = result.data.getUserInterviewMetaData.interviewVideoKey.replace('.webm', '.mp4')

          // Get interview video URL from S3
          const videoUrl = await Storage.get(videoKey, {
            level: 'private'
          })

          setCardData([
            {
              cardName: 'Video',
              cardText:
                'Your mock interview video is here. We have also included a transcript of your interview below: ' +
                interviewDetails.transcribeText,
              cardValue: null,
              extraInfo: null,
              videoUrl: videoUrl
            },
            {
              cardName: 'UM Counter',
              cardText: interviewDetails.umFeedback,
              cardValue: interviewDetails.umCounter,
              extraInfo: null
            },
            {
              cardName: 'Vocabulary',
              cardText: interviewDetails.vocabularyFeedback,
              cardValue: interviewDetails.vocabularyScore,
              extraInfo: interviewDetails.vocabularyKeywords
            },
            {
              cardName: 'Power Word',
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
              cardValue: interviewDetails.loudness,
              extraInfo: null
            },
            {
              cardName: 'Pace of Speech',
              cardText: interviewDetails.paceOfSpeechFeedback,
              cardValue: interviewDetails.paceOfSpeech,
              extraInfo: null
            },
            {
              cardName: 'Lighting',
              cardText: interviewDetails.rekognitionScores.brightness_score_feedback,
              cardValue: interviewDetails.rekognitionScores.brightness_score,
              extraInfo: null
            },
            {
              cardName: 'Eye Contact',
              cardText: interviewDetails.rekognitionScores.eye_contact_score_feedback,
              cardValue: interviewDetails.rekognitionScores.eye_contact_score,
              extraInfo: null
            },
            {
              cardName: 'Smile',
              cardText: interviewDetails.rekognitionScores.smile_score_feedback,
              cardValue: interviewDetails.rekognitionScores.smile_score,
              extraInfo: null
            },
            {
              cardName: 'Calm',
              cardText: interviewDetails.rekognitionScores.emotions_feedback,
              cardValue: null,
              extraInfo: interviewDetails.rekognitionScores.emotions
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching interview details:', error)
      }
    }

    if (interviewID) {
      fetchInterviewDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundColor: '#F2F7FE' }}>
      <Box padding={10}>
        <NavBar
          navBarElements={[
            { name: 'HomePage', path: '/interview' },
            { name: 'Interview Question Review', path: undefined }
          ]}
          closeNavLink='/interview'
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Typography sx={{ fontFamily: 'Montserrat', fontSize: 36, mt: 2 }}>Question Review</Typography>
          {/* // TODO: Replace actual user avatar */}
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt={(auth.user?.fName || '') + (auth.user?.lName || '') || 'john doe'}
            src={
              (process?.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL || '') + (auth.user?.photoImgKey || '') ||
              'public/images/avatars/1.png'
            }
          />{' '}
        </Box>
      </Box>
      <Grid container>
        {cardData.map((card, index) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={index}>
            <InterviewFeedbackCard {...card} onDetailClick={() => handleCardClick(index)} />
          </Grid>
        ))}
      </Grid>
      <Modal open={modalOpen} onClose={handleClose}>
        <InterviewFeedbackCard {...currentCard} isDetailPage={true} />
      </Modal>
    </div>
  )
}

InterviewDetails.acl = {
  action: 'read',
  subject: 'acl-page'
}

InterviewDetails.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default InterviewDetails
