import { GetUserQuery } from '../API'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { UserDataType } from '../context/types'

export const getUserData = async (emailAddress: string): Promise<UserDataType | null> => {
  try {
    const result = (await API.graphql(graphqlOperation(getUser, { emailAddress }))) as { data: GetUserQuery }

    if (result.data.getUser) {
      const user = result.data.getUser
      console.log(result)

      return {
        __typename: 'User',
        userRole: user.userRole,
        userEmailAddress: user.userEmailAddress,
        hasProfile: user.hasProfile,
        allowPublicInterview: user.allowPublicInterview,
        userName: user.userName
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)

    return null
  }
}
