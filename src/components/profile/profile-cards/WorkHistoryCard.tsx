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
import Fab from '@mui/material/Fab'
import TableContainer from '@mui/material/TableContainer'
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '../../date-picker/PickersCustomInput'

// ** React Imports
import { useState } from 'react'

// ** Types Import
import {WorkHistory} from 'src/context/types'

// ** Demo Components
import WorkHistoryEntry from './WorkHistoryEntry'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const WorkHistoryCard = ({
  workDatas,
  type,
  setWorkDatas,
  refresh
}: {
  workDatas: WorkHistory[]
  type: string
  setWorkDatas: React.Dispatch<React.SetStateAction<WorkHistory[]>>
  refresh: () => void
}) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [workD, setWorkD] = useState<WorkHistory>()

  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleAddOpen = () => {
    setOpenEdit(true)
    setWorkD()
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)
  const handleEditOpen = (workData: WorkHistory) => {
    setOpenEdit(true)
    setWorkD(workData)
    console.log('passing work data:', workData)
  }

  const updateWorkHistoryProfile = async workData => {
    // Clone the workDatas array to avoid modifying the state directly
    const updatedWorkHistoryDatas = [...workDatas]

    // Find the index of the existing work history entry in workDatas
    const existingWorkHistoryIndex = updatedWorkHistoryDatas.findIndex(workHistoryEntry => workHistoryEntry.workHistoryID === workData.workHistoryID)

    if (existingWorkHistoryIndex !== -1) {
      // If an existing education entry is found, update it
      updatedWorkHistoryDatas[existingWorkHistoryIndex] = workData
    } else {
      // If no existing education entry is found, create a new one
      const createdWorkHistoryID = 'testadd' + workDatas.length // Assuming api.createEducation returns the ID
      workData.workHistoryID = createdWorkHistoryID
      updatedWorkHistoryDatas.push(workData)
    }

    setWorkDatas(updatedWorkHistoryDatas)
    console.log(workData)
    refresh()
  }

  const removeWorkHistoryEntryByID = (ID: string) => {
    // Find the index of the education entry with the given ID
    if (workDatas) {
      const index = workDatas.findIndex(workHistoryEntry => workHistoryEntry.workHistoryID === ID)

      // If the education entry was found, remove it from the array
      if (index !== -1) {
        workDatas.splice(index, 1)
        console.log(workDatas)
        setWorkDatas(workDatas)
        refresh()
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setWorkD(prevData => ({ ...prevData, [name]: value }))
  }

  const handleEditSubmit = async () => {
    setOpenEdit(false)
    console.log('bbb', workD)
    updateWorkHistoryProfile(workD)
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
          <Typography variant='h5'>Experience</Typography>
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
          {workDatas?.map((workData, index) => (
            <WorkHistoryEntry
              key={index}
              edit={edit}
              workData={workData}
              handleEditClick={handleEditOpen}
              handleEntryRemove={removeWorkHistoryEntryByID}
            />
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
                  name='workHistoryJobTitle'
                  label='Job Title'
                  value={workD?.workHistoryJobTitle}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='workHistoryEmployer'
                  label='Employer'
                  value={workD?.workHistoryEmployer}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name='workHistoryJobDescription'
                  label='Description'
                  value={workD?.workHistoryJobDescription}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={12}>
                <DatePickerWrapper>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={workD?.workHistoryStartDate}
                        id='month-picker'
                        showMonthYearPicker
                        dateFormat='MM/yyyy'
                        popperPlacement='bottom-end'
                        onChange={newDate => {
                          setWorkD({ ...workD, ...(newDate && { workHistoryStartDate: newDate }) })
                        }}
                        customInput={<CustomInput label='Start Date' />}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        selected={workD?.workHistoryEndDate}
                        id='month-picker'
                        showMonthYearPicker
                        dateFormat='MM/yyyy'
                        popperPlacement='bottom-end'
                        onChange={newDate => {
                          setWorkD({ ...workD, ...(newDate && { workHistoryEndDate: newDate }) })
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
export default WorkHistoryCard
