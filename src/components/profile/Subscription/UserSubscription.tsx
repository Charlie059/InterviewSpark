// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Utils
import { useAuth } from 'src/hooks/useAuth'
import { useFetchSubscription } from 'src/hooks/useFetchSubscription'
import { PlanDetail } from './PlanDetail'
import { ProductDetail } from './ProductDetail'
import { PlanHeader } from './PlanHeader'
import { SubscriptionDialogs } from './SubscriptionDialogs'
import { useState } from 'react'

interface DialogSelectParam {
  upgrade: boolean
  resume: boolean
  cancel: boolean
  confirmCancel: boolean
}

const UserSubscription = () => {
  // ** State
  const [dialogSelectParam, setDialogSelectParam] = useState<DialogSelectParam>({
    upgrade: false,
    resume: false,
    cancel: false,
    confirmCancel: false
  })

  // ** Hooks
  const auth = useAuth()
  const { userSubscriptionProductsList } = useFetchSubscription(auth.user?.userEmailAddress || null)

  return (
    <>
      <SubscriptionDialogs
        userSubscription={userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscription}
        dialogParams={dialogSelectParam}
        setDialogParams={setDialogSelectParam}
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ mb: 4 }}>
            <PlanHeader
              userSubscription={userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscription}
              dialogParams={dialogSelectParam}
              setDialogParams={setDialogSelectParam}
            />
            <CardContent sx={{ m: 1 }}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <PlanDetail
                    userSubscription={userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscription}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    {userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscriptionProduct.map(
                      product => {
                        return (
                          <Grid item xs={12} key={product.productID}>
                            <ProductDetail product={product} />
                          </Grid>
                        )
                      }
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserSubscription
