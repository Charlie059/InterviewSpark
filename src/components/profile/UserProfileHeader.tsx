// ** MUI Components
// noinspection TypeScriptValidateTypes

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { format } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Close from 'mdi-material-ui/Close'
import Pencil from 'mdi-material-ui/Pencil'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'

//** Component Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DocumentUpload from '../uploaders/DocumentUpload'
import { Storage } from '@aws-amplify/storage'
import { API, graphqlOperation } from 'aws-amplify'
import { updateUserProfile } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import * as React from 'react'

import { useAuth } from 'src/hooks/useAuth'
import Logger from 'src/middleware/loggerMiddleware'

const ProfilePicture = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

type diagTypes = 'profile' | 'cover'

const UserProfileHeader = ({ data, type }: { data: any; type?: string }) => {
  // ** State
  const joiningDate = format(new Date(data.joiningDate), 'PP')

  const [showCover, setShowCover] = useState<boolean>(false)
  const designationIcon = 'mdi:briefcase-outline'
  const [openProfilePicture, setOpenProfilePicture] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<diagTypes>('profile')
  const [files, setFiles] = useState<File[]>([])
  const [proPicUrl, setProPicUrl] = useState<string>('')
  const [coverPicUrl, setCoverPicUrl] = useState<string>('')
  const [editable, setEditable] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, setRefresh] = useState(Date.now())
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [share, setShare] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    if (type == 'Dashboard' || type == 'Profile') {
      setEditable(true)
      setShowCover(true)
    } else if (type == 'Public') {
      setEditable(false)
      setShowCover(true)
    } else {
      setEditable(false)
      setShowCover(false)
    }
    const proPicUrl = process.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL + data.photoImgKey
    const coverPicUrl = process.env.NEXT_PUBLIC_S3_BUCKET_PUBLIC_URL + data.coverImgKey
    data.emailAddress = data.userEmailAddress
    setProPicUrl(proPicUrl)
    setCoverPicUrl(coverPicUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const auth = useAuth()

  const handleProPicOpen = () => {
    setOpenProfilePicture(true)
    setDialogType('profile')
  }
  const handleCoverPicOpen = () => {
    setOpenProfilePicture(true)
    setDialogType('cover')
  }

  const handleProPicClose = () => {
    setOpenProfilePicture(false)
    setFiles([])
  }
  const handleProPicSubmit = async () => {
    if (!files[0]) {
      toast.error('no image selected')
    } else {
      const file = files[0]
      const dateStamp = Date.now()
      const fileType = file.name.split('.').pop()
      const key = `${dateStamp}.${fileType}`
      await Storage.put(key, file, { level: 'public' }) //public bucket
        .then(async result => {
          Logger.info('Upload successful:', result)
          if (dialogType == 'profile') {
            data.photoImgKey = key
          } else {
            data.coverImgKey = key
          }
          data.emailAddress = data.userEmailAddress
          await API.graphql(graphqlOperation(updateUserProfile, data))
          await Storage.get(key, { level: 'public' }).then(newUrl => {
            if (dialogType == 'profile') {
              setProPicUrl(newUrl)
            } else {
              setCoverPicUrl(newUrl)
            }
            setOpenProfilePicture(false)
            setFiles([])
          })
        })
        .catch(error => {
          Logger.error('Error uploading file:', error)
        })
    }
  }

  const toggle = async () => {
    //use state to refresh component
    setRefresh(Date.now())
    data.isPublic = !data.isPublic
    await API.graphql(graphqlOperation(updateUserProfile, data))
    auth.trackEvent('User_Profile_Settings', { action: 'Toggle_Profile_Public_Status', isPublic: data.isPublic })
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleShareOpen = () => setShare(true)
  const handleShareClose = () => {
    setShare(false)
    setLinkCopied(false)
  }

  const handleCopyClose = async () => {
    try {
      // TODO Change url to env variable
      await navigator.clipboard.writeText('https://www.hirebeat.me/' + auth.user?.userName)
      setLinkCopied(true)
    } catch (error) {
      Logger.error('Error copying link:', error)
    }
  }

  return data !== null ? (
    <Card sx={showCover ? {} : { bgcolor: 'customColors.bodyBg', boxShadow: 0 }}>
      {editable && (
        <IconButton sx={{ position: 'absolute', zIndex: 1 }} onClick={handleCoverPicOpen}>
          <Pencil />
        </IconButton>
      )}
      {showCover && (
        <CardMedia
          component='img'
          alt='profile-cover-img'
          image={coverPicUrl}
          sx={{
            height: { xs: 150, md: 250 }
          }}
        />
      )}
      <CardContent
        sx={{
          pt: 0,
          mt: showCover ? -10 : 6,
          marginLeft: showCover ? 0 : -5,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <div>
          {editable && (
            <IconButton sx={{ position: 'absolute', zIndex: 1 }} onClick={handleProPicOpen}>
              <Pencil />
            </IconButton>
          )}
          <ProfilePicture src={proPicUrl} alt='profile-picture' />
        </div>

        <Grid
          container
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: { xs: 'center', md: 'space-between' }
          }}
        >
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
                {data.fName} {data.lName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                {data.position && (
                  <Box
                    sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  >
                    <Icon icon={designationIcon} />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.position}</Typography>
                  </Box>
                )}
                {data.country && (
                  <Box
                    sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}
                  >
                    <Icon icon='mdi:map-marker-outline' />
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {data.city}, {data.country}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon='mdi:calendar-blank-outline' />
                  <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Joined {joiningDate}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            {type == 'Profile' && (
              <div style={{ display: 'none' }}>
                {data.isPublic && (
                  <Button
                    variant='outlined'
                    onClick={handleShareOpen}
                    endIcon={<Icon icon='mdi:share' />}
                    sx={{ mr: 5 }}
                  >
                    Share
                  </Button>
                )}
                <FormControlLabel
                  control={<Switch checked={data.isPublic} onChange={toggle} />}
                  label='Public'
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <Popover
                  id='mouse-over-popover'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>
                    {data.isPublic ? 'Turn off your profile information' : 'Turn on your profile information'}{' '}
                  </Typography>
                </Popover>
              </div>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Dialog
        open={openProfilePicture}
        onClose={handleProPicClose}
        scroll='body'
        aria-labelledby='user-view-edit'
        sx={{
          '& .MuiPaper-root': {
            width: '100%'
          }
        }}
        aria-describedby='user-view-edit-description'
      >
        <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleProPicClose}>
          <Close />
        </IconButton>
        <DialogContent sx={{ justifyContent: 'center', overflow: 'hidden' }}>
          <Grid sx={{ justifyContent: 'center', mt: '20px', ml: '45px', mb: '20px' }} container spacing={3}>
            <Grid item xs={12}>
              <DocumentUpload type='image' files={files} setFiles={setFiles} />
            </Grid>
          </Grid>
        </DialogContent>
        {files[0] && (
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button size='large' variant='contained' onClick={handleProPicSubmit}>
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>
      <Dialog open={share} onClose={handleShareClose} fullWidth={true}>
        <DialogTitle id='simple-dialog-title'>Share your profile</DialogTitle>
        <TextField
          label='Link'
          defaultValue={'https://www.hirebeat.me/' + auth.user?.userName}
          id='form-props-read-only-input'
          InputProps={{ readOnly: true }}
          sx={{ m: 5 }}
        />
        <DialogActions className='dialog-actions-dense' sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCopyClose} startIcon={<Icon icon='mdi:link' />}>
            {linkCopied ? 'Link copied' : 'Copy Link'}
          </Button>
          <Button onClick={handleShareClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </Card>
  ) : null
}

export default UserProfileHeader
