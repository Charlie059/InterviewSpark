/***********************************************************************************************
  Name: useFeedbackForm.ts
  Description: This file contains the custom hook for feedbackForm.
  Author: Charlie Gong
  Company: HireBeat Inc.
  Contact: Xuhui.Gong@HireBeat.co
  Create Date: 2023/10/02
  Update Date: 2023/10/02
  Copyright: © 2023 HireBeat Inc. All rights reserved.
************************************************************************************************/

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'
import { API, graphqlOperation } from 'aws-amplify'
import { handleEvent } from 'src/graphql/mutations'

interface FormData {
  rating: number
  review: string
}

const FEEDBACK_FORM_SCHEMA = Yup.object().shape({
  rating: Yup.number().min(1, 'Rating is required').required('Rating is required'),
  review: Yup.string().required('Review is required')
})

export const useFeedbackForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(FEEDBACK_FORM_SCHEMA)
  })

  const auth = useAuth()

  const pushEvent = async () => {
    const userEmailAddress = auth.user?.userEmailAddress

    // Push event to SNS
    try {
      const res = await API.graphql(
        graphqlOperation(handleEvent, {
          operation: 'mutation',
          name: 'FeedbackEvent',
          arguments: JSON.stringify({
            action: 'Leave_Feedback'
          }),
          user: userEmailAddress!
        })
      )
      console.log('res: ', res)
    } catch (error) {
      console.log('Error pushing event to SNS: ', error)
    }
  }
  const onSubmit: SubmitHandler<FormData> = data => {
    try {
      auth.trackEvent('FeedbackEvent', {
        rating: data.rating,
        review: data.review
      })
      pushEvent()
      setIsSubmitted(true)
    } catch (e: any) {
      console.error(e)
      toast.error('Error submitting feedback, please try again later.')
    }
  }

  return {
    isSubmitted,
    control,
    handleSubmit,
    errors,
    onSubmit,
    setIsSubmitted
  }
}
