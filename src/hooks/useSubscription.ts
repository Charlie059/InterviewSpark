import { API, graphqlOperation } from 'aws-amplify'
import { useCallback } from 'react'
import {
  cancelUserSubscriptionRequest,
  createUserSubscriptionRequest,
  resumeUserSubscriptionRequest
} from 'src/graphql/mutations'
import Logger from 'src/middleware/loggerMiddleware'
import { useAuth } from './useAuth'
import { UserSubscription } from 'src/context/types'

export function useSubscription(userSubscription: UserSubscription | null) {
  const auth = useAuth()

  const handleUserClickPlanUpgrade = useCallback(async () => {
    try {
      // Log the event
      Logger.info('User clicked plan upgrade')

      // TODO: Get Premium Plan ID from DB
      const planID = 2

      // Check if we have user's email
      if (!auth.user?.userEmailAddress) {
        throw new Error('No user email found')
      }

      Logger.debug('User email found', auth.user?.userEmailAddress)

      const result = await API.graphql(
        graphqlOperation(createUserSubscriptionRequest, {
          userEmail: auth.user?.userEmailAddress,
          planID: planID
        })
      )

      Logger.debug('Subscription request result', result)

      // Check if 'data' exists in result
      if ('data' in result!) {
        if (result.data.createUserSubscriptionRequest.isSuccessful) {
          const infoJSON = JSON.parse(result.data.createUserSubscriptionRequest.info)

          // Log the event
          auth.trackEvent('UserCreateNewSubscriptionRequest', {
            action: 'User Clicked Plan Upgrade',
            currentPlan: 'Free',
            newPlan: 'Premium'
          })

          // Log the event user
          auth.setMixpanelPeople({
            action: 'User Clicked Plan Upgrade',
            currentPlan: 'Free',
            newPlan: 'Premium'
          })

          return { infoJSON, isSuccessful: true }
        } else {
          throw new Error('Subscription request failed: ' + result.data.createUserSubscriptionRequest.error)
        }
      } else {
        throw new Error('No data received in response')
      }
    } catch (error) {
      Logger.error('Error creating subscription request', error)

      return { isSuccessful: false }
    }
  }, [auth])

  const handleUserConfirmCancelSubscription = useCallback(async () => {
    try {
      const userEmail = auth.user?.userEmailAddress // Get the user email from your auth object
      const subscriptionId = userSubscription!.subscriptionID // Get the subscription ID from your subscription object

      const result = await API.graphql(
        graphqlOperation(cancelUserSubscriptionRequest, {
          userEmail,
          subscriptionId
        })
      )

      if ('data' in result && result.data.cancelUserSubscriptionRequest.isSuccessful) {
        // Log the event
        auth.trackEvent('UserCreateNewCancelSubscriptionRequest', {
          action: 'User Clicked Plan Cancel',
          currentPlan: 'Premium',
          newPlan: 'Free'
        })

        // Log the event user
        auth.setMixpanelPeople({
          action: 'User Clicked Plan Cancel',
          currentPlan: 'Premium',
          newPlan: 'Free'
        })

        return result.data.cancelUserSubscriptionRequest.isSuccessful
      }
    } catch (error) {
      Logger.error('Error cancelling subscription', error)

      return false
    }
  }, [auth, userSubscription]) // auth and userSubscription as dependency

  const handleUserConfirmResumeSubscription = useCallback(async () => {
    try {
      const userEmail = auth.user?.userEmailAddress
      const subscriptionId = userSubscription!.subscriptionID

      const result = await API.graphql(
        graphqlOperation(resumeUserSubscriptionRequest, {
          userEmail,
          subscriptionId
        })
      )

      // Log the event
      auth.trackEvent('UserCreateNewResumeSubscriptionRequest', {
        action: 'User Clicked Plan Resume',
        currentPlan: 'Free',
        newPlan: 'Premium'
      })

      // Log the event user
      auth.setMixpanelPeople({
        action: 'User Clicked Plan Resume',
        currentPlan: 'Free',
        newPlan: 'Premium'
      })

      if ('data' in result && result.data.resumeUserSubscriptionRequest.isSuccessful) {
        return result.data.resumeUserSubscriptionRequest.isSuccessful
      }
    } catch (error) {
      Logger.error('Error resuming subscription', error)

      return false
    }
  }, [auth, userSubscription])

  return {
    handleUserClickPlanUpgrade,
    handleUserConfirmCancelSubscription,
    handleUserConfirmResumeSubscription
  }
}
