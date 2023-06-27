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

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '../../date-picker/PickersCustomInput'

// ** React Imports
import {useState } from 'react'

// ** Types Import
import { Education } from 'src/context/types'


// ** Demo Components
import EducationEntry from './EducationEntry'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const EducationCard = ({ eduDatas, type, setEduDatas, refresh }: { eduDatas: Education[]; type: string;
  setEduDatas: React.Dispatch<React.SetStateAction<Education[]>>; refresh: () => void}) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [eduD, setEduD] = useState<Education>()


  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleAddOpen = () => {
    setOpenEdit(true)

    setEduD(undefined)
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)
  const handleEditOpen = (eduData: Education) => {
    setOpenEdit(true)
    setEduD(eduData)
    console.log('passing edudata:', eduD)
  }
  const updateEduProfile = async (eduData) => {
    // Clone the eduDatas array to avoid modifying the state directly
    const updatedEduDatas = [...eduDatas];

    // Find the index of the existing education entry in eduDatas
    const existingEduIndex = updatedEduDatas.findIndex((eduEntry) => eduEntry.eduID === eduData.eduID);

    if (existingEduIndex !== -1) {
      // If an existing education entry is found, update it
      updatedEduDatas[existingEduIndex] = eduData;
    } else {
      // If no existing education entry is found, create a new one
      const createdEduID = "testadd"+eduDatas.length// Assuming api.createEducation returns the ID
      eduData.eduID = createdEduID;
      updatedEduDatas.push(eduData);
    }

    setEduDatas(updatedEduDatas);
    console.log(eduDatas)
    refresh()
  };

  const removeEducationEntryByID = (ID: string) => {
    // Find the index of the education entry with the given ID
    if (eduDatas) {
      const index = eduDatas.findIndex(educationEntry => educationEntry.eduID === ID);

      // If the education entry was found, remove it from the array
      if (index !== -1) {
        eduDatas.splice(index, 1);
        console.log(eduDatas)
        setEduDatas(eduDatas)
        refresh()
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // noinspection TypeScriptValidateTypes
    setEduD(prevData => ({ ...prevData, [name]: value }))
  }

  const handleEditSubmit = async () => {
    setOpenEdit(false)
    console.log('bbb', eduD)
    updateEduProfile(eduD)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Education</Typography>
          {type != 'public' && (
            <Box>
              <Fab aria-label='add' size='small' style={{ marginRight: '10px' }} onClick={handleAddOpen}>
                <Icon icon='mdi:plus' />
              </Fab>
              {!edit ? (
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
        <TableContainer>
          {eduDatas?.map((eduData, index) => (
            <EducationEntry key={index} edit={edit} eduData={eduData} handleEditClick={handleEditOpen} handleEntryRemove={removeEducationEntryByID}/>
          ))}
        </TableContainer>

        <Dialog onClose={handleEditClose} aria-labelledby='simple-dialog-title' open={openEdit}>
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit User Information
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              variant='body2'
              id='user-view-edit-description'
              sx={{ textAlign: 'center', mb: 7 }}
            ></DialogContentText>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='eduSchool'
                  label='School'
                  value={eduD?.eduSchool}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='eduDegree'
                  label='Degree'
                  value={eduD?.eduDegree}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='eduFieldStudy'
                  label='Field Of Study'
                  value={eduD?.eduFieldStudy}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='eduActivities'
                  label='Activities and Other'
                  value={eduD?.eduActivities}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='eduDescription'
                  label='Description'
                  value={eduD?.eduDescription}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={12}>
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={eduD?.eduStartDate}
                        id='month-picker'
                        showMonthYearPicker
                        dateFormat='MM/yyyy'
                        popperPlacement='bottom-end'
                        onChange={newDate => {

                          // noinspection TypeScriptValidateTypes
                          setEduD({ ...eduD, ...(newDate && { eduStartDate: newDate }) })
                        }}
                        customInput={<CustomInput label='Start Date' />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={eduD?.eduEndDate}
                        id='month-picker'
                        showMonthYearPicker
                        dateFormat='MM/yyyy'
                        popperPlacement='bottom-end'
                        onChange={newDate => {
                          // noinspection TypeScriptValidateTypes
                          setEduD({...eduD, ...(newDate && { eduEndDate: newDate }) })
                        }}
                        customInput={<CustomInput label='End Date' />}
                      />
                    </Grid>
                  </Grid>
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button variant='contained' onClick={handleEditSubmit} sx={{ mr: 1 }}>
                    Submit
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                    Discard
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
export default EducationCard
