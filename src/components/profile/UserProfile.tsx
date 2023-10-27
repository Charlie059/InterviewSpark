// ** MUI Components
import Grid from '@mui/material/Grid'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import ProfileViewTab from './ProfileViewTab'
import { Tab, UserProfileViewTypes } from 'src/context/types'

// Define the Interface for UserProfile
interface UserProfile {
  user: any
  data: any
  type?: UserProfileViewTypes
  tab: Tab
}

const UserProfile = (userProfile: UserProfile) => {
  // Destructure the props
  const { user, data, type, tab } = userProfile

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <UserProfileHeader type={'Profile'} />
      </Grid>
      <Grid item xs={12}>
        {type === UserProfileViewTypes.profile && <ProfileViewTab user={user} data={data} tab={tab} />}
      </Grid>
    </Grid>
  )
}

export default UserProfile
