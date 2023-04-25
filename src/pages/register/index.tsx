import Register from 'src/components/register'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** React Imports
import { ReactNode, useState } from 'react'
import VerifyCode from '../validation'

export default function RegisterPage() {
  const [username, setUsername] = useState('')

  const [registered, setRegistered] = useState(false)

  function handleRegister(username: string) {
    setUsername(username)
    setRegistered(true)
  }

  return <div>{registered ? <VerifyCode username={username} /> : <Register onRegister={handleRegister} />}</div>
}

RegisterPage.guestGuard = true
RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
