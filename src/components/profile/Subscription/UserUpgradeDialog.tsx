import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { DialogSelectParam } from 'src/context/types'
import { useSubscription } from 'src/hooks/useSubscription'
import toast from 'react-hot-toast'
import { useState } from 'react'

// ** Styled component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.1rem',
  left: '-0.8rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

interface UserUpgradeDialogInterface {
  dialogParams: DialogSelectParam
  setDialogParams: (dialogParams: DialogSelectParam) => void
}

export const UserUpgradeDialog = (userUpgradeDialog: UserUpgradeDialogInterface) => {
  // ** Destructure the props
  const { dialogParams, setDialogParams } = userUpgradeDialog
  const [isLoading, setIsLoading] = useState(false)

  // Hooks
  const { handleUserClickPlanUpgrade } = useSubscription(null)

  const handleUpgradePlansClose = () => {
    setDialogParams({
      ...dialogParams,
      upgrade: false
    })
  }

  const userClickPlanUpgradeHandler = async () => {
    setIsLoading(true)
    const result = await handleUserClickPlanUpgrade()
    setIsLoading(false)
    if (result.isSuccessful) {
      toast.success('Plan upgraded successfully')

      // Redirect to the stripe payment page
      window.location.href = result.infoJSON.url
    } else {
      toast.error('Error upgrading plan')
    }
  }

  // ** Get the price tag
  const getPriceTag = (price: number) => {
    // TODO - Get the price tag from DB
    return (
      <Grid sx={{}}>
        <DialogTitle
          id='user-view-plans'
          sx={{ textAlign: 'center', fontSize: '2rem !important', color: 'primary.main' }}
        >
          Prime
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
                    {price}
                  </Typography>
                  <Sub>/ month</Sub>
                </Box>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    )
  }

  // TODO: Get the product list from DB
  const productList = () => {
    return [
      {
        productID: 1,
        productDetail: 'Unlimited number of projects'
      }

      // you can add more products here
    ]
  }

  const getProductList = () => {
    const products = productList()

    return (
      <>
        {products.map(product => (
          <List key={product.productID} disablePadding={true}>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText>{product.productDetail}</ListItemText>
            </ListItem>
          </List>
        ))}
      </>
    )
  }

  return (
    <Dialog
      open={dialogParams.upgrade}
      onClose={() => handleUpgradePlansClose()}
      aria-labelledby='user-view-plans'
      aria-describedby='user-view-plans-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 400 } }}
    >
      {getPriceTag(9.99)}

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
            {getProductList()}
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ justifyContent: 'center' }}>
              <Button
                variant='contained'
                onClick={userClickPlanUpgradeHandler}
                sx={{ m: 4, width: '90%' }}
                disabled={isLoading}
              >
                {isLoading ? 'Upgrading...' : 'Redirect to Stripe'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
