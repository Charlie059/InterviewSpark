import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const PaymentSuccess = () => {

  const auth = useAuth()
  const user = auth.user?.userName
  const router = useRouter()

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Fade in={true} timeout={1500}>
            <Box
              component="img"
              sx={{ width: '20%'}}
              alt="payment background"
              src='/images/pages/pricing-illustration-3.png/'
            />
          </Fade>
          <Typography variant='h4' color='palette.success.main' sx={{mt: 5, mb: 5}}>Payment Successful!</Typography>
          <Typography variant='body1' color='palette.success.main'  sx={{mb: 5}}>Thank you for becoming a Premium member. Click here to return to the home page. </Typography>
          <Button variant='contained' sx={{mt:8}} onClick={()=>{router.push('/user-profile/' + user)}}>Back to Home</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          component="img"
          sx={{ width: '85%', position: 'fixed', right:-50, bottom: 0}}
          alt="payment shopping bag"
          src='/images/pages/shopping-girl.png/'
        />
      </Grid>
    </Grid>
  );
}

PaymentSuccess.acl = {
  action: 'read',
  subject: 'acl-page'
}


export default PaymentSuccess;
