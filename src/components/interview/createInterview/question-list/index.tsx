import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { getQuestionsPaginated } from 'src/graphql/queries'
import { IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import QuestionListHeader from '../question-list-table-header/index'
import { InterviewQuestion } from '../interview-question-selection-result-list'
import Log from 'src/middleware/loggerMiddleware'

interface QuestionListProps {
  setSelectedRows: (rows: InterviewQuestion[]) => void
}

let currentPage = 0
const QuestionList = ({ setSelectedRows }: QuestionListProps) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(5)
  const [tokens, setTokens] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<string>('')
  const [totalRecords, setTotalRecords] = useState<number>(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxPageReached, setMaxPageReached] = useState<number>(0)

  const columns = [
    { field: 'QuestionID', headerName: 'ID', width: 75 },
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'interviewQuestion', headerName: 'Name', width: 100 },
    { field: 'interviewQuestionType', headerName: 'Type', width: 100 },
    {
      field: 'operations',
      headerName: 'Operations',
      width: 100,
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
        </>
      )
    }
  ]

  const handleFilter = (val: string) => {
    setValue(val)
  }

  useEffect(() => {
    fetchInterviewQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchInterviewQuestions = async (nextToken: string | null = null) => {
    try {
      const result = await API.graphql(
        graphqlOperation(getQuestionsPaginated, {
          limit: pageSize,
          nextToken
        })
      )

      console.log('Result:', result)

      if ('data' in result) {
        const questionList = result.data.getQuestionsPaginated.questionList
        const questionsWithID = questionList.map((question: InterviewQuestion, questionID: number) => {
          return { ...question, id: questionID }
        })

        setQuestions([...questions, ...questionsWithID])

        // Add the next token to the list of tokens
        if (result.data.getQuestionsPaginated.nextToken) {
          if (tokens.length === 0) setTokens([...tokens, result.data.getQuestionsPaginated.nextToken])
          else if (currentPage > maxPageReached) setTokens([...tokens, result.data.getQuestionsPaginated.nextToken])
        }

        setTotalRecords(result.data.getQuestionsPaginated.totalRecords)
      }
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handlePageChange = (params: number) => {
    currentPage = params
    if (currentPage > maxPageReached) {
      // Going forward
      fetchInterviewQuestions(tokens[currentPage - 1])
      setMaxPageReached(currentPage)
    } else {
      // Going backward
      fetchInterviewQuestions(tokens[currentPage - 1])
    }
  }

  return (
    <div>
      <QuestionListHeader value={''} selectedRows={[]} handleFilter={handleFilter} />
      <DataGrid
        autoHeight
        pagination
        rows={questions}
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
        onSelectionModelChange={newSelection => {
          const selectedRowsData = newSelection
            .map(rowId => questions.find(question => question.id.toString() === rowId.toString()))
            .filter(row => row !== undefined) as InterviewQuestion[]
          setSelectedRows(selectedRowsData)
        }}
      />
    </div>
  )
}

export default QuestionList
