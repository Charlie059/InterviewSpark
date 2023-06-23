// src/utils/getUser.ts
import { API, graphqlOperation } from 'aws-amplify'
import { GetUserProfileQuery } from 'src/API'
import { getUserProfile } from '../graphql/queries'

export const getUserProfileData = async (emailAddress: string) => {
  try {
    const response = (await API.graphql(graphqlOperation(getUserProfile, { emailAddress }))) as {
      data: GetUserProfileQuery
    }

    const userData = response.data.getUserProfile

    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)

    return null
  }
}
