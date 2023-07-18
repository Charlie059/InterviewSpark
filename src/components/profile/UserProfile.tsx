// ** MUI Components
import Grid from '@mui/material/Grid'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import ProfileViewTab from './ProfileViewTab'

import {PlanPeriod, PlanPeriodAmount, PlanType, Product, ProductTotalNumUsage, Subscription} from 'src/context/types'
import {useState} from 'react'

// Define the tab type
type Tab = 'overview' | 'account-setting' | 'billing-plan'

// Fake data
const productInfo: Product[] = [
  {
    productDetail: "Hone your skills and boost your confidence by practicing interview questions to ace your job interview",
    productID: "MIQ_AL_003",
    productName: "Mock Interview",
    productNumUsage: 2,
    productTotalNumUsage: ProductTotalNumUsage.Free,
  },
  {
    productDetail: "Upload your resume alongside the job description for a personalized analysis",
    productID: "RS_EL_004",
    productName: "Resume Scan",
    productNumUsage: 7,
    productTotalNumUsage: ProductTotalNumUsage.Free,
  }
]


const UserProfile = ({ user, data, type, tab }: { user: any; data: any; type?: string; tab: Tab }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    cancelAtPeriodEnd: false,
    currentPeriodStart: new Date("2023-06-15"),
    currentPeriodEnd: new Date("2023-07-15"),
    planPeriodAmount: PlanPeriodAmount.Free,
    planPeriod: PlanPeriod.M,
    planType: PlanType.Free,
    products: productInfo
  })

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <UserProfileHeader data={data} type={'Profile'} />
      </Grid>
      <Grid item xs={12}>
        {type !== 'tutorial' && (
          <ProfileViewTab user={user} data={data} tab={tab} subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData}/>
        )}
      </Grid>
    </Grid>
  )
}

export default UserProfile
