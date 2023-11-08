import { Button } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BasicTextField } from '../Base/BasicTextField/BasicTextField'
import ReCAPTCHA from 'react-google-recaptcha'
import useCaptcha from 'src/hooks/useCaptcha'
import BasicCard from '../Base/BasicCard/BasicCard'
import { useRedeemForm } from 'src/hooks/useForm/useRedeemForm'
import { useRouter } from 'next/router'

const RedeemAssembled = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // ReCAPTCHA Hook
  const { verifyCaptcha } = useCaptcha()

  // use Router
  const router = useRouter()

  // UseRedeem Hook
  const { code, control, errors, handleSubmit, onSubmit, isSubmitted } = useRedeemForm(recaptchaRef, setIsDisabled)

  // Redirect to the registration page after the code is redeemed
  useEffect(() => {
    if (isSubmitted) {
      // Redirect to the registration page with query params
      router.push({
        pathname: '/register',
        query: { redeemCode: code }
      })
    }
  }, [code, isSubmitted, router])

  // Handle the captcha submission
  const handleCaptchaSubmission = useCallback(
    async (token: string | null) => {
      try {
        await verifyCaptcha(token)
        setIsDisabled(false)
      } catch {
        setIsDisabled(true)
      }
    },
    [verifyCaptcha]
  )

  // Get the non-sensitive ReCAPTCHA site key
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!recaptchaSiteKey) {
    return <div>Error: ReCAPTCHA site key is not defined!</div>
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BasicCard
          actions={
            <Button type='submit' disabled={isDisabled}>
              Redeem Code
            </Button>
          }
        >
          <BasicTextField control={control} errors={errors} name={'redeemCode'} label={'Code'} />
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            onExpired={() => setIsDisabled(true)}
          />
        </BasicCard>
      </form>
    </>
  )
}

export default RedeemAssembled
