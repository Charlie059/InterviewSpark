import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import RedeemAssembled from 'src/components/AssembledUI/RedeemAssembled'

const RedeemPage = () => {
  return <RedeemAssembled></RedeemAssembled>
}

RedeemPage.guestGuard = true
RedeemPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default RedeemPage
