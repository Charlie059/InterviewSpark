import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Button, Card, Space } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Confetti from 'react-confetti'
import { useAuth } from 'src/hooks/useAuth'

const { Title, Paragraph } = Typography

function FinishedInterviewPage() {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)
  const auth = useAuth()

  function mixPanelTracker() {
    auth.trackEvent('User_Interview_Functionality_Used', {
      action: 'Finish_Interview',
      desc: 'User finished a interview.'
    })

    // User tracking
    auth.setMixpanelPeople({
      action: 'Finish_Interview',
      desc: 'User finished a interview.'
    })
  }

  const handleGoToHomePage = () => {
    // Mixpanel track event
    mixPanelTracker()
    router.push('/interview')
  }

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        width: '100%',

        backgroundImage:
          'url(https://hirebeatjobseeker8d3233807f804e91a21f26d39e1a0e214038-staging.s3.amazonaws.com/public/finishInterview.png)'
      }}
    >
      {showConfetti && <Confetti />}
      <Card
        style={{
          width: '50%',
          borderRadius: '25px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center' }}>
          <CheckCircleTwoTone style={{ fontSize: '72px' }} twoToneColor='#52c41a' rev={undefined} />
          <Title level={2} style={{ fontFamily: 'Montserrat' }}>
            Congratulations!
          </Title>
          <Title level={4} style={{ fontFamily: 'Montserrat' }}>
            You've completed your practice interview!
          </Title>
          <Paragraph style={{ fontFamily: 'Montserrat' }}>
            You've taken an important step towards your career goals. By practicing interviews, you're improving your
            communication skills and learning how to present yourself effectively. Don't forget to review the feedback
            you received and work on any areas that need improvement. Keep practicing, and soon you'll be more confident
            and better prepared for real interviews.
          </Paragraph>
          <Button type='primary' size='large' style={{ fontFamily: 'Montserrat' }} onClick={handleGoToHomePage}>
            Back to Interview Page
          </Button>
        </Space>
      </Card>
    </div>
  )
}

FinishedInterviewPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

FinishedInterviewPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default FinishedInterviewPage
