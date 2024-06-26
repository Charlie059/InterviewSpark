import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const PaymentSuccess = () => {
  const auth = useAuth()
  const user = auth.user?.userName
  const router = useRouter()

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Typography variant='h4' color='palette.success.main' sx={{ mt: 5, mb: 5 }}>
            Payment Successful!
          </Typography>
          <Typography variant='body1' color='palette.success.main' sx={{ mb: 5 }}>
            Thank you for becoming a Premium member. Click here to return to the home page.{' '}
          </Typography>
          <Button
            variant='contained'
            sx={{ mt: 8 }}
            onClick={() => {
              router.push('/user-profile/' + user)
            }}
          >
            Back to Home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

PaymentSuccess.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default PaymentSuccess
