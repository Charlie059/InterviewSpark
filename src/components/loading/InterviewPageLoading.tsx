import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const InterviewPageLoading = () => {
  return (
    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default InterviewPageLoading;
