import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

import { getInterviewList, getQuestionMetaData } from 'src/graphql/queries'
import { useAuth } from 'src/hooks/useAuth'
import { format } from 'date-fns'

import { Card, IconButton } from '@mui/material'

import TableHeader from '../table-header/table-header'

import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Interview {
  interviewID: string
  interviewDateTime: string
  interviewQuestionID: string
  interviewVideoKey: string
}

const InterviewList = () => {
  const auth = useAuth()
  const [interviews, setInterviews] = useState<Interview[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(5)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [totalRecords, setTotalRecords] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxPageReached, setMaxPageReached] = useState<number>(0)

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, hide: true },
    { field: 'questionID', headerName: 'ID', width: 100 },
    { field: 'interviewQuestion', headerName: 'Name', width: 300 },
    {
      field: 'interviewDateTime',
      headerName: 'Date',
      width: 260,
      valueFormatter: (params: any) => {
        const date = new Date(params.value)

        return format(date, 'MM/dd/yyyy hh:mm:ss a')
      }
    },
    { field: 'interviewQuestionType', headerName: 'Type', width: 100 },
    { field: 'interviewQuestionID', headerName: 'Question ID', width: 200, hide: true },
    { field: 'interviewVideoKey', headerName: 'Video Key', width: 200, hide: true },
    { field: 'interviewID', headerName: 'Interview ID', width: 200, hide: true },
    {
      field: 'operations',
      headerName: 'Operations',
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            color='primary'
            onClick={() => {
              console.log('View button clicked for interview ID:', params.row.interviewID)
            }}
          >
            <VisibilityIcon color='disabled' />
          </IconButton>
          <IconButton
            color='secondary'
            onClick={() => {
              console.log('Delete button clicked for interview ID:', params.row.interviewID)
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

  const handleDelete = () => {
    console.log('Delete button clicked for interview IDs:', selectedRows)
  }

  useEffect(() => {
    fetchInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInterviews = async (nextToken: string | null = null) => {
    try {
      const emailAddress = auth.user?.userEmailAddress

      const result = await API.graphql(
        graphqlOperation(getInterviewList, {
          emailAddress,
          limit: pageSize,
          nextToken
        })
      )

      if ('data' in result) {
        const interviewList = result.data.getInterviewList.interviewList

        const interviewListWithQuestionData = await Promise.all(
          interviewList.map(async (interview: any) => {
            // If interviewQuestionID is null, then we don't need to fetch the question data
            if (interview.interviewQuestionID === null) {
              return {
                ...interview,
                id: interview.interviewDateTime
              }
            }

            try {
              const questionResult = await API.graphql(
                graphqlOperation(getQuestionMetaData, {
                  questionID: interview.interviewQuestionID
                })
              )

              if ('data' in questionResult) {
                const questionData = questionResult.data.getQuestionMetaData

                return {
                  ...interview,
                  id: interview.interviewDateTime,
                  questionID: interview.interviewQuestionID,
                  interviewQuestion: questionData.interviewQuestion,
                  interviewQuestionType: questionData.interviewQuestionType
                }
              }
            } catch (error) {
              console.error(`Error fetching question details:`, error)
            }

            return {
              ...interview,
              id: interview.interviewDateTime,
              questionID: interview.interviewQuestionID
            }
          })
        )

        setInterviews(prevInterviews => [...prevInterviews, ...interviewListWithQuestionData])

        setNextToken(result.data.getInterviewList.nextToken)
        setTotalRecords(result.data.getInterviewList.totalRecords)
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
          onDelete={handleDelete}
          buttonText={'Next'}
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
          checkboxSelection
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
