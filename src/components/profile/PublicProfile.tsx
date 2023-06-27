// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'

// ** Types Import
import { Education, WorkHistory } from '../../context/types'

// ** Layout & Component Import
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import BlankLayout from '../../@core/layouts/BlankLayout'
import EducationCard from './profile-cards/EducationCard'
import WorkHistoryCard from './profile-cards/WorkHistoryCard'

// @ts-ignore
const PublicProfile = ({ user, data, type }) => {
  // ** State

  console.log('current profile page is for', user)
  console.log('current data is:', data)

  const educationTestData: Education[] = [
    {
      eduID: 'test1',
      eduDegree: 'Masters',
      eduFieldStudy: 'Computer Science',
      eduSchool: 'Rutgers University',
      eduStartDate: new Date('2021-09-01'),
      eduEndDate: new Date('2023-06-01'),
      eduActivities: 'testing Activities',
      eduDescription: 'testing description'
    },
    {
      eduID: 'test2',
      eduDegree: 'Bachelors',
      eduFieldStudy: 'Computer Science',
      eduSchool: 'Ohio State University',
      eduStartDate: new Date('2019-09-01'),
      eduEndDate: new Date('2021-08-08')
    }
  ]

  const workHistoryTestData: WorkHistory[] = [
    {
      workHistoryJobTitle: 'Full Stack Developer',
      workHistoryEmployer: 'HireBeat',
      workHistoryStartDate: 'May 2021',
      workHistoryEndDate: '',
      workHistoryJobDescription: ''
    }
  ]

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
        <UserProfileHeader data={data} type={'profile'} />
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
      <Grid item xs={8}>
        <EducationCard type='public' eduDatas={educationTestData} />
      </Grid>
      <Grid item xs={8}>
        <WorkHistoryCard type='public' workData={workHistoryTestData} />
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
