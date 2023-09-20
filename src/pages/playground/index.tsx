import { Button } from '@mui/material'
import { useState } from 'react'
import CustomDialog from 'src/components/Base/CustomDialog/CustomDialog'

const Playground = () => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <CustomDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        title='Test'
        content='Test'
      />
    </>
  )
}

Playground.acl = {
  action: 'read',
  subject: 'acl-page'
}
export default Playground
