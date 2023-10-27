// ** MUI Imports
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CalendarHeatmap from '../react-calendar-heatmap/src'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { useAuth } from 'src/hooks/useAuth'
import { getQuestionUsageMetaData, getUserInterviewUsageMetaData, getUserInterviewsByMonth } from 'src/graphql/queries'

// Hook for fetching and processing interview data
const useInterviewData = () => {
  const auth = useAuth()
  const [interviewHotMapData, setInterviewHotMapData] = useState<any>([])
  const [interviewTotalCount, setInterviewTotalCount] = useState<number>(0)
  const [totalQuestionUserDid, setTotalQuestionUserDid] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const emailAddress = auth.user?.userEmailAddress
      const result = await API.graphql(
        graphqlOperation(getUserInterviewsByMonth, {
          emailAddress
        })
      )

      if ('data' in result) {
        const interviewList = result.data.getUserInterviewsByMonth.interviewList
        const currentDate = new Date()
        const interviewCounts = Array.from({ length: currentDate.getDate() }, () => 0)
        interviewList.forEach((interview: { interviewDateTime: string }) => {
          const interviewDate = new Date(interview.interviewDateTime)
          const dayOfMonth = interviewDate.getDate()
          interviewCounts[dayOfMonth - 1] += 1
        })

        // Mapping interviewCounts to the Date
        const interviewHotMapData = interviewCounts.map((interviewCount, index) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
          const formattedDate = date.toISOString().substring(0, 10)

          return { date: formattedDate, count: interviewCount }
        })

        setInterviewHotMapData(interviewHotMapData)
      }

      const userInterviewUsageMetaData = await API.graphql(
        graphqlOperation(getUserInterviewUsageMetaData, {
          emailAddress
        })
      )

      if ('data' in userInterviewUsageMetaData) {
        const interviewUsageMetaData = userInterviewUsageMetaData.data.getUserInterviewUsageMetaData
        const interviewTotalCount = interviewUsageMetaData.userInterviewNumTotalCount
        const interviewQuestionMap = JSON.parse(interviewUsageMetaData.userInterviewQuestionMap)
        const interviewQuestionMapLength = Object.keys(interviewQuestionMap).length

        setInterviewTotalCount(interviewTotalCount)
        setTotalQuestionUserDid(interviewQuestionMapLength)
      }
    }

    fetchData()
  }, [auth])

  return { interviewHotMapData, interviewTotalCount, totalQuestionUserDid }
}

// Hook for fetching and processing question data
const useQuestionData = () => {
  const [totalQuestions, setTotalQuestions] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const totalQuestionsResult = await API.graphql(graphqlOperation(getQuestionUsageMetaData, {}))
      if ('data' in totalQuestionsResult) {
        const totalNumOfQuestions = totalQuestionsResult.data.getQuestionUsageMetaData.totalNumOfQuestion
        setTotalQuestions(totalNumOfQuestions)
      }
    }

    fetchData()
  }, [])

  return { totalQuestions }
}

const InterviewTotalSummaryCard = () => {

  // Store the interview count data in the state
  const { interviewHotMapData, interviewTotalCount, totalQuestionUserDid } = useInterviewData()
  const { totalQuestions } = useQuestionData()
  const currentDate = new Date()
  const lastMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
  const startDate = lastMonthLastDay.toISOString().substring(0, 10) // Set the start date to the last day of the previous month
  const endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-31' // Set the end date to the last day of the current month

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['#E66D57'],
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
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



  // Set the height of the chart
  const chartHeight = '40%'

  // if (textHeight && cardHeight) {
  //   if (cardHeight - 100 < textHeight) chartHeight = '0%' // hide the chart if there is not enough space
  //   else if (cardHeight - textHeight > 150) chartHeight = '100%'
  //   else chartHeight = `${(1 - textHeight / cardHeight) * 115}%`
  // }

  return (
      <CardContent>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h6' sx={{ mr: 1.5 }}>
              Total Practice
            </Typography>
            <Typography variant='h5'>{interviewTotalCount}</Typography>
          </Grid>
          {/*chartHeight === 0%*/}
          {chartHeight  ? null : (
            <Grid container direction='row'>
              <Grid item xs={8} sx={{ marginTop: '-10px' }}>
                {/* If grid sx, %. If grid md, lg, display*/}
                <ReactApexcharts
                  type='radialBar'
                  series={
                    totalQuestions && totalQuestionUserDid
                      ? [Math.round((totalQuestionUserDid / totalQuestions) * 100)]
                      : [0]
                  }
                  height={chartHeight}
                  options={options}
                />
              </Grid>
              <Grid item xs={4} sx={{ marginTop: '20px' }}>
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={endDate}
                  showMonthLabels={false}
                  gutterSize={5}
                  values={interviewHotMapData}
                  classForValue={value => {
                    switch (true) {
                      case !value:
                        return 'color-github-0'
                      case value.count === 0:
                        return 'color-github-0'
                      case value.count === 1:
                        return 'color-scale-1'
                      case value.count === 2:
                        return 'color-scale-2'
                      case value.count > 2 && value.count < 10:
                        return 'color-scale-3'
                      case value.count >= 10:
                        return 'color-scale-4'
                      default:
                        return ''
                    }
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
  )
}

export default InterviewTotalSummaryCard
