// // ** React Imports
// import {useState} from 'react'

// // ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import CardHeader from '@mui/material/CardHeader'
// import IconButton from '@mui/material/IconButton'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import FormHelperText from '@mui/material/FormHelperText'

// // ** Third Party Imports
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'

// // import { DataStore } from '@aws-amplify/datastore';
// // import {User, Resume} from 'src/models';

// import DocumentUpload from "../uploaders/DocumentUpload";
// import { Storage } from "@aws-amplify/storage"
// import Collapse from "@mui/material/Collapse";

// import ChevronUp from 'mdi-material-ui/ChevronUp'
// import ChevronDown from 'mdi-material-ui/ChevronDown'
// import {API} from "aws-amplify";
// import {useRouter} from "next/router";
// import {useAuth} from "../../hooks/useAuth";

// // Styled component for the heading inside the dropzone area

// interface ResumePack {
//   jobTitle: string;
//   jobDescription: string;
//   resume_url: string;
//   resume_name: string;
//   resume_results: string;
//   resume_file: string;
//   display_name: string;
// }

// const defaultValues: ResumePack = {
//   jobTitle: '',
//   jobDescription: '',
//   resume_url: '',
//   resume_name:'',
//   resume_results: '',
//   resume_file: '',
//   display_name: '',
// }

// const ResumeScan: React.FC<{nocollapse: boolean}> = ({nocollapse}) => {

//   const router = useRouter()
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const auth = useAuth()

//   async function putResume(resumePack: ResumePack) {

//     // const user = await DataStore.query(User, c => c.username('eq', auth.user.email));
//     // console.log("resumePack: ")
//     // console.log(resumePack.display_name)
//     //
//     // return await DataStore.save(
//     //   new Resume({
//     //     "resume_url":  resumePack.resume_url,
//     //     "display_name": resumePack.display_name,
//     //     "resume_name": resumePack.resume_name,
//     //     "job_name":resumePack.jobTitle,
//     //     "resume_results": resumePack.resume_results,
//     //     "userID": user[0].id
//     //   })
//     // );
//     return resumePack

//     //#TODO
//     //GraphQL mutation for resume db storage
//   }

//   async function scanResume(resumePack: ResumePack) {
//     const apiName = 'resumeAPI';
//     const path = '/resume-scan';

//     const myInit = {
//       headers: {}, // OPTIONAL
//       response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
//       body: resumePack
//     };

//     return API.post(apiName, path, myInit)
//       .then((response) => {
//         resumePack.resume_results = JSON.stringify(response.data)
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   }

//   // ** States
//   const [files, setFiles] = useState<File[]>([])
//   const [collapsed, setCollapsed] = useState<boolean>(nocollapse)
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [show, setShow] = useState<boolean>(!nocollapse)

//   // ** Hooks
//   const {
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<ResumePack>({ defaultValues })

//   async function onSubmit (data: ResumePack) {
//     toast.success('Form Submitted')
//     const resume = files[0];
//     const name = resume.name;
//     const docType = name.slice(-3);

//     const reader = new FileReader();
//     let base64: string;
//     reader.onload = function(fileLoadedEvent) {
//       if(fileLoadedEvent.target!=null){
//         if(fileLoadedEvent.target.result){
//           if (typeof fileLoadedEvent.target.result === "string") {
//             base64 = fileLoadedEvent.target.result.split(',')[1];
//           }
//           data.resume_file = base64;
//         }
//       }

//     };
//     reader.readAsDataURL(resume);

//     const timestamp = Date.now();
//     const suffix = docType == "pdf" ? ".pdf" : ".docx";
//     const cvName = timestamp + suffix;
//     try {
//       await Storage.put(cvName, resume).catch(e => console.log(e));
//       const url = await Storage.get(cvName, { expires: 604800 });
//       data.resume_url = url
//       data.resume_name = cvName
//       data.display_name = name
//       await scanResume(data)

//       await putResume(data)
//     } catch (error) {
//       console.log("Error uploading file: ", error);
//     }

//     setCollapsed(false)
//     await router.replace('/my-resume')
//   }

//   return (
//     <Card> {show&&
//       <CardHeader onClick={()=>setCollapsed (!collapsed)}
//                   title='Upload Your Resume'
//                   titleTypographyProps={{ variant: 'h6' }}
//                   action={show &&
//                     <IconButton
//                       size='small'
//                       aria-label='collapse'
//                       sx={{ color: 'text.secondary' }}
//                       onClick={() => setCollapsed(!collapsed)}
//                     >
//                       {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
//                     </IconButton>
//                   }
//       />}
//       <Collapse in={collapsed}>
//         <CardContent>

//           {/*<Button onClick={putIndustry}>Update Industry</Button>*/}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12} sm={12}>
//                 <DocumentUpload files={files} setFiles={setFiles}/>
//               </Grid>
//               <Grid item xs={12} sm={12}>
//                 <FormControl >
//                   <Controller
//                     name='jobTitle'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                       <TextField
//                         value={value}
//                         label='Job Title'
//                         onChange={onChange}
//                         placeholder='SDE'
//                         error={Boolean(errors.jobTitle)}
//                         aria-describedby='validation-basic-last-name'
//                       />
//                     )}
//                   />
//                   {errors. jobTitle && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
//                       This field is required
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='jobDescription'
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                       <TextField
//                         rows={5}
//                         multiline={true}
//                         value={value}
//                         label='Job Description'
//                         onChange={onChange}
//                         error={Boolean(errors.jobDescription)}
//                       />
//                     )}
//                   />
//                   {errors.jobDescription && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
//                       This field is required
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button  size='large' type='submit' variant='contained'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Collapse>
//     </Card>
//   )
// }

// export default ResumeScan
export {}
