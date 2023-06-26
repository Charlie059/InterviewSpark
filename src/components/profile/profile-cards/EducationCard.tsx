import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import TableContainer from '@mui/material/TableContainer'
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'

import PickersCustomInput from '@mui/material/FormElement/PickersCustomInput'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Types Import
import { Education } from 'src/context/types'

// ** Utils Import
import { Controller, useForm } from 'react-hook-form'

// ** Demo Components
import { API, graphqlOperation } from 'aws-amplify'
import { updateUserProfile } from 'src/graphql/mutations'

const EducationCard = ({ eduDatas, type }: { eduDatas: Education[]; type: string }) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [eduD, setEduD] = useState<Education>()
  const [eduDataArr, setEduDataArr] = useState<Education[]>()
  const [refreshKey, setKey] = useState(Date.now())

  useEffect(() => {
    setEduDataArr(eduDatas)
  }, [eduDatas])

  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)

  const updateEduProfile = async eduData => {
    //#TODO waiting on api changes
  }

  const handleEditSubmit = async (formData: any) => {
    setOpenEdit(false)
    console.log('bbb', formData)
    updateEduProfile(formData)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const defaultValues = eduD

  const { control, handleSubmit } = useForm({ defaultValues })

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`
    }
  }))

  const eachEducation = (eduData: Education) => {
    return (
      <StyledBox sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {eduData.eduIcon && (
            <Grid item xs={1.5}>
              <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <img alt='University Logo' src={eduData.eduIcon} style={{ width: 56, height: 56 }} />
              </CardContent>
            </Grid>
          )}
          <Grid item xs={10.5}>
            <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
              {eduData.eduSchool}
            </Typography>
            {edit == true && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Fab
                  size='small'
                  aria-label='edit'
                  onClick={() => {
                    setEduD(eduData)
                    setOpenEdit(true)
                    setKey(Date.now())
                    console.log('edudata set:', eduD)
                  }}
                >
                  <Icon icon='mdi:pencil' />
                </Fab>
                <Fab aria-label='add' size='small'>
                  <Icon icon='mdi:trash' />
                </Fab>
              </Box>
            )}

            <Typography variant='body1' sx={{ mb: 1 }}>
              {eduData.eduDegree}, {eduData.eduFieldStudy}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1 }}>
              {eduData.eduStartDate} - {eduData.eduEndDate}
            </Typography>
            {eduData.eduActivities && (
              <Typography variant='body1' sx={{ mb: 5 }}>
                Activities and Societies: {eduData.eduActivities}
              </Typography>
            )}
            {eduData.eduDescription && (
              <Typography variant='body1' sx={{ mb: 5 }}>
                Description: {eduData.eduDescription}
              </Typography>
            )}
          </Grid>
        </Grid>
      </StyledBox>
    )
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Education</Typography>
          {type != 'public' && (
            <Box>
              <Fab aria-label='add' size='small' style={{ marginRight: '10px' }}>
                <Icon icon='mdi:plus' />
              </Fab>
              {edit == false ? (
                <Fab size='small' aria-label='edit' onClick={handleClickOpen}>
                  <Icon icon='mdi:pencil' />
                </Fab>
              ) : (
                <Fab size='small' aria-label='edit' onClick={handleClickClose}>
                  <Icon icon='iconamoon:check-fill' />
                </Fab>
              )}
            </Box>
          )}
        </Box>
        <TableContainer>{eduDataArr?.map(eduData => eachEducation(eduData))}</TableContainer>

        <Dialog key={refreshKey} onClose={handleEditClose} aria-labelledby='simple-dialog-title' open={openEdit}>
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
                      name='eduSchool'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='School'
                          value={value}
                          defaultValue={eduD?.eduSchool}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <Controller
                      name='eduDegree'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Degree'
                          value={value}
                          defaultValue={eduD.eduDegree}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <Controller
                      name='eduFieldStudy'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Field of Study'
                          value={value}
                          defaultValue={eduD.eduFieldStudy}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
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
                      name='eduActivities'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Activities and Societies'
                          defaultValue={eduD.eduActivities}
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
                      name='eduDescription'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label='Description'
                          defaultValue={eduD.eduDescription}
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
                <Grid item xs={12} sm={6}></Grid>
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
      </CardContent>
    </Card>
  )
}
export default EducationCard
