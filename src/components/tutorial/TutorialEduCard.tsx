import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** React Imports
import { useState } from 'react'

// ** Types Import
import { Education } from 'src/context/types'

const TutorialEduCard = ({
  setEduData: setEduData
}: {
  setEduData?: React.Dispatch<React.SetStateAction<Education[]>>
}) => {
  // States
  const [eduD, setEduD] = useState<Education>()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newEduEntry = [{ ...eduD, [name]: value }]

    // @ts-ignore
    setEduD(prevData => ({ ...prevData, [name]: value }))

    // @ts-ignore
    setEduData?.(newEduEntry)
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
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </form> */}
      </CardContent>
    </Card>
  )
}

export default TutorialEduCard
