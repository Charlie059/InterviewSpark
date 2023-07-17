// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icon Imports
import Icon from '../../@core/components/icon'

// ** Demo Components Imports
import UserOverview from './UserOverview'
import UserSecurity from './UserSecurity'
import UserSubscription from './UserSubscription'

import { Subscription } from 'src/context/types'

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

// Define the tab type
type Tab = 'overview' | 'account-setting' | 'billing-plan'

const ProfileViewTab = ({
  user,
  data,
  tab,
  subscriptionData
}: {
  user: any
  data: any
  tab: Tab
  subscriptionData: Subscription
}) => {
  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [defaultTab] = useState(true)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (defaultTab) {
      setActiveTab('overview')
    }
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='overview' label='Overview' icon={<Icon icon='mdi:account-outline' />} />
        <Tab value='account-setting' label='Account Setting' icon={<Icon icon='mdi:lock-outline' />} />
        <Tab value='billing-plan' label='Billing & Plan' icon={<Icon icon='mdi:bookmark-outline' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <>
          <TabPanel sx={{ p: 0 }} value='overview'>
            <UserOverview user={user} data={data} type={'profile'} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='account-setting'>
            <UserSecurity />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='billing-plan'>
            <UserSubscription subscriptionData={subscriptionData}></UserSubscription>
          </TabPanel>
        </>
      </Box>
    </TabContext>
  )
}

export default ProfileViewTab
