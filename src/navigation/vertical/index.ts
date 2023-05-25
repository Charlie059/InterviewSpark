// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Interview',
      path: '/interview',
      action: 'read',
      subject: 'interview-page',
      icon: 'mdi:account-group-outline'
    },
    {
      title: 'Resume',
      path: '/resume/list/',
      action: 'read',
      subject: 'resume-page',
      icon: 'mdi:book-open-outline'
    },
    {
      title: 'MetaHire',
      path: '/metaHire',
      action: 'read',
      subject: 'metahire-page',
      icon: 'mdi:account-search-outline'
    }
  ]
}

export default navigation
