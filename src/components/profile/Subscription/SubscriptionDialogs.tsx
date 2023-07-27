import UserSuspendDialog from './UserSuspendDialog'
import { UserUpgradeDialog } from './UserUpgradeDialog'
import { DialogSelectParam, UserSubscription } from 'src/context/types'

interface DialogsInterface {
  userSubscription: UserSubscription
  dialogParams: DialogSelectParam
  setDialogParams: (dialogParams: DialogSelectParam) => void
}
export const SubscriptionDialogs = (dialogsInterface: DialogsInterface) => {
  const { userSubscription, dialogParams, setDialogParams } = dialogsInterface

  return (
    <>
      <UserUpgradeDialog dialogParams={dialogParams} setDialogParams={setDialogParams} />
      <UserSuspendDialog
        dialogParams={dialogParams}
        setDialogParams={setDialogParams}
        userSubscription={userSubscription}
      />
    </>
  )
}
