// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

const Profile = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Siqi Yuan'></CardHeader>
          <CardContent>
            <Avatar sx={{ width: 56, height: 56 }}>SY</Avatar>
            <Typography>Student</Typography>
            <Typography>New York University</Typography>
            <Typography>New York, NY USA</Typography>

            <Button
              variant='contained'
              component='label'
              sx={{
                top: 0,
                right: 0,
                mt: 1,
                mr: 1
              }}
            >
              Edit
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader title='Video Profile'></CardHeader>
          <CardContent>
            <Typography>Recruiters are more likely to reach out to you with a well-recorded video</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader title='Summary'></CardHeader>
          <CardContent>
            <Typography>Add a Profile Photo to Help Others Recognize You</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader title='Job Searching Target'></CardHeader>
          <CardContent>
            <Typography>Target Position: Art and Design</Typography>

            <Typography>Target Region: United States</Typography>

            <Typography>Target Region(2nd): China </Typography>

            <Typography>Visa Status: Student Visa F1</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardHeader title='Resume '></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Upload Your Resume Here</Typography>

            <Button
              variant='contained'
              color='primary'
              component='span'
              sx={{
                top: 0,
                right: 0,
                mt: 1,
                mr: 1
              }}
            >
              Upload
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
