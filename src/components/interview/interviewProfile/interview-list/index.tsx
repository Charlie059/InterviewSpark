import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { getUserInterviewsPaginated, searchUserInterviews } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'
import {
  Box,
  Card,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

import TableHeader from '../../../table-header'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Log from 'src/middleware/loggerMiddleware'
import { removeUserInterviewsByID } from 'src/graphql/mutations'

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
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false)
  const [selectedInterview, setSelectedInterview] = useState<{
    interviewID: string
    interviewQuestionID: string
  } | null>(null)

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
              setSelectedInterview({
                interviewID: params.row.interviewID,
                interviewQuestionID: params.row.interviewQuestionID
              })
              setConfirmationDialogOpen(true)
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
            id: `INT#${interview.interviewID}#QST#${interview.interviewQuestionID}`
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

  const handleConfirmedDelete = async () => {
    if (!selectedInterview) return

    try {
      const emailAddress = auth.user?.userEmailAddress
      console.log(emailAddress)
      console.log('Deleting interview:', selectedInterview)
      await API.graphql(
        graphqlOperation(removeUserInterviewsByID, {
          emailAddress,
          interviewID: selectedInterview.interviewID,
          interviewQuestionID: selectedInterview.interviewQuestionID
        })
      )

      setConfirmationDialogOpen(false)
      setSelectedRows([])
      setSelectedInterview(null)
      fetchInterviews()
    } catch (error) {
      console.error('Error deleting interviews:', error)
    }
  }

  // TODO: Unusued
  const handleDelete = () => {
    // Pop up a confirmation dialog to confirm the deletion, if confirmed then delete the selected rows by calling the API removeUserInterviewsByID
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
            id: `INT#${interview.interviewID}#QST#${interview.interviewQuestionID}`
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
            headerAlign: 'center',
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
      <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
        <DialogTitle>Delete Selected Interviews Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected interview video? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmedDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default InterviewList
