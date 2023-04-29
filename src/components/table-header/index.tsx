import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onDelete: () => void
  buttonText: string
  buttonLink: string
  disableSearch?: boolean
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter, handleKeyDown, buttonText, buttonLink, disableSearch } = props

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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {!disableSearch && (
          <TextField
            size='small'
            value={value}
            placeholder='Search Keyword'
            sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
            onChange={e => handleFilter(e.target.value)}
            onKeyDown={e => handleKeyDown(e)}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          sx={{
            mb: 2,
            textTransform: 'none',
            backgroundColor: '#3888FF',
            color: 'white',
            borderRadius: 5,
            fontSize: '12px'
          }}
          component={Link}
          variant='contained'
          href={buttonLink}
        >
          {buttonText} {/* Use buttonText prop */}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
