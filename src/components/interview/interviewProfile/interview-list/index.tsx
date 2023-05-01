import React, { useState, useEffect } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import {
  getUserInterviewMetaData,
  getUserInterviewsPaginated,
  searchUserInterviewsPaginated
} from 'src/graphql/queries'
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
  const [page, setPage] = useState<number>(0)
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const [tokens, setTokens] = useState<string[]>([])
  const [searchTokens, setSearchTokens] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [maxPageReached, setMaxPageReached] = useState<number>(0)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false)
  const [selectedInterview, setSelectedInterview] = useState<{
    interviewID: string
    interviewQuestionID: string
  } | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

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
    { field: 'interviewQuestionTitle', headerName: 'Question', width: 500 },
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

  const handleFilter = (val: string) => {
    setValue(val)
  }

  useEffect(() => {
    fetchInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchMode && interviews.length === 0 && totalRecords > 0) {
      searchInterviews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviews])

  useEffect(() => {
    if (searchMode) {
      if (page > maxPageReached) {
        // Going forward
        searchInterviews(searchTokens[page - 1])
        setMaxPageReached(page)
      }
    } else {
      if (page > maxPageReached) {
        // Going forward
        fetchInterviews(tokens[page - 1])
        setMaxPageReached(page)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const fetchInterviews = async (nextToken: string | null = null) => {
    setLoading(true)
    try {
      const emailAddress = auth.user?.userEmailAddress

      const result = await API.graphql(
        graphqlOperation(getUserInterviewsPaginated, {
          emailAddress,
          limit: pageSize,
          nextToken
        })
      )

      console.log('Result:', result)

      if ('data' in result) {
        const interviewList = result.data.getUserInterviewsPaginated.interviewList

        // Add the ID field to the each interview in the list
        const interviewsWithID = interviewList.map((interview: Interview) => {
          return {
            ...interview,
            id: `INT#${interview.interviewID}#QST#${interview.interviewQuestionID}`
          }
        })

        // Add the next token to the list of tokens
        if (result.data.getUserInterviewsPaginated.nextToken) {
          if (tokens.length === 0) setTokens([...tokens, result.data.getUserInterviewsPaginated.nextToken])
          else if (page > maxPageReached) setTokens([...tokens, result.data.getUserInterviewsPaginated.nextToken])
        }

        setTotalRecords(result.data.getUserInterviewsPaginated.totalRecords)
        setInterviews(prevState => [...prevState, ...interviewsWithID])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handlePageChange = (params: number) => {
    setPage(params)
  }

  const searchInterviews = async (nextToken: string | null = null) => {
    setLoading(true)
    try {
      const result = await API.graphql(
        graphqlOperation(searchUserInterviewsPaginated, {
          emailAddress: auth.user?.userEmailAddress,
          keyword: value,
          limit: pageSize,
          nextToken
        })
      )

      if ('data' in result) {
        const interviewList = result.data.searchUserInterviewsPaginated.interviewList
        const interviewsWithID = interviewList.map((interview: Interview) => {
          return {
            ...interview,
            id: `INT#${interview.interviewID}#QST#${interview.interviewQuestionID}`
          }
        })

        // Add the next token to the list of tokens
        if (result.data.searchUserInterviewsPaginated.nextToken) {
          if (searchTokens.length === 0) {
            setSearchTokens([...searchTokens, result.data.searchUserInterviewsPaginated.nextToken])
          } else if (page > maxPageReached)
            setSearchTokens([...searchTokens, result.data.searchUserInterviewsPaginated.nextToken])
        }
        setTotalRecords(result.data.searchUserInterviewsPaginated.totalRecords)
        setInterviews(interviewsWithID)
      }
      setLoading(false)

      console.log('Interviews:', interviews)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    if (value === '' && !searchMode) {
      return
    }

    setInterviews([])
    setMaxPageReached(0)
    setPage(0)

    if (value === '') {
      setSearchMode(false)
      setTokens([])
      setSearchTokens([])
      fetchInterviews()
    } else {
      setSearchMode(true)
      setTokens([])
      setSearchTokens([])

      // searchInterviews()
    }
  }

  const handleConfirmedDelete = async () => {
    if (!selectedInterview) return

    const emailAddress = auth.user?.userEmailAddress

    // Use getUserInterviewMetaData by GraphQL and get interviewVideoKey
    try {
      const result = await API.graphql(
        graphqlOperation(getUserInterviewMetaData, {
          emailAddress,
          interviewID: selectedInterview.interviewID,
          interviewQuestionID: selectedInterview.interviewQuestionID
        })
      )

      if ('data' in result) {
        const interviewVideoKey = result.data.getUserInterviewMetaData.interviewVideoKey

        // Remove the video from S3
        try {
          await Storage.remove(interviewVideoKey, { level: 'private' })
        } catch (error) {
          console.error('Error removing video from S3:', error)
        }
      }
    } catch (error) {
      console.error('Error getUserInterviewMetaData:', error)
    }

    // Remove the interview from DynamoDB and update the INT MetaData
    try {
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

      //TODO Should not reload the page, should update the table
      // Reload the page
      setSearchMode(true)
      setInterviews([])

      // sleep
    } catch (error) {
      console.error('Error deleting interviews:', error)
    }
  }

  // TODO: Unused
  const handleDelete = () => {
    // Pop up a confirmation dialog to confirm the deletion, if confirmed then delete the selected rows by calling the API removeUserInterviewsByID
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
          loading={loading}
          page={page}
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
