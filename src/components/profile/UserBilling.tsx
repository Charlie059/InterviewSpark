// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import UserSubscriptionDialog from 'src/components/profile/UserSubscriptionDialog'

// ** Types
import { Subscription } from 'src/context/types'
import { ThemeColor } from 'src/@core/layouts/types'

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

// ** Premium Features
const premiumFeatures = [
  {id: 1, name: 'premium benefit 1'},
  {id: 2, name: 'premium benefit 2'},
  {id: 3, name: 'premium benefit 3'}
];

const UserBilling = ({subscriptionData}:{subscriptionData: Subscription}) => {
  // ** States
  const [openUpgradePlans, setOpenUpgradePlans] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Upgrade Plan dialog
  const handleUpgradePlansClickOpen = () => setOpenUpgradePlans(true)
  const handleUpgradePlansClose = () => setOpenUpgradePlans(false)

  // Credits Used
  const totalCredits = subscriptionData.premium ? 1000 : 265
  const value = subscriptionData.creditsUsed / totalCredits * 100

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Current plan' sx={{m:2}}/>
          <CardContent sx={{m:5}}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={8} sx={{ mt: [4, 4, 0] }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{mb:6}}>
                      {subscriptionData.premium ? 'Premium' : 'Freemium'}
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {subscriptionData.premium ? '$39/month' : '$0/month'}
                      </Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        Plan Credits: {subscriptionData.creditsUsed} / {subscriptionData.premium ? 1000 : 265}
                      </Typography>
                    </Box>
                    <LinearProgress value={value} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} />
                    <Typography variant='body2' sx={{ mt: 2, mb: 4 }}>
                      Your plan requires update
                    </Typography>

                    <Divider sx={{ m: '1 !important' }} />

                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', mt:4 }}>
                      {subscriptionData.premium ? 'Thanks for being a Premium member' : 'Thanks for being a Freemium member'}
                    </Typography>
                  </CardContent>
                </Card>

              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 4 }}>
                  {subscriptionData.premium ?
                    (<Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                      Your Current Plan is <strong>Premium</strong>
                    </Typography>)
                    : (<Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                      Your Current Plan is <strong>Freemium</strong>
                    </Typography>)
                  }
                  <Typography variant='body2'>A simple start for everyone</Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                    Active until Dec 09, 2021
                  </Typography>
                  <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
                </Box>
                <div>
                  <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>$39 Per Month</Typography>
                    <CustomChip
                      skin='light'
                      size='small'
                      label='Popular'
                      color='primary'
                      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px' }}
                    />
                  </Box>
                  <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {!subscriptionData.premium &&
                  <Button variant='contained' onClick={handleUpgradePlansClickOpen} sx={{mr: 3, mb: [3, 0]}}>
                    Upgrade Plan
                  </Button>
                }
                {subscriptionData.premium &&
                  <Button variant='outlined' color='error' onClick={() => setSubscriptionDialogOpen(true)}>
                  Cancel Subscription
                </Button>}
              </Grid>
            </Grid>

          </CardContent>

          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />

          <Dialog
            open={openUpgradePlans}
            onClose={handleUpgradePlansClose}
            aria-labelledby='user-view-plans'
            aria-describedby='user-view-plans-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 400} }}
          >
            <Grid sx={{}}>
              <DialogTitle
                id='user-view-plans'
                sx={{ textAlign: 'center', fontSize: '2rem !important', color:'primary.main'}}>
                Premium
              </DialogTitle>
              <DialogContent
                sx={{
                  alignItems: 'center',
                  pt: theme => `${theme.spacing(1)} !important`
                }}
              >
                <Grid container sx={{mb:2}}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      size='small'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Box sx={{ display: 'flex', position: 'relative'}}>
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
                          39
                        </Typography>
                        <Sub>/ month</Sub>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
            </Grid>

            <Divider sx={{ m: '0 !important' }} />

            <DialogContent sx={{
              mt:2,
              alignItems: 'center',
              pt: theme => `${theme.spacing(1)} !important`
            }}>
              <Grid container>
                <Grid item xs={12}>
                  {premiumFeatures.map((item) =>
                    <List key={item.id} disablePadding={true}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckIcon/>
                        </ListItemIcon>
                      <ListItemText>
                        {item.name}
                      </ListItemText>
                    </ListItem>
                    </List>
                    )}
                </Grid>
                <Grid item xs={12}>
                  <Grid container sx={{justifyContent: "center"}}>
                    <Button variant='contained' sx={{ m:4, width: '90%'}}>
                      Upgrade Plan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserBilling
