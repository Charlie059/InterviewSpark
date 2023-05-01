// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** MUI Components Imports
import ApexRadialBarChart from 'src/views/charts/ApexRadialBarChart'
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import TableContainer from "@mui/material/TableContainer";
import Close from "mdi-material-ui/Close";
import Chip from "@mui/material/Chip";

interface Keyword {
  keyword: string;
  occurance: number;
}

interface ResumeResultsProps {
  resumeResults: string;
}

const ResumeResults: React.FC<ResumeResultsProps> = ({resumeResults}) => {
  const results = JSON.parse(JSON.parse(resumeResults))["Final Report"]
  const JD_keywords = results.JD_keywords_in_profile
  const keywords: Keyword[] = []
  let keywords_hit_count = 0
  Object.keys(JD_keywords).forEach(function (key) {
    if (JD_keywords[key] !== 0) {
      keywords_hit_count += 1;
    }
    keywords.push({keyword: key, occurance: JD_keywords[key]})
  });

  return (

    <Grid container spacing={6}>

      <Grid item xs={12} md={4}>
        <Typography variant='h6' sx={{mb: 4}}>
          Match Score
        </Typography>
        <ApexRadialBarChart grade={results.Final_grade} score={results.Final_score * 2} size={400}/>
      </Grid>
      <Grid container xs={12} md={8} spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{mb: 4}}>
            ATS Findings
          </Typography>
          <TableContainer>
            <Table size='small' sx={{minWidth: 5}}>
              <TableRow sx={{'&:last-of-type td': {border: 0}}}>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='button' sx={{color: 'text.primary'}}>
                    Skills and Keywords
                  </Typography>
                </TableCell>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='body1' sx={{color: 'text.primary'}}>
                    {keywords_hit_count}/{keywords.length}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{'&:last-of-type td': {border: 0}}}>
                <TableCell sx={{height: '3.375rem', width: 5 / 8}}>
                  <Typography variant='button' sx={{color: 'text.primary'}}>
                    Education Match
                  </Typography>
                </TableCell>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='subtitle2' sx={{color: 'text.primary'}}>
                    Require: {results.Lowest_Education_level_mentioned_in_job_description} </Typography>
                  <Typography variant='subtitle1' sx={{color: 'text.primary'}}>
                    Has: {results.Education_level}</Typography>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{mb: 4}}>
            Recruiter Findings
          </Typography>
          <TableContainer>
            <Table size='small' sx={{minWidth: 5}}>
              <TableRow sx={{'&:last-of-type td': {border: 0}}}>
                <TableCell sx={{height: '3.375rem', width: 5 / 8}}>
                  <Typography variant='button' sx={{color: 'text.primary'}}>
                    Word Count
                  </Typography>
                </TableCell>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='body1' sx={{color: 'text.primary'}}>
                    {results.Resume_Wordcounts}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{'&:last-of-type td': {border: 0}}}>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='button' sx={{color: 'text.primary'}}>
                    Measurable Results
                  </Typography>
                </TableCell>
                <TableCell sx={{height: '3.375rem'}}>
                  <Typography variant='subtitle2' sx={{color: 'text.primary'}}>
                    {results.Quantifiable_results.join()} </Typography>
                </TableCell>
              </TableRow>

            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant='h6' sx={{mb: 4}}>
            Industry Knowledge
          </Typography>
          <TableContainer>
            <Table size='small' sx={{minWidth: 5}}>
              <TableHead sx={{backgroundColor: 'customColors.tableHeaderBg'}}>
                <TableRow>
                  <TableCell sx={{height: '3.375rem'}}>Keywords in requirements</TableCell>
                  <TableCell sx={{height: '3.375rem'}}>Resume Hits</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keywords.map((item, index) => (
                  <TableRow hover key={index} sx={{'&:last-of-type td': {border: 0}}}>
                    <TableCell>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant='subtitle2' sx={{color: 'text.primary'}}>
                          {item.keyword}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='left'>
                      {!item.occurance &&
                        <Box sx={{display: 'flex', alignItems: 'center'}}><Close color="error"/></Box>}
                      {item.occurance != 0 && <Typography sx={{color: 'text.primary'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>&nbsp;{item.occurance}</Box>
                      </Typography>}
                    </TableCell>
                  </TableRow>

                ))}

              </TableBody>

            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' sx={{mb: 4}}>
            Other Industry Keywords in Resume
          </Typography>
          <div className='demo-space-x'>
            {
              results.Industry_keywords_in_profile.map((index: string) => (

                // eslint-disable-next-line react/jsx-key
                <Chip label={index} variant='outlined' color='primary'></Chip>

              ))
            }
          </div>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default ResumeResults

// export {}
