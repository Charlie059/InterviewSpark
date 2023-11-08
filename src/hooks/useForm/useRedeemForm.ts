import { yupResolver } from '@hookform/resolvers/yup'
import { API, graphqlOperation } from 'aws-amplify'
import { RefObject, SetStateAction, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { verifyRedeemCode } from 'src/graphql/queries'
import * as Yup from 'yup'

// Define form data type
interface FormData {
  redeemCode: string
}

export const useRedeemForm = (
  recaptchaRef: RefObject<ReCAPTCHA>,
  setIsDisabled: { (value: SetStateAction<boolean>): void; (arg: boolean): void }
) => {
  // States
  const [code, setCode] = useState('')

  // Constants
  const REDEEM_FROM_SCHEMA = Yup.object().shape({
    redeemCode: Yup.string().required('Code is required')
  })

  // States
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(REDEEM_FROM_SCHEMA)
  })

  // GraphQL query to verify code
  const verify = async (code: string) => {
    try {
      const res = (await API.graphql(
        graphqlOperation(verifyRedeemCode, {
          redeemCode: code
        })
      )) as any

      return res?.data.verifyRedeemCode.isSuccessful
    } catch (e) {
      console.log(e)

      return false
    }
  }

  // Submit handler
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.preventDefault()
    const res = await verify(data.redeemCode)

    // If code is not valid set error
    if (!res) {
      // reset recaptcha
      recaptchaRef.current?.reset()

      // disable submit button
      setIsDisabled(true)

      toast.error('Error verifying code, please try again', { position: 'top-center' })

      return
    }

    setIsSubmitted(true)
    setCode(data.redeemCode)
  }

  return { code, control, errors, handleSubmit, isSubmitted, onSubmit }
}
