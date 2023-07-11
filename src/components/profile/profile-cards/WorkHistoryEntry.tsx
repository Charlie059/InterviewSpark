import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Icon from '../../../@core/components/icon'
import { styled } from '@mui/material/styles'
import { WorkHistory } from 'src/context/types'
import LetterIcon from "../../custom-icon/LetterIcon";

interface WorkHistoryEntryProps {
  workData: WorkHistory
  edit: boolean
  handleEditClick: (workData: WorkHistory) => void
  handleEntryRemove: (ID: string) => void
}

const WorkHistoryEntry = ({ workData, handleEditClick, edit, handleEntryRemove }: WorkHistoryEntryProps) => {
  workData.workHistoryStartDate = new Date(workData.workHistoryStartDate)
  workData.workHistoryEndDate = new Date(workData.workHistoryEndDate)

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`
    }
  }))

  return (
    <StyledBox sx={{ mt: 4, mb: 1, mr: 4}}>
      <Grid container spacing={2}>
        <Box
          component={Grid}
          item
          lg={3}
          display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }}
          sx={{ mb: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
            {workData.workHistoryIcon ? (
              <img alt='Company Logo' src={workData.workHistoryIcon} style={{ width: 56, height: 56 }} />
            ) : (
              <LetterIcon letter={workData.workHistoryEmployer.charAt(0)}></LetterIcon>
            )}
          </CardContent>
        </Box>
        <Grid item lg={7}>
          <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
            {workData.workHistoryEmployer}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            {workData.workHistoryJobTitle}
          </Typography>
          <Typography variant='body2' sx={{ mb: 1 }}>
            {workData.workHistoryStartDate.toLocaleString('en-US', { month: 'short', year: 'numeric' })} -{' '}
            {workData.workHistoryEndDate.toLocaleString('en-US', { month: 'short', year: 'numeric' })}
          </Typography>
          {workData.workHistoryJobDescription && (
            <Typography variant='body1' sx={{ mb: 5 }}>
              Description: {workData.workHistoryJobDescription}
            </Typography>
          )}
        </Grid>
      </Grid>
      {edit && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            size='small'
            aria-label='edit'
            onClick={() => {
              handleEditClick(workData)
            }}
          >
            <Icon icon='mdi:pencil' />
          </Fab>
          <Fab
            aria-label='add'
            size='small'
            sx={{marginLeft: '10px'}}
            onClick={() => {
              handleEntryRemove(workData.workHistoryID)
            }}
          >
            <Icon icon='mdi:trash' />
          </Fab>
        </Box>
      )}
    </StyledBox>
  )
}

export default WorkHistoryEntry
