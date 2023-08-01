// ** MUI Import
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          src={process.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL + 'Logo.svg'}
          alt='Logo'
          style={{
            width: '200%',
            maxWidth: '1000px',
            height: '150px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
