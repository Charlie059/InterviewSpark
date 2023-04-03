import React, { useState, useEffect } from 'react'
import { DataGrid, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

import { Card, IconButton } from '@mui/material'

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
  interviewQuestions: InterviewQuestion[]
}

const InterviewQuestionList = (props: Props) => {
  const { interviewQuestions } = props

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
    console.log('interviewQuestions:', interviewQuestions)
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
