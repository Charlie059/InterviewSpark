import { useState } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

// ** React Imports
import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'

function PasswordResetValidation() {
  const router = useRouter()
  const { email } = router.query
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleVerifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      console.log('resetting password for', email, code)
      await Auth.forgotPasswordSubmit(email as string, code, password)

      // if successful, redirect to login page
      router.push('/login')
    } catch (error) {
      setErrorMessage(error as string)
    }
  }

  return (
    <div>
      <h2>Verify Your Identity</h2>
      <form onSubmit={handleVerifyCode}>
        <label>
          Verification Code:
          <input type='text' value={code} onChange={e => setCode(e.target.value)} />
        </label>
        <label>
          New Password:
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button type='submit'>Verify Identity</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

PasswordResetValidation.guestGuard = true
PasswordResetValidation.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default PasswordResetValidation
