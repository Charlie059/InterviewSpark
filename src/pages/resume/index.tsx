// ** MUI Imports

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import PageHeader from 'src/@core/components/page-header'

import ResumeScan from 'src/components/resume/ResumeScan'

// <Grid container spacing={6}>
//   <Grid item xs={12}>
//     <Card>
//       <CardHeader title='Upload Your Resume'></CardHeader>
//       <CardContent>
//         <Typography sx={{ mb: 2 }}>This is your Resume.</Typography>
//         <input type='file' id="file"/>
//         <Button variant="contained" >Select File</Button>
//       </CardContent>
//     </Card>
//   </Grid>
//   <Grid item xs={12}>
//       <Card>
//       <CardHeader title='Paste Job Description Here'></CardHeader>
//       <CardContent>
//         <Typography sx={{ mb: 2 }}>This is your Resume.</Typography>
//         <TextField sx={{ mb: 2 }} fullWidth required multiline rows={7} id="outlined-basic" label="Paste Here." variant="outlined" />
//         <Button variant="contained">Analyze Resume </Button>
//       </CardContent>
//       </Card>
//   </Grid>
// </Grid>

interface ResumeScanPageProps {
  type: any // Replace 'any' with the actual expected type of 'type'
}

const ResumeScanPage = (props: ResumeScanPageProps) => {
  const { type } = props

  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={<Typography variant='h5'>Resume Parser</Typography>}
          subtitle={
            <Typography variant='body1'>
              Try our AI Resume Parser and see if your resume would pass the first round of scrutiny!
            </Typography>
          }
        />
        <Grid item xs={12}>
          <ResumeScan nocollapse={true} type={type} />
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

export default ResumeScanPage
