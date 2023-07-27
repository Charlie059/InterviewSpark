import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// ** React Imports
import { useState } from 'react'

// ** Types Import
import { Education } from 'src/context/types'
import { API, graphqlOperation } from 'aws-amplify'
import { createUserEducation } from '../../graphql/mutations'

import { useAuth } from 'src/hooks/useAuth'

const TutorialEduCard = ({
  eduDatas,
  setEduDatas,
  refresh
}: {
  eduDatas: Education[]
  type: string
  setEduDatas?: React.Dispatch<React.SetStateAction<Education[] | undefined>>
  refresh: () => void
}) => {
  // States
  const [, setOpenEdit] = useState(false)
  const [eduD, setEduD] = useState<Education>()

  const auth = useAuth()

  const updateEduProfile = async (eduData: Education) => {
    // Clone the eduDatas array to avoid modifying the state directly
    const updatedEduDatas = eduDatas.slice()

    // If no existing education entry is found, create a new one
    const eduInput = {
      emailAddress: auth.user?.userEmailAddress,
      eduDegree: eduData.eduDegree,
      eduFieldStudy: eduData.eduFieldStudy,
      eduSchool: eduData.eduSchool,
      eduStartDate: new Date(Date.now()).toISOString().split('T')[0],
      eduEndDate: new Date(Date.now()).toISOString().split('T')[0]
    }

    try {
      const eduResult = await API.graphql(graphqlOperation(createUserEducation, eduInput))
      console.log('created edu data', eduResult)
    } catch (e) {
      console.error('Error creating education entry:', e)
    }
    setEduDatas?.(updatedEduDatas)

    console.log('updated data: ', updatedEduDatas)
    refresh()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // @ts-ignore
    setEduD(prevData => ({ ...prevData, [name]: value }))
  }

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // prevent default form behavior
    setOpenEdit(false)
    console.log('bbb', eduD)
    if (eduD) {
      updateEduProfile(eduD).catch(e => {
        console.log(e)
      })
    }
  }

  const degrees = [
    {
      value: "Bachelor's",
      label: "Bachelor's"
    },
    {
      value: "Master's",
      label: "Master's"
    },
    {
      value: 'Doctor',
      label: 'Doctor'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>Education</Typography>
        </Box>
        <form onSubmit={handleEditSubmit}>
          <Grid container spacing={6} sx={{ p: 5 }}>
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
                    id='outlined-select-degree'
                    sx={{ display: 'flex' }}
                    required
                    select
                    name='eduDegree'
                    label='Degree'
                    defaultValue={'Bachelors'}
                    value={eduD?.eduDegree}
                    onChange={handleInputChange}
                  >
                    {degrees.map(option => (
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
                <Grid container justifyContent='flex-end' sx={{ mt: 8 }}>
                  <Grid item>
                    <Button variant='contained' type='submit'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TutorialEduCard
