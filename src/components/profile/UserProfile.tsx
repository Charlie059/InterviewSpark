// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
// import { useRouter } from 'next/router'

// ** MUI Components
// import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import DialogContentText from '@mui/material/DialogContentText'

// ** Utils Import
import { Controller, useForm } from 'react-hook-form'

// ** Layout & Component Import
import EducationCard from './profile-cards/EducationCard'
import WorkHistoryCard from './profile-cards/WorkHistoryCard'

// ** Type Import
//import { ProfileTabType, UserProfileActiveTab } from 'src/@fake-db/types'

// ** Types Import
import { Education, WorkHistory } from '../../context/types'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Demo Components
//import Profile from 'src/views/pages/user-profile/profile'
import UserProfileHeader from 'src/components/profile/UserProfileHeader'
import ProfileViewRight from './ProfileViewRight'
import { API, graphqlOperation } from 'aws-amplify'
import { updateUserProfile } from 'src/graphql/mutations'
import { getUserEducations, getUserWorkHistories } from '../../graphql/queries'
import { useAuth } from '../../hooks/useAuth'
import Icon from '../../@core/components/icon'
import Fab from '@mui/material/Fab'

// import TestTable from "./profile-cards/TestTable";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProfile = ({ user, data, type }: { user: any; data: any; type?: string }) => {
  // ** State
  //#TODO Construct a tutorial version profile page
  //data.email = auth.user?.userEmailAddress

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log('current profile page is for', user)
  console.log('current data is:', data)

  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [profileData, setProfileData] = useState(data)
  const [educations, setEducations] = useState<Education[]>()
  const [workHistories, setWorkHistories] = useState<WorkHistory[]>()
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  console.log('initial data')
  console.log(data)

  const handleEditClickOpen = () => {
    setOpenEdit(true)
    setProfileData(data)
  }
  const handleEditClose = () => setOpenEdit(false)

  // @ts-ignore
  const updateProfile = async data => {
    console.log('aaa', data)
    try {
      const input = {
        emailAddress: data.userEmailAddress,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        contact: data.contact,
        country: data.country,
        coverImgURL: data.coverImgURL,
        fName: data.fName,
        lName: data.lName,
        photoImgURL: data.photoImgURL,
        postalCode: data.postalCode,
        resumeKey: data.resumeKey,
        state: data.state,
        isPublic: data.isPublic
      }

      const result = await API.graphql(graphqlOperation(updateUserProfile, input))

      return result
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditSubmit = async (formData: any) => {
    setOpenEdit(false)
    console.log('bbb', formData)
    setProfileData(formData)
    updateProfile(formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const defaultValues = data

  const { control, handleSubmit } = useForm({ defaultValues })

  const auth = useAuth()
  const emailAddress = auth.user?.userEmailAddress

  const getEducations = async () => {
    //getEducations API
    const eduResponse = await API.graphql(
      graphqlOperation(getUserEducations, {
        emailAddress
      })
    )

    //setEducations
    if ('data' in eduResponse) {
      setEducations(eduResponse.data.getUserEducations.educations)
    } else {
      throw 'error get educations'
    }
  }

  const getWorkHistories = async () => {
    //getWorkHistories API
    const workHistoryResponse = await API.graphql(
      graphqlOperation(getUserWorkHistories, {
        emailAddress
      })
    )
    console.log('Result:', workHistoryResponse)

    //setEducations
    if ('data' in workHistoryResponse) {
      setWorkHistories(workHistoryResponse.data.getUserWorkHistories.workHistory)
    }
  }

  useEffect(() => {
    getEducations()
    console.log(educations)
    getWorkHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader data={data} type={'Profile'} />
      </Grid>
      <Grid item xs={type !== 'tutorial' ? 4 : 12}>
        {/*{isLoading ? (*/}
        {/*  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>*/}
        {/*    <CircularProgress sx={{ mb: 4 }} />*/}
        {/*    <Typography>Loading...</Typography>*/}
        {/*  </Box>*/}
        {/*) : (*/}
        {/* <Profile data={data} />*/}
        <Card>
          <CardContent>
            <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Details</Typography>
              <Fab size='small' aria-label='edit' onClick={handleEditClickOpen}>
                <Icon icon={'mdi:pencil'} />
              </Fab>
            </Box>
            <Divider sx={{ mt: 4 }} />
            <Grid container spacing={1}>
              <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Username:
                  </Typography>
                  <Typography variant='body2'>{user}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{profileData.userEmailAddress}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>{profileData.contact}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>City:</Typography>
                  <Typography variant='body2'>{profileData.city}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Country:</Typography>
                  <Typography variant='body2'>{profileData.country}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Edit User Information
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                variant='body2'
                id='user-view-edit-description'
                sx={{ textAlign: 'center', mb: 7 }}
              ></DialogContentText>
              <form onSubmit={handleSubmit(handleEditSubmit)}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <Controller
                        name='fName'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='First Name'
                            value={value}
                            defaultValue={profileData.fName}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <Controller
                        name='lName'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='Last Name'
                            value={value}
                            defaultValue={profileData.lName}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <Controller
                        name='userName'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            disabled
                            fullWidth
                            label='Username'
                            value={value}
                            defaultValue={profileData.userName}
                            onChange={onChange}
                            InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField disabled fullWidth type='email' label='email' defaultValue={data.userEmailAddress} />
                  </Grid>
                  {/*<Grid item xs={12} sm={6}>*/}
                  {/*  <FormControl fullWidth>*/}
                  {/*    <InputLabel id='user-view-status-label'>Status</InputLabel>*/}
                  {/*    <Controller*/}
                  {/*      name='status'*/}
                  {/*      control={control}*/}
                  {/*      render={({ field: { value, onChange } }) => (*/}
                  {/*        <Select*/}
                  {/*          label='status'*/}
                  {/*          defaultValue={data.status}*/}
                  {/*          value={value}*/}
                  {/*          onChange={onChange}*/}
                  {/*          id='user-view-status'*/}
                  {/*          labelId='user-view-status-label'*/}
                  {/*        >*/}
                  {/*          <MenuItem value='pending'>Pending</MenuItem>*/}
                  {/*          <MenuItem value='active'>Active</MenuItem>*/}
                  {/*          <MenuItem value='inactive'>Inactive</MenuItem>*/}
                  {/*        </Select>*/}
                  {/*      )}*/}
                  {/*    />*/}
                  {/*  </FormControl>*/}
                  {/*</Grid>*/}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='contact'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='Contact'
                            defaultValue={profileData.contact}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='city'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='City'
                            defaultValue={profileData.city}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  {/*<Grid item xs={12} sm={6}>*/}
                  {/*              <FormControl fullWidth>*/}
                  {/*                <InputLabel id='user-view-language-label'>Language</InputLabel>*/}
                  {/*                <Controller*/}
                  {/*                  name='language'*/}
                  {/*                  control={control}*/}
                  {/*                  render={({ field: { value, onChange } }) => (*/}
                  {/*                    <Select*/}
                  {/*                      label='language'*/}
                  {/*                      defaultValue={profileData.language}*/}
                  {/*                      value={value}*/}
                  {/*                      onChange={onChange}*/}
                  {/*                      id='user-view-language'*/}
                  {/*                      labelId='user-view-language-label'*/}
                  {/*                    >*/}
                  {/*                      <MenuItem value='English'>English</MenuItem>*/}
                  {/*                      <MenuItem value='Spanish'>Spanish</MenuItem>*/}
                  {/*                      <MenuItem value='Portuguese'>Portuguese</MenuItem>*/}
                  {/*                      <MenuItem value='Russian'>Russian</MenuItem>*/}
                  {/*                      <MenuItem value='French'>French</MenuItem>*/}
                  {/*                      <MenuItem value='German'>German</MenuItem>*/}
                  {/*                    </Select>*/}
                  {/*                  )}*/}
                  {/*                />*/}
                  {/*              </FormControl>*/}
                  {/*            </Grid>*/}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-country-label'>Country</InputLabel>
                      <Controller
                        name='country'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            label='country'
                            defaultValue={profileData.country}
                            onChange={onChange}
                            id='user-view-country'
                            labelId='user-view-country-label'
                            value={value}
                          >
                            <MenuItem value='USA'>USA</MenuItem>
                            <MenuItem value='UK'>UK</MenuItem>
                            <MenuItem value='Spain'>Spain</MenuItem>
                            <MenuItem value='Russia'>Russia</MenuItem>
                            <MenuItem value='France'>France</MenuItem>
                            <MenuItem value='Germany'>Germany</MenuItem>
                            <MenuItem value='China'>China</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant='contained' type='submit' sx={{ mr: 1 }}>
                        Submit
                      </Button>
                      <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                        Discard
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
        <Card sx={{ mt: 6 }}>
          {educations && type !== 'tutorial' && (
            <EducationCard type='private' eduDatas={educations} setEduDatas={setEducations} refresh={handleRefresh} />
          )}
        </Card>
        <Card sx={{ mt: 6 }}>
          {workHistories && type !== 'tutorial' && (
            <WorkHistoryCard
              type='private'
              workDatas={workHistories}
              setWorkDatas={setWorkHistories}
              refresh={handleRefresh}
            />
          )}
        </Card>
        {/* <Card sx={{ mt: 6 }}>
          <TestTable />
        </Card> */}
      </Grid>
      <Grid item xs={8}>
        {type !== 'tutorial' && <ProfileViewRight profileData={data} />}
      </Grid>
    </Grid>
  )
}

export default UserProfile
