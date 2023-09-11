// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from '../../hooks/useAuth'
import { useFetchSubscription } from 'src/hooks/useFetchSubscription'
import { PlanType } from 'src/context/types'

const navigation = (): VerticalNavItemsType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth()
  const userName = auth.user?.userName

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userSubscriptionProductsList } = useFetchSubscription(auth.user?.userEmailAddress || null)

  const renderUpgrade = () => {
    if (userSubscriptionProductsList.userSubscriptionProductsArray[0].userSubscription.planType === PlanType.Free) {
      return {
        title: 'Upgrade',
        path: '/upgrade',
        action: 'read',
        subject: 'upgrade-page',
        icon: 'mdi:account-arrow-right-outline'
      }
    } else return null
  }

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
  ].concat(renderUpgrade() || [])
}

export default navigation
