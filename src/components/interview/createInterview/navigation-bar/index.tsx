// ** MUI Imports
import { Box, IconButton, Typography, Link } from '@mui/material'

import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CloseIcon from '@mui/icons-material/Close'

interface NavBarElement {
  path?: string
  name: string
}
interface Props {
  navBarElements: NavBarElement[]
  closeNavLink: string
}

const NavBar = (props: Props) => {
  const router = useRouter()

  return (
    <Box display='flex' justifyContent='space-between' alignItems={'center'}>
      <Box display='flex'>
        {props.navBarElements.map((navBarElement, index) => (
          <Box key={index} sx={{ display: 'flex' }} padding={1}>
            {index !== 0 ? (
              <Typography variant={'h6'}> {' > '} </Typography>
            ) : null}
            <Typography
              variant={'h6'}
            >
              {navBarElement.path ? <Link href={navBarElement.path}>{navBarElement.name}</Link> : navBarElement.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={() => {
          router.push(props.closeNavLink)
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  )
}
NavBar.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export { NavBar, type NavBarElement }
