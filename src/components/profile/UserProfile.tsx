// ** Next Import
// import { useRouter } from 'next/router'

// ** MUI Components
// import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

// ** Type Import
//import { ProfileTabType, UserProfileActiveTab } from 'src/@fake-db/types'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Demo Components
//import Profile from 'src/views/pages/user-profile/profile'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import ProfileViewTab from './ProfileViewTab'

import { Subscription } from 'src/context/types'

// Fake data
const dataFreemium: Subscription = {
  premium: false,
  creditsUsed: 200
}

const dataPremium: Subscription = {
  premium: true,
  creditsUsed: 650
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProfile = ({ user, data, type, tab }: { user: any; data: any; type?: string; Props }) => {
  // ** State
  //#TODO Construct a tutorial version profile page
  //data.email = auth.user?.userEmailAddress

  console.log('current profile page is for', user)
  console.log('current data is:', data)

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <UserProfileHeader data={data} type={'Profile'} />
      </Grid>
      <Grid item xs={12}>
        {type !== 'tutorial' && <ProfileViewTab user={user} data={data} type={'profile'} tab={tab} subscriptionData={dataPremium}/>}
      </Grid>
    </Grid>
  )
}

export default UserProfile
