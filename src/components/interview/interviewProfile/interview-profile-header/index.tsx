// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { useAuth } from 'src/hooks/useAuth'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 35,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

type ProfileHeaderType = {
  userName: string
  globalRanking: string
  profileImg: string
}

const UserProfileHeader = () => {
  const auth = useAuth()

  // ** State
  const [data, setData] = useState<ProfileHeaderType | null>(null)

  useEffect(() => {
    const userName = auth.user?.userName

    if (!userName) {
      return
    }

    setData({
      userName: userName,
      globalRanking: '5,000',
      profileImg: '/images/avatars/1.png'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data !== null ? (
    <Card
      sx={{
        width: '100%', // Add this to take the full width
        backgroundColor: 'transparent', // Add this to remove the background color
        boxShadow: 'none' // Add this to remove the shadow around the card
      }}
    >
      <Box
        sx={{
          pt: 0,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          marginBottom: { xs: 2, md: 4 }
        }}
      >
        <ProfilePicture src={data.profileImg} alt='profile-picture' />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
              {data.userName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Typography sx={{ color: 'text.secondary', fontWeight: 350 }}>
                  Global Ranking: <span style={{ fontWeight: 'bold' }}>5,000</span>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 45 }}></Box>
          </Box>
        </Box>
      </Box>
    </Card>
  ) : null
}

export default UserProfileHeader
