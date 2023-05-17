// ** Next Import
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types'
import { getUserProfile } from 'src/graphql/queries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Components Imports
import UserProfile from 'src/views/pages/user-profile/UserProfile'

const UserProfileTab = ({ user, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  //TODO CHECK IF user = auth.user?.userName || IF data.isPublic, IF NOT display not authorized

  // If user is current user or profile is public, display profile
  if (data.isPublic || user === auth.user?.userName) {
    return <UserProfile user={user} data={data} />
  } else {
    // If user is unauthorized, redirect to 401 page
    router.replace('/401')
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const userName = params

  // Get userProfile data from GraphQL
  let data = null

  try {
    const userData = await API.graphql(graphqlOperation(getUserProfile, { userName }))
    if ('data' in userData) {
      data = userData.data.getUserProfileByUsername
    }
  } catch (error) {
    console.error('Error fetching user data', error)
  }

  return {
    props: {
      data,
      user: userName
    }
  }
}

export default UserProfileTab
UserProfileTab.acl = {
  action: 'read',
  subject: 'acl-page'
}
