// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {useAuth} from "../../hooks/useAuth";

const navigation = (): VerticalNavItemsType => {
  const auth = useAuth()
  const userName = auth.user?.userName
  return [
    // {
    //   title: 'Home',
    //   path: '/home',
    //   action: 'read',
    //   subject: 'home-page',
    //   icon: 'mdi:home-outline',
    // },
    // {
    //   title: 'Discuss',
    //   path: '/discuss',
    //   action: 'read',
    //   subject: 'discuss-page',
    //   icon: 'mdi:forum-outline'
    // },
    {
      title: 'Interview',
      path: '/interview',
      action: 'read',
      subject: 'interview-page',
      icon: 'mdi:account-group-outline'
    },
    {
      title: 'Learning',
      path: '/learning',
      action: 'read',
      subject: 'learning-page',
      icon: 'mdi:book-open-outline'
    },
    {
      title: 'Profile',
      path: '/user-profile/'+userName,
      action: 'read',
      subject: 'profile-page',
      icon: 'mdi:account-outline'
    },
    {
      title: 'Resume',
      path: '/resume/list/',
      action: 'read',
      subject: 'resume-page',
      icon: 'mdi:book-open-outline'
    }
  ]
}

export default navigation
