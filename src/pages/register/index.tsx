import Register from 'src/components/register'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** React Imports
import { ReactNode, useState } from 'react'
import VerifyCode from '../validation'
import {useRouter} from "next/router";

export default function RegisterPage() {


  const router = useRouter();
  function processProp(prop: string[] | string | undefined): string {
    if (typeof prop === 'string') {
      return prop; // prop is already a string, so return it as is
    } else if(Array.isArray(prop)) {
      return prop.join(','); // prop is an array, join its elements into a string
    }else{
      return '';
    }
  }

  console.log(router.query?.email)

  const [username, setUsername] = useState(processProp(router.query?.email)||'')

  const [registered, setRegistered] = useState(Boolean(router.query?.registered)||false)

  function handleRegister(username: string) {
    setUsername(username)
    setRegistered(true)
  }

  return <div>{registered ? <VerifyCode username={username} /> : <Register onRegister={handleRegister} />}</div>
}

RegisterPage.guestGuard = true
RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
