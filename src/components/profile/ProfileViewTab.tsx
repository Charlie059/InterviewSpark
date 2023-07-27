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
import UserSecurity from './Security/UserSecurity'
import UserSubscription from './Subscription/UserSubscription'

import { Tab, TabType, UserProfileViewTypes } from 'src/context/types'

// ** Styled Tab component
const StyledTab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

interface ProfileViewTab {
  user: any
  data: any
  type?: UserProfileViewTypes
  tab: Tab
}

const ProfileViewTab = (ProfileViewTab: ProfileViewTab) => {
  // ** Destructure the props
  const { user, data, tab } = ProfileViewTab

  // ** State
  const [activeTab, setActiveTab] = useState<Tab>(tab)
  const [defaultTab] = useState(true)

  const handleChange = (_event: SyntheticEvent, value: Tab) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(Tab.overview)
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
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <StyledTab value={TabType.overview} label='Overview' icon={<Icon icon='mdi:account-outline' />} />
        <StyledTab value={TabType.account_setting} label='Account Setting' icon={<Icon icon='mdi:lock-outline' />} />
        <StyledTab value={TabType.subscription} label='Subscription' icon={<Icon icon='mdi:bookmark-outline' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        <>
          <TabPanel sx={{ p: 0 }} value={TabType.overview}>
            <UserOverview user={user} data={data} type={UserProfileViewTypes.profile} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={TabType.account_setting}>
            <UserSecurity />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={TabType.subscription}>
            <UserSubscription />
          </TabPanel>
        </>
      </Box>
    </TabContext>
  )
}

export default ProfileViewTab
