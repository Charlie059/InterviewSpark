import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import {useEffect, useState} from "react";

interface education {
  eduDegree: string
  eduSchool: string
  eduStartDate: string
  eduFieldStudy: string
  eduEndDate: string
}

const EducationCard=({eduData})=>{

  const [eduDatas, setEduDatas] = useState<Array<education>>([])
  useEffect(() => {
    setEduDatas(eduData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return(
    <Card>
      <CardContent>
        <Typography variant='h6'>Details</Typography>
        <Divider sx={{ mt: 4 }} />
        <Grid container spacing={3}>
          {eduDatas.map(eduData => (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6}>
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography variant='h6' sx={{ mr: 2, color: 'text.primary' }}>
                      {eduData.eduSchool}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} sx={{ alignItems:'center'}}>
                  <Box sx={{ display: 'flex', justifyContent:'right', mb: 2.7 }}>
                    <Typography  sx={{ mr: 2, color: 'text.primary'}}>
                      From {eduData.eduStartDate}  to {eduData.eduEndDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    {eduData.eduDegree} in {eduData.eduFieldStudy}
                  </Typography>
                </Box>
              </Grid>
              </Grid>
              <Divider sx={{ mt: 1 }} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
export default EducationCard
