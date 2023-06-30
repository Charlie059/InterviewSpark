import { Education } from '../../../context/types'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Icon from '../../../@core/components/icon'
import { styled } from '@mui/material/styles'
import LetterIcon from 'src/components/custom-icon/LetterIcon'

interface EducationEntryProps {
  eduData: Education
  edit: boolean
  handleEditClick: (eduData: Education) => void
  handleEntryRemove: (ID: string) => void
}

const EducationEntry = ({ eduData, handleEditClick, edit, handleEntryRemove }: EducationEntryProps) => {
  eduData.eduStartDate = new Date(eduData.eduStartDate)
  eduData.eduEndDate = new Date(eduData.eduEndDate)

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`
    }
  }))

  return (
    <StyledBox sx={{ mt: 4, mb: 1, mr: 2}}>
      <Grid container spacing={2}>
        <Box
          component={Grid}
          item
          lg={3}
          display={{ md: 'none', lg: 'flex' }}
          sx={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            {eduData.eduIcon ? (
              <img alt='University Logo' src={eduData.eduIcon} style={{ width: 56, height: 56 }} />
            ) : (
              <LetterIcon letter={eduData.eduSchool.charAt(0)}></LetterIcon>
            )}
          </CardContent>
        </Box>
        <Grid item lg={7}>
          <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
            {eduData.eduSchool}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            {eduData.eduDegree}, {eduData.eduFieldStudy}
          </Typography>
          <Typography variant='body2' sx={{ mb: 1 }}>
            {eduData.eduStartDate.toLocaleString('en-US', { month: 'short', year: 'numeric' })} -{' '}
            {eduData.eduEndDate.toLocaleString('en-US', { month: 'short', year: 'numeric' })}
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
      {edit && (
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Fab
            size='small'
            aria-label='edit'
            onClick={() => {
              handleEditClick(eduData)
            }}
          >
            <Icon icon='mdi:pencil' />
          </Fab>
          <Fab
            aria-label='add'
            size='small'
            sx={{marginLeft: '10px'}}
            onClick={() => {
              handleEntryRemove(eduData.eduID)
            }}
          >
            <Icon icon='mdi:trash' />
          </Fab>
        </Box>
      )}
    </StyledBox>
  )
}

export default EducationEntry
