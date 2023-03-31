// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CalendarHeatmap from '../react-calendar-heatmap/src'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { Grid } from '@mui/material'

const InterviewTotalSummaryCard = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['#E66D57'],
    plotOptions: {
      radialBar: {
        hollow: { size: '48%' },
        track: {
          background: '#F2B5AA'
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 400,
            fontSize: '1.2rem',
            color: '#A65D50'
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: -12
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  return (
    <Card style={{ borderRadius: '25px', aspectRatio: '1', height: '220px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            Total Practice
          </Typography>
        </Box>
        <Typography variant='h5'>124</Typography>
        <Grid container columns={12}>
          <Grid item md={8}>
            <ReactApexcharts type='radialBar' height={150} series={[64.1]} options={options} />
          </Grid>
          <Grid item md={4}>
            <div style={{ width: '100%', paddingTop: 50, paddingLeft: 10 }}>
              <CalendarHeatmap
                startDate={new Date('2015-12-31')}
                endDate={new Date('2016-01-31')}
                showMonthLabels={false}
                gutterSize={5}
                values={[
                  { date: '2016-01-01', count: 12 },
                  { date: '2016-01-22', count: 12222 },
                  { date: '2016-01-30', count: 38 },
                  { date: '2016-01-23', count: 38 }

                  // ...and so on
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InterviewTotalSummaryCard
