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
import { WorkHistory } from 'src/context/types'

// ** Demo Components
import WorkHistoryEntry from './WorkHistoryEntry'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { API, graphqlOperation } from 'aws-amplify'
import { createUserWorkHistory, removeUserWorkHistoryByID, updateUserWorkHistory } from 'src/graphql/mutations'
import { useAuth } from '../../../hooks/useAuth'

import Logger from 'src/middleware/loggerMiddleware'

const WorkHistoryCard = ({
  workDatas,
  type,
  setWorkDatas,
  refresh
}: {
  workDatas: WorkHistory[]
  type: string
  setWorkDatas?: React.Dispatch<React.SetStateAction<WorkHistory[] | undefined>>
  refresh: () => void
}) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [workD, setWorkD] = useState<WorkHistory>()
  const [isEmpty, setIsEmpty] = useState<boolean>(workD !== undefined)

  const emptyWorkHistory: WorkHistory = {
    workHistoryID: '',
    workHistoryJobTitle: '',
    workHistoryEmployer: '',
    workHistoryStartDate: new Date(Date.now()),
    workHistoryEndDate: new Date(Date.now())
  }

  const auth = useAuth()

  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleAddOpen = () => {
    setOpenEdit(true)
    setWorkD(emptyWorkHistory)
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)
  const handleEditOpen = (workData: WorkHistory) => {
    setOpenEdit(true)
    setWorkD(workData)
  }

  const updateWorkHistoryProfile = async (workData: WorkHistory) => {
    // Clone the workDatas array to avoid modifying the state directly
    const updatedWorkHistoryDatas = workDatas?.slice()

    // Find the index of the existing work history entry in workDatas
    const existingWorkHistoryIndex = updatedWorkHistoryDatas.findIndex(
      workHistoryEntry => workHistoryEntry.workHistoryID === workData.workHistoryID
    )

    if (existingWorkHistoryIndex !== -1) {
      // If an existing education entry is found, update it
      updatedWorkHistoryDatas[existingWorkHistoryIndex] = workData
      const workHistoryInput = {
        emailAddress: auth.user?.userEmailAddress,
        workCompany: workData.workHistoryEmployer,
        workPosition: workData.workHistoryJobTitle,
        workStartDate: workData.workHistoryStartDate.toISOString().split('T')[0],
        workEndDate: workData.workHistoryEndDate.toISOString().split('T')[0],
        workDescription: workData.workHistoryJobDescription || '',
        workHistoryID: workData.workHistoryID
      }
      auth.trackEvent('User_Profile_Settings', {
        action: 'Update_Work_History',
        ...workHistoryInput
      })

      await API.graphql(graphqlOperation(updateUserWorkHistory, workHistoryInput))
    } else {
      // If no existing education entry is found, create a new one
      const workHistoryInput = {
        emailAddress: auth.user?.userEmailAddress,
        workCompany: workData.workHistoryEmployer,
        workPosition: workData.workHistoryJobTitle,
        workStartDate: workData.workHistoryStartDate.toISOString().split('T')[0],
        workEndDate: workData.workHistoryEndDate.toISOString().split('T')[0],
        workDescription: workData.workHistoryJobDescription || ''
      }

      try {
        const workHistoryResult = await API.graphql(graphqlOperation(createUserWorkHistory, workHistoryInput))

        if ('data' in workHistoryResult) {
          const createdWorkHistory = workHistoryResult.data.createUserWorkHistory
          const createdWorkHistoryID = createdWorkHistory.workHistoryID

          workData.workHistoryID = createdWorkHistoryID
          updatedWorkHistoryDatas.push(workData)
          auth.trackEvent('User_Profile_Settings', {
            action: 'Create_Work_History',
            ...workHistoryInput
          })
        } else {
          throw 'no data found'
        }
      } catch (err) {
        Logger.error('Error creating work history entry:', err)
      }
    }

    setWorkDatas?.(updatedWorkHistoryDatas)
    setIsEmpty(false)
    refresh()
  }

  const removeWorkHistoryEntryByID = async (ID: string) => {
    // Find the index of the education entry with the given ID
    if (workDatas) {
      const index = workDatas.findIndex(workHistoryEntry => workHistoryEntry.workHistoryID === ID)

      // If the education entry was found, remove it from the array
      if (index !== -1) {
        workDatas.splice(index, 1)
        setWorkDatas?.(workDatas)

        if (workDatas.length === 0) {
          setIsEmpty(true)
        }

        refresh()

        try {
          // Execute the GraphQL mutation to remove the education entry from the database
          const result = await API.graphql({
            query: removeUserWorkHistoryByID,
            variables: {
              emailAddress: auth.user?.userEmailAddress,
              workHistoryID: ID
            }
          })

          // Check the result of the mutation
          if ('data' in result) {
            const { isSuccessful, error } = result.data.removeUserWorkHistoryByID
            if (isSuccessful) {
            } else {
              Logger.error('Failed to remove work history entry from the database:', error)
            }
          }
        } catch (error) {
          Logger.error('An error occurred while executing the GraphQL mutation:', error)
        }
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // @ts-ignore
    setWorkD(prevData => ({ ...prevData, [name]: value }))
  }

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpenEdit(false)
    if (workD) {
      updateWorkHistoryProfile(workD)
        .then(response => {
          Logger.info('Successfully updated work history entry', response)
        })
        .catch(e => {
          Logger.error('Failed to update work history entry', e)
        })
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>Experience</Typography>
          {type != 'public' && (
            <Box>
              <Fab
                aria-label='add'
                size='small'
                style={{ marginRight: !isEmpty ? '10px' : '0px' }}
                onClick={handleAddOpen}
              >
                <Icon icon='mdi:plus' />
              </Fab>
              {!isEmpty && (
                <Fab size='small' aria-label='edit' onClick={!edit ? handleClickOpen : handleClickClose}>
                  <Icon icon={!edit ? 'mdi:pencil' : 'iconamoon:check-fill'} />
                </Fab>
              )}
            </Box>
          )}
        </Box>
        {!isEmpty ? (
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
        ) : (
          <Grid container sx={{ ml: 2, mt: 8, mb: 5 }} spacing={3}>
            <Grid item xs={1.5}>
              <Icon fontSize='large' icon='majesticons:data-plus-line' />
            </Grid>
            <Grid item xs={10.5}>
              <Typography variant='body1'>No Experience Information Available</Typography>
            </Grid>
          </Grid>
        )}

        <Dialog onClose={handleEditClose} aria-labelledby='simple-dialog-title' open={openEdit}>
          <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            {workD?.workHistoryJobTitle ? 'Edit Work History' : 'Add Work History'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              variant='body2'
              id='user-view-edit-description'
              sx={{ textAlign: 'center', mb: 7 }}
            ></DialogContentText>
            <form onSubmit={handleEditSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        name='workHistoryJobTitle'
                        label='Job Title'
                        value={workD?.workHistoryJobTitle}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        required
                        name='workHistoryEmployer'
                        label='Employer'
                        value={workD?.workHistoryEmployer}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name='workHistoryJobDescription'
                    label='Description'
                    value={workD?.workHistoryJobDescription}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <DatePickerWrapper>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={new Date(workD?.workHistoryStartDate || Date.now())}
                          id='month-picker'
                          showMonthYearPicker
                          dateFormat='MM/yyyy'
                          popperPlacement='bottom-end'
                          onChange={newDate => {
                            if (workD) {
                              setWorkD({ ...workD, ...(newDate && { workHistoryStartDate: newDate }) })
                            }
                          }}
                          customInput={<CustomInput label='Start Date' />}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DatePicker
                          selected={new Date(workD?.workHistoryEndDate || Date.now())}
                          id='month-picker'
                          showMonthYearPicker
                          dateFormat='MM/yyyy'
                          popperPlacement='bottom-end'
                          onChange={newDate => {
                            if (workD) {
                              setWorkD({ ...workD, ...(newDate && { workHistoryEndDate: newDate }) })
                            }
                          }}
                          customInput={<CustomInput label='End Date' />}
                        />
                      </Grid>
                    </Grid>
                  </DatePickerWrapper>
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
      </CardContent>
    </Card>
  )
}
export default WorkHistoryCard
