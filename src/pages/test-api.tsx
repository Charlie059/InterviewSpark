import React from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { getUser } from 'src/graphql/queries'

// ... other imports and queries ...

type User = {
  emailAddress: string
  userRole: string
  userName: string
  hasProfile: boolean
  allowPublishInterview: boolean
}

const TestApi: React.FC = () => {
  const handleButtonClick = async () => {
    const testEmail = 'test@example.com'

    const userData = (await API.graphql(graphqlOperation(getUser, { emailAddress: testEmail }))) as GraphQLResult<{
      getUser: User
    }>

    console.log('User data:', userData.data?.getUser)
  }

  return (
    <div>
      <h1>Click the button to print user data in the console:</h1>
      <button onClick={handleButtonClick}>Fetch Data</button>
    </div>
  )
}

export default TestApi
