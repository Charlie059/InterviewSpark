import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useEffect, useRef, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserInterviewsByMonth } from 'src/graphql/queries'
import Logger from 'src/middleware/loggerMiddleware'
import React from 'react'

interface InterviewUsageSummaryThisMonthProps {
  cardHeight: number
  setCardHeight: React.Dispatch<React.SetStateAction<number>>
}
const InterviewUsageSummaryThisMonth = (interviewUsageSummaryThisMonthProps: InterviewUsageSummaryThisMonthProps) => {
  // ** Props
  const { cardHeight, setCardHeight } = interviewUsageSummaryThisMonthProps

  // ** Hook
  const cardRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const auth = useAuth()

  // ** State
  const [textHeight, setTextHeight] = useState(0)

  // Store the interview count data in the state
  const [data, setData] = useState<number[]>([])
  const [interviewTotalCount, setInterviewTotalCount] = useState<number>(0)

  // Update the card height when the window resizes
  useEffect(() => {
    const updateCardHeight = () => {
      if (cardRef.current) {
        const height = cardRef.current.offsetHeight
        setCardHeight(height)
      }
    }

    updateCardHeight()

    window.addEventListener('resize', updateCardHeight)

    return () => {
      window.removeEventListener('resize', updateCardHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update the text height when the window resizes
  useEffect(() => {
    const updateTextHeight = () => {
      if (textRef.current) {
        const height = textRef.current.offsetHeight
        setTextHeight(height)
      }
    }

    updateTextHeight()

    window.addEventListener('resize', updateTextHeight)

    return () => {
      window.removeEventListener('resize', updateTextHeight)
    }
  }, [])

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

          // Count the number of interviews per day
          const maxDaysInMonth = 31
          const interviewCounts = Array.from({ length: maxDaysInMonth }, () => 0)

          interviewList.forEach((interview: { interviewDateTime: string }) => {
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
          setInterviewTotalCount(interviewList.length)
        }
      } catch (error) {
        Logger.error('Interview monthly summary error: ', error)
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

  // Set the height of the chart
  let chartHeight = '40%'
  if (textHeight && cardHeight) {
    if (cardHeight - 55 < textHeight) chartHeight = '0%' // hide the chart if there is not enough space
    else chartHeight = `${(1 - textHeight / cardHeight) * 50}%`
  }

  return (
    <Card ref={cardRef} style={{ borderRadius: '25px', aspectRatio: '1' }}>
      <CardContent>
        <div ref={textRef}>
          <Typography variant='h6' sx={{ mb: 2.5 }}>
            This Month
          </Typography>
          <Typography variant='body2'>Total Questions This Month</Typography>
          <Typography variant='h5'>{interviewTotalCount}</Typography>
        </div>

        <ReactApexcharts height={chartHeight} type='line' options={options} series={[{ data: data }]} />
      </CardContent>
    </Card>
  )
}

export default InterviewUsageSummaryThisMonth
