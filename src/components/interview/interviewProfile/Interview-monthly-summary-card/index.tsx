import { useEffect, useRef, useState } from 'react'
import {CardContent,Typography, useTheme} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { getUserInterviewsByMonth } from 'src/graphql/queries'
import { useGraphQLQuery } from 'src/hooks/useGraphQLQuery'
import { GetUserInterviewsByMonthVariables } from 'src/types/graphqlTypes'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { ApexOptions } from 'apexcharts'


const InterviewUsageSummaryThisMonth = () => {
  // Store the interview count data in the state
  const [data, setData] = useState<number[]>([])
  const [interviewTotalCount, setInterviewTotalCount] = useState<number>(0)

  // ** Hook
  const cardContentRef= useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const auth = useAuth()
  const emailAddress = auth.user?.userEmailAddress;

  const { data: queryData, error:InterviewsByMonthError } =
    useGraphQLQuery<GetUserInterviewsByMonthVariables>(getUserInterviewsByMonth, { emailAddress });

  interface Interview {
    interviewDateTime: string;
  }

  useEffect(()=>{
    if (queryData && queryData.getUserInterviewsByMonth) {
      const interviewList = queryData.getUserInterviewsByMonth.interviewList;

      // Count the number of interviews per day
      const maxDaysInMonth = 31;
      const interviewCounts = Array.from({ length: maxDaysInMonth }, () => 0);

      interviewList.forEach((interview:Interview) => {
        const interviewDate = new Date(interview.interviewDateTime);
        const dayOfMonth = interviewDate.getDate();
        interviewCounts[dayOfMonth - 1] += 1;
      });

      // Calculate the sum of every 3 consecutive interviewCounts
      const interviewCountsSum = interviewCounts.reduce((acc: number[], curr: number, index: number) => {
        if (index % 3 === 0) {
          acc.push(curr + (interviewCounts[index + 1] || 0) + (interviewCounts[index + 2] || 0));
        }

return acc;
      }, []);

      // Update the state with the interview count data
      setData(interviewCountsSum);
      setInterviewTotalCount(interviewList.length);
    }
  },[queryData,InterviewsByMonthError])


  // Set the height of the chart
  const chartHeight = '40%'

  // if (textHeight && cardHeight) {
  //   if (cardHeight - 55 < textHeight) chartHeight = '0%' // hide the chart if there is not enough space
  //   else chartHeight = `${(1 - textHeight / cardHeight) * 50}%`
  // }
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 14,
        blur: 4,
        left: 0,
        enabled: false,
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
      <CardContent ref={cardContentRef}>
          <Typography variant='h6' sx={{ mb: 2.5 }}>
            This Month
          </Typography>
          <Typography variant='body2'>Monthly Total Questions:</Typography>
          <Typography variant='h5'>{interviewTotalCount}</Typography>
        <ReactApexcharts height={chartHeight} type='line' options={options} series={[{ data: data }]} />
      </CardContent>
  )
}

export default InterviewUsageSummaryThisMonth
