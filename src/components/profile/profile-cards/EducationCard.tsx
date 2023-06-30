import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import TableContainer from '@mui/material/TableContainer'
import Fab from '@mui/material/Fab'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '../../date-picker/PickersCustomInput'

// ** React Imports
import { useState } from 'react'

// ** Types Import
import { Education } from 'src/context/types'

// ** Demo Components
import EducationEntry from './EducationEntry'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { API, graphqlOperation } from 'aws-amplify'
import {createUserEducation, removeUserEducationByID, updateUserEducation} from 'src/graphql/mutations'
import {useAuth} from "../../../hooks/useAuth"


const EducationCard = ({
  eduDatas,
  type,
  setEduDatas,
  refresh
}: {
  eduDatas: Education[]
  type: string
  setEduDatas?: React.Dispatch<React.SetStateAction<Education[]|undefined>>
  refresh: () => void
}) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [eduD, setEduD] = useState<Education>()
  const [isEmpty, setIsEmpty] = useState<boolean>(eduDatas==undefined);
  const emptyEdu:Education = {
    eduDegree: "",
    eduEndDate: new Date(Date.now()),
    eduFieldStudy: "",
    eduID: "",
    eduSchool: "",
    eduStartDate: new Date(Date.now())
  }

  const auth = useAuth()

  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleAddOpen = () => {
    setOpenEdit(true)
    setEduD(emptyEdu)
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)
  const handleEditOpen = (eduData: Education) => {
    setOpenEdit(true)
    setEduD(eduData)
    console.log('passing edudata:', eduD)
  }
  const updateEduProfile = async (eduData: Education) => {
    // Clone the eduDatas array to avoid modifying the state directly
    const updatedEduDatas = [...eduDatas]

    // Find the index of the existing education entry in eduDatas
    const existingEduIndex = updatedEduDatas.findIndex(eduEntry => eduEntry.eduID === eduData.eduID)

    if (existingEduIndex !== -1) {
      // If an existing education entry is found, update it
      updatedEduDatas[existingEduIndex] = eduData
      const eduInput = {
        eduID:eduData.eduID,
        emailAddress: auth.user?.userEmailAddress,
        eduDegree: eduData.eduDegree,
        eduFieldStudy: eduData.eduFieldStudy,
        eduSchool: eduData.eduSchool,
        eduStartDate: eduData.eduStartDate.toISOString().split('T')[0],
        eduEndDate: eduData.eduEndDate.toISOString().split('T')[0]
      }

      await API.graphql(graphqlOperation(updateUserEducation, eduInput))
    } else {
      // If no existing education entry is found, create a new one
      console.log(eduData.eduStartDate.toISOString())
      const eduInput = {
        emailAddress: auth.user?.userEmailAddress,
        eduDegree: eduData.eduDegree,
        eduFieldStudy: eduData.eduFieldStudy,
        eduSchool: eduData.eduSchool,
        eduStartDate: eduData.eduStartDate.toISOString().split('T')[0],
        eduEndDate: eduData.eduEndDate.toISOString().split('T')[0]
      }

      try {
        const eduResult = await API.graphql(graphqlOperation(createUserEducation, eduInput))
        console.log(eduResult)
        if('data' in eduResult){
          const createdEdu = eduResult.data.createUserEducation
          const createdEduID = createdEdu.eduID

          eduData.eduID = createdEduID
          updatedEduDatas.push(eduData)
          console.log('updated edu data: ', updatedEduDatas)
        }else{
          throw('no data found')
        }
      } catch (e) {
        console.error('Error creating education entry:', e)
      }
    }


    setEduDatas?.(updatedEduDatas)

    setIsEmpty(false)

    // console.log('updated data: ', updatedEduDatas)
    refresh()
  }

  const removeEducationEntryByID = async (ID: string) => {
    // Find the index of the education entry with the given ID
    if (eduDatas) {
      const index = eduDatas.findIndex(educationEntry => educationEntry.eduID === ID)

      //#TODO if Entry was found, use graphql api to remove it from database
      if (index !== -1) {
        eduDatas.splice(index, 1)
        console.log(eduDatas)


        setEduDatas?.(eduDatas)


        if (eduDatas.length === 0) {
          setIsEmpty(true)
        }

        refresh()

        try {
          // Execute the GraphQL mutation to remove the education entry from the database
          const result = await API.graphql({
            query: removeUserEducationByID,
            variables: {
              emailAddress: auth.user?.userEmailAddress,
              eduID: ID,
            },
          });

          // Check the result of the mutation
          if('data' in result){
            const {isSuccessful, error} = result.data.removeUserEducationByID;
            if (isSuccessful) {
              console.log('Education entry removed successfully from the database.');
            } else {
              console.error('Failed to remove education entry from the database:', error);
            }
          }

        } catch (error) {
          console.error('An error occurred while executing the GraphQL mutation:', error);
        }
      }
    }}

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target

      // @ts-ignore
      setEduD(prevData => ({...prevData, [name]: value}))
    }

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault() // prevent defaukt form behavior
      setOpenEdit(false)
      console.log('bbb', eduD)
      if(eduD){
        updateEduProfile(eduD)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }

  const degrees = [
    {
      value: 'Bachelor',
      label: 'Bachelor',
    },
    {
      value: 'Master',
      label: 'Master',
    },
    {
      value: 'PhD',
      label: 'PhD',
    },
  ];

    return (
      <Card>
        <CardContent>
          <Box sx={{mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='h5'>Education</Typography>
            {type != 'public' && (
              <Box>
                <Fab aria-label='add' size='small' style={{marginRight: '10px'}} onClick={handleAddOpen}>
                  <Icon icon='mdi:plus'/>
                </Fab>
                {!isEmpty && (
                  <Fab size='small' aria-label='edit' onClick={!edit ? handleClickOpen : handleClickClose}>
                    <Icon icon={!edit ? 'mdi:pencil' : 'iconamoon:check-fill'}/>
                  </Fab>
                )}
              </Box>
            )}
          </Box>
          {!isEmpty ? (
            <TableContainer>
              {eduDatas?.map((eduData, index) => (
                <EducationEntry
                  key={index}
                  edit={edit}
                  eduData={eduData}
                  handleEditClick={handleEditOpen}
                  handleEntryRemove={removeEducationEntryByID}
                />
              ))}
            </TableContainer>
          ) : (
            <Grid container sx={{ml: 2, mt: 8, mb: 5}} spacing={3}>
              <Grid item xs={1.5}>
                <Icon fontSize='large' icon='majesticons:data-plus-line'/>
              </Grid>
              <Grid item xs={10.5}>
                <Typography variant='body1'>
                  No Education Information Available
                </Typography>
              </Grid>
            </Grid>
          )}

          <Dialog onClose={handleEditClose} aria-labelledby='simple-dialog-title' open={openEdit}>
            <DialogTitle id='user-view-edit' sx={{textAlign: 'center', fontSize: '1.5rem !important'}}>
              Edit User Information
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                variant='body2'
                id='user-view-edit-description'
                sx={{textAlign: 'center', mb: 7}}
              ></DialogContentText>
              <form onSubmit={handleEditSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    required
                    name='eduSchool'
                    label='School'
                    value={eduD?.eduSchool}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-select-degree"
                        sx={{display:'flex'}}
                        required
                        select
                        name='eduDegree'
                        label="Degree"
                        defaultValue={'Bachelors'}
                        value={eduD?.eduDegree}
                        onChange={handleInputChange}
                      >
                        {degrees.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        name='eduFieldStudy'
                        label='Field Of Study'
                        value={eduD?.eduFieldStudy}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12} sm={12}>
                  <DatePickerWrapper>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={new Date((eduD?.eduStartDate)||Date.now())}
                          id='month-picker'
                          showMonthYearPicker
                          dateFormat='MM/yyyy'
                          popperPlacement='bottom-end'
                          onChange={newDate => {
                            if(eduD){
                              setEduD({...eduD, ...(newDate && {eduStartDate: newDate})})
                            }
                          }}
                          customInput={<CustomInput label='Start Date'/>}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={new Date((eduD?.eduEndDate)||Date.now())}
                          id='month-picker'
                          showMonthYearPicker
                          dateFormat='MM/yyyy'
                          popperPlacement='bottom-end'
                          onChange={newDate => {
                            if(eduD) {
                              setEduD({...eduD, ...(newDate && {eduEndDate: newDate})})
                            }
                          }}
                          customInput={<CustomInput label='End Date'/>}
                        />
                      </Grid>
                    </Grid>
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name='eduActivities'
                    label='Activities and Other'
                    value={eduD?.eduActivities}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name='eduDescription'
                    label='Description'
                    value={eduD?.eduDescription}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sx={{justifyContent: 'center'}}>
                  <DialogActions sx={{justifyContent: 'center'}}>
                    <Button variant='contained'  type='submit' sx={{mr: 1}}>
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
