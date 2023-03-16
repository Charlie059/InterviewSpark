// src/utils/addNewGuestUser.ts
import { API, graphqlOperation } from 'aws-amplify'
import { AddNewGuestUserMutation } from '../API'
import { addNewGuestUser as addNewGuestUserMutation } from '../graphql/mutations'

export const addNewGuestUser = async (emailAddress: string, userName: string) => {
  try {
    const response = (await API.graphql(graphqlOperation(addNewGuestUserMutation, { emailAddress, userName }))) as {
      data: AddNewGuestUserMutation
    }

    const newGuestUser = response.data.addNewGuestUser

    return newGuestUser
  } catch (error) {
    console.error('Error adding new guest user:', error)

    return null
  }
}
