// ** Next Import
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types'
import {getUserEducations, getUserProfileByUsername, getUserWorkHistories} from 'src/graphql/queries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Components Imports
import PublicProfile from 'src/components/profile/PublicProfile'
import {ReactNode} from "react";
import BlankLayout from "../@core/layouts/BlankLayout";

const PublicProfileGuest = ({ user, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const test = true;
  console.log()

  //TODO CHECK IF user = auth.user?.userName || IF data.isPublic, IF NOT display not authorized
  if (user === auth.user?.userName) {
    router.replace('/user-profile/' +user)
  } else if(test || data.isPublic){
    return <PublicProfile user={user} data={data} />
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
      //  console.log(data)
      const eduData = await API.graphql(graphqlOperation(getUserEducations,{emailAddress:data.userEmailAddress}))
      const workData = await API.graphql(graphqlOperation(getUserWorkHistories,{emailAddress:data.userEmailAddress}))
      console.log(eduData.data.getUserEducations)
      data.educations = eduData.data.getUserEducations.educations
      data.workHistory = workData.data.getUserWorkHistories.workHistory
      console.log(data)
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

PublicProfileGuest.authGuard = false
PublicProfileGuest.guestGuard = false
PublicProfileGuest.isPublic = true

PublicProfileGuest.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default PublicProfileGuest
PublicProfileGuest.acl = {
  action: 'read',
  subject: 'acl-page'
}

