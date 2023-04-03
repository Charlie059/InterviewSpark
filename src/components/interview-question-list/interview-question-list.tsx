import React, { useState, useEffect } from 'react'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

import { IconButton } from '@mui/material'

import TableHeader from '../table-header/table-header'

import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface InterviewQuestion {
  id: number
  QuestionID: string
  interviewQuestion: string
  interviewQuestionSampleAns: string
  interviewQuestionType: string
}

interface Props {
  newQuestion?: InterviewQuestion | null
}

const InterviewQuestionList = ({ newQuestion }: Props) => {
  const [interviewQuestion, setInterviewQuestion] = useState<InterviewQuestion[]>([])

  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, hide: true },
    { field: 'questionID', headerName: 'Question', width: 100 },
    { field: 'interviewQuestion', headerName: 'Name', width: 300 },
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
    if (newQuestion) {
      console.log('New question added:', newQuestion)
      setInterviewQuestion(prevState => [...prevState, newQuestion as InterviewQuestion])
    }
  }, [newQuestion])

  return (
    <div>
      <TableHeader
        value={value}
        selectedRows={selectedRows}
        handleFilter={handleFilter}
        onDelete={handleDelete}
        buttonText={'Add Randomly'}
        buttonLink={''}
      />
      <DataGrid
        autoHeight
        rows={interviewQuestion}
        columns={columns.map(column => ({
          ...column,
          headerAlign: 'center', // Add this line to center the headerName
          align: 'center'
        }))}
        pageSize={interviewQuestion.length} // Set pageSize to the length of interviewQuestion array
        rowsPerPageOptions={[interviewQuestion.length]} // Set rowsPerPageOptions to the length of interviewQuestion array
        checkboxSelection
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
