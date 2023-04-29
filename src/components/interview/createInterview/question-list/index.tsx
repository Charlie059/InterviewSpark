import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { getQuestionsPaginated, searchQuestionsPaginated } from 'src/graphql/queries'
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
  const [pageSize] = useState<number>(5)
  const [tokens, setTokens] = useState<string[]>([])
  const [searchTokens, setSearchTokens] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [maxPageReached, setMaxPageReached] = useState<number>(0)
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

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
              Log.info('View button clicked for interview ID:', params.row.id)
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
    setLoading(true)
    try {
      const result = await API.graphql(
        graphqlOperation(getQuestionsPaginated, {
          limit: pageSize,
          nextToken
        })
      )

      if ('data' in result) {
        const questionList = result.data.getQuestionsPaginated.questionList
        const questionsWithID = questionList.map((question: InterviewQuestion) => {
          return { ...question, id: question.QuestionID }
        })

        // Add the next token to the list of tokens
        if (result.data.getQuestionsPaginated.nextToken) {
          if (tokens.length === 0) setTokens([...tokens, result.data.getQuestionsPaginated.nextToken])
          else if (currentPage > maxPageReached) setTokens([...tokens, result.data.getQuestionsPaginated.nextToken])
        }

        setTotalRecords(result.data.getQuestionsPaginated.totalRecords)
        setQuestions(prevState => [...prevState, ...questionsWithID])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }

  const handlePageChange = (params: number) => {
    setPage(params)
    currentPage = params

    if (searchMode) {
      if (currentPage > maxPageReached) {
        // Going forward
        searchQuestions(searchTokens[currentPage - 1])
        setMaxPageReached(currentPage)
      }
    } else {
      if (currentPage > maxPageReached) {
        // Going forward
        fetchInterviewQuestions(tokens[currentPage - 1])
        setMaxPageReached(currentPage)
      }
    }
  }

  const searchQuestions = async (nextToken: string | null = null) => {
    setLoading(true)
    try {
      const result = await API.graphql(
        graphqlOperation(searchQuestionsPaginated, {
          keyword: value,
          limit: pageSize,
          nextToken
        })
      )

      if ('data' in result) {
        const questionList = result.data.searchQuestionsPaginated.questionList
        const questionsWithID = questionList.map((question: InterviewQuestion) => {
          return { ...question, id: question.QuestionID }
        })

        // Add the next token to the list of tokens
        if (result.data.searchQuestionsPaginated.nextToken) {
          if (searchTokens.length === 0) {
            setSearchTokens([...searchTokens, result.data.searchQuestionsPaginated.nextToken])
          } else if (currentPage > maxPageReached)
            setSearchTokens([...searchTokens, result.data.searchQuestionsPaginated.nextToken])
        }
        setTotalRecords(result.data.searchQuestionsPaginated.totalRecords)
        setQuestions(prevState => [...prevState, ...questionsWithID])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    setQuestions([])
    setMaxPageReached(0)
    setPage(0)

    if (value === '') {
      setSearchMode(false)
      setTokens([])
      setSearchTokens([])
      fetchInterviewQuestions()
    } else {
      setSearchMode(true)
      setTokens([])
      setSearchTokens([])
      searchQuestions()
    }
  }

  return (
    <div>
      <QuestionListHeader value={value} selectedRows={[]} handleKeyDown={handleKeyDown} handleFilter={handleFilter} />

      <DataGrid
        loading={loading}
        page={page}
        autoHeight
        pagination
        rows={questions}
        rowCount={totalRecords}
        columns={columns.map(column => ({
          ...column,
          headerAlign: 'center', // Add this line to center the headerName
          align: 'center'
        }))}
        checkboxSelection
        pageSize={pageSize}
        rowsPerPageOptions={[5]}
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
