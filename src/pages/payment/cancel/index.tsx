import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const PaymentCancel = () => {

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
              sx={{ width: '15%'}}
              alt="payment background"
              src='/images/pages/pricing-illustration-1.png/'
            />
          </Fade>
          <Typography variant='h4' color='palette.success.main' sx={{mt: 5, mb: 5}}>Subscription Cancelled</Typography>
          <Typography variant='body1' color='palette.success.main'  sx={{mb: 5}}>We're sorry to see you go, but we'd love to have you back whenever you're ready. Click here to return to the home page. </Typography>
          <Button variant='contained' sx={{mt:8}} onClick={()=>{router.push('/user-profile/' + user)}}>Back to Home</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundImage: "url('/images/pages/shopping-girl.png/')",
            backgroundRepeat: "no-repeat",
            height: '400px',
            width: '1000px',
            display: 'block',

            '@media screen and (max-width: 768px)': {
              display: 'none', // Hide the box when the screen size is small
            }
          }}
        >
        </Box>
      </Grid>
    </Grid>
  );
}

PaymentCancel.acl = {
  action: 'read',
  subject: 'acl-page'
}


export default PaymentCancel;
