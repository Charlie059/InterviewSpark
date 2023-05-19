import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports

import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import { Storage } from '@aws-amplify/storage'

// import { DataStore } from '@aws-amplify/datastore';
// import {User, Resume, Video} from 'src/models';
// import Refresh from 'mdi-material-ui/Refresh';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import LinearProgress from '@mui/material/LinearProgress'
import TableContainer from '@mui/material/TableContainer'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import ResumeResults from './ResumeResults'
import Divider from '@mui/material/Divider'

import Refresh from 'mdi-material-ui/Refresh'

import { useAuth } from '../../hooks/useAuth'
import IconButton from '@mui/material/IconButton'
import { API, graphqlOperation } from 'aws-amplify'
import { getUserResumeScans } from '../../graphql/queries'
import { removeUserResumeScanByID, updateUserResumeScanURL } from '../../graphql/mutations'
import router from 'next/router'
import FileDisplay from "../file-display/FileDisplay";
import DialogActions from "@mui/material/DialogActions";
import Close from 'mdi-material-ui/Close'

interface Resume {
  jobName: string
  resumeUrl: string
  resumeName: string
  resumeResults: string
  displayName: string
  resumeScanID: string
}

const ResumeList = () => {
  // ** States

  // ** Hooks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resumes, setResumes] = useState<Array<Resume>>([])
  const [openResume, setOpenResume] = useState<boolean>(false)
  const [resumeResult, setResumeResult] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshResume, setRefreshResume] = useState<boolean>(false)
  const [resumeUrl, setResumeUrl] = useState<string>('')
  const [viewResume, setViewResume] = useState<boolean>(false)

  // const handleResumeClickOpen = () => setOpenResume(true);
  const handleResumeClose = () => setOpenResume(false)
  const handleViewClose = () => setViewResume(false)
  const auth = useAuth()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function updateResumeUrl(id: string, newUrl: string) {
    //#Done
    //Update resumeurl mutation
    //not used. URL now updates when download is hit

    try {
      const result = await API.graphql(
        graphqlOperation(updateUserResumeScanURL, {
          emailAddress: auth.user?.userEmailAddress, // replace with the user's email address
          resumeID: id,
          resumeUrl: newUrl
        })
      )
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  async function getResume() {
    //#Done
    //new GetResume Mutation
    const emailAddress = auth.user?.userEmailAddress

    const result = await API.graphql(
      graphqlOperation(getUserResumeScans, {
        emailAddress
      })
    )

    console.log('Result:', result)
    if ('data' in result) {
      const resumeList = result.data.getUserResumeScans.resumeScanList
      console.log('ResumeList: ', resumeList)
      if (resumeList.length === 0) {
        // @ts-ignore
        const emptyR: Resume = {
          displayName: 'No Resume Please Upload'
        }
        setResumes([emptyR])
        console.log('currentPage is', router.query.user)
        if (!router.query.user) {
          router.replace('/resume')
        }
      } else {
        // for (const r of resumeList) {
        //   console.log(r.resumeName);
        //   const newUrl = await Storage.get(r.resumeName);
        //   console.log("new url:", newUrl);
        //
        //   await updateResumeUrl(r.resumeScanID, newUrl);
        // }
        setResumes(resumeList)
      }
    }
  }

  const refreshUrl = async ({ resumeName }: { resumeName: string }) => {
    window.open(await Storage.get(resumeName, { expires: 604800 }))
  }
  const refreshViewUrl = async ({ resumeName }: { resumeName: string }) => {
    setResumeUrl(await Storage.get(resumeName, { expires: 604800 }))
    setViewResume(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteResume = async (toDelete: React.MouseEvent<HTMLButtonElement>) => {
    //Delete Resume
    try {
      const resumeIdToDelete = toDelete.currentTarget.value
      const result = await API.graphql(
        graphqlOperation(removeUserResumeScanByID, {
          emailAddress: auth.user?.userEmailAddress, // replace with the user's email address
          resumeScanID: resumeIdToDelete
        })
      )
      console.log(result)

      // Check if the deletion was successful and update the list of resumes accordingly
      if ('data' in result && result.data.removeUserResumeScanByID.isSuccessful) {
        await getResume()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // @ts-ignore
  // @ts-ignore
  return (
    <Card>
      {refreshResume ? (
        <>
          <p>yes!</p>
          {async () => await getResume()}
        </>
      ) : (
        <></>
      )}
      <CardHeader
        title='Resume Analysis'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <IconButton size='small' aria-label='collapse' sx={{ color: 'text.secondary' }} onClick={() => getResume()}>
            <Refresh fontSize='small' />
          </IconButton>
        }
      />
      <Divider sx={{ m: 0 }} />
      <CardContent>
        <TableContainer>
          <Table size='small' sx={{ minWidth: 500 }}>
            <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
              <TableRow>
                <TableCell sx={{ height: '3.375rem' }}>File Name</TableCell>
                <TableCell sx={{ height: '3.375rem' }}>Resume File</TableCell>
                <TableCell sx={{ height: '3.375rem' }}>Match Score</TableCell>
                <TableCell sx={{ height: '3.375rem' }}>View</TableCell>
                <TableCell sx={{ height: '3.375rem' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumes.map((item, index) => (
                <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                          {item.displayName}
                        </Typography>
                        {item.jobName && (
                          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                            For {item.jobName}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.resumeUrl && (
                      <><Button
                        onClick={async () => {
                          await refreshViewUrl({resumeName: item.resumeName})
                        }}
                        target='_blank'
                        variant='outlined'
                        sx={{mr: 2}}
                        href=''
                      >
                        View Resume File
                      </Button>
                        <Dialog
                        open={viewResume}
                        onClose={handleViewClose}
                        scroll='body'
                        aria-labelledby='user-view-edit'
                        sx={{
                          '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: 1000,
                            p: [2, 10]
                          }
                        }}
                        aria-describedby='user-view-edit-description'
                      >
                          <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleViewClose}>
                            <Close/>
                          </IconButton>
                        <DialogContent>
                          <FileDisplay url={resumeUrl} height = {700}/>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center' }}>
                          <Button
                          target='_blank'
                          variant='contained'
                          sx={{mr: 2}}
                          onClick={async () => {
                            await refreshUrl({resumeName: item.resumeName})
                          }}
                          href=''
                        >
                          <Typography sx={{color: 'white'}}>Download</Typography>
                        </Button>
                        </DialogActions>
                      </Dialog></>
                    )}
                  </TableCell>
                  {item.resumeResults && (
                    <TableCell sx={{ color: 'text' }}>
                      {(JSON.parse(item.resumeResults)['Final Report']['Final_score'].toFixed(2) * 2).toString()}
                      <LinearProgress
                        variant='determinate'
                        value={JSON.parse(item.resumeResults)['Final Report']['Final_score'].toFixed(2) * 2}
                        sx={{ height: 6, mt: 1, borderRadius: '5px' }}
                      />
                    </TableCell>
                  )}
                  {item.resumeResults && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          setOpenResume(true)
                          setResumeResult(item.resumeResults)
                        }}
                        target='_blank'
                        variant='outlined'
                        sx={{ mr: 2 }}
                        href=''
                      >
                        View Scan Result
                      </Button>

                    </TableCell>
                  )}
                  {item.resumeName && (
                    <TableCell>
                      <Button value={item.resumeScanID} onClick={deleteResume} variant='outlined' color='error'>
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog
        open={openResume}
        onClose={handleResumeClose}
        scroll='body'
        aria-labelledby='user-view-edit'
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: 1000,
            p: [2, 10]
          }
        }}
        aria-describedby='user-view-edit-description'
      >
        <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleResumeClose}>
          <Close/>
        </IconButton>
        <DialogContent>
          <><ResumeResults resumeResults={resumeResult} /></>
        </DialogContent>
      </Dialog>
    </Card>

  )
}

export default ResumeList

// export {}
