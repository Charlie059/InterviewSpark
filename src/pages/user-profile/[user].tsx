// ** Next Import
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPropsContext, InferGetServerSidePropsType,
  InferGetStaticPropsType
} from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserProfile from 'src/views/pages/user-profile/UserProfile'

// ** Types
import { UserProfileActiveTab } from 'src/@fake-db/types'
import {API, graphqlOperation} from "aws-amplify";
import {getUserProfile} from "../../graphql/queries";
import {useAuth} from "../../hooks/useAuth";
import router from 'next/router';
import {useEffect, useState} from "react";

const UserProfileTab = ({user, data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //#TODO CHECK IF getEmailHash(user) = auth.user?.userEmailAddress || IF data.isPublic, IF NOT display not authorized
  return <UserProfile user={user} data={data}/>
}

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [{ params: { user: 'profile' } }],
//     fallback: false
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({params}: GetServerSidePropsContext) => {

  //#TODO Get real profile data from DB

  console.log("params is:", params) // param is username#****

  //#TODO get profile from abc#1234

  //get profile data
  // const emailAddress = 'fs470@scarletmail.rutgers.edu' //testing, should be derived from email hash
  // const profileData = await API.graphql(graphqlOperation(getUserProfile, {emailAddress}));
  // console.log(profileData)

  //Gets mock data from fakeDB
  //const res = await axios.get('/pages/profile', { params: { tab: 'profile'} })
  //const data: UserProfileActiveTab = res.data
  const data = {
    "fName": "Fan",
    "lName": "Shen",
    "photoImgURL": null,
    "coverImgRUL": null,
    "resumeKey": "",
    "addressLine1": "",
    "addressLine2": "",
    "city": "",
    "state": "",
    "postalCode": "",
    "country": "",
    "joiningDate": null,
    "contact": null
  }

  return {
    props: {
      data,
      user: params?.user
    }
  }
}

export default UserProfileTab
UserProfileTab.acl = {
  action: 'read',
  subject: 'acl-page'
}
