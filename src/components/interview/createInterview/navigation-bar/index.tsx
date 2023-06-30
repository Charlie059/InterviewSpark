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
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            {index !== 0 ? (
              <Typography sx={{ fontSize: 20, fontFamily: 'Montserrat', fontWeight: 600, ml: 2 }}> {' > '} </Typography>
            ) : null}
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: 'Montserrat',
                fontWeight: 600,
                color: navBarElement.path ? 'primary.main' : 'black'
              }}
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
