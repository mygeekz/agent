
import React from 'react';
import { FileGenericIcon, FileImageIcon, FilePdfIcon } from './icons';

interface FileIconProps {
  type: string;
}

const FileIcon: React.FC<FileIconProps> = ({ type }) => {
  if (type.startsWith('image/')) {
    return <FileImageIcon />;
  }
  if (type === 'application/pdf') {
    return <FilePdfIcon />;
  }
  return <FileGenericIcon />;
};

export default FileIcon;
