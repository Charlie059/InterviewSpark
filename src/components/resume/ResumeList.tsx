// import {useState, useEffect} from 'react'

// // ** MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// // ** Third Party Imports

// import Typography from "@mui/material/Typography";

// import Box from "@mui/material/Box";
// import { Storage } from "@aws-amplify/storage"

// // import { DataStore } from '@aws-amplify/datastore';
// // import {User, Resume, Video} from 'src/models';
// // import Refresh from 'mdi-material-ui/Refresh';
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import TableBody from "@mui/material/TableBody";
// import LinearProgress from "@mui/material/LinearProgress";
// import TableContainer from "@mui/material/TableContainer";
// import DialogContent from "@mui/material/DialogContent";
// import Dialog from "@mui/material/Dialog";
// import ResumeResults from "./ResumeResults";
// import Divider from "@mui/material/Divider";

// import Refresh from 'mdi-material-ui/Refresh';

// // import {useAuth} from "../../hooks/useAuth";
// import IconButton from '@mui/material/IconButton'

// // Styled component for the heading inside the dropzone area

// // const defaultValues = {
// //   resume: null,
// //   jobTitle: '',
// //   jobDescription: '',
// // }

// // const CustomInput = forwardRef(({ ...props }, ref) => {
// //   return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
// // })

// const ResumeList: React.FC<ResumeListProps> = () => {
//   // ** States

//   // ** Hooks
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [resumes, setResumes] = useState<Array<Resume>>([]);
//   const [openResume, setOpenResume] = useState<boolean>(false);
//   const [resumeResult, setResumeResult] = useState<string>('');
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [refreshResume, setRefreshResume] = useState<boolean>(false);

//   // const handleResumeClickOpen = () => setOpenResume(true);
//   const handleResumeClose = () => setOpenResume(false);

