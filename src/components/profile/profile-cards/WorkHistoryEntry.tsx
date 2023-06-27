import { Education } from '../../../context/types'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Icon from '../../../@core/components/icon'
import { styled } from '@mui/material/styles'
import { WorkHistory } from 'src/API'

interface WorkHistoryEntryProps {
  workData: WorkHistory
  edit: boolean
  handleEditClick: (workData: WorkHistory) => void
}

const WorkHistoryEntry = ({ workData, handleEditClick, edit }: WorkHistoryEntryProps) => {
  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`
    }
  }))

  return (
    <StyledBox sx={{ mt: 4 }}>
      <Grid item xs={10.5}>
        <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
          {workData.workHistoryEmployer}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          {workData.workHistoryJobTitle}
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          {workData.workHistoryStartDate} - {workData.workHistoryEndDate}
        </Typography>
        {workData.workHistoryJobDescription && (
          <Typography variant='body1' sx={{ mb: 5 }}>
            Description: {workData.workHistoryJobDescription}
          </Typography>
        )}
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
          <Fab aria-label='add' size='small'>
            <Icon icon='mdi:trash' />
          </Fab>
        </Box>
      )}
    </StyledBox>
  )
}

export default WorkHistoryEntry
