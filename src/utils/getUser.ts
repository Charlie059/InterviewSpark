// src/utils/getUser.ts
import { API, graphqlOperation } from 'aws-amplify'
import { GetUserQuery } from '../API'
import { getUser } from '../graphql/queries'

export const getUserData = async (emailAddress: string) => {
  try {
    const response = (await API.graphql(graphqlOperation(getUser, { emailAddress }))) as { data: GetUserQuery }

    const userData = response.data.getUser

    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)

    return null
  }
}
