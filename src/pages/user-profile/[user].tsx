// ** Next Import
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types'
import { getUserProfileByUsername } from 'src/graphql/queries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Components Imports
import UserProfile from 'src/components/profile/UserProfile'
import PublicProfile from "../../components/profile/PublicProfile";

const UserProfileTab = ({ user, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const test = true;


  //TODO CHECK IF user = auth.user?.userName || IF data.isPublic, IF NOT display not authorized
  console.log(data)

  // If user is current user or profile is public, display profile
  if (user === auth.user?.userName) {
    return <UserProfile user={user} data={data} />
  } else if(test || data.isPublic){
    if(auth.user){
      return <PublicProfile user={user} data = {data}/>
    }else{
      router.replace(`/`+user)
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
  let data = null

  try {
    const userData = await API.graphql(graphqlOperation(getUserProfileByUsername, { userName: userName }))
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
