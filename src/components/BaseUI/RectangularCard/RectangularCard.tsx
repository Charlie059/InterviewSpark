

import React from 'react';
import {Box, Card} from '@mui/material'

type AspectRatioBoxProps = {
  children: React.ReactNode;
  aspectRatio: number;
};

const RectangularCard: React.FC<AspectRatioBoxProps> = ({children,aspectRatio}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'stretch'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
          <Card sx={{ borderRadius: '25px',aspectRatio,width:'100%'}}>
          {children}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default RectangularCard;
