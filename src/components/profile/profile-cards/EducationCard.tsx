import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import {useEffect, useState} from "react";

import { styled } from '@mui/material/styles'

import {Education} from "src/context/types";
import Fab from "@mui/material/Fab";

import Icon from 'src/@core/components/icon'
import TableContainer from "@mui/material/TableContainer";

const EducationCard=({ eduData }: { eduData: Education[] })=>{

  const [eduDatas, setEduDatas] = useState<Array<Education>>([])
  useEffect(() => {
    setEduDatas(eduData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderTop: `2px solid ${theme.palette.divider}`,
    }
  }))

  const eachEducation = (eduData: Education) => {
    return (
        <StyledBox sx={{mt:4}}>
          <Grid container spacing={2}>
            {eduData.eduIcon &&<Grid item xs={1.5}>
              <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <img alt='University Logo' src={eduData.eduIcon} style={{ width: 56, height: 56 }} />
              </CardContent>
            </Grid>}
            <Grid item xs={10.5}>
              <Typography variant='h6' sx={{ mt: 3, mb: 1 }}>
                {eduData.eduSchool}
              </Typography>
              <Typography variant='body1' sx={{ mb: 1 }}>
                {eduData.eduDegree}, {eduData.eduFieldStudy}
              </Typography>
              <Typography variant='body2' sx={{ mb: 1 }}>
                {eduData.eduStartDate} - {eduData.eduEndDate}
              </Typography>
              {eduData.eduActivities && <Typography variant='body1' sx={{ mb: 5 }}>
                Activities and Societies: {eduData.eduActivities}
              </Typography>}
              {eduData.eduDescription && <Typography variant='body1' sx={{ mb: 5 }}>
                Description: {eduData.eduDescription}
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
          {eduDatas.map((eduData) => (
            eachEducation(eduData)
          ))}
        </TableContainer>
      </CardContent>
    </Card>
  )
}
export default EducationCard
