// ** MUI Imports
import { Box } from '@mui/material'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Logo = () => {
  return (
    <Box display='flex'>
      <Box sx={{ marginLeft: 25, marginTop: 10 }}>
        <img src='/images/HireBeat-Logo.png' alt='logo' width={160} />
      </Box>
      <Box flex={1} />
    </Box>
  )
}

Logo.acl = {
  action: 'read',
  subject: 'acl-page'
}

Logo.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Logo
