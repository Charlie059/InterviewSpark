import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid'
import EducationCard from "./profile-cards/EducationCard";
import WorkHistoryCard from "./profile-cards/WorkHistoryCard";
import {useEffect, useState} from "react";
import {Education, WorkHistory} from "../../context/types";
import {useAuth} from "../../hooks/useAuth";
import {API, graphqlOperation} from "aws-amplify";
import {getUserEducations, getUserWorkHistories} from "../../graphql/queries";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Icon from "../../@core/components/icon";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {updateUserProfile} from "../../graphql/mutations";
import {InferGetServerSidePropsType} from "next/types";
import {getServerSideProps} from "../../pages/user-profile/[user]";


const UserOverview = ({ user, data, type }: { user: any; data: any; type?: string }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [profileData, setProfileData] = useState(data)
  const [educations, setEducations] = useState<Education[]>()
  const [workHistories, setWorkHistories] = useState<WorkHistory[]>()
  const [refresh, setRefresh] = useState(false)

  const auth = useAuth()
  const emailAddress = auth.user?.userEmailAddress

  const handleEditClickOpen = () => {
    setOpenEdit(true)
    setProfileData(data)
  }
  const handleEditClose = () => setOpenEdit(false)

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

  const updateProfile = async (data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
          <Grid item xs={12} sm={12} md={5} lg={5}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                  {educations && type !== 'tutorial' && (
                    <EducationCard type='private' eduDatas={educations} setEduDatas={setEducations} refresh={handleRefresh} />
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
        </Grid>
  )
}

export default UserOverview
