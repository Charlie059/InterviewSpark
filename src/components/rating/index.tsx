import { Box, TextField, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import React from 'react';
export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(0);
  const [review, setReview] = React.useState<string>('');

  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        '& > legend': { mt: 2 },
      }}
    >
      <Typography variant='h4' component = 'h4'>Leave a Review</Typography>
      <Typography variant='subtitle1' component = 'h4'>How would you rate your experience?</Typography>

      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <TextField
        label="Leave a review"
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
        fullWidth
        value={review}
        onChange={(event) => setReview(event.target.value)}
      />
    </Box>
  );
}
