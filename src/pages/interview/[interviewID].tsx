import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { getInterviewByID } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'

// ** Next Import
import { useRouter } from 'next/router'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

const InterviewPage = () => {
  const router = useRouter()
  const { interviewID } = router.query
  const auth = useAuth()
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [pageSize, setPageSize] = useState<number>(10)

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'interviewDateTime',
      headerName: 'Date and Time',
      width: 200,
      valueFormatter: (params: any) => {
        const date = new Date(params.value)

        return format(date, 'MM/dd/yyyy hh:mm:ss a')
      }
    },
    { field: 'interviewQuestionID', headerName: 'Question ID', width: 200 },
    { field: 'interviewVideoKey', headerName: 'Video Key', width: 200, hide: true },
    { field: 'interviewID', headerName: 'Interview ID', width: 200, hide: true }
  ]

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const emailAddress = auth.user?.userEmailAddress

        const result = await API.graphql(
          graphqlOperation(getInterviewByID, {
            emailAddress,
            interviewID
          })
        )

        if ('data' in result) {
          const interviewList = result.data.getInterviewByID.interviewList.map((interview: any, index: number) => ({
            ...interview,
            id: index + 1
          }))

          setInterviews(interviewList)
        }
      } catch (error) {
        console.error(`Error fetching interviews: ${error}`)
      }
    }
    fetchInterviews()
  }, [auth.user?.userEmailAddress, interviewID])

  const handleRowClick = (params: GridRowParams) => {
    const interviewID = params.row.interviewID
    const interviewQuestionID = params.row.interviewQuestionID
    router.push(`/interview/${interviewID}/${interviewQuestionID}`)
  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={interviews}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default InterviewPage
