import { Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Close from "mdi-material-ui/Close";
import { styled } from "@mui/material/styles";

interface IDocumentUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const DocumentUpload: React.FC<IDocumentUploadProps> = ({ files, setFiles }) => {
// ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5242880,
    accept: {
      "application/*": [".pdf", ".doc", ".docx"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("Only documents <= 5MB are accepted.", {
        duration: 5000,
      });
    },
  });

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith("image")) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />;
    } else {
      return <FileDocumentOutline />;
    }
  };

  const handleRemoveFile = (file: File) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          <Typography className="file-size" variant="body2">
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize="small" />
      </IconButton>
    </ListItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return(
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary'>Allowed *.pdf, *.docx, *.doc</Typography>
            <Typography color='textSecondary'>Max size 5 MB</Typography>
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          {files.length>1 ?(
            <div className='buttons'>
              <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                Remove All
              </Button>
            </div>
          ):null}
        </Fragment>
      ) : null}
    </Fragment>
  )

}

export default DocumentUpload
