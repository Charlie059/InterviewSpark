// ** React Imports
import {ReactNode, useState} from 'react'

// ** Next Import
// import { useRouter } from 'next/router'

// ** MUI Components
// import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import Divider from '@mui/material/Divider'

import CardContent from '@mui/material/CardContent'


// ** Utils Import


// ** Type Import
//import { ProfileTabType, UserProfileActiveTab } from 'src/@fake-db/types'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Demo Components
//import Profile from 'src/views/pages/user-profile/profile'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import BlankLayout from "../../@core/layouts/BlankLayout";

// import { API, graphqlOperation } from 'aws-amplify'
// import { updateUserProfile } from 'src/graphql/mutations'

// @ts-ignore
const PublicProfile = ({ user, data }) => {
  // ** State

  //data.email = auth.user?.userEmailAddress

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log('current profile page is for', user)
  console.log('current data is:', data)


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileData, setProfileData] = useState(data)

  console.log('initial data')
  console.log(data)
  const dashwidth = 12


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultValues = data


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader data={data} type={"profile"}/>
      </Grid>
      <Grid item xs={4}>
        {/*{isLoading ? (*/}
        {/*  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>*/}
        {/*    <CircularProgress sx={{ mb: 4 }} />*/}
        {/*    <Typography>Loading...</Typography>*/}
        {/*  </Box>*/}
        {/*) : (*/}
        {/* <Profile data={data} />*/}
        <Card>
          <CardContent>
            <Typography variant='h6'>Details</Typography>
            <Divider sx={{ mt: 4 }} />
            <Grid container spacing={1}>
              <Grid item xs={6} lg={dashwidth}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Username:
                  </Typography>
                  <Typography variant='body2'>{user}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={dashwidth}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{profileData.userEmailAddress}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={dashwidth}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>{profileData.contact}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={dashwidth}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>City:</Typography>
                  <Typography variant='body2'>{profileData.city}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} lg={dashwidth}>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Country:</Typography>
                  <Typography variant='body2'>{profileData.country}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

PublicProfile.authGuard = false
PublicProfile.guestGuard = false
PublicProfile.isPublic = true
PublicProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default PublicProfile
PublicProfile.acl = {
  action: 'read',
  subject: 'acl-page'
}
