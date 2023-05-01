/* eslint-disable @typescript-eslint/no-unused-vars */
// ignore all errors and warnings in this file
// @ts-nocheck

// ignore all var not used errors in this file

import React from 'react'

import QuickViewQuestion from 'src/components/interview/createInterview/quick-view-question'

// import InterviewList from 'src/components/interview-list/interview-list'

const WebcamConfirm: React.FC<DeviceSelectorProps> = ({ deviceType, onChange }) => {
  return (
    <div>
      <QuickViewQuestion />
    </div>
  )
}

WebcamConfirm.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default WebcamConfirm
