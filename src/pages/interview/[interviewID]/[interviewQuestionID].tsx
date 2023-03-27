import { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getInterviewData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { Storage } from 'aws-amplify'

const InterviewQuestionPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interviewData, setInterviewData] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')

  const auth = useAuth()
  const router = useRouter()
  const { interviewID, interviewQuestionID } = router.query

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const emailAddress = auth.user?.userEmailAddress

        // log email address and interview ID and interview question ID
        console.log(emailAddress)
        console.log(interviewID)
        console.log(interviewQuestionID)
        const result = await API.graphql(
          graphqlOperation(getInterviewData, {
            emailAddress,
            interviewID,
            interviewQuestionID
          })
        )

        if ('data' in result) {
          setInterviewData(result.data.getInterviewData)

          // Fetch video from S3
          const videoKey = result.data.getInterviewData.interviewVideoKey
          const url = await Storage.get(videoKey, {
            level: 'private',
            expires: 60 * 30
          })

          setVideoUrl(url)
        }
      } catch (error) {
        console.error(`Error fetching interview data: ${error}`)
      }
    }
    fetchInterviewData()
  }, [auth.user?.userEmailAddress, interviewID, interviewQuestionID])

  return (
    <div>
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type='video/mp4' />
        </video>
      )}
    </div>
  )
}

export default InterviewQuestionPage
