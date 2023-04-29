import React, { useState, useEffect } from 'react'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Log from 'src/middleware/loggerMiddleware'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedSecond: number
}
interface Props {
  interviewQuestions: InterviewQuestion[]
  onDeleteInterview: (id: number) => void
}

const InterviewQuestionList = (props: Props) => {
  const { interviewQuestions, onDeleteInterview } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'QuestionID', headerName: 'Question', hide: true },
    { field: 'interviewQuestion', headerName: 'Name', width: 280 },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      width: 100,
      hide: true
    },
    { field: 'interviewQuestionType', headerName: 'Type', width: 100 },
    {
      field: 'operations',
      headerName: '',
      width: 5,
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
          ></IconButton>
          <IconButton
            color='secondary'
            onClick={() => {
              onDeleteInterview(params.row.id)
              Log.info('Delete button clicked for interview ID:', params.row.interviewID)
            }}
          >
            <DeleteIcon color='disabled' />
          </IconButton>
        </>
      )
    }
  ]

  useEffect(() => {
    Log.info('interviewQuestions:', interviewQuestions)
  }, [interviewQuestions])

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={interviewQuestions}
        columns={columns.map(column => ({
          ...column,
          headerAlign: 'center', // Add this line to center the headerName
          align: 'center'
        }))}
        pageSize={interviewQuestions.length} // Set pageSize to the length of interviewQuestion array
        rowsPerPageOptions={[interviewQuestions.length]} // Set rowsPerPageOptions to the length of interviewQuestion array
        disableSelectionOnClick
        onSelectionModelChange={rows => {
          setSelectedRows(rows)
        }}
      />
    </Box>
  )
}

// Export InterviewQuestionList and InterviewQuestion
export { InterviewQuestionList, type InterviewQuestion }
