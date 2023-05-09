import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { API, graphqlOperation } from 'aws-amplify'
import { Box, DialogContent, Grid, IconButton, IconButtonProps, Typography, styled } from '@mui/material'
import { getUserInterviewMetaData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { Storage } from 'aws-amplify'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
  interviewQuestion: string
  interviewQuestionTitle: string
  interviewQuestionType: string
  interviewQuestionSampleAns: string
  interviewFeedback: string
}

interface InterviewDetailsProps {
  interview: Interview
}

const StyledPlayButton = styled(({ ...props }: IconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
  backgroundColor: '#CDCDCD',

  '& .MuiSvgIcon-root': {
    fontSize: '2rem'
  },
  padding: theme.spacing(4.1),
  margin: theme.spacing(0, 1.2)
}))

const StyledButton = styled(({ ...props }: IconButtonProps) => <IconButton {...props} />)(({ theme }) => ({
  backgroundColor: '#CDCDCD',

  '& .MuiSvgIcon-root': {
    fontSize: '1rem'
  },
  padding: theme.spacing(3.1),
  margin: theme.spacing(0, 1.2)
}))

const InterviewDetails = ({}: InterviewDetailsProps) => {
  const auth = useAuth()
  const [interviewDetails, setInterviewDetails] = useState<Interview | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const interviewsParam = router.query.interview as any
    const interviews = JSON.parse(interviewsParam)
    const interviewID = interviewsParam ? interviews.interviewID : null
    const interviewQuestionID = interviewsParam ? interviews.interviewQuestionID : null

    const fetchInterviewDetails = async () => {
      const userEmailAddress = auth.user?.userEmailAddress

      // Fetch interview from the router query
      try {
        const result = await API.graphql(
          graphqlOperation(getUserInterviewMetaData, {
            emailAddress: userEmailAddress,
            interviewID: interviewID,
            interviewQuestionID: interviewQuestionID
          })
        )
        if ('data' in result) {
          console.log('Interview details:', result.data.getUserInterviewMetaData)
          setInterviewDetails(result.data.getUserInterviewMetaData)
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

  useEffect(() => {
    // TODO: Change the url time
    if (interviewDetails?.interviewVideoKey) {
      Storage.get(interviewDetails.interviewVideoKey, { level: 'private' })
        .then(url => setVideoUrl(url))
        .catch(error => console.error('Error getting video URL:', error))
    }
  }, [interviewDetails])

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <>
            <DialogContent
              sx={{
                position: 'relative',
                pr: { xs: 5, sm: 12 },
                pl: { xs: 4, sm: 11 },
                pt: { xs: 8, sm: 12.5 },
                pb: { xs: 5, sm: 12.5 },
                height: '280px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'medium',
                    fontSize: '20px',
                    color: '#4C4E64B2' // 4C4E64 * 87%
                  }}
                >
                  Question {interviewDetails?.interviewQuestionID}
                </Typography>

                <Typography
                  variant='h3'
                  sx={{
                    lineHeight: '2.5rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#000000E0' // 000000 * 87%
                  }}
                >
                  {interviewDetails?.interviewQuestionTitle}
                </Typography>
                <br />
                <Typography
                  sx={{
                    // mb: 3,
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'regular',
                    fontSize: '18px',
                    color: '#4C4E64A6' // 4C4E64 * 65%
                  }}
                >
                  {interviewDetails?.interviewQuestion}
                </Typography>
              </div>
            </DialogContent>
            <StyledButton onClick={() => setCurrentPage(currentPage + 1)}>
              <ArrowForwardIosIcon />
            </StyledButton>
          </>
        )
      case 1:
        return (
          <>
            <DialogContent
              sx={{
                position: 'relative',
                pr: { xs: 5, sm: 12 },
                pl: { xs: 4, sm: 11 },
                pt: { xs: 8, sm: 12.5 },
                pb: { xs: 5, sm: 12.5 },
                height: '280px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant='h3'
                  sx={{
                    lineHeight: '2.5rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#000000E0' // 000000 * 87%
                  }}
                >
                  Feedback
                </Typography>

                <br />
                <Typography
                  sx={{
                    mb: 3,
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'regular',
                    fontSize: '18px',
                    color: '#4C4E64A6' // 4C4E64 * 65%
                  }}
                >
                  {interviewDetails?.interviewFeedback}
                </Typography>
              </div>
            </DialogContent>

            <StyledButton onClick={() => setCurrentPage(currentPage - 1)}>
              <ArrowBackIosNewIcon />
            </StyledButton>
            {/* <StyledButton onClick={() => setCurrentPage(currentPage + 1)}>
              <ArrowForwardIosIcon />
            </StyledButton> */}
          </>
        )
      case 2:
        return (
          <>
            <DialogContent
              sx={{
                position: 'relative',
                pr: { xs: 5, sm: 12 },
                pl: { xs: 4, sm: 11 },
                pt: { xs: 8, sm: 12.5 },
                pb: { xs: 5, sm: 12.5 },
                height: '280px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    mb: 3,
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'medium',
                    fontSize: '20px',
                    color: '#4C4E64B2' // 4C4E64 * 87%
                  }}
                >
                  Question {interviewDetails?.interviewQuestionID}
                </Typography>

                <Typography
                  variant='h3'
                  sx={{
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '45px',
                    color: '#000000E0' // 000000 * 87%
                  }}
                >
                  {interviewDetails?.interviewQuestionTitle}
                </Typography>
                <br />
                <Typography
                  sx={{
                    // mb: 3,
                    lineHeight: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'regular',
                    fontSize: '18px',
                    color: '#4C4E64A6' // 4C4E64 * 65%
                  }}
                >
                  {interviewDetails?.interviewQuestion}
                </Typography>
              </div>
            </DialogContent>

            <StyledButton onClick={() => setCurrentPage(currentPage - 1)}>
              <ArrowBackIosNewIcon />
            </StyledButton>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Box>
      <Grid container direction='column' alignItems='center'>
        <Box sx={{ margin: 20 }}></Box>
        <Grid item xs={12}>
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={6}>
              <Box width='500px' height='380px' sx={{ position: 'relative' }}>
                {interviewDetails && (
                  <div>
                    {videoUrl ? (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        width='100%'
                        height='auto'
                        controls
                        style={{ borderRadius: '15px' }}
                      />
                    ) : (
                      <Typography variant='body1' gutterBottom>
                        Interview Video Key: {interviewDetails.interviewVideoKey}
                      </Typography>
                    )}
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                width='500px'
                height='380px'
                borderRadius={'15px'}
                style={{ overflow: 'hidden', backgroundColor: '#EBEBEB', position: 'relative' }}
              >
                {!showDetail && (
                  <MenuOpenIcon style={{ position: 'absolute', bottom: 0, right: 0, margin: 5, color: '#0f0f0f0f' }} />
                )}
                <Grid
                  container
                  alignItems='center'
                  justifyContent='center'
                  style={{ height: '100%' }}
                  onClick={() => {
                    setShowDetail(true)
                  }}
                >
                  {!showDetail ? (
                    <img src='/images/favicon.png' alt='logo' width={'15%'} height={'auto'} />
                  ) : (
                    renderPageContent()
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Box margin={4}></Box>
        <Box width='100%' height='100%' p={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StyledPlayButton onClick={togglePlay}>{playing ? <PauseIcon /> : <PlayArrowIcon />}</StyledPlayButton>
        </Box>

        <Box margin={2}></Box>
      </Grid>
    </Box>
  )
}

InterviewDetails.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default InterviewDetails
