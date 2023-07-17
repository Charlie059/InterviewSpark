// ** MUI Components
import Grid from '@mui/material/Grid'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import ProfileViewTab from './ProfileViewTab'

import { Subscription, PlanPeriod, PlanType } from 'src/context/types'
import { useState } from 'react'

// Define the tab type
type Tab = 'overview' | 'account-setting' | 'billing-plan'

const UserProfile = ({ user, data, type, tab }: { user: any; data: any; type?: string; tab: Tab }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    startDate: new Date(),
    endDate: null,
    planPeriodAmount: 0,
    planPeriod: PlanPeriod.M,
    planType: PlanType.Free,
    products: []
  })

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <UserProfileHeader data={data} type={'Profile'} />
      </Grid>
      <Grid item xs={12}>
        {type !== 'tutorial' && (
          <ProfileViewTab user={user} data={data} tab={tab} subscriptionData={subscriptionData} />
        )}
      </Grid>
    </Grid>
  )
}

export default UserProfile
