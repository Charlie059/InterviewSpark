// src/utils/addNewGuestUser.ts
import { API, graphqlOperation } from 'aws-amplify'
import { CreateNewGuestUserMutation } from '../API'
import { createNewGuestUser } from '../graphql/mutations'
import Logger from '../middleware/loggerMiddleware'

export const addNewGuestUser = async (emailAddress: string, userName: string) => {
  try {
    const response = (await API.graphql(graphqlOperation(createNewGuestUser, { emailAddress, userName }))) as {
      data: CreateNewGuestUserMutation
    }

    const newGuestUser = response.data.createNewGuestUser

    return newGuestUser
  } catch (error) {
    Logger.error('Error adding new guest user:', error)

    return null
  }
}
