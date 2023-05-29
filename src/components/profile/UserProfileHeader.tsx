// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { format } from 'date-fns'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from "@mui/material/IconButton";
import Close from "mdi-material-ui/Close";
import Pencil from 'mdi-material-ui/Pencil';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

//** Component Imports
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DocumentUpload from "../uploaders/DocumentUpload";
import { Storage } from "@aws-amplify/storage"
import {API, graphqlOperation} from "aws-amplify";
import {updateUserProfile} from "../../graphql/mutations";
import toast from "react-hot-toast";


const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))


type diagTypes = 'profile' | 'cover';

const UserProfileHeader = ({ data }: any) => {
  // ** State
  console.log(data)

  const joiningDate = format(new Date(data.joiningDate), 'PP')

  const designationIcon = 'mdi:briefcase-outline'
  const [openProfilePicture, setOpenProfilePicture] = useState<boolean>(false)
  const [dialogType, setDialogType] = useState<diagTypes>('profile')
  const [files, setFiles] = useState<File[]>([])
  const [proPicUrl, setProPicUrl] = useState<string>('')
  const [coverPicUrl, setCoverPicUrl] = useState<string>('')

  useEffect(() => {
    const fetchProPicUrl = async () => {
      try {
        const url = await Storage.get(data.photoImgURL);
        setProPicUrl(url);
        const coverUrl = await Storage.get(data.coverImgURL);
        setCoverPicUrl(coverUrl);
      } catch (error) {
        console.error("Error fetching profile picture URL:", error);
      }
    };
    fetchProPicUrl();
  }, []);

  const handleProPicOpen = () => {
    setOpenProfilePicture(true)
    setDialogType('profile')
  }
  const handleCoverPicOpen = () => {
    setOpenProfilePicture(true)
    setDialogType('cover')
  }

  const handleProPicClose = () => setOpenProfilePicture(false)
  const handleProPicSubmit = async () =>{
    if(!files[0]){
      toast.error("no image selected")
    }else{
      const file = files[0];
      const dateStamp = Date.now();
      const fileType = file.name.split(".").pop();
      const key = `${dateStamp}.${fileType}`;
      await Storage.put(key, file)
        .then(async result => {
          console.log("Upload successful:", result);
          if(dialogType == "profile"){
            data.photoImgURL = key
          }else{
            data.coverImgURL = key
          }
          data.emailAddress = data.userEmailAddress
          console.log("data to update:",data)
          await API.graphql(graphqlOperation(updateUserProfile, data))
          await Storage.get(key).then(newUrl => {
            if(dialogType == "profile"){
              setProPicUrl(newUrl)
            }else{
              setCoverPicUrl(newUrl)
            }

            setOpenProfilePicture(false)
          })
        })
        .catch(error => {
          console.error("Error uploading file:", error);
        });
    }

  }

  return data !== null ? (
    <Card>
      <IconButton sx={{ position: 'absolute', zIndex: 1 }} onClick={handleCoverPicOpen}>
        <Pencil/>
      </IconButton>
      <CardMedia
        component='img'
        alt='profile-cover-img'
        image={coverPicUrl}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <div>
          <IconButton sx={{ position: 'absolute', zIndex: 1 }} onClick={handleProPicOpen}>
            <Pencil/>
          </IconButton>
          <ProfilePicture src={proPicUrl} alt='profile-picture' />
        </div>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
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
                <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                  <Icon icon={designationIcon} />
                  <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.position}</Typography>
                </Box>
              )}
              {data.country && (
                <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
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
        </Box>
      </CardContent>
      <Dialog
        open={openProfilePicture}
        onClose={handleProPicClose}
        scroll='body'
        aria-labelledby='user-view-edit'
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            p: [2, 10]
          }
        }}
        aria-describedby='user-view-edit-description'
      >
        <IconButton sx={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleProPicClose}>
          <Close/>
        </IconButton>
        <DialogContent>
          <DocumentUpload type="image" files={files} setFiles={setFiles} />
        </DialogContent>
        {files[0] &&<Button  size='large' variant='contained' onClick={handleProPicSubmit}>
          Submit
        </Button>}
      </Dialog>
    </Card>

  ) : null
}

export default UserProfileHeader
