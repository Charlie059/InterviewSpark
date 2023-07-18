// ** React Imports
import {Dispatch, SetStateAction, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import {styled} from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckIcon from '@mui/icons-material/Check'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonth';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

// ** Custom Components
import UserSubscriptionDialog from 'src/components/profile/UserSubscriptionDialog'

// ** Types
import {PlanType, Subscription, ProductTotalNumUsage, PlanPeriodAmount} from 'src/context/types'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'


// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.1rem',
  left: '-0.8rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

// ** Premium Linear Progression
const linearGradient = 'linear-gradient(45deg, blue, purple)'

const UserSubscription = ({ subscriptionData, setSubscriptionData }: { subscriptionData: Subscription, setSubscriptionData: Dispatch<SetStateAction<Subscription>> }) => {
  // ** States
  const [openUpgradePlans, setOpenUpgradePlans] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Upgrade Plan dialog
  const handleUpgradePlansClickOpen = () => {
    setOpenUpgradePlans(true)
  }
  const handleUpgradePlansClose = (upgrade:boolean) => {
    setOpenUpgradePlans(false)
    if (upgrade) {
      freeToPremium(subscriptionData)
    }
  }

  const freeToPremium = (subscriptionData: Subscription) => {
    setSubscriptionData({
      ...subscriptionData,
      planType: PlanType.Premium,
      planPeriodAmount: PlanPeriodAmount.Premium,
    });
  }

  // Format Date Object
  const formatDateToString = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{mb:4}}>
          <CardHeader title='Current Plan' sx={{ m: 2 }} />
          <CardContent sx={{ m: 2 }}>
            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ mt: [4, 4, 0]}}>
                <Card>
                  <CardContent>
                    <Grid container direction="row" justifyContent="space-between">
                      <Grid item xs={9}>
                        <Grid container spacing={4} sx={{mb:2.7}}>
                          <Grid item>
                            <ArticleOutlinedIcon />
                          </Grid>
                          <Grid item xs={12} sm={10}>
                            <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>Current plan type: <strong>{subscriptionData.planType}</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={4} sx={{mb:2.7}}>
                          <Grid item>
                            <SavingsOutlinedIcon />
                          </Grid>
                          <Grid item xs={12} sm={10}>
                            <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                              {subscriptionData.planPeriod} subscription: $<strong>{subscriptionData.planPeriodAmount}</strong> per {subscriptionData.planPeriod == "Monthly" ? "month" : "year"}
                            </Typography>
                          </Grid>
                        </Grid>
                        {
                          subscriptionData.planType === PlanType.Premium &&
                          <>
                            <Grid container spacing={4} sx={{mb:2.7}}>
                              <Grid item>
                                <CalendarMonthOutlinedIcon />
                              </Grid>
                              <Grid item xs={12} sm={10}>
                                {subscriptionData.currentPeriodEnd && (
                                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                                    Billing starts from:  <strong>{formatDateToString(subscriptionData.currentPeriodStart)}</strong>
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{mb:1.2}}>
                              <Grid item>
                                <CreditCardOutlinedIcon/>
                              </Grid>
                              <Grid item xs={12} sm={10}>
                                {subscriptionData.currentPeriodEnd && (
                                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                                    Next Billing Date: <strong>{formatDateToString(subscriptionData.currentPeriodEnd)}</strong>
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </>
                        }
                      </Grid>
                      <Grid item sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        {!(subscriptionData.planType === PlanType.Premium) && (
                          <Button variant='contained' onClick={handleUpgradePlansClickOpen} sx={{ mr: 3, mb: [3, 0] }}>
                            Upgrade Plan
                          </Button>
                        )}
                        {subscriptionData.planType === PlanType.Premium && (
                          <Button variant='outlined' color='error' onClick={() => setSubscriptionDialogOpen(true)}>
                            Cancel
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                    <Divider sx={{ m: '1 !important' }} />
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', mt: 4 }}>
                      {subscriptionData.planType === PlanType.Premium
                        ? 'Thanks for being a Premium member'
                        : 'Thanks for being a Freemium member'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/*<Grid item xs={6} sx={{ mt: [4, 4, 0] }}>*/}
              {/*  <Card>*/}
              {/*    <CardContent>*/}
              {/*      /!*<PricingTable data={data}/>*!/*/}
              {/*    </CardContent>*/}
              {/*  </Card>*/}
              {/*</Grid>*/}
            </Grid>
          </CardContent>

          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData}/>

          <Dialog
            open={openUpgradePlans}
            onClose={()=>handleUpgradePlansClose(false)}
            aria-labelledby='user-view-plans'
            aria-describedby='user-view-plans-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 400 } }}
          >
            <Grid sx={{}}>
              <DialogTitle
                id='user-view-plans'
                sx={{ textAlign: 'center', fontSize: '2rem !important', color: 'primary.main' }}
              >
                Premium
              </DialogTitle>
              <DialogContent
                sx={{
                  alignItems: 'center',
                  pt: theme => `${theme.spacing(1)} !important`
                }}
              >
                <Grid container sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size='small'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', position: 'relative' }}>
                        <Sup>$</Sup>
                        <Typography
                          variant='h3'
                          sx={{
                            mb: 0,
                            lineHeight: 1,
                            color: 'primary.main',
                            fontSize: '2rem !important'
                          }}
                        >
                          {PlanPeriodAmount.Premium}
                        </Typography>
                        <Sub>/ month</Sub>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
            </Grid>

            <Divider sx={{ m: '0 !important' }} />

            <DialogContent
              sx={{
                mt: 2,
                alignItems: 'center',
                pt: theme => `${theme.spacing(1)} !important`
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  {subscriptionData.products.map((product) => (
                    <List key={product.productID} disablePadding={true}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText>{product.productDetail}</ListItemText>
                      </ListItem>
                    </List>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Grid container sx={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={()=>handleUpgradePlansClose(true)} sx={{ m: 4, width: '90%' }}>
                      Upgrade Plan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Card>
        <Grid container spacing={4}>
          {subscriptionData.products.map((product) => {
            const value = product.productNumUsage / product.productTotalNumUsage * 100

            return (
              <Grid item xs={12} key={product.productID}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      {product.productName}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {product.productDetail}
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 2, justifyContent: 'flex-end' }}>
                      {product.productTotalNumUsage === ProductTotalNumUsage.Free &&
                        <Typography sx={{fontWeight: 500, fontSize: '0.875rem'}}>
                          Product Usage: {product.productNumUsage} / {product.productTotalNumUsage}
                        </Typography>}
                    </Box>
                    {product.productTotalNumUsage === ProductTotalNumUsage.Free ?
                      <LinearProgress value={value} variant='determinate' sx={{ height: 10, borderRadius: '5px' }}/> :
                      <Box>
                        <LinearProgress
                          variant='indeterminate'
                          sx={{mt:5, height: 10, borderRadius: '5px', backgroundImage: linearGradient}}
                        />
                        <Typography sx={{mt:5, fontWeight: 500, fontSize: '0.875rem', display: 'flex', justifyContent: 'flex-end'}}>
                          Unlimited access at your disposal
                        </Typography>
                      </Box>
                    }
                  </CardContent>
                </Card>
              </Grid>
              );
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserSubscription
