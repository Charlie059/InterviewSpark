import React from 'react'
import UserSubscription from 'src/components/profile/Subscription/UserSubscription'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const UpgradePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box mt={5} mb={5}>
        <Typography variant='h2' align='center'>
          Upgrade to Premium
        </Typography>
        <Typography variant='subtitle1' align='center'>
          Unlock all the powerful features and get the most out of our product.
        </Typography>
      </Box>

      <Carousel autoPlay={false} sx={{ overflow: 'visible' }}>
        <Card>
          <CardMedia component='img' image='/path-to-your-image-1.png' alt='feature-1' />
          <CardContent>
            <Typography variant='h4'>Feature 1</Typography>
            <Typography variant='body1'>Detailed explanation of feature 1.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia component='img' image='/path-to-your-image-2.png' alt='feature-2' />
          <CardContent>
            <Typography variant='h4'>Feature 2</Typography>
            <Typography variant='body1'>Detailed explanation of feature 2.</Typography>
          </CardContent>
        </Card>
      </Carousel>

      <Box mt={5} mb={5}>
        <UserSubscription />
      </Box>

      <Box mt={5} mb={5}>
        <Typography variant='h3' align='center'>
          What Our Users Say
        </Typography>
        <Box mt={5} mb={5}>
          <Typography variant='h3' align='center'>
            Frequently Asked Questions
          </Typography>

          <Typography variant='h5' gutterBottom sx={{ marginTop: '20px' }}>
            What Our Users Say
          </Typography>
          <List>
            <ListItem>
              <Typography variant='body1'>
                "Great application with top-notch features that are intuitive and user-friendly. The customer service is
                always responsive and helpful." - John S.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                "I have been using this platform for about a year now, and it's fantastic. It has made my life so much
                easier, and the continuous improvements and updates always impress me." - Sarah W.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body1'>
                "This platform has everything I need. It's user-friendly and saves me so much time. I can't recommend it
                highly enough." - George L.
              </Typography>
            </ListItem>
          </List>

          <Typography variant='h5' gutterBottom sx={{ marginTop: '20px' }}>
            Frequently Asked Questions
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Is the platform easy to use?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! Our platform has been designed with usability in mind. Even if you're not tech-savvy, you'll
                be able to navigate it with ease.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Do I need any special software to use this platform?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No, all you need is a web browser. Our platform works on all modern browsers, so you don't need to
                download anything.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How is customer service?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We pride ourselves on our exceptional customer service. Our team is always ready to help, and we're
                dedicated to ensuring you have the...
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  )
}

UpgradePage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default UpgradePage
