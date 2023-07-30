import React, { useState, useEffect, useRef } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { getQuestionsPaginated, searchQuestionsPaginated } from 'src/graphql/queries'
import { Box, Card, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import QuestionListHeader from '../question-list-table-header/index'
import { InterviewQuestion } from '../interview-question-selection-result-list'
import Logger from 'src/middleware/loggerMiddleware'

interface Props {
  setSelectedRows: (rows: InterviewQuestion[]) => void
  setShowQuickViewQuestion: (value: boolean) => void
}

const QuestionList = ({ setSelectedRows, setShowQuickViewQuestion }: Props) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [pageSize] = useState<number>(8)
  const [tokens, setTokens] = useState<string[]>([])
  const [searchTokens, setSearchTokens] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [maxPageReached, setMaxPageReached] = useState<number>(0)
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState<number>(0)

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

    const totalWidth = containerWidth - 50
    const columnRatios = containerWidth < 800 ? [1.2, 6, 3, 0, 2] : [2, 6, 3, 2, 2]
    const totalRatios = columnRatios.reduce((acc, ratio) => acc + ratio, 0)
    const columnWidths = columnRatios.map(ratio => Math.floor((totalWidth * ratio) / totalRatios))

    return columnWidths
  }

  const [qIdWidth, qNameWidth, qTypeWidth, difficultyWidth, operationsWidth] = getColumnWidths()

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

  const getDifficultyColors = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return { backgroundColor: '#F1FBE7', color: '#8EDE4E' }
      case 'Medium':
        return { backgroundColor: '#E7F1FB', color: '#4E8EDE' }
      case 'Hard':
        return { backgroundColor: '#FBE7F1', color: '#DE4E8E' }
      default:
        return { backgroundColor: '#F1F1F1', color: '#4E4E4E' }
    }
  }

  const columns = [
    { field: 'QuestionID', headerName: 'ID', width: qIdWidth, hide: true },
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'interviewQuestionTitle',
      headerName: 'Name',
      width: qNameWidth
    },
    {
      field: 'interviewQuestionType',
      headerName: 'Type',
      width: qTypeWidth,
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
    {
      field: 'difficulty',
      headerName: 'Difficulty',
      width: difficultyWidth,
      hide: containerWidth < 800,
      renderCell: (params: GridRenderCellParams) => {
        const colors = getDifficultyColors(params.value)

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
    {
      field: 'operations',
      headerName: 'Detail',
      width: operationsWidth,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            color='primary'
            onClick={() => {
              Logger.info('View button clicked for interview ID:', params.row.interviewID)
              setShowQuickViewQuestion(true)
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

  // Fetch the question data in first load
  useEffect(() => {
    fetchInterviewQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (searchMode && questions.length === 0) {
      searchQuestions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions])

  useEffect(() => {
    if (searchMode) {
      if (page > maxPageReached) {
        // Going forward
        searchQuestions(searchTokens[page - 1])
        setMaxPageReached(page)
      }
    } else {
      if (page > maxPageReached) {
        // Going forward
        fetchInterviewQuestions(tokens[page - 1])
        setMaxPageReached(page)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

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
          else if (page > maxPageReached) setTokens([...tokens, result.data.getQuestionsPaginated.nextToken])
        }

        setTotalRecords(result.data.getQuestionsPaginated.totalRecords)
        setQuestions(prevState => [...prevState, ...questionsWithID])
      }
      setLoading(false)
    } catch (error) {
      Logger.error('Error fetching interviews:', error)
    }
  }

  const handlePageChange = (params: number) => {
    setPage(params)
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
          } else if (page > maxPageReached)
            setSearchTokens([...searchTokens, result.data.searchQuestionsPaginated.nextToken])
        }
        setTotalRecords(result.data.searchQuestionsPaginated.totalRecords)
        setQuestions(prevState => [...prevState, ...questionsWithID])
      }
      setLoading(false)
    } catch (error) {
      Logger.error('Error fetching interviews:', error)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    if (value === '' && !searchMode) {
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

      // searchQuestions()
    }
  }

  return (
    <Card>
      <QuestionListHeader value={value} selectedRows={[]} handleKeyDown={handleKeyDown} handleFilter={handleFilter} />

      <Box ref={containerRef}>
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
      </Box>
    </Card>
  )
}

export default QuestionList
