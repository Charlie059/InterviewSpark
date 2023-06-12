/***********************************************************************************************
  Name: useS3Video.tsx
  Description: This file contains the custom hook for saving and removing videos in S3.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/06/04
  Update Date: 2023/06/04

  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { Auth, Storage } from 'aws-amplify'
import { useState } from 'react'
import Logger from 'src/middleware/loggerMiddleware'

// Define the error state
interface ErrorState {
  type: 'ChatGPT-Error' | 'AWS-S3-Error'
  message?: string
}

// This hook provides functionalities to save and remove videos in S3
const useS3Video = () => {
  const [error, setError] = useState<ErrorState | null>(null)

  // Save a video in S3 with a unique filename, and return the filename
  const save = async (blob: Blob | null) => {
    // Check if blob is null
    if (!blob) throw new Error('Error saving video: blob is null')

    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      const userId = currentUser.attributes.sub
      const timestamp = new Date().getTime()
      const uniqueFilename = `${userId}-${timestamp}-interview.webm`

      await Storage.put(uniqueFilename, blob, {
        contentType: 'video/webm',
        level: 'private'
      })

      return uniqueFilename
    } catch (error: any) {
      Logger.error('Error saving video: ', error)
      setError({ type: 'AWS-S3-Error', message: error })
    }
  }

  // Remove a video from S3
  const remove = async (key: string) => {
    try {
      await Storage.remove(key, {
        level: 'private'
      })
    } catch (error: any) {
      Logger.error('Error removing video: ', error)
      setError({ type: 'AWS-S3-Error', message: error })
    }
  }

  return {
    save,
    remove,
    s3Error: error
  }
}

export default useS3Video
