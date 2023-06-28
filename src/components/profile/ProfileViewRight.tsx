// ** React Imports
// noinspection TypeScriptValidateTypes

import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Demo Component Imports
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import CardActions from '@mui/material/CardActions'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import DocumentUpload from '../uploaders/DocumentUpload'
import DialogActions from '@mui/material/DialogActions'

// import ResumeDisplay from "../../../displays/ResumeDisplay";
// import VideoUpload from "../../../uploaders/VideoUpload";
// import VideoDisplay from "../../../displays/VideoDisplay";
// import VideoRecorder from "react-video-recorder";
import ResumeList from '../resume/ResumeList'
import { Storage } from '@aws-amplify/storage'
import { API, graphqlOperation } from 'aws-amplify'
import { updateUserProfile } from 'src/graphql/mutations'
import FileDisplay from "../file-display/FileDisplay";

// import VideoList from "../../../interview/VideoList";

// @ts-ignore
const ProfileViewRight = profileData => {
  const [openResume, setOpenResume] = useState<boolean>(false)
  const [showResume, setShowResume] = useState<boolean>(false)

  // const [openVideo, setOpenVideo] = useState(false)
  // const [showVideo, setShowVideo] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [url, setUrl] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(Date.now())

  // const [videoFiles,setVideoFiles] = useState([])
  // const [videoUrl,setVideoUrl] = useState([])

  const handleResumeClickOpen = () => setOpenResume(true)
  const handleResumeClose = () => {
    setOpenResume(false)
  }

  // const handleResumeShowOpen = () => {setShowResume(true)}
  const handleResumeShowClose = () => {
    setShowResume(false)
  }
  const handleRefresh = () => {
    setRefresh(Date.now())
  }

  // const handleVideoClickOpen = () => setOpenVideo(true)
  // const handleVideoClose = () => {setOpenVideo(false)}
  // const handleVideoShowOpen = () => {setShowVideo(true)}
  // const handleVideoShowClose = () => {setShowVideo(false)}

  useEffect(() => {
    const getUrl = async () => {
      await Storage.get(profileData.profileData.resumeKey, { level:"public", expires: 604800 }).then(url => {
        setUrl(url)
        setShowResume(true)
      })
    }
    if (profileData.profileData.resumeKey) {
      getUrl()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const resumeOnSubmit = async () => {
    if (files.length == 0) {
      toast.error('No File Selected')
      handleResumeClickOpen()
    } else {
      toast.success('Resume Submitted')
      const resume = files[0]
      const name = resume.name
      const docType = name.slice(-3)
      console.log(files[0])
      const timestamp = Date.now()
      const suffix = docType == 'pdf' ? '.pdf' : '.docx'
      const cvName = timestamp + suffix
      try {
        await Storage.put(cvName, resume,{level:"public"}).catch(e => console.log(e))
        setUrl(await Storage.get(cvName, { level:"public",expires: 604800 }))

        profileData.profileData.resumeKey = cvName
        profileData.profileData.emailAddress = profileData.profileData.userEmailAddress
        console.log(profileData.profileData)
        await API.graphql(graphqlOperation(updateUserProfile, profileData.profileData))
        setShowResume(true)
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    }
  }

  // const videoOnSubmit = data => {
  //   if(files.length==0){
  //     console.log(data)
  //     toast.error('No File Selected')
  //     handleVideoClickOpen()
  //   }else {
  //     toast.success('Intro Submitted')
  //     data.video = files[0]
  //     console.log(data)
  //     setShowVideo(true)
  //   }
  // }

  const { handleSubmit: handleResumeSubmit } = useForm()

  // const {
  //   handleSubmit:handleVideoSubmit
  // } = useForm()

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {!showResume&&<Button variant='outlined' sx={{ mr: 2 }} onClick={handleResumeClickOpen}>
                Personal Resume Upload
              </Button>}
            </CardActions>
            {showResume && (
              <CardContent sx={{ width: 1, justifyContent: 'center' }} key = {refresh}>
                <FileDisplay url={url} height = {500}/>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant='outlined' color='error' sx={{ mr: 2 }} onClick={handleResumeShowClose}>
                    Remove
                  </Button>
                  <Button variant='outlined' color='error' sx={{ mr: 2 }} onClick={handleRefresh}>
                    Refresh
                  </Button>
                </CardActions>
              </CardContent>
            )}
          </Card>
          <Dialog
            open={openResume}
            onClose={handleResumeClose}
            aria-labelledby='user-view-edit'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-edit-description'
          >
            <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
              Upload Your Resume
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleResumeSubmit(resumeOnSubmit)}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <DocumentUpload type="document" files={files} setFiles={setFiles} />
                  </Grid>
                  <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                    <DialogActions sx={{ justifyContent: 'center' }}>
                      <Button variant='contained' type='submit' sx={{ mr: 1 }} onClick={handleResumeClose}>
                        Submit
                      </Button>
                      <Button variant='outlined' color='secondary' onClick={handleResumeClose}>
                        Discard
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>
        </Grid>
        {/*<Grid item xs={6}>*/}
        {/*  <Card>*/}
        {/*    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>*/}
        {/*      <Button variant='outlined' sx={{ mr: 2 }} onClick={handleVideoClickOpen}>*/}
        {/*        Video Intro Upload*/}
        {/*      </Button>*/}

        {/*      <Dialog*/}
        {/*        open={openVideo}*/}
        {/*        onClose={handleVideoClose}*/}
        {/*        aria-labelledby='user-view-edit'*/}
        {/*        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}*/}
        {/*        aria-describedby='user-view-edit-description'*/}
        {/*      >*/}
        {/*        <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>*/}
        {/*          Upload Your Self Introduction*/}
        {/*        </DialogTitle>*/}
        {/*        <DialogContent>*/}
        {/*          <form onSubmit={handleVideoSubmit(videoOnSubmit)}>*/}
        {/*            <Grid container spacing={6}>*/}
        {/*              <Grid item xs={12}>*/}
        {/*                <div>*/}
        {/*                  <VideoRecorder onRecordingComplete={(file) => {*/}
        {/*                    // Do something with the video...*/}
        {/*                    console.log('videoBlob', file)*/}
        {/*                    files[0]=file*/}
        {/*                    setVideoUrl([file].map(file => URL.createObjectURL(file)))*/}
        {/*                    console.log(url)*/}
        {/*                  }}/>*/}
        {/*                </div>*/}
        {/*                <VideoUpload files={videoFiles} setFiles={setVideoFiles} url={videoUrl} setUrl={setVideoUrl}/>*/}
        {/*              </Grid>*/}
        {/*              <Grid item xs={12} sx={{ justifyContent: 'center' }}>*/}
        {/*                <DialogActions sx={{ justifyContent: 'center' }}>*/}
        {/*                  <Button  variant='contained' type='submit' sx={{ mr: 1 }} onClick={handleVideoClose}>*/}
        {/*                    Submit*/}
        {/*                  </Button>*/}
        {/*                  <Button variant='outlined' color='secondary' onClick={handleVideoClose}>*/}
        {/*                    Discard*/}
        {/*                  </Button>*/}
        {/*                </DialogActions>*/}
        {/*              </Grid>*/}
        {/*            </Grid>*/}
        {/*          </form>*/}

        {/*        </DialogContent>*/}

        {/*      </Dialog>*/}
        {/*    </CardActions>*/}
        {/*    {showVideo &&*/}
        {/*      <CardContent sx={{ width: 1 , justifyContent: 'center'}}>*/}
        {/*        <VideoDisplay url={videoUrl}/>*/}
        {/*        <CardActions sx={{justifyContent: 'center'}}>*/}
        {/*          <Button variant='outlined' color='error'  sx={{ mr: 2 }} onClick={handleVideoShowClose}>*/}
        {/*            Remove*/}
        {/*          </Button>*/}
        {/*        </CardActions>*/}
        {/*      </CardContent>*/}
        {/*    }*/}
        {/*  </Card>*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <Card>
            <ResumeList />
          </Card>
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Card >*/}
        {/*    <VideoList/>*/}
        {/*  </Card>*/}
        {/*</Grid>*/}
      </Grid>
    </Fragment>
  )
}

export default ProfileViewRight
