import { Box, IconButton, Typography, Link, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CloseIcon from '@mui/icons-material/Close'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { styled } from '@mui/material/styles'

import Tab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 14,
    minWidth: 14,
    borderRadius: 5,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  }
}))

const ButtonTypography = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}))

interface ListItem {
  name: string
}

interface Props {
  list: ListItem[]
  imageSrc: string
  onClickItem: (s: string) => void
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('')
const Filter = [...alphabet, '#', 'All']

const AlphabeticSelectList = (props: Props) => {
  const router = useRouter()
  const [tab, setTab] = useState('A')

  const filterTitle = () => {
    if (tab === 'All') {
      return props.list
    } else if (tab === '#') {
      return props.list.filter(item => !alphabet.includes(item.name[0].toLocaleUpperCase()))
    } else {
      return props.list.filter(item => item.name[0].toLocaleUpperCase() === tab)
    }
  }

  return (
    <Box>
      <TabContext value={tab}>
        <TabList
          onChange={(e, index) => {
            setTab(index)
          }}
          aria-label='Alphabet Filter'
          sx={{ mt: 0 }}
        >
          {Filter.map((item, index) => (
            <Tab value={item} key={item} label={item} />
          ))}
        </TabList>
      </TabContext>
      <Card sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
        <CardContent sx={{ height: 400, width: '75%' }}>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              {filterTitle().map((item, index) => (
                <Grid item xs={12} lg={6} xl={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon={'mdi:circle'} fontSize='0.5rem' />
                    <ButtonTypography
                      sx={{ ml: 1 }}
                      key={index}
                      onClick={() => {
                        props.onClickItem(item.name)
                      }}
                    >
                      {item.name}
                    </ButtonTypography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </PerfectScrollbar>
        </CardContent>
        <CardMedia component='img' sx={{ width: '25%' }} image={props.imageSrc} />
      </Card>
    </Box>
  )
}

AlphabeticSelectList.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AlphabeticSelectList
