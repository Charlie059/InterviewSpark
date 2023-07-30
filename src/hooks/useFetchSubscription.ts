import { API, graphqlOperation } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { PlanPeriod, PlanType, UserSubscriptionProductsList } from 'src/context/types'
import { getUserCurrentActiveSubscriptionAndProducts } from 'src/graphql/queries'
import Logger from 'src/middleware/loggerMiddleware'

// Init Subscription and Products List
const initUserSubscriptionProductsList: UserSubscriptionProductsList = {
  userSubscriptionProductsArray: [
    {
      userSubscription: {
        cancelAtPeriodEnd: false,
        currentPeriodEnd: '2023-01-1T00:00:00.00',
        currentPeriodStart: '2023-01-1T00:00:00.00',
        GSI1SK: '',
        planPeriod: PlanPeriod.M,
        planPeriodAmount: 0,
        planStatus: 'active',
        planType: PlanType.Free,
        stripeCustomerID: '',
        subscriptionID: ''
      },
      userSubscriptionProduct: [
        {
          GSI1SK: 'PRODUCT#1',
          productDetail: '',
          productID: '1',
          productName: 'Synchronized interactive interview feedback with video analysis',
          productNumUsage: 0,
          productTotalNumUsage: 10,
          subscriptionID: ''
        }
      ]
    }
  ]
}

export const useFetchSubscription = (userEmailAddress: string | null | undefined) => {
  const [userSubscriptionProductsList, setUserSubscriptionProductsList] = useState<UserSubscriptionProductsList>(
    initUserSubscriptionProductsList
  )
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmailAddress) {
          throw new Error('User Email Address is not provided.')
        }

        const response = await API.graphql(
          graphqlOperation(getUserCurrentActiveSubscriptionAndProducts, { emailAddress: userEmailAddress })
        )
        if ('data' in response) {
          setUserSubscriptionProductsList(response.data.getUserCurrentActiveSubscriptionAndProducts)
        }
      } catch (error) {
        Logger.error('An error occurred while fetching data:', error)
        setError(error instanceof Error ? error : new Error('An unknown error occurred.'))
      }
    }
    fetchData()
  }, [userEmailAddress])

  return { userSubscriptionProductsList, error }
}
