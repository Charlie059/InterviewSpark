import React, { useState, useEffect } from 'react'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

import { Card, IconButton } from '@mui/material'

import TableHeader from '../../../table-header'

import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Log from 'src/middleware/loggerMiddleware'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
}

interface Props {
  interviewQuestions: InterviewQuestion[]
  onDeleteInterview: (id: number) => void
}

const InterviewQuestionList = (props: Props) => {
  const { interviewQuestions, onDeleteInterview } = props

  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'QuestionID', headerName: 'Question', width: 100 },
    { field: 'interviewQuestion', headerName: 'Name', width: 220 },
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      width: 100
    },
    { field: 'interviewQuestionType', headerName: 'Type', width: 75 },
    {
      field: 'operations',
      headerName: 'Operations',
      width: 150,
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

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleDelete = () => {
    Log.info('Delete button clicked for interview IDs:', selectedRows)
  }

  const handleKeyDown = () => {
    Log.info('Pressed Enter')
  }

  useEffect(() => {
    Log.info('interviewQuestions:', interviewQuestions)
  }, [interviewQuestions])

  return (
    <Card sx={{ width: 700, height: 530, marginLeft: 5, marginRight: 2, borderRadius: '20px' }}>
      <TableHeader
        value={value}
        selectedRows={selectedRows}
        handleFilter={handleFilter}
        onDelete={handleDelete}
        buttonText={'Add Randomly'}
        buttonLink={''}
        handleKeyDown={handleKeyDown}
      />
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
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={rows => {
          setSelectedRows(rows)
        }}
      />
    </Card>
  )
}

// Export InterviewQuestionList and InterviewQuestion
export { InterviewQuestionList, type InterviewQuestion }
