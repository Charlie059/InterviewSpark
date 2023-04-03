// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { GridRowId } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  onDelete: () => void
  buttonText: string
  buttonLink: string
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, selectedRows, handleFilter, onDelete, buttonText, buttonLink } = props

  return (
    <Box
      sx={{
        p: 5,
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
        sx={{ mr: 4, mb: 2 }}
        disabled={selectedRows && selectedRows.length === 0}
        renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
        onChange={event => {
          if (event.target.value === 'Delete') {
            onDelete()
          }
        }}
      >
        <MenuItem disabled>Actions</MenuItem>
        <MenuItem disabled value='Delete'>
          Delete
        </MenuItem>
      </Select>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search QuestionID'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} component={Link} variant='contained' href={buttonLink}>
          {buttonText} {/* Use buttonText prop */}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
