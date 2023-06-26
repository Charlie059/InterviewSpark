import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import {useEffect, useState} from "react";

import { styled } from '@mui/material/styles'

import {WorkHistory} from "src/context/types";
import Fab from "@mui/material/Fab";

import Icon from 'src/@core/components/icon'
import TableContainer from "@mui/material/TableContainer";

const WorkHistoryCard=({ workData, type }: { workData: WorkHistory[], type:string})=>{


  //#TODO If type != public, show delete button & edit dialog

  const [workDatas, setWorkDatas] = useState<Array<WorkHistory>>([])
  useEffect(() => {
    setWorkDatas(workData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`,
    }
  }))

  const eachWork = (workData: WorkHistory) => {
    return (
      <StyledBox sx={{mt:4}}>
        <Grid container spacing={2}>
          {workData.workHistoryIcon &&<Grid item xs={1.5}>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <img alt='University Logo' src={workData.workHistoryIcon} style={{ width: 56, height: 56 }} />
            </CardContent>
          </Grid>}
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
            {workData.workHistoryJobDescription && <Typography variant='body1' sx={{ mb: 5 }}>
              Description: {workData.workHistoryJobDescription}
            </Typography>}
          </Grid>
        </Grid>
      </StyledBox>
    )
  }

  return(
    <Card>
      <CardContent>
        <Box sx={{ mr: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Education</Typography>
          <Box>
            <Fab aria-label='add' size='small' style={{ marginRight: '10px' }}>
              <Icon icon='mdi:plus' />
            </Fab>
            <Fab size='small' aria-label='edit'>
              <Icon icon='mdi:pencil' />
            </Fab>
          </Box>
        </Box>
        <TableContainer>
          {workDatas.map((eduData) => (
            eachWork(eduData)
          ))}
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default WorkHistoryCard
