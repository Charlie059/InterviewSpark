import React, { useState, useEffect, useRef } from 'react'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { getUserInterviewList, getUserInterviewMetaData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'
import Fuse from 'fuse.js'
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
import router from 'next/router'
import { Interview } from 'src/types/types'

const InterviewList = () => {
  const auth = useAuth()
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [pageSize] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false)
  const [selectedInterview, setSelectedInterview] = useState<{
    interviewID: string
    interviewQuestionID: string
    interviewQuestionType: string
  } | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  // Set table size
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const width = entries[0].contentRect.width

      setContainerWidth(width)
    }

    const resizeObserver = new ResizeObserver(handleResize)

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const getColumnWidths = () => {
    if (!containerWidth || isNaN(containerWidth)) {
      // Default column widths when containerWidth is not ready
      return [70, 300, 95, 100, 85]
    }

    let columnRatios: number[] = []

    if (containerWidth < 400) {
      columnRatios = [0, 6, 0, 0, 3]
    } else if (containerWidth < 800) {
      columnRatios = [0, 6, 3, 0, 3]
    } else {
      columnRatios = [2, 6, 2.2, 2, 2]
    }
    const totalRatios = columnRatios.reduce((acc, ratio) => acc + ratio, 0)
    const columnWidths = columnRatios.map(ratio => Math.floor((containerWidth * ratio) / totalRatios))

    return columnWidths
  }

  const [qIdWidth, qNameWidth, qDateWidth, qTypeWidth, operationsWidth] = getColumnWidths()

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
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'interviewQuestionID', width: qIdWidth, hide: containerWidth < 800, headerName: 'ID' },
    { field: 'interviewQuestionTitle', width: qNameWidth, headerName: 'Question' },
    {
      field: 'interviewDateTime',
      headerName: 'Date',
      width: qDateWidth,
      hide: containerWidth < 400,
      valueFormatter: (params: any) => {
        const date = new Date(params.value)

        return format(date, 'dd MMM yyyy')
      }
    },
    {
      field: 'interviewQuestionType',
      headerName: 'Type',
      width: qTypeWidth,
      hide: containerWidth < 800,
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
    { field: 'interviewVideoKey', headerName: 'Video Key', hide: true },
    { field: 'interviewID', headerName: 'Interview ID', hide: true },
    {
      field: 'operations',
      headerName: 'Operations',
      width: operationsWidth,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            color='primary'
            onClick={() => {
              Log.info('View button clicked for interview ID:', params.row.interviewID)

              const urlMessage = {
                interviewID: params.row.interviewID,
                interviewQuestionID: params.row.interviewQuestionID,
                interviewQuestionType: params.row.interviewQuestionType
              }
              const interviewsString = JSON.stringify(urlMessage)

              router.push({
                pathname: '/interview/detail',
                query: { interview: interviewsString }
              })
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
                interviewQuestionID: params.row.interviewQuestionID,
                interviewQuestionType: params.row.interviewQuestionType
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

  const handleSort = (val: string) => {
    setValue(val)

    const options = {
      keys: ['interviewQuestionTitle', 'interviewQuestionType'],
      includeScore: true // include the relevance score in the search results
    }

    const fuse = new Fuse(interviews, options)
    const result = fuse.search(val)

    // Sort the original array based on the index provided by Fuse.js
    const sortedInterviews = interviews.slice().sort((a, b) => {
      const aIndex = result.find(item => item.item === a)?.refIndex || interviews.length
      const bIndex = result.find(item => item.item === b)?.refIndex || interviews.length

      return aIndex - bIndex // Sort by index in search results
    })

    setInterviews(sortedInterviews)
  }

  const fetchInterviews = async () => {
    setLoading(true)
    try {
      const emailAddress = auth.user?.userEmailAddress
      const result = await API.graphql(graphqlOperation(getUserInterviewList, { emailAddress }))

      if ('data' in result) {
        // Set the id field to the interviewList based on the interviewDateTime start from 1
        const interviewList = result.data.getUserInterviewList.interviewList.sort(
          (a: { interviewDateTime: string | number | Date }, b: { interviewDateTime: string | number | Date }) => {
            return new Date(b.interviewDateTime).getTime() - new Date(a.interviewDateTime).getTime()
          }
        )

        // Set the id field to the interviewList based on the interviewDateTime start from 1
        interviewList.forEach((interview: any, index: number) => {
          interview.id = index + 1
        })
        console.log('Interviews:', interviewList)
        setInterviews(interviewList)
        setTotalRecords(interviewList.length)
      }
    } catch (error) {
      console.error('Error fetching interviews:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (params: number) => {
    setPage(params)
  }

  const handleConfirmedDelete = async () => {
    if (!selectedInterview) return

    const emailAddress = auth.user?.userEmailAddress

    // Use getUserInterviewMetaData by GraphQL and get interviewVideoKey
    try {
      console.log(selectedInterview)
      const result = await API.graphql(
        graphqlOperation(getUserInterviewMetaData, {
          emailAddress,
          interviewID: selectedInterview.interviewID,
          interviewQuestionID: selectedInterview.interviewQuestionID,
          interviewQuestionType: selectedInterview.interviewQuestionType
        })
      )

      if ('data' in result) {
        // webm file name
        const interviewVideoKey = result.data.getUserInterviewMetaData.interviewVideoKey

        // Get .mp4 file name from interviewVideoKey
        const interviewVideoKeyMp4 = interviewVideoKey.replace('.webm', '.mp4')

        // Remove the video from S3 .webm and .mp4
        try {
          await Storage.remove(interviewVideoKey, { level: 'private' })
          await Storage.remove(interviewVideoKeyMp4, { level: 'private' })
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
          interviewQuestionID: selectedInterview.interviewQuestionID,
          interviewQuestionType: selectedInterview.interviewQuestionType
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

  // TODO: Unused
  const handleDelete = () => {
    // Pop up a confirmation dialog to confirm the deletion, if confirmed then delete the selected rows by calling the API removeUserInterviewsByID
  }

  return (
    <Card>
      <div>
        <TableHeader
          value={value}
          selectedRows={selectedRows}
          handleFilter={handleSort}
          onDelete={handleDelete}
          buttonText={'New Interview'}
          buttonLink={'/interview/mock-interview'}
          disableSearch={false}
        />
        <Box ref={containerRef}>
          <DataGrid
            loading={loading}
            page={page}
            autoHeight
            pagination
            rows={interviews}
            rowCount={totalRecords}
            columns={columns.map(column => ({
              ...column,
              headerAlign: 'left',
              align: 'left'
            }))}
            pageSize={pageSize}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            onPageChange={handlePageChange}
            onSelectionModelChange={rows => {
              setSelectedRows(rows)
            }}
          />
        </Box>
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
