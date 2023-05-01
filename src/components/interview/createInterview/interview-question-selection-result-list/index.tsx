import React, { useState, useEffect, useRef } from 'react'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Log from 'src/middleware/loggerMiddleware'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
  interviewQuestionTitle: string
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

  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth)
    }
  }, [])

  const interviewQuestionWidth = containerWidth * 0.65
  const operationsWidth = containerWidth * 0.1

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'QuestionID', headerName: 'ID', width: 70 },
    {
      field: 'interviewQuestionTitle',
      headerName: 'Name',
      width: interviewQuestionWidth
    },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      hide: true
    },
    { field: 'interviewQuestionType', headerName: 'Type', hide: true },
    {
      field: 'operations',
      headerName: '',
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
    <div ref={containerRef} style={{ height: 485 }}>
      <DataGrid
        ref={containerRef}
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
    </div>
  )
}

// Export InterviewQuestionList and InterviewQuestion
export { InterviewQuestionList, type InterviewQuestion }
