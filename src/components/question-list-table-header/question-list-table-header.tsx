// ** MUI Imports
import Box from '@mui/material/Box'

import Select from '@mui/material/Select'
import { GridRowId } from '@mui/x-data-grid'

import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const QuestionListHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, selectedRows, handleFilter } = props

  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Select
        size='small'
        displayEmpty
        defaultValue=''
        sx={{ mr: 4, mb: 2, display: 'none' }}
        disabled={selectedRows && selectedRows.length === 0}
        renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
      ></Select>

      <Typography variant='subtitle1' sx={{ mb: 2.5, color: 'black' }}>
        Problems
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search QuestionID'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default QuestionListHeader