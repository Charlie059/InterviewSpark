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
    "photoImgURL": "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture.jpg",
    "coverImgURL": 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ef71780-bbed-494b-8633-05301786f9ce/dew3k8d-2bd14f7a-3d72-4757-881b-a19686520b38.png/v1/fill/w_1280,h_720/trans_flag_background_by_imoogi_nascent_dew3k8d-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvOWVmNzE3ODAtYmJlZC00OTRiLTg2MzMtMDUzMDE3ODZmOWNlXC9kZXczazhkLTJiZDE0ZjdhLTNkNzItNDc1Ny04ODFiLWExOTY4NjUyMGIzOC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.4Asaj6-IcvYga7ZMOc0fHf-Ru18jxTUT0yxIldfgubA',
    "resumeKey": "test.url",
    "addressLine1": "",
    "addressLine2": "",
    "city": "New York",
    "state": "NY",
    "postalCode": "",
    "country": "USA",
    "joiningDate": '2022-05-22',
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
