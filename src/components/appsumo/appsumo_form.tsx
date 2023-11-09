/***********************************************************************************************
 * This is Form for /appsumo page
 *
 * This component is a card. It contains six part: Fancy Title, Shopping Option, Form Title,
 * Form, Recaptcha, and Submit Button. The Fancy Title defined a fancy Typography use css style.
 * The Shopping Option provides a list of option, even though only one item was seleted
 * at the moment, it is open for future modification, please refer to "selectedValue" states.
 * The Form Title provides title of the Form. The Recaptcha and Submit Button are coupled,
 * if the Recaptcha does not pass, the Submit Button will be disabled. The Recaptcha was
 * provided by useCaptcha hook. Please also refer to "useRedeemForm" hook for more info
 * of this form and submitting process.
 *
 *
 * Author: Yuxuan Yang
 * Contact: yyx980325@hotmail.com
 * Create Date: 11/08/2023
 * Update Date: 11/08/2023
 * Copyright: © 2023 HireBeat Inc. All rights reserved.
 ************************************************************************************************/

import React, {useCallback, useEffect, useRef, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Controller} from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import useCaptcha from "../../hooks/useCaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import {useRouter} from "next/router";
import {useRedeemForm} from "../../hooks/useForm/useRedeemForm";
import CardActions from "@mui/material/CardActions";

const AppsumoForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [selectedValue, setSelectedValue] = useState<string>('lifetime-license');
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // ReCAPTCHA Hook
  const {verifyCaptcha} = useCaptcha()

  const {
    code,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitted
  } = useRedeemForm(recaptchaRef, setIsDisabled)


  // use Router
  const router = useRouter()


  useEffect(() => {
    if (isSubmitted) {
      // Redirect to the registration page with query params
      router.push({
        pathname: '/register',
        query: {redeemCode: code}
      })
    }
  }, [code, isSubmitted, router])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };


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
    <Card>
      {/**********************Fancy Title**********************/}
      <CardContent>
        <Typography variant='h5'
                    sx={{
                      mb: 2.5,
                      fontWeight: 'bold', // Increase font-weight for emphasis
                      color: '#74afa9', // A professional color, preferably matching your brand
                      // textTransform: 'uppercase', // A stylistic choice for headers
                      textAlign: 'center', // Center align the text
                      letterSpacing: '0.1rem', // Increase letter spacing for a touch of elegance
                      // You can add a gradient text effect if your project allows fancy styles
                      background: 'linear-gradient(45deg, #74AFA9 30%, #FF8E53 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block', // Required for the gradient to work
                      width: '100%', // Ensuring the text is full width if needed
                    }}>
          Welcome to LifeTime</Typography>
      </CardContent>

      {/**********************Shopping Option**********************/}
      <CardContent>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="shopping-cart-options"
            name="shopping-cart-options"
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="lifetime-license"
              control={<Radio/>}
              label="InterviewSpark Personal Life-time License x1"
              sx={{mb: 1}}
            />
            {/* Add more items here */}
            {/* Example of another item: */}
            {/* <FormControlLabel
              value="annual-license"
              control={<Radio />}
              label="InterviewSpark Personal Annual License x1"
              sx={{ mb: 1 }}
            /> */}
          </RadioGroup>
        </FormControl>
      </CardContent>

      {/**********************Form Title**********************/}
      <CardContent>
        <Typography variant='body1' sx={{mb: 2.5}}>
          Please enter your code:
        </Typography>
      </CardContent>

      {/**********************Form**********************/}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
        <CardContent sx={{marginTop: '-20px'}}>
          <FormControl fullWidth margin="normal" required error={!!errors['redeemCode']}>
            <Controller
              name="redeemCode"
              control={control} // control prop passed from useForm
              defaultValue=""
              render={({field}) => (
                <TextField
                  {...field}
                  id="code"
                  label="Code"
                  autoComplete="off"
                  autoFocus
                  helperText={errors.redeemCode?.message}
                  error={!!errors.redeemCode}
                />
              )}
            />
          </FormControl>
          {/**********************ReCaptcha**********************/}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            onExpired={() => setIsDisabled(true)}
          />
        </CardContent>

        {/**********************Submit Button**********************/}
        <CardActions>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
            <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>
              Submit
            </Button>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default AppsumoForm;