//   // const auth = useAuth();

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   async function updateResumeUrl(id: string, newUrl: string) {

//     // const original = await DataStore.query(Resume, id);
//     // await DataStore.save(
//     //   Resume.copyOf(original, (updated) => {
//     //     updated.resume_url = newUrl;
//     //   })
//     // );
//     //#TODO
//     //Update resumeurl mutation
//   }

//   async function getResume() {
//     //#TODO
//     //new GetResume Mutation needed

//     // const user = await DataStore.query(User, (c) =>
//     //   c.username('eq', auth.user.email)
//     // );
//     // if (user.length !== 0) {
//     //   const resumeStore = await DataStore.query(Resume, (c) =>
//     //     c.userID('eq', user[0].id).resume_results('ne', '')
//     //   );
//     //   if (resumeStore.length === 0) {
//     //     setResumes([
//     //       {
//     //         resume_name: 'No Resume, Please upload or refresh',
//     //       },
//     //     ]);
//     //   } else {
//     //     console.log(resumeStore);
//     //     for (let r of resumeStore) {
//     //       console.log(r.resume_name);
//     //       const newUrl = await Storage.get(r.resume_name);
//     //       await updateResumeUrl(r.id, newUrl);
//     //     }
//     //     setResumes(resumeStore);
//     //   }
//     // } else {
//     //   setResumes([
//     //     {
//     //       resume_name: 'No Resume, Please upload or refresh',
//     //     },
//     //   ]);
//     // }
//     // console.log(resumes);

//     //setRefreshResume(false)
//   }

//   const refreshUrl = async ({ resumeName }: { resumeName: string }) => {
//     window.open(await Storage.get(resumeName, { expires: 604800 }));
//   };

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const deleteResume = async (toDelete: React.MouseEvent<HTMLButtonElement>) => {
//     //#TODO
//     //Delete Resume

//     // const resumeStore = await DataStore.query(Resume, (c) =>
//     //   c.resume_name('eq', toDelete.currentTarget.value)
//     // );
//     // DataStore.delete(resumeStore[0]);
//     // console.log(resumes);
//     // await getResume();
//   };

//   useEffect(() => {
//     getResume();
//   }, []);

//   // @ts-ignore
//   // @ts-ignore
//   return (
//     <Card>
//       {refreshResume ? (
//         <>
//           <p>yes!</p>
//           {async () => await getResume()}
//         </>
//       ) : (
//         <></>
//       )}
//       <CardHeader
//         title="Resume Analysis"
//         titleTypographyProps={{ variant: 'h6' }}
//         action={
//           <IconButton
//             size="small"
//             aria-label="collapse"
//             sx={{ color: 'text.secondary' }}
//             onClick={() => getResume()}
//           >
//             <Refresh fontSize="small" />
//           </IconButton>
//         }
//       />
//       <Divider sx={{ m: 0 }} />
//       <CardContent>
//         <TableContainer>
//           <Table size="small" sx={{ minWidth: 500 }}>
//             <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
//               <TableRow>
//                 <TableCell sx={{ height: '3.375rem' }}>File Name</TableCell>
//                 <TableCell sx={{ height: '3.375rem' }}>Resume File</TableCell>
//                 <TableCell sx={{ height: '3.375rem' }}>Match Score</TableCell>
//                 <TableCell sx={{ height: '3.375rem' }}>View</TableCell>
//                 <TableCell sx={{ height: '3.375rem' }}></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {resumes.map((item, index) => (
//                 <TableRow
//                   hover
//                   key={index}
//                   sx={{ '&:last-of-type td': { border: 0 } }}
//                 >
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                         <Typography
//                           variant="subtitle2"
//                           sx={{ color: 'text.primary' }}
//                         >
//                           {item.display_name}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: 'text.disabled' }}
//                         >
//                           For {item.job_name}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     {item.resume_url && (
//                       <Button
//                         target="_blank"
//                         variant="contained"
//                         sx={{ mr: 2 }}
//                         onClick={async () => {
//                           await refreshUrl({ resumeName: item.resume_name });
//                         }}
//                        href=''>
//                         <Typography sx={{ color: 'white' }}>Download</Typography>
//                       </Button>
//                     )}
//                   </TableCell>
//                   {item.resume_results && (
//                     <TableCell sx={{ color: 'text' }}>
//                       {(
//                         JSON.parse(JSON.parse(item.resume_results))[
//                           'Final Report'
//                           ]['Final_score'].toFixed(2) * 2
//                       ).toString()}
//                       <LinearProgress
//                         variant="determinate"
//                         value={
//                           JSON.parse(JSON.parse(item.resume_results))[
//                             'Final Report'
//                             ]['Final_score'].toFixed(2) * 2
//                         }
//                         sx={{ height: 6, mt: 1, borderRadius: '5px' }}
//                       />
//                     </TableCell>
//                   )}
//                   {item.resume_results && (
//                     <TableCell>
//                       <Button
//                         onClick={() => {
//                           setOpenResume(true);
//                           setResumeResult(item.resume_results);
//                         }}
//                         target="_blank"
//                         variant="outlined"
//                         sx={{ mr: 2 }}
//                       href=''>
//                         View Scan Result
//                       </Button>
//                       <Dialog
//                         open={openResume}
//                         onClose={handleResumeClose}
//                         scroll="body"
//                         aria-labelledby="user-view-edit"
//                         sx={{
//                           '& .MuiPaper-root': {
//                             width: '100%',
//                             maxWidth: 1000,
//                             p: [2, 10],
//                           },
//                         }}
//                         aria-describedby="user-view-edit-description"
//                       >
//                         <DialogContent>
//                           <ResumeResults resumeResults={resumeResult} />
//                         </DialogContent>
//                       </Dialog>
//                     </TableCell>
//                   )}
//                   {item.resume_results && (
//                     <TableCell>
//                       <Button
//                         value={item.resume_name}
//                         onClick={deleteResume}
//                         variant="outlined"
//                         color="error"
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default ResumeList;
