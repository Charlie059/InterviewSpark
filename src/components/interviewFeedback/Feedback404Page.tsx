import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Button, Card, Space, Spin } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const { Title, Paragraph } = Typography

function FeedbackAnalysisPage() {
  const router = useRouter()

  const handleGoToHomePage = () => {
    router.push('/interview')
  }

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
            Thank you!
          </Title>
          <Title level={4} style={{ fontFamily: 'Montserrat' }}>
            You've completed your mock interview!
          </Title>
          <Paragraph style={{ fontFamily: 'Montserrat' }}>
            'We are currently analyzing your feedback. Please be patient as this might take some time.'
          </Paragraph>
          <Button type='primary' size='large' style={{ fontFamily: 'Montserrat' }} onClick={handleGoToHomePage}>
            Back to Interview Page
          </Button>
        </Space>
      </Card>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Spin size='large' />
      </div>
    </div>
  )
}

FeedbackAnalysisPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

FeedbackAnalysisPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default FeedbackAnalysisPage
