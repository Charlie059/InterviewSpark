import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getInterviewList } from 'src/graphql/queries'

const InterviewUsageSummaryThisMonth = () => {
  // ** Hook
  const theme = useTheme()

  // Store the interview count data in the state
  const [data, setData] = useState<number[]>([])
  const [interviewTotalCount, setInterviewTotalCount] = useState<number>(0)

  const auth = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the email address of the current user
        const emailAddress = auth.user?.userEmailAddress

        // Fetch the interview list for the user
        const result = await API.graphql(
          graphqlOperation(getInterviewList, {
            emailAddress
          })
        )

        if ('data' in result) {
          // Get the list of interviews from the result data
          const interviewList = result.data.getInterviewList.interviewList

          // Filter out the interviews that in this month
          const currentDate = new Date()
          const filteredInterviews = interviewList.filter((interview: { interviewDateTime: string }) => {
            const interviewDate = new Date(interview.interviewDateTime)

            return (
              interviewDate.getFullYear() === currentDate.getFullYear() &&
              interviewDate.getMonth() === currentDate.getMonth()
            )
          })

          // Count the number of interviews per day
          const interviewCounts = Array.from({ length: currentDate.getDate() }, () => 0)
          filteredInterviews.forEach((interview: { interviewDateTime: string }) => {
            const interviewDate = new Date(interview.interviewDateTime)
            const dayOfMonth = interviewDate.getDate()
            interviewCounts[dayOfMonth - 1] += 1
          })

          // Calculate the sum of every 3 consecutive viewCounts
          const interviewCountsSum = interviewCounts.reduce((acc: number[], curr: number, index: number) => {
            if (index % 3 === 0) {
              // Add up the current count and the counts of the next two days (or 0 if there are no more days)
              acc.push(curr + (interviewCounts[index + 1] || 0) + (interviewCounts[index + 2] || 0))
            }

            return acc
          }, [])

          // Update the state with the interview count data
          setData(interviewCountsSum)

          setInterviewTotalCount(filteredInterviews.length)
        }
      } catch (error) {
        console.error(error)
      }
    }

    // Fetch the data on component mount
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 14,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: theme.palette.primary.main
      }
    },
    tooltip: { enabled: false },
    grid: {
      xaxis: {
        lines: { show: false }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -12,
        left: -2,
        right: 8,
        bottom: -10
      }
    },
    stroke: {
      width: 5,
      lineCap: 'round'
    },
    markers: { size: 0 },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      labels: { show: false }
    }
  }

  return (
    <Card style={{ borderRadius: '25px', aspectRatio: '1', height: '220px' }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2.5 }}>
          This Month
        </Typography>
        <Typography variant='body2'>Total Questions This Month</Typography>
        <Typography variant='h5'>{interviewTotalCount}</Typography>

        <ReactApexcharts type='line' height={70} options={options} series={[{ data: data }]} />
      </CardContent>
    </Card>
  )
}

export default InterviewUsageSummaryThisMonth
