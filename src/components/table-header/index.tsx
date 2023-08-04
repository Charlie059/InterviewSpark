import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GridRowId } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import { useAuth } from 'src/hooks/useAuth'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
  onDelete: () => void
  buttonText: string
  buttonLink: string
  disableSearch?: boolean
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter, buttonText, buttonLink, disableSearch } = props

  // ** Hooks
  const auth = useAuth()

  // Define the mixPanel event tracker
  function mixPanelTracker(data: object, action: string, desc: string) {
    auth.trackEvent('User_Interview_Functionality_Used', {
      action: action,
      desc: desc,
      ...data
    })

    // User tracking
    auth.setMixpanelPeople({
      action: action,
      desc: desc,
      ...data
    })
  }

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
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          component={Link}
          variant='contained'
          href={buttonLink}
          onClick={() => {
            mixPanelTracker({}, 'Start_interview_button', 'User Click Start_interview_button in the main page')
          }}
        >
          {buttonText} {/* Use buttonText prop */}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
