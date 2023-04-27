// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
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
import { getUserInterviewUsageMetaData, getUserInterviewsByMonth } from 'src/graphql/queries'

const InterviewTotalSummaryCard = () => {
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

  const auth = useAuth()

  // Store the interview count data in the state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<number[]>([])
  const [interviewTotalCount, setInterviewTotalCount] = useState<number>(0)
  const [interviewHotMapData, setInterviewHotMapData] = useState<any>([])
  const [totalQuestionUserDid, setTotalQuestionUserDid] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)

  const currentDate = new Date()

  // Get the last day of the previous month
  const lastMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)

  // Set the start date to the last day of the previous month
  const startDate = lastMonthLastDay.toISOString().substring(0, 10)

  // Set the end date to the last day of the current month
  const endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-31'
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the email address of the current user
        const emailAddress = auth.user?.userEmailAddress

        // Fetch the interview list for the user
        const result = await API.graphql(
          graphqlOperation(getUserInterviewsByMonth, {
            emailAddress
          })
        )

        if ('data' in result) {
          // Get the list of interviews from the result data
          const interviewList = result.data.getUserInterviewsByMonth.interviewList
          const currentDate = new Date()

          // Count the number of interviews per day
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

          // Update the state with the interview count data
          setData(interviewList)

          setInterviewHotMapData(interviewHotMapData)

          // Query the UserInterviewUsageMetaData
          const userInterviewUsageMetaData = await API.graphql(
            graphqlOperation(getUserInterviewUsageMetaData, {
              emailAddress
            })
          )

          console.log(userInterviewUsageMetaData)
          if ('data' in userInterviewUsageMetaData) {
            const interviewUsageMetaData = userInterviewUsageMetaData.data.getUserInterviewUsageMetaData
            const interviewTotalCount = interviewUsageMetaData.userInterviewNumCount
            const interviewQuestionSet = interviewUsageMetaData.userInterviewQuestionSet
            setInterviewTotalCount(interviewTotalCount)
            setTotalQuestionUserDid(interviewQuestionSet.length)
          }
        }

        // Fetch the total number of questions
        // const totalQuestionsResult = await API.graphql(graphqlOperation(getNumOfQuestion, {}))

        // if ('data' in totalQuestionsResult) {
        // setTotalQuestions(totalQuestionsResult.data.getNumOfQuestion.questionCount)
        setTotalQuestions(100)

        // }
      } catch (error) {
        console.error(error)
      }
    }

    // Fetch the data on component mount
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card style={{ borderRadius: '25px', aspectRatio: '1', height: '220px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            Total Practice
          </Typography>
        </Box>
        <Typography variant='h5'>{interviewTotalCount}</Typography>
        <Grid container columns={12}>
          <Grid item md={8}>
            <ReactApexcharts
              type='radialBar'
              height={150}
              series={
                totalQuestions && totalQuestionUserDid
                  ? [Math.round((totalQuestionUserDid / totalQuestions) * 100)]
                  : [0]
              }
              options={options}
            />
          </Grid>
          <Grid item md={4}>
            <div style={{ width: '100%', paddingTop: 50, paddingLeft: 10 }}>
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
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InterviewTotalSummaryCard
