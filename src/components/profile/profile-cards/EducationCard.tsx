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
import EducationEntry from "./EducationEntry";

const EducationCard = ({ eduDatas, type }: { eduDatas: Education[]; type: string }) => {
  // States
  const [edit, setEdit] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [eduD, setEduD] = useState<Education>({
    eduDegree: '',
    eduFieldStudy: '',
    eduSchool: '',
    eduStartDate: '',
    eduEndDate: '',
    eduActivities:'',
    eduDescription:'',
  })
  const [eduDataArr, setEduDataArr] = useState<Education[]>()

  useEffect(() => {
    setEduDataArr(eduDatas)
  }, [eduDatas])

  const handleClickOpen = () => {
    setEdit(true)
  }
  const handleClickClose = () => setEdit(false)

  const handleEditClose = () => setOpenEdit(false)
  const handleEditOpen = (eduData:Education) =>{
    setOpenEdit(true)
    setEduD(eduData)
    console.log("passing edudata:",eduD)
  }
  const updateEduProfile = async eduDatas => {
    //#TODO waiting on api changes
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEduD((prevData) => ({ ...prevData, [name]: value }));
  };


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
        <TableContainer>{eduDataArr?.map((eduData,index) => (
          <EducationEntry
            key={index}
            edit={edit}
            eduData={eduData}
            handleEditClick={handleEditOpen}/>
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
                  <FormControl>
                    <TextField
                      fullWidth
                      name='eduDegree'
                      label='Degree'
                      value={eduD?.eduDegree}
                      onChange={handleInputChange}
                    />
                  </FormControl>
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
