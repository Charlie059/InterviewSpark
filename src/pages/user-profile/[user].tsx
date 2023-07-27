// ** Next Import
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types'
import { getUserProfileByUsername } from 'src/graphql/queries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Components Imports
import UserProfile from 'src/components/profile/UserProfile'
import PublicProfile from '../../components/profile/PublicProfile'
import { Tab, UserDataType, UserProfileViewTypes } from 'src/context/types'

const UserProfileTab = ({ user, profileData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // If user is current user or profile is public, display profile
  if (user === auth.user?.userName) {
    return <UserProfile user={user} data={profileData} type={UserProfileViewTypes.profile} tab={Tab.overview} />
  } else if (profileData?.isPublic) {
    if (auth.user) {
      return <PublicProfile user={user} data={profileData} />
    } else {
      router.replace(`/` + user)
    }
  } else {
    // If user is unauthorized, redirect to 401 page
    router.replace('/401')
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const userName = params?.user
  console.log(userName)

  // Get userProfile data from GraphQL
  let profileData: UserDataType = null

  try {
    const userData = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: userName }))
    if ('data' in userData) {
      profileData = userData.data.getUserProfileByUsername
    }
  } catch (error) {
    console.error('Error fetching user data', error)
  }

  return {
    props: {
      profileData,
      user: userName
    }
  }
}

export default UserProfileTab
UserProfileTab.acl = {
  action: 'read',
  subject: 'acl-page'
}
