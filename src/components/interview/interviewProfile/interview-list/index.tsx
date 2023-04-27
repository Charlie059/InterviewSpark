import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { getUserInterviewsPaginated, searchUserInterviews } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'
import { Box, Card, IconButton } from '@mui/material'
import TableHeader from '../../../table-header'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Log from 'src/middleware/loggerMiddleware'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

const InterviewList = () => {
  const auth = useAuth()
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [pageSize] = useState<number>(5)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [maxPageReached, setMaxPageReached] = useState<number>(0)

  const getQuestionTypeColors = (questionType: string) => {
    switch (questionType) {
      case 'Behavioral':
        return { backgroundColor: '#F1FBE7', color: '#8EDE4E' }
      case 'Technical':
        return { backgroundColor: '#E7F1FB', color: '#4E8EDE' }
      case 'Situational':
        return { backgroundColor: '#FBE7F1', color: '#DE4E8E' }
      default:
        return { backgroundColor: '#F1F1F1', color: '#4E4E4E' }
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, hide: true },
    { field: 'interviewQuestionID', headerName: 'ID', width: 100 },
    { field: 'interviewQuestion', headerName: 'Question', width: 500 },
    {
      field: 'interviewDateTime',
      headerName: 'Date',
      width: 150,
      valueFormatter: (params: any) => {
        const date = new Date(params.value)

        return format(date, 'dd MMM yyyy')
      }
    },
    {
      field: 'interviewQuestionType',
      headerName: 'Type',
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getQuestionTypeColors(params.value)

        return (
          <Box
            sx={{
              display: 'inline-block',
              borderRadius: '15px',
              padding: '3px 12px',
              backgroundColor: colors.backgroundColor,
              color: colors.color
            }}
          >
            {params.value}
          </Box>
        )
      }
    },
    { field: 'interviewVideoKey', headerName: 'Video Key', width: 200, hide: true },
    { field: 'interviewID', headerName: 'Interview ID', width: 200, hide: true },
    {
      field: 'operations',
      headerName: 'Operations',
      width: 125,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            color='primary'
            onClick={() => {
              Log.info('View button clicked for interview ID:', params.row.interviewID)
            }}
          >
            <VisibilityIcon color='disabled' />
          </IconButton>
          <IconButton
            color='secondary'
            onClick={() => {
              Log.info('Delete button clicked for interview ID:', params.row.interviewID)
            }}
          >
            <DeleteIcon color='disabled' />
          </IconButton>
        </>
      )
    }
  ]

  const searchInterviews = async (searchValue: string) => {
    try {
      const emailAddress = auth.user?.userEmailAddress

      const result = await API.graphql(
        graphqlOperation(searchUserInterviews, {
          emailAddress,
          keyword: searchValue
        })
      )

      if ('data' in result) {
        const interviewList = result.data.searchUserInterviews.interviewList

        // Add the ID field to each interview in the list
        const interviewsWithID = interviewList.map((interview: Interview) => {
          return {
            ...interview,
            id: `${interview.interviewID}`
          }
        })

        setInterviews(interviewsWithID)
        setNextToken(result.data.searchUserInterviews.nextToken)
        setTotalRecords(result.data.searchUserInterviews.totalRecords)
      }
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      if (value === '') {
        fetchInterviews()
      } else {
        searchInterviews(value)
      }
    }
  }

  const handleDelete = () => {
    Log.info('Delete button clicked for interview IDs:', selectedRows)
  }

  useEffect(() => {
    fetchInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInterviews = async (nextToken: string | null = null) => {
    try {
      const emailAddress = auth.user?.userEmailAddress

      const result = await API.graphql(
        graphqlOperation(getUserInterviewsPaginated, {
          emailAddress,
          limit: pageSize,
          nextToken
        })
      )

      if ('data' in result) {
        const interviewList = result.data.getUserInterviewsPaginated.interviewList

        // Add the ID field to the each interview in the list
        const interviewsWithID = interviewList.map((interview: Interview) => {
          return {
            ...interview,
            id: `${interview.interviewID}`
          }
        })

        setInterviews(interviewsWithID)
        setNextToken(result.data.getUserInterviewsPaginated.nextToken)
        setTotalRecords(result.data.getUserInterviewsPaginated.totalRecords)
      }
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handlePageChange = (params: number) => {
    const currentPage = params
    if (currentPage > maxPageReached) {
      fetchInterviews(nextToken)
      setMaxPageReached(currentPage)
    }
  }

  return (
    <Card sx={{ width: '1060px', borderRadius: '20px' }}>
      <div>
        <TableHeader
          value={value}
          selectedRows={selectedRows}
          handleFilter={handleFilter}
          handleKeyDown={handleKeyDown}
          onDelete={handleDelete}
          buttonText={'New Interview'}
          buttonLink={'/interview/create-questions'}
        />
        <DataGrid
          autoHeight
          pagination
          rows={interviews}
          rowCount={totalRecords}
          columns={columns.map(column => ({
            ...column,
            headerAlign: 'center', // Add this line to center the headerName
            align: 'center'
          }))}
          pageSize={pageSize}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onPageChange={handlePageChange}
          onSelectionModelChange={rows => {
            setSelectedRows(rows)
          }}
        />
      </div>
    </Card>
  )
}

export default InterviewList
