
import React from 'react';

interface FileDisplayProps {
  url: string;
  height: number;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ url ,height}) => {

  return (
    <iframe
      src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
      height= {height}
      width='100%'
      frameBorder={0}
    ></iframe>
  );
};

export default FileDisplay;

