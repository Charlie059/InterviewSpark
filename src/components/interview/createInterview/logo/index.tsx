// ** MUI Imports
import { Box, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CloseIcon from '@mui/icons-material/Close'

const Logo = () => {
  const router = useRouter()

  const handleClose = () => {
    router.push('/interview') // Navigate to the home page
  }

  return (
    <Box display='flex'>
      <Box sx={{ marginLeft: 6, marginTop: 10 }}>
        <img
          src='https://interviewsparks324926-staging.s3.amazonaws.com/public/Logo.svg'
          alt='logo'
          width={160}
          onClick={handleClose}
        />
      </Box>
      <Box flex={1} />
      <Box sx={{ marginRight: 6, marginTop: 10 }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
Logo.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Logo
