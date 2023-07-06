// ** Next Import
import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types'
import { getUserEducations, getUserProfileByUsername, getUserWorkHistories } from 'src/graphql/queries'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Components Imports
import PublicProfile from 'src/components/profile/PublicProfile'
import React, { ReactNode } from 'react'
import BlankLayout from '../@core/layouts/BlankLayout'
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Box, {BoxProps} from "@mui/material/Box";
import FooterIllustrations from "../views/pages/misc/FooterIllustrations";
import {styled} from "@mui/material/styles";

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 400,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))
const PublicProfileGuest = ({ user, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  console.log()

  //TODO CHECK IF user = auth.user?.userName || IF data.isPublic, IF NOT display not authorized
 if(auth.user?.userName===user){
    router.push('/user-profile/'+user)
  } else if (data?.isPublic) {
    return (
      <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ mb: 2.7 }}>
        <Grid item xs={12} sm={10} md={8} lg={8} xl={8}>
          <PublicProfile user={user} data={data}/>
        </Grid>
      </Grid>
    )
  } else {
    // If user is unauthorized, redirect to 401 page
    return(
      <Box className='content-center'>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h1' sx={{ mb: 2.5 }}>
              404
            </Typography>
            <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
              User Not Found ⚠️
            </Typography>
            <Typography variant='body2'>We couldn&prime;t find the user you are looking for.</Typography>
            <Typography variant='body2'> They might not have enabled profile sharing yet.</Typography>
          </BoxWrapper>
          <Img alt='error-illustration' src='/images/pages/404.png' />
          <Button href='/' component={Link} variant='contained' sx={{ px: 5.5 }}>
            Back to Login
          </Button>
        </Box>
        <FooterIllustrations image='/images/pages/misc-404-object.png' />
      </Box>
    )
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
      const eduData = await API.graphql(graphqlOperation(getUserEducations, { emailAddress: data.userEmailAddress }))
      const workData = await API.graphql(
        graphqlOperation(getUserWorkHistories, { emailAddress: data.userEmailAddress })
      )
      if ('data' in eduData) {
        data.educations = eduData.data.getUserEducations.educations
      }
      if ('data' in workData) {
        data.workHistory = workData.data.getUserWorkHistories.workHistory
      }
      console.log(data)
    }
  } catch (error) {
    console.error('Error fetching user data', error)
  }

  //if user data is private, return nothing
  if(!data?.isPublic){
    data={isPublic:false}
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
