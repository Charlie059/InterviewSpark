import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import EducationCard from './profile-cards/EducationCard'
import WorkHistoryCard from './profile-cards/WorkHistoryCard'
import { useEffect, useState } from 'react'
import { Education, WorkHistory } from '../../context/types'
import { useAuth } from '../../hooks/useAuth'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserEducations, getUserWorkHistories } from '../../graphql/queries'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Icon from '../../@core/components/icon'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormControl from '@mui/material/FormControl'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { updateUserProfile } from '../../graphql/mutations'
import { InferGetServerSidePropsType } from 'next/types'
import { getServerSideProps } from '../../pages/user-profile/[user]'
import Logger from '../../middleware/loggerMiddleware'
import { Autocomplete } from '@mui/material'
import { countries } from 'src/components/profile/countries'

const UserOverview = ({ user, data, type }: { user: any; data: any; type?: string }) => {
  // ** Industry List
  const industryList = [
    'Agriculture',
    'Arts and Entertainment',
    'Construction',
    'Education',
    'Finance and Insurance',
    'Government',
    'Healthcare',
    'Hospitality and Food Services',
    'Information and Technology',
    'Manufacturing',
    'Professional Services',
    'Real Estate and Rental and Leasing',
    'Retail Trade',
    'Transportation and Warehousing',
    'Wholesale Trade',
    'Other'
  ]

  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [profileData, setProfileData] = useState(data)
  const [educations, setEducations] = useState<Education[]>()
  const [workHistories, setWorkHistories] = useState<WorkHistory[]>()
  const [refresh, setRefresh] = useState(false)
  const [industry] = useState(industryList)

  const auth = useAuth()
  const emailAddress = auth.user?.userEmailAddress

  const handleEditClickOpen = () => {
    setOpenEdit(true)
    setProfileData(data)
  }
  const handleEditClose = () => setOpenEdit(false)

  const handleEditSubmit = async (formData: any) => {
    setOpenEdit(false)
    formData.country = formData.country.label
    setProfileData(formData)

    updateProfile(formData)
      .then(response => {
        Logger.info('Profile updated successfully', response)
      })
      .catch(e => {
        Logger.error('Error updating profile', e)
      })
  }

  const defaultValues = data

  const { control, handleSubmit } = useForm({ defaultValues })

  const updateProfile = async (data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    try {
      const input = {
        emailAddress: data.userEmailAddress,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        contact: data.contact,
        country: data.country,
        coverImgKey: data.coverImgKey,
        fName: data.fName,
        lName: data.lName,
        photoImgKey: data.photoImgKey,
        postalCode: data.postalCode,
        resumeKey: data.resumeKey,
        state: data.state,
        isPublic: data.isPublic,
        userIndustry: data.userIndustry,
        userDreamJob: data.userDreamJob
      }

      const result = await API.graphql(graphqlOperation(updateUserProfile, input))
      auth.trackEvent('User_Profile_Settings', {
        action: 'Update_Profile',
        ...input
      })
      auth.setMixpanelPeople({
        ...input
      })

      return result
    } catch (error) {
      Logger.error('Error updating profile', error)
    }
  }

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

    //setEducations
    if ('data' in workHistoryResponse) {
      setWorkHistories(workHistoryResponse.data.getUserWorkHistories.workHistory)
    }
  }

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    getEducations()
    getWorkHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={type === 'tutorial' ? 12 : 5} lg={type === 'tutorial' ? 12 : 5}>
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
            <Grid sx={{ mt: 6 }}>
              <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Career Goal</Typography>
              </Box>
              <Divider sx={{ mt: 4 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>My Dream Job: </Typography>
                    <Typography variant='body2'>{profileData.userDreamJob}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={type !== 'tutorial' ? 12 : 6}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>My Industry: </Typography>
                    <Typography variant='body2'>{profileData.userIndustry}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>

          <Dialog
            scroll='body'
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Edit Basic Information
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
                    <FormControl sx={{ display: 'flex', width: '100%' }}>
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
                    <FormControl sx={{ display: 'flex', width: '100%' }}>
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
                    <FormControl sx={{ display: 'flex', width: '100%' }}>
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
                    <TextField disabled fullWidth type='email' label='Email' defaultValue={data.userEmailAddress} />
                  </Grid>
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
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='country' // The name for the field, which will be used in the onSubmit callback
                        control={control}
                        defaultValue={profileData.country} // Set the initial value to null or your default value
                        render={({ field: { value, onChange } }) => (
                          <Autocomplete
                            options={countries}
                            autoHighlight
                            getOptionLabel={option => option.label}
                            value={value} // Important to bind the selected value to the Controller's value prop
                            onChange={(event, newValue) => {
                              onChange(newValue) // Updates the value in the Controller
                            }}
                            renderOption={(props, option) => (
                              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                  loading='lazy'
                                  width='20'
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt=''
                                />
                                {option.label}
                              </Box>
                            )}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label='Country & Region'
                                defaultValue={profileData.country && 'United States'}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password' // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: 1 }} spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ display: 'flex', width: '100%' }}>
                      <Controller
                        name='userDreamJob'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='My Dream Job'
                            defaultValue={profileData.userDreamJob}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Industry</InputLabel>
                      <Controller
                        name='userIndustry'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            label='industry'
                            defaultValue={profileData.userIndustry}
                            onChange={onChange}
                            value={value}
                          >
                            {industry.map(industry => (
                              <MenuItem key={industry} value={industry}>
                                {industry}
                              </MenuItem>
                            ))}
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
      </Grid>

      {type !== 'tutorial' ? (
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              {educations && type !== 'tutorial' && (
                <EducationCard
                  type='private'
                  eduDatas={educations}
                  setEduDatas={setEducations}
                  refresh={handleRefresh}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {workHistories && type !== 'tutorial' && (
                <WorkHistoryCard
                  type='private'
                  workDatas={workHistories}
                  setWorkDatas={setWorkHistories}
                  refresh={handleRefresh}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <> </>
      )}
    </Grid>
  )
}

export default UserOverview
