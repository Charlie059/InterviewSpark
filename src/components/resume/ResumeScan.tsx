// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// import { DataStore } from '@aws-amplify/datastore';
// import {User, Resume} from 'src/models';

import DocumentUpload from '../uploaders/DocumentUpload'
import { Storage } from '@aws-amplify/storage'
import Collapse from '@mui/material/Collapse'

import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'


import { API, graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import Auth from '@aws-amplify/auth'

import { createUserResumeScan } from 'src/graphql/mutations'
import { Lambda } from 'aws-sdk'
import ResumeResults from "./ResumeResults";

// Styled component for the heading inside the dropzone area

interface ResumePack {
  jobTitle: string
  jobDescription: string
  resume_url: string
  resume_name: string
  resume_results: string
  resume_file: string
  display_name: string
}

const defaultValues: ResumePack = {
  jobTitle: '',
  jobDescription: '',
  resume_url: '',
  resume_name: '',
  resume_results: '',
  resume_file: '',
  display_name: ''
}

interface ResumeScanProps {
  nocollapse: boolean
  reload?: () => void //optional. for refreshing another component
  type?: string
}

const ResumeScan: React.FC<ResumeScanProps> = ({ nocollapse, reload, type }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth()


  // ** States
  const [files, setFiles] = useState<File[]>([])
  const [collapsed, setCollapsed] = useState<boolean>(nocollapse)
  const [resumeResult, setResumeResult] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState<boolean>(!nocollapse)

  async function putResume(resumePack: ResumePack) {
    console.log('resumePack: ')
    console.log(resumePack.display_name)

    const emailAddress = user?.userEmailAddress || ''
    const displayName = resumePack.display_name
    const resumeName = resumePack.resume_name
    const jobName = resumePack.jobTitle
    const resumeResults = resumePack.resume_results
    const resumeUrl = resumePack.resume_url

    const payload = {
      emailAddress,
      displayName,
      resumeUrl,
      resumeName,
      jobName,
      resumeResults
    }
    console.log('Payload to be stored in DB:', payload)
    const result = await API.graphql(graphqlOperation(createUserResumeScan, payload))

    return result

  }

  async function scanResume(resumePack: ResumePack) {
    const myPayload = JSON.stringify(resumePack)

    const myParams = {
      FunctionName: 'resumeScanAPI-dev',
      Payload: JSON.stringify({ body: myPayload }),
      InvocationType: 'RequestResponse'
    }
    Auth.currentCredentials().then(credentials => {
      console.log(credentials)

      const lambda = new Lambda({
        region: 'us-east-1',
        credentials: Auth.essentialCredentials(credentials)
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const scanPromise = lambda
        .invoke(myParams)
        .promise()
        .then(async response => {
          // @ts-ignore
          const responseData = JSON.parse(JSON.parse(response.Payload).body)

          resumePack.resume_results = responseData
          console.log(responseData)
          console.log(resumePack)
          putResume(resumePack).then(async () => {
            console.log(router)
            if (router.route == '/resume') {
              await router.replace('/resume/list')
            } else {
              if(type == "tutorial"){
                setResumeResult(resumePack.resume_results)
                setCollapsed(false)
                setShowResult(true)

                return
              }
              if (reload) {
                reload()
              }
            }
          })
        })
        .catch(error => {
          throw error
        })
      toast.promise(
        scanPromise,
        {
          loading: 'AI is evaluating your Resume',
          success: 'Evaluation Complete',
          error: 'Error when Evaluating. Please Discard and retry.'
        },
        {
          style: {
            minWidth: '250px'
          },
          position: 'top-center'
        }
      )
    })
  }



  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResumePack>({ defaultValues })

  async function onSubmit(data: ResumePack) {
    const resume = files[0]
    const name = resume.name
    const docType = name.slice(-3)

    const reader = new FileReader()
    let base64: string
    reader.onload = function (fileLoadedEvent) {
      if (fileLoadedEvent.target != null) {
        if (fileLoadedEvent.target.result) {
          if (typeof fileLoadedEvent.target.result === 'string') {
            base64 = fileLoadedEvent.target.result.split(',')[1]
          }
          data.resume_file = base64
        }
      }
    }
    reader.readAsDataURL(resume)

    const timestamp = Date.now()
    const suffix = docType == 'pdf' ? '.pdf' : '.docx'
    const cvName = timestamp + suffix
    try {
      await Storage.put(cvName, resume).catch(e => console.log(e))
      const url = await Storage.get(cvName, { expires: 604800 })
      data.resume_url = url
      data.resume_name = cvName
      data.display_name = name
      await scanResume(data)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }

    setCollapsed(false)
  }

  return (
    <Card>
      {' '}
      {show && (
        <CardHeader
          onClick={() => setCollapsed(!collapsed)}
          title='Upload Your Resume'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            show && (
              <IconButton
                size='small'
                aria-label='collapse'
                sx={{ color: 'text.secondary' }}
                onClick={() => setCollapsed(!collapsed)}
              >
                {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
              </IconButton>
            )
          }
        />
      )}
      <Collapse in={collapsed}>
        <CardContent>
          {/*<Button onClick={putIndustry}>Update Industry</Button>*/}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={4} sm={4}>
                <DocumentUpload type='document' files={files} setFiles={setFiles} />
              </Grid>
              <Grid item xs={8} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl>
                      <Controller
                        name='jobTitle'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Job Title'
                            onChange={onChange}
                            placeholder='SDE'
                            error={Boolean(errors.jobTitle)}
                            aria-describedby='validation-basic-last-name'
                          />
                        )}
                      />
                      {errors.jobTitle && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='jobDescription'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            rows={10}
                            multiline={true}
                            value={value}
                            label='Job Description'
                            onChange={onChange}
                            error={Boolean(errors.jobDescription)}
                          />
                        )}
                      />
                      {errors.jobDescription && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button size='large' type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Collapse>
      {showResult&& <CardContent><ResumeResults resumeResults={resumeResult}/></CardContent>}
    </Card>
  )
}

export default ResumeScan

// export {}
