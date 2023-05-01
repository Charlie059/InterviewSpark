import { GetUserQuery } from '../API'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { UserDataType } from '../context/types'
import Log from 'src/middleware/loggerMiddleware'

export const getUserData = async (emailAddress: string): Promise<UserDataType | null> => {
  try {
    const result = (await API.graphql(graphqlOperation(getUser, { emailAddress }))) as { data: GetUserQuery }

    if (result.data.getUser) {
      const user = result.data.getUser
      Log.info('User data:', user)

      return {
        __typename: 'User',
        userRole: user.userRole,
        userEmailAddress: user.userEmailAddress,
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
