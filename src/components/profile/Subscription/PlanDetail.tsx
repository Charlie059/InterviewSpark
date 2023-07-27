import { Card, CardContent, Grid } from '@mui/material'
import { Divider, Typography } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import { PlanType, UserSubscription } from 'src/context/types'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'

interface PlanDetailInterface {
  userSubscription: UserSubscription
}

export const PlanDetail = (planDetailInterface: PlanDetailInterface) => {
  // ** Destructure the props
  const { userSubscription } = planDetailInterface

  // Helper function format date object
  const formatDateToString = (date: string) => {
    // Transform string to date object
    const dateObject = new Date(date)

    const day = dateObject.getDate()
    const month = dateObject.toLocaleString('default', { month: 'short' })
    const year = dateObject.getFullYear()
    const formattedDate = `${month} ${day}, ${year}`

    return formattedDate
  }

  return (
    <Card sx={{ marginTop: -8 }}>
      <CardContent>
        <Grid container direction='row' justifyContent='space-between'>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Grid container spacing={4} sx={{ mb: 2.7 }}>
              <Grid item>
                <ArticleOutlinedIcon />
              </Grid>
              <Grid item xs={10}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                  Current plan type: <strong>{userSubscription.planType}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ mb: 2.7 }}>
              <Grid item>
                <SavingsOutlinedIcon />
              </Grid>
              <Grid item xs={10}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                  Subscription plan: $<strong>{userSubscription.planPeriodAmount}</strong> per{' '}
                  {userSubscription.planPeriod == 'M' ? 'month' : 'year'}
                </Typography>
              </Grid>
            </Grid>
            {userSubscription.planType === PlanType.Prime && (
              <>
                <Grid container spacing={4} sx={{ mb: 2.7 }}>
                  <Grid item>
                    <CalendarMonthOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    {userSubscription.currentPeriodEnd && (
                      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                        Billing starts from: <strong>{formatDateToString(userSubscription.currentPeriodStart)}</strong>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mb: 1.2 }}>
                  <Grid item>
                    <CreditCardOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    {userSubscription.currentPeriodEnd && (
                      <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                        {userSubscription.cancelAtPeriodEnd ? (
                          <>
                            Subscription end date:{' '}
                            <strong>{formatDateToString(userSubscription.currentPeriodEnd)}</strong>
                          </>
                        ) : (
                          <>
                            Next Billing Date: <strong>{formatDateToString(userSubscription.currentPeriodEnd)}</strong>
                          </>
                        )}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ m: '1 !important' }} />
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', mt: 4 }}>
          {userSubscription.planType === PlanType.Prime
            ? `Thanks for being a Prime member${
                userSubscription.cancelAtPeriodEnd ? '. You are always welcome to come back anytime' : ''
              }`
            : 'Thanks for being a member'}
        </Typography>
      </CardContent>
    </Card>
  )
}
