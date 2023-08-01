// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from '../../hooks/useAuth'

const navigation = (): VerticalNavItemsType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth()
  const userName = auth.user?.userName

  return [
    {
      title: 'Interview',
      path: '/interview',
      action: 'read',
      subject: 'interview-page',
      icon: 'mdi:account-group-outline'
    },
    {
      title: 'Profile',
      path: '/user-profile/' + userName,
      action: 'read',
      subject: 'profile-page',
      icon: 'mdi:account-outline'
    }
  ]
}

export default navigation
